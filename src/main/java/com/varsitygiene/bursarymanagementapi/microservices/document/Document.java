package com.varsitygiene.bursarymanagementapi.microservices.document;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.varsitygiene.bursarymanagementapi.microservices.application.BursaryApplication;
import com.varsitygiene.bursarymanagementapi.microservices.file.File;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity(name = "tbl_documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long documentId;
    private long deleted=0;
    private String documentName="", documentType = "";
    private LocalDateTime capturedDate;
    private LocalDateTime dateAdded;
    private LocalDateTime dateUpdated;

    @JsonIgnore
    @OneToOne
    private File file;

    @JsonIgnore
    @ManyToOne
    private BursaryApplication bursaryApplication;

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
