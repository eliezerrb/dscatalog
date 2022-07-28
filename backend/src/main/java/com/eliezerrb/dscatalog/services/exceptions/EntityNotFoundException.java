package com.eliezerrb.dscatalog.services.exceptions;

// RuntimeException - não é obrigatório tratar a exception 

public class EntityNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public EntityNotFoundException(String msg) {
		super(msg);
	}

}
