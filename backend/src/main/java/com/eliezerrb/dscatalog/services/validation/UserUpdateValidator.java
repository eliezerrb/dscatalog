package com.eliezerrb.dscatalog.services.validation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import com.eliezerrb.dscatalog.dto.UserUpdateDTO;
import com.eliezerrb.dscatalog.entities.User;
import com.eliezerrb.dscatalog.repositories.UserRepository;
import com.eliezerrb.dscatalog.resources.exceptions.FieldMessage;

// Classe para implementar a anotação
// ConstraintValidator interface do beans validation - informar o tipo da anotação (UserInsertValid) e qual o tipo da classe que recebe a anotação (UserInsertDTO)

public class UserUpdateValidator implements ConstraintValidator<UserUpdateValid, UserUpdateDTO> {
	
	// Salva as informações da requisição, a partir dele consegue pegar o id do usuário que passou na URL. ex: http://localhost:8080/users/1
	@Autowired
	private HttpServletRequest request;
	
	@Autowired
	private UserRepository repository;
	
	@Override
	public void initialize(UserUpdateValid ann) {
	}

	@Override
	public boolean isValid(UserUpdateDTO dto, ConstraintValidatorContext context) {
		
		// HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE - atributo especial para acessar as váriaveis da URL
		// Map para conversão chave valor nome da chave = id, valor 2(valor passado na URL)
		@SuppressWarnings("unchecked")
		var uriVars = (Map<String, String>)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		Long userId = Long.parseLong(uriVars.get("id"));
		
		List<FieldMessage> list = new ArrayList<>();
		
		// Coloque aqui seus testes de validação, acrescentando objetos FieldMessage à lista
		
		// Acrescentando erro personalizado que busca no banco de dados, aproveitando o ciclo de vida do beans validation
		User user = repository.findByEmail(dto.getEmail());

		// userId - quem está tentando atualizar no update
		if(user != null && userId != user.getId()) {
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