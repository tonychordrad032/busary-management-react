package com.varsitygiene.bursarymanagementapi.utils.config.defaultdata;

import com.varsitygiene.bursarymanagementapi.microservices.deparments.Department;
import com.varsitygiene.bursarymanagementapi.microservices.deparments.DepartmentRepository;
import com.varsitygiene.bursarymanagementapi.microservices.faculty.Faculty;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

@Log4j2
@AllArgsConstructor
//@Configuration
public class DepartmentDataConfig {

  private DepartmentRepository departmentRepository;

  @Bean
  public CommandLineRunner loadProvinces(DepartmentRepository departmentRepository) {
    return (args) -> {
      load(new Department("Department of Information Technology"));
      load(new Department("Department of Auditing and Taxation"));
      load(new Department("Department of Finance and Information Management (Midlands)"));
      load(new Department("Department of Financial Accounting"));
      load(new Department("Department of Information and Corporate Management"));
      load(new Department("Department of Management Accounting"));
      load(new Department("Special Programmes (FAI)"));
      load(new Department("Information Systems"));
    };
  }

  public void load(Department department) {
    if (!departmentRepository.existsByDepartmentName(department.getDepartmentName())) {
      //department.setFaculty(new Faculty(1,"", null));
      departmentRepository.save(department);
      log.info("{} added successfully", department);
    }
  }
}
