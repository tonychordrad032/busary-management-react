package com.varsitygiene.bursarymanagementapi.microservices.document;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity(name = "tbl_documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long documentId;
    private long fileSize=0, deleted=0;
    private String fileName="", fileType="";
    private LocalDateTime capturedDate;
    private LocalDateTime dateAdded;
    private LocalDateTime dateUpdated;

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
