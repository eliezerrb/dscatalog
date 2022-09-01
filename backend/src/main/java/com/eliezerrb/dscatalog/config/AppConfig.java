package com.eliezerrb.dscatalog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class AppConfig {
	
	/* @Bean - anotação de método, ao colocar o @Bean encima do método eu estou dizendo que a instancia new BCryptPasswordEncoder();
		vai ser um componente gerenciado pelo Springboot, vou poder injetar ele em outras classes em outro componentes
	*/
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
