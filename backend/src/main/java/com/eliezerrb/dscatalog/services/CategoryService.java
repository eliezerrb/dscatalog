package com.eliezerrb.dscatalog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eliezerrb.dscatalog.entities.Category;
import com.eliezerrb.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository repository;

	//@Transactional - Framework trata como uma transação do banco de dados ou faz tudo ou não faz nada
	//readOnly = true - evita lock no DB só para ler dados
	@Transactional(readOnly = true)
	public List<Category> findAll(){
		return repository.findAll();
	}
}
