package com.eliezerrb.dscatalog.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.eliezerrb.dscatalog.repositories.ProductRepository;
import com.eliezerrb.dscatalog.services.exceptions.DatabaseException;
import com.eliezerrb.dscatalog.services.exceptions.ResourceNotFoundException;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {

	@InjectMocks
	private ProductService service;
	
	@Mock
	private ProductRepository repository;
	
	private long ExistingId;
	private long nonExistingId;
	private long dependentId;
	
	
	@BeforeEach
	void setUp() throws Exception {
		
		ExistingId = 1L;
		nonExistingId = 1000L;
		dependentId = 4L;
				
		// Quando chamado o repository.deleteById Mockado de id existente  o metodo não faz nada
		// Se apagar o Mockito e fazer o import da certo porque fica estático
		Mockito.doNothing().when(repository).deleteById(ExistingId);
		
		// Quando chamado o repository.deleteById Mockado de id não existente o metodo retorna exception
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
		
		// Quando chamado o repository.deleteById Mockado de id existente como chave estrangeira de outra tabela o metodo retorna exception
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
	}
	
	
	@Test
	public void deleteShouldThrowDatabaseExceptionWhenDependentId() {
		
		Assertions.assertThrows(DatabaseException.class, () -> {
			service.delete(dependentId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(dependentId);
	}
	
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
		
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(nonExistingId);
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
