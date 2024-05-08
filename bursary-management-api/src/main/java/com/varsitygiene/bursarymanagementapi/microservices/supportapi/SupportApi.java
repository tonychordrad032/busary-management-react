package com.varsitygiene.bursarymanagementapi.microservices.supportapi;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/support-apis")
public class SupportApi {

  @GetMapping("/enrolment-status")
  public ResponseEntity enrolmentStatus() throws Exception {
    List<String> enrolmentStatusList = Arrays.asList("In Progress", "Complete");
    return ResponseEntity.ok().body(enrolmentStatusList);
  }

  @GetMapping("/funding-status")
  public ResponseEntity fundingStatus() throws Exception {
    List<String> fundingStatusList = Arrays.asList("Pending", "Funded", "No Funding");
    return ResponseEntity.ok().body(fundingStatusList);
  }

  @GetMapping("/enrolment-type")
  public ResponseEntity enrolmentType() throws Exception {
    List<String> enrolmentTypeList = Arrays.asList("Part-Time", "Full-Time");
    return ResponseEntity.ok().body(enrolmentTypeList);
  }
}
