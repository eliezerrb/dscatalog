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
	@Query("SELECT obj FROM	Product obj INNER JOIN obj.categories cats WHERE "
			+ ":category IN cats")
	Page<Product> find(Category category, Pageable pageable);
}
