package com.eliezerrb.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eliezerrb.dscatalog.dto.CategoryDTO;
import com.eliezerrb.dscatalog.entities.Category;
import com.eliezerrb.dscatalog.repositories.CategoryRepository;

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
		Optional<Category> obj = repository.findById(id);
		Category entity = obj.get();
		return new CategoryDTO(entity);
	}
	
	
}
