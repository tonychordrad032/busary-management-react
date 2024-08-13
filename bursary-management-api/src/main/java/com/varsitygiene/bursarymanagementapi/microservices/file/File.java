package com.varsitygiene.bursarymanagementapi.microservices.file;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.varsitygiene.bursarymanagementapi.microservices.document.Document;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity(name = "tbl_files")
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long fileId;
    private long fileSize=0, deleted=0;
    private String fileName="", fileType="";
    private LocalDateTime capturedDate;
    private LocalDateTime dateAdded;
    private LocalDateTime dateUpdated;

    @JsonIgnore
    @OneToOne
    private Document document;

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
