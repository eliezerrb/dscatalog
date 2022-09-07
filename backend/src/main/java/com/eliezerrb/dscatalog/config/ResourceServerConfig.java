package com.eliezerrb.dscatalog.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter{

	// tokenStore é um beam criado na classe appConfig
	
	@Autowired
	private JwtTokenStore tokenStore;
	
	//Defindo constantes para liberar as rotas
	private static final String[] PUBLIC = { "/oauth/token" };
	
	private static final String[] OPERATOR_OR_ADMIN = { "/products/**", "/categories/**" };
	
	private static final String[] ADMIN = { "/users/**" };
	
	
	@Override
	public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
		// Configurar o tokenStore
		// Com isso o resource server será capaz de decodificar o token e analisar se o token é válido bate com o secret se está expirado e etc... 
		resources.tokenStore(tokenStore);
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		// Configurar as rotas 
		// Quem pode acessar?
		http.authorizeRequests()
		.antMatchers(PUBLIC).permitAll()
		// libera somente o metodo GET no vetor OPERATOR_OR_ADMIN
		.antMatchers(HttpMethod.GET, OPERATOR_OR_ADMIN).permitAll()
		// libera para o vetor OPERATOR_OR_ADMIN para os roles OPERATOR e ADMIN
		.antMatchers(OPERATOR_OR_ADMIN).hasAnyRole("OPERATOR", "ADMIN")
		.antMatchers(ADMIN).hasRole("ADMIN")
		// qualquer outra rota que não foi passada aqui tem que estar logado
		.anyRequest().authenticated();
	}

	
}
