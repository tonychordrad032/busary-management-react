package com.varsitygiene.bursarymanagementapi.utils.config.defaultdata;

import com.varsitygiene.bursarymanagementapi.microservices.faculty.Faculty;
import com.varsitygiene.bursarymanagementapi.microservices.faculty.FacultyRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

@Log4j2
@AllArgsConstructor
//@Configuration
public class FacultyDataConfig {

  private FacultyRepository facultyRepository;

  @Bean
  public CommandLineRunner loadFaculties(FacultyRepository facultyRepository) {
    return (args) -> {
      load(new Faculty("Faculty of Accounting and Informatics"));
      load(new Faculty("Faculty of Applied Sciences"));
      load(new Faculty("Faculty of Arts and Design"));
      load(new Faculty("Faculty of Engineering and the Built Environment"));
      load(new Faculty("Faculty of Health Sciences"));
      load(new Faculty("Faculty of Management Sciences"));
    };
  }

  public void load(Faculty faculty) {
    if (!facultyRepository.existsByFacultyName(faculty.getFacultyName())) {
      facultyRepository.save(faculty);
      log.info("{} added successfully", faculty);
    }
  }
}
