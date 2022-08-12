package com.eliezerrb.dscatalog.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.eliezerrb.dscatalog.repositories.ProductRepository;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {

	@InjectMocks
	private ProductService service;
	
	@Mock
	private ProductRepository repository;
	
	private long ExistingId;
	private long nonExistingId;
	
	
	@BeforeEach
	void setUp() throws Exception {
		
		ExistingId = 1L;
		nonExistingId = 1000L;
				
		// Quando chamado o repository.deleteById Mockado de id existente  o metodo não faz nada
		Mockito.doNothing().when(repository).deleteById(ExistingId);
		
		// Quando chamado o repository.deleteById Mockado de id não existente o metodo retorna exception
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
	}
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		
		Assertions.assertDoesNotThrow(() -> {
			service.delete(ExistingId);
		});
		
		// Verifica se o metodo deleteById foi chamado nessa ação do teste
		Mockito.verify(repository, Mockito.times(1)).deleteById(ExistingId);
	}
}
