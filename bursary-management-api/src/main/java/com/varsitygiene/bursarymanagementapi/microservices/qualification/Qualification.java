package com.varsitygiene.bursarymanagementapi.microservices.qualification;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.varsitygiene.bursarymanagementapi.utils.dto.Base;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Entity(name = "tbl_qualifications")
public class Qualification extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long qualificationId;
    private String qualificationName;
    private String institution;
    private String enrolmentStatus;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateAdded, dateUpdated;

    public Qualification() {}

    public Qualification(String qualificationName) {
        this.qualificationName = qualificationName;
    }

    @PrePersist
    private void onCreate()
    {
        //method sets the added date to the current time
        this.dateAdded = LocalDateTime.now();
        this.dateUpdated = LocalDateTime.now();
    }

    @PreUpdate
    private void onUpdate() {
        this.dateUpdated = LocalDateTime.now();
    }

}
