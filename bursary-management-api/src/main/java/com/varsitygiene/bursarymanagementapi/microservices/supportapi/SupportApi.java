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
    List<String> fundingStatusList = Arrays.asList("No", "Yes, NSFAS", "Yes, NRF", "Yes, CSIR", "Yes, Bursary through DUT");
    return ResponseEntity.ok().body(fundingStatusList);
  }

  @GetMapping("/funding-type")
  public ResponseEntity fundingType() throws Exception {
    List<String> fundingTypeList = Arrays.asList("Historic Debt", "Current years funding", "Both - Historic and Current Reg");
    return ResponseEntity.ok().body(fundingTypeList);
  }

  @GetMapping("/bursary-application-status")
  public ResponseEntity bursaryApplicationStatus() throws Exception {
    List<String> fundingStatusList = Arrays.asList("No", "Yes, I have applied for funding / bursaries and still waiting for outcome", "Yes, I have already been shortlist and waiting for payment");
    return ResponseEntity.ok().body(fundingStatusList);
  }

  @GetMapping("/race")
  public ResponseEntity race() throws Exception {
    List<String> raceList = Arrays.asList("Black", "Coloured", "Indian", "White" );
    return ResponseEntity.ok().body(raceList);
  }

  @GetMapping("/gender")
  public ResponseEntity gender() throws Exception {
    List<String> genderList = Arrays.asList("Male", "Female");
    return ResponseEntity.ok().body(genderList);
  }

  @GetMapping("/disability")
  public ResponseEntity disability() throws Exception {
    List<String> disabilityList = Arrays.asList("Yes", "No", "Not professionally diagnosed as yet");
    return ResponseEntity.ok().body(disabilityList);
  }


  @GetMapping("/enrolment-type")
  public ResponseEntity enrolmentType() throws Exception {
    List<String> enrolmentTypeList = Arrays.asList("Part-Time", "Full-Time");
    return ResponseEntity.ok().body(enrolmentTypeList);
  }
}
