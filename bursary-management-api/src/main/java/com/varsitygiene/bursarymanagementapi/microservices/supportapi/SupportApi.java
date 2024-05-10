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


  @GetMapping("/settings")
  public ResponseEntity enrolmentStatus() throws Exception {
    Setting setting = new Setting();

    List<String> enrolmentStatusList = Arrays.asList("In Progress", "Complete");
    List<String> fundingStatusList = Arrays.asList("No", "Yes, NSFAS", "Yes, NRF", "Yes, CSIR", "Yes, Bursary through DUT");
    List<String> fundingTypeList = Arrays.asList("Historic Debt", "Current years funding", "Both - Historic and Current Reg");
    List<String> bursaryApplicationStatusList = Arrays.asList("No", "Yes, I have applied for funding / bursaries and still waiting for outcome", "Yes, I have already been shortlist and waiting for payment");
    List<String> raceList = Arrays.asList("Black", "Coloured", "Indian", "White" );
    List<String> genderList = Arrays.asList("Male", "Female");
    List<String> disabilityList = Arrays.asList("Yes", "No", "Not professionally diagnosed as yet");
    List<String> enrolmentTypeList = Arrays.asList("Part-Time", "Full-Time");
    List<String> homeLanguageList = Arrays.asList("English", "Isizulu", "Other");
    List<String> citizenshipList = Arrays.asList("Yes, born citizen", "Yes, permanent citizen", "No");
    List<String> areaClassificationList = Arrays.asList("RURAL", "URBAN");
    List<String> yesOrNoList = Arrays.asList("Yes", "No");
    List<String> qualificationList = Arrays.asList("Diploma in ICT - BA", "Diploma in ICT - App Dev", "Diploma in Management Accounting", "Bachelor in ICT Degree", "Advanced Diploma in ICT", "Advanced Diploma in Management Science", "Diploma in Management Science- Marketing", "Diploma in Business Information Management", "NOT on option list above");
    List<String> levelOfStudyList = Arrays.asList("1st", "2nd", "3rd", "4th", "Adv Dip  year", "PG Dip", "Master", "PHD", "Other");
    List<String> averageList = Arrays.asList("< 50 %", "50 - 60%", "60 - 70%", "> 70%");
    List<String> sponsorshipList = Arrays.asList("BANKSETA Bursary", "NSFAS", "Self-funded", "DUT acquired Bursary", "Private Bursary", "Other");
    List<String> residenceOptionList = Arrays.asList("Yes, DUT Residence", "Yes, DUT Private Residence", "Yes, I pay rent to a private landlord", "No, I travel from home");
    List<String> employmentStatus = Arrays.asList("Unemployed", "Full-Time Employed", "Ad-Hoc Part-time employment", "Part-time employment - daily");


    setting.setEnrolmentStatus(enrolmentStatusList);
    setting.setFundingStatus(fundingStatusList);
    setting.setFundingType(fundingTypeList);
    setting.setBursaryApplicationStatus(bursaryApplicationStatusList);
    setting.setRace(raceList);
    setting.setGender(genderList);
    setting.setDisability(disabilityList);
    setting.setEnrolmentStatus(enrolmentStatusList);
    setting.setEnrolmentType(enrolmentTypeList);
    setting.setHomeLanguage(homeLanguageList);
    setting.setCitizenship(citizenshipList);
    setting.setClassificationArea(areaClassificationList);
    setting.setYesOrNo(yesOrNoList);
    setting.setQualification(qualificationList);
    setting.setLevelOfStudy(levelOfStudyList);
    setting.setAverage(averageList);
    setting.setSponsorship(sponsorshipList);
    setting.setResidenceOption(residenceOptionList);
    setting.setEmploymentStatus(employmentStatus);

    return ResponseEntity.ok().body(setting);
  }

//  @GetMapping("/funding-status")
//  public ResponseEntity fundingStatus() throws Exception {
//    List<String> fundingStatusList = Arrays.asList("No", "Yes, NSFAS", "Yes, NRF", "Yes, CSIR", "Yes, Bursary through DUT");
//    return ResponseEntity.ok().body(fundingStatusList);
//  }
//
//  @GetMapping("/funding-type")
//  public ResponseEntity fundingType() throws Exception {
//    List<String> fundingTypeList = Arrays.asList("Historic Debt", "Current years funding", "Both - Historic and Current Reg");
//    return ResponseEntity.ok().body(fundingTypeList);
//  }
//
//  @GetMapping("/bursary-application-status")
//  public ResponseEntity bursaryApplicationStatus() throws Exception {
//    List<String> fundingStatusList = Arrays.asList("No", "Yes, I have applied for funding / bursaries and still waiting for outcome", "Yes, I have already been shortlist and waiting for payment");
//    return ResponseEntity.ok().body(fundingStatusList);
//  }
//
//  @GetMapping("/race")
//  public ResponseEntity race() throws Exception {
//    List<String> raceList = Arrays.asList("Black", "Coloured", "Indian", "White" );
//    return ResponseEntity.ok().body(raceList);
//  }
//
//  @GetMapping("/gender")
//  public ResponseEntity gender() throws Exception {
//    List<String> genderList = Arrays.asList("Male", "Female");
//    return ResponseEntity.ok().body(genderList);
//  }
//
//  @GetMapping("/disability")
//  public ResponseEntity disability() throws Exception {
//    List<String> disabilityList = Arrays.asList("Yes", "No", "Not professionally diagnosed as yet");
//    return ResponseEntity.ok().body(disabilityList);
//  }
//
//
//  @GetMapping("/enrolment-type")
//  public ResponseEntity enrolmentType() throws Exception {
//    List<String> enrolmentTypeList = Arrays.asList("Part-Time", "Full-Time");
//    return ResponseEntity.ok().body(enrolmentTypeList);
//  }
}
