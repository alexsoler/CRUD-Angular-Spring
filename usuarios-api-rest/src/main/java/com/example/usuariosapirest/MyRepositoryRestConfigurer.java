package com.example.usuariosapirest;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Configuration
public class MyRepositoryRestConfigurer implements RepositoryRestConfigurer {

 @Override
 public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
   config.exposeIdsFor(User.class);
 }
}
