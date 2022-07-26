package com.eliezerrb.dscatalog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eliezerrb.dscatalog.entities.Category;
import com.eliezerrb.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository repository;

	public List<Category> findAll(){
		return repository.findAll();
	}
}
