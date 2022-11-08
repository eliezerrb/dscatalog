package com.eliezerrb.dscatalog.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eliezerrb.dscatalog.dto.CategoryDTO;
import com.eliezerrb.dscatalog.dto.ProductDTO;
import com.eliezerrb.dscatalog.entities.Category;
import com.eliezerrb.dscatalog.entities.Product;
import com.eliezerrb.dscatalog.repositories.CategoryRepository;
import com.eliezerrb.dscatalog.repositories.ProductRepository;
import com.eliezerrb.dscatalog.services.exceptions.DatabaseException;
import com.eliezerrb.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository repository;
	
	@Autowired
	private CategoryRepository categoryRepository;

	// Com categoria
	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(Pageable pageable, Long categoryId, String name){
		
		// Consulta JPA no repository é bom instanciar o obj category e não só passar o ID
		// Se for 0 vai dar problema, validei na expressão condicional ternária
		// Arrays.asList: para criar a lista com o getReferenceById
		List<Category> categories = (categoryId == 0) ? null : Arrays.asList(categoryRepository.getReferenceById(categoryId));
		Page<Product> page = repository.find(categories, name, pageable);
		
		// page.getContent() converte página para lista, criado a linha abaixo para resolver o problema N+1 consultas quando varre o DTO buscando a categoria do produto 
		repository.findProductsWithCategories(page.getContent());
		return page.map(x -> new ProductDTO(x, x.getCategories()));
		
	}
	
	// Sem Categoria, criei para não dar erro na IDE devido a ter teste automatizada sem categoria 
	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(Pageable pageable){
		Page<Product> list = repository.findAll(pageable);
		return list.map(x -> new ProductDTO(x));
		
	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> obj = repository.findById(id);
		Product entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new ProductDTO(entity,entity.getCategories());
	}

	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		Product entity = new Product();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new ProductDTO(entity);
		
	}


	@Transactional
	public ProductDTO update(Long id, ProductDTO dto) {
		try {
			Product entity = repository.getReferenceById(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new ProductDTO(entity);
		} 
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found" + id);
		}
	}
	
	
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
	
	
	private void copyDtoToEntity(ProductDTO dto, Product entity) {
		
		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		entity.setDate(dto.getDate());
		entity.setImgUrl(dto.getImgUrl());
		entity.setPrice(dto.getPrice());
		
		entity.getCategories().clear();
		for (CategoryDTO catDto : dto.getCategories()) {
			Category category = categoryRepository.getReferenceById(catDto.getId());
			entity.getCategories().add(category);
		}
	}
	
}
