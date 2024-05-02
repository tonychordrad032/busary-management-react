package com.varsitygiene.bursarymanagementapi.microservices.deparments;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.varsitygiene.bursarymanagementapi.microservices.faculty.Faculty;
import com.varsitygiene.bursarymanagementapi.utils.dto.Base;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity(name = "tbl_departments")
public class Department extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long departmentId;

    private String departmentName;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateAdded, dateUpdated;

    @ManyToOne
    private Faculty faculty;

    public Department(){}

    public Department(String departmentName) {
        this.departmentName = departmentName;
    }

    public Department(long departmentId, String departmentName) {
        this.departmentId = departmentId;
        this.departmentName = departmentName;
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
