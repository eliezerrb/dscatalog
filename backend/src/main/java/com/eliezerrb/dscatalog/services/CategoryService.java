package com.eliezerrb.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eliezerrb.dscatalog.dto.CategoryDTO;
import com.eliezerrb.dscatalog.entities.Category;
import com.eliezerrb.dscatalog.repositories.CategoryRepository;
import com.eliezerrb.dscatalog.services.exceptions.DatabaseException;
import com.eliezerrb.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository repository;

	//@Transactional - Framework trata como uma transação do banco de dados ou faz tudo ou não faz nada
	//readOnly = true - evita lock no DB só para ler dados
	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll(){
		List<Category> list = repository.findAll();
		
		// Melhor forma de fazer expressão lambda para cada objeto x da lista de categoria entidade da um new CategoryDTO passando a categoria e faz a conversão
		return list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
		
		// Segunda forma de converter a lista de Category entidade para lista de CategoryDTO
		/*List<CategoryDTO> listDTO = new ArrayList<>();
		for (Category cat : list) {
			listDTO.add(new CategoryDTO(cat));
		}
		
		return listDto;
		*/
		
	}

	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		// Optional - abordagem desde o java 8 para evitar trabalhar com valor nulo
		// orElseThrow - se o objeto não existir lança uma exception
		Optional<Category> obj = repository.findById(id);
		Category entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new CategoryDTO(entity);
	}

	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		Category entity = new Category();
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new CategoryDTO(entity);
		
	}

	@Transactional
	public CategoryDTO update(Long id, CategoryDTO dto) {
		// getReferenceById - Instanciar obj provisório com os dados - usa para atualizar o BD ao invez do findById(id)
		try {
			Category entity = repository.getReferenceById(id);
			entity.setName(dto.getName());
			entity = repository.save(entity);
			return new CategoryDTO(entity);
		} 
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found" + id);
		}
	}
	

	// Não colocado o @Transactional no delete para poder capturar a exceptiondo BD
	
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} 
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
		
	}
	
	
}
