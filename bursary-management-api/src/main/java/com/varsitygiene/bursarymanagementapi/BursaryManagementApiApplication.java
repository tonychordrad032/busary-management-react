package com.varsitygiene.bursarymanagementapi;

import com.varsitygiene.bursarymanagementapi.microservices.faculty.FacultyRepository;
import com.varsitygiene.bursarymanagementapi.utils.config.defaultdata.FacultyDataConfig;
import com.varsitygiene.bursarymanagementapi.utils.config.utils.FilesStorageService;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

@Log4j2
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableAsync
public class BursaryManagementApiApplication {

	@Resource
	FilesStorageService storageService;

	public static void main(String[] args) {
		SpringApplication.run(BursaryManagementApiApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST","PUT", "DELETE");
			}
		};
	}

	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}

	@Bean
	public void init() {
		storageService.init();
	}

}
