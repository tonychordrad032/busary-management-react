package com.varsitygiene.bursarymanagementapi.utils.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.varsitygiene.bursarymanagementapi.microservices.users.User;
import lombok.Data;


import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;

@MappedSuperclass
@Data
public class Base {

  private int deleted = 0;
  private long updateVersion = 0;


  @ManyToOne
  private User userCreated;

  @ManyToOne
  private User userUpdated;


  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime dateAdded, dateUpdated, appCaptureDate, syncDate;

  public Base() {}

  public Base(User userCreated) {
    this.userCreated = userCreated;
  }

  /**
   * This method is auto called on create Object by JPA before is saves the object
   */
  @PrePersist
  private void onCreate()
  {
    //method sets the added date to the current time
    this.dateAdded = LocalDateTime.now();
    this.dateUpdated = LocalDateTime.now();
  }

  /**
   * This method is auto called on create Object by JPA before is update the object
   */
  @PreUpdate
  private void onUpdate() {
    this.dateUpdated = LocalDateTime.now();
  }
}

