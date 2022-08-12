package com.eliezerrb.dscatalog.services;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
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
		// Se apagar o Mockito e fazer o import da certo porque fica estático
		doNothing().when(repository).deleteById(ExistingId);
		
		// Quando chamado o repository.deleteById Mockado de id não existente o metodo retorna exception
		doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
	}
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		
		Assertions.assertDoesNotThrow(() -> {
			service.delete(ExistingId);
		});
		
		// Verifica se o metodo deleteById foi chamado nessa ação do teste
		verify(repository, times(1)).deleteById(ExistingId);
	}
}
