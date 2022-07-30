package com.eliezerrb.dscatalog.services.exceptions;

// RuntimeException - não é obrigatório tratar a exception 

public class DatabaseException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public DatabaseException(String msg) {
		super(msg);
	}

}
