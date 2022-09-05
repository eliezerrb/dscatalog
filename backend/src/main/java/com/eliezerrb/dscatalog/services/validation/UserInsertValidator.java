package com.eliezerrb.dscatalog.services.validation;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.eliezerrb.dscatalog.dto.UserInsertDTO;
import com.eliezerrb.dscatalog.entities.User;
import com.eliezerrb.dscatalog.repositories.UserRepository;
import com.eliezerrb.dscatalog.resources.exceptions.FieldMessage;

// Classe para implementar a anotação
// ConstraintValidator interface do beans validation - informar o tipo da anotação (UserInsertValid) e qual o tipo da classe que recebe a anotação (UserInsertDTO)

public class UserInsertValidator implements ConstraintValidator<UserInsertValid, UserInsertDTO> {
	
	@Autowired
	private UserRepository repository;
	
	@Override
	public void initialize(UserInsertValid ann) {
	}

	@Override
	public boolean isValid(UserInsertDTO dto, ConstraintValidatorContext context) {
		
		List<FieldMessage> list = new ArrayList<>();
		
		// Coloque aqui seus testes de validação, acrescentando objetos FieldMessage à lista
		
		// Acrescentando erro personalizado que busca no banco de dados, aproveitando o ciclo de vida do beans validation
		User user = repository.findByEmail(dto.getEmail());
		if(user != null) {
			list.add(new FieldMessage("email","E-mail já existe"));
		}
		
		
		// Percorrendo lista de FieldMessage para inserir na lista do beans validation(MethodArgumentNotValidException) os erros
		for (FieldMessage e : list) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
					.addConstraintViolation();
		}
		return list.isEmpty();
	}
}