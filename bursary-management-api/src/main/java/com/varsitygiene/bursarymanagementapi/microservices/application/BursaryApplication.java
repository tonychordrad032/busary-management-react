package com.varsitygiene.bursarymanagementapi.microservices.application;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity(name = "tbl_bursary_applications")
public class BursaryApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bursaryApplicationId;

    private String studentNumber;

}
