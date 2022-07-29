package com.eliezerrb.dscatalog.services.exceptions;

// RuntimeException - não é obrigatório tratar a exception 

public class ResourceNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public ResourceNotFoundException(String msg) {
		super(msg);
	}

}
