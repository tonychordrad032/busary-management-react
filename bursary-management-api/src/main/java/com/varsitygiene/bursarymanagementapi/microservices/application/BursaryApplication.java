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
    private String studentNumber = "", enrolmentType = "", matricYear = "", highSchoolName = "", debt = "", tuitionFee = "";
    @ManyToOne
    private User applicant;
    @OneToMany
    private List<Document> documents;
    @OneToMany
    private List<Qualification> qualifications;

}
