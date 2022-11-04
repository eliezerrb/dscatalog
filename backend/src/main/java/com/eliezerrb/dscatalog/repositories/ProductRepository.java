package com.eliezerrb.dscatalog.repositories;

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
	@Query("SELECT DISTINCT obj FROM Product obj INNER JOIN obj.categories cats WHERE "
			+ "(:category IS NULL OR :category IN cats) AND "
			+ "(LOWER(obj.name) LIKE LOWER(CONCAT ('%', :name, '%')) )")
	Page<Product> find(Category category, String name, Pageable pageable);
}
