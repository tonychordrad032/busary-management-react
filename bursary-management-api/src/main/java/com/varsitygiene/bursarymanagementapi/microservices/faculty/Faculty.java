package com.varsitygiene.bursarymanagementapi.microservices.faculty;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.varsitygiene.bursarymanagementapi.microservices.users.User;
import com.varsitygiene.bursarymanagementapi.utils.dto.Base;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@Entity(name = "tbl_faculties")
public class Faculty extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long facultyId;

    private String facultyName;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateAdded, dateUpdated;

    public Faculty() {}

    public Faculty(String facultyName) {
        this.facultyName = facultyName;
    }

    @ManyToOne
    //@JsonIgnore
    private User userCreated;

    @ManyToOne
    //@JsonIgnore
    private User userUpdated;

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
