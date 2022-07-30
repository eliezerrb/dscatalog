package com.eliezerrb.dscatalog.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tb_product")
public class Product implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	// Macete para maper no BD não como varchar, mas como o TEXT(tipo que aceita mais caracteres)
	@Column(columnDefinition = "TEXT")
	
	private String description;
	private Double price;
	private String imgUrl;
	
	@Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
	private Instant date;
	
	/*
	 *  Usar Set(conjunto) ao invez de List, pois o Set não aceita repetição, 
	 *  ex: o mesmo produto não pode ter a mesma categoria mais de uma vez, 
	 *  devido a terceira tabela do relacionamento muitos para muitos 
	 */
	
	/*
	 * Associação com categoria 
	 * @JoinTable(tabela que faz a associação entre as duas entidades)
	 * name(nome da tabela que faz o relacionamento)
	 * joinColumns(vai dizer as duas chaves estrangeiras)
	 * @JoinColumn(vai estabelecer qual vai ser a chave estrangeira relacionada a classe onde estou, ex produto)
	 * inverseJoinColumns(vai dizer a chave estrangeira que faz o outro lado da assossiação muitos para muitos)
	 */
	
	@ManyToMany
	@JoinTable(name = "tb_product_category",
			joinColumns = @JoinColumn(name = "product_id"),
			inverseJoinColumns = @JoinColumn(name = "category_id")
			)
	Set<Category> categories = new HashSet<>();

	public Product() {
		
	}

	public Product(Long id, String name, String description, Double price, String imgUrl, Instant date) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.imgUrl = imgUrl;
		this.date = date;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public Instant getDate() {
		return date;
	}

	public void setDate(Instant date) {
		this.date = date;
	}

	public Set<Category> getCategories() {
		return categories;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Product other = (Product) obj;
		return Objects.equals(id, other.id);
	}
	
	
	
}
