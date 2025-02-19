package com.varsitygiene.bursarymanagementapi.microservices.supportapi;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Setting {
    private List<String> enrolmentStatus = new ArrayList<>();
    private List<String> fundingStatus = new ArrayList<>();
    private List<String> fundingType = new ArrayList<>();
    private List<String> bursaryApplicationStatus = new ArrayList<>();
    private List<String> race = new ArrayList<>();
    private List<String> gender = new ArrayList<>();
    private List<String> disability = new ArrayList<>();
    private List<String> enrolmentType = new ArrayList<>();
    private List<String> homeLanguage = new ArrayList<>();
    private List<String> citizenship = new ArrayList<>();
    private List<String> classificationArea = new ArrayList<>();
    private List<String> yesOrNo = new ArrayList<>();
    private List<String> qualification = new ArrayList<>();
    private List<String> levelOfStudy = new ArrayList<>();
    private List<String> average = new ArrayList<>();
    private List<String> sponsorship = new ArrayList<>();
    private List<String> residenceOption = new ArrayList<>();
    private List<String> employmentStatus = new ArrayList<>();

}
