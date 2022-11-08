package com.eliezerrb.dscatalog.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.eliezerrb.dscatalog.entities.Category;
import com.eliezerrb.dscatalog.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

	// : - Referencia o parâmetro que está no metódo, ex  :category
	// INNER JOIN - Porque Product tem um relacionamento @ManyToMany com Category se fosse @ManyToOne funcionaria com o =
	// IN - Porque Product tem um relacionamento @ManyToMany com Category
	// DISTINCT - Para não haver repetição de produto, se ele tiver em mais de uma categoria
	// LOWER - Convertendo para minúscula 
	// CONCAT - Concatenar
	// COALESCE - Adaptação ao valor nulo(mais compátivel com os banco de dados) por ser uma lista de categories precisa dessa função
	@Query("SELECT DISTINCT obj FROM Product obj INNER JOIN obj.categories cats WHERE "
			+ "(:categories IS NULL OR cats IN :categories) AND "
			+ "(:name = '' OR LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%'))) ")
	Page<Product> find(List<Category> categories, String name, Pageable pageable);
	
	// JOIN FETCH - Busca o produto juntamente com os objetos da categoria JOIN FETCH não funciona com page, só com lista
	@Query("SELECT obj FROM Product obj JOIN FETCH obj.categories WHERE obj IN :products")
	List<Product> findProductsWithCategories(List<Product> products);
}
