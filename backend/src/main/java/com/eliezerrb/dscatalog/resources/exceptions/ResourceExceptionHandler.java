package com.eliezerrb.dscatalog.resources.exceptions;

import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.eliezerrb.dscatalog.services.exceptions.DatabaseException;
import com.eliezerrb.dscatalog.services.exceptions.ResourceNotFoundException;

// @ControllerAdvice - Anotação que permite que a classe intercepte a exception que acontecer na camada de resource
// @ExceptionHandler - Colocar no metodo que vai interceptar o controler e tratar a exception
// .body - retornar corpo da resposta

@ControllerAdvice
public class ResourceExceptionHandler {
	
	/*
	  Código da resposta
	 
	  HttpStatus.NOT_FOUND = 404 - Requisição não encontrada
	  HttpStatus.BAD_REQUEST = 400 - Requisição não foi processada devido a erro do cliente (sintaxe, requisição inválida e etc...)
	  HttpStatus.UNPROCESSABLE_ENTITY = 422 - Alguma entidade não foi possivel de ser processada
	  
	 
	 */
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<StandardError> entityNotFound(ResourceNotFoundException e, HttpServletRequest request){
		HttpStatus statusHttp = HttpStatus.NOT_FOUND;
		StandardError err = new StandardError();
		err.setTimestamp(Instant.now());
		err.setStatus(statusHttp.value());
		err.setError("Resource not found");
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());
		return ResponseEntity.status(statusHttp).body(err);
	}
	
	
	@ExceptionHandler(DatabaseException.class)
	public ResponseEntity<StandardError> database(DatabaseException e, HttpServletRequest request){
		HttpStatus statusHttp = HttpStatus.BAD_REQUEST;
		StandardError err = new StandardError();
		err.setTimestamp(Instant.now());
		err.setStatus(statusHttp.value());
		err.setError("Database exception");
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());
		return ResponseEntity.status(statusHttp).body(err);
	}
	
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ValidationError> validation(MethodArgumentNotValidException e, HttpServletRequest request){
		HttpStatus statusHttp = HttpStatus.UNPROCESSABLE_ENTITY;
		ValidationError err = new ValidationError();
		err.setTimestamp(Instant.now());
		err.setStatus(statusHttp.value());
		err.setError("Validation exception");
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());
		
		// Pegar erros especificos que ocorreram na validação (bean validation(anotação do DTO))
		// Lista de errors - percorrendo os erros do MethodArgumentNotValidException e adicionando na lista errors do tipo FieldMessage do obj ValidationError
		for (FieldError f : e.getBindingResult().getFieldErrors()) {
			err.addError(f.getField(), f.getDefaultMessage());
		}
		
		return ResponseEntity.status(statusHttp).body(err);
	}

}
