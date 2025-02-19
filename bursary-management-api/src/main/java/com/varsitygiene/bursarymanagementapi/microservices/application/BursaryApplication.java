package com.varsitygiene.bursarymanagementapi.microservices.application;

import com.varsitygiene.bursarymanagementapi.microservices.document.Document;
import com.varsitygiene.bursarymanagementapi.microservices.qualification.Qualification;
import com.varsitygiene.bursarymanagementapi.microservices.users.User;
import com.varsitygiene.bursarymanagementapi.utils.dto.Base;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "tbl_bursary_applications")
public class BursaryApplication extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bursaryApplicationId;
    private String studentNumber = "", enrolmentType = "", matricYear = "", highSchoolName = "", debt = "",
            tuitionFee = "", currentLevel = "",  fundingStatus="No", fundingType="", fundingAwaiting = "", applicationStatus = "",
            haveCompletedQualification="", completedQualification="", previousYearAverage="",
            completeOutstandingModule="", fundingSourceForPreviousYear="", residence="", studyAndResAddressSame = "No", addressType = "",
            postalAddress = "", residentialAddress = "", studyAddressSameAsResidentialAddress = "No", postalCode = "",
            suburb = "", municipality = "", province = "", addressClassification= "", registeredQualification="", lastYearFundingType="";
    @ManyToOne
    private User applicant;

    @ManyToOne
    private User userCreated;
    @ManyToOne
    private User userUpdated;
    @OneToMany(mappedBy = "bursaryApplication", cascade = CascadeType.ALL)
    private List<Document> documents;
    @OneToMany
    private List<Qualification> qualifications;

}
