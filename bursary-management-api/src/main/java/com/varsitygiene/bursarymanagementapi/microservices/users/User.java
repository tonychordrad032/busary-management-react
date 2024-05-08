package com.varsitygiene.bursarymanagementapi.microservices.users;
import com.varsitygiene.bursarymanagementapi.utils.dto.Base;
import lombok.Data;

import javax.json.bind.annotation.JsonbDateFormat;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity(name = "tbl_users")
public class User extends Base {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long userId;
  private String iamId, username, password, updateFrom, profilePicture, userGuid, otp;
  private String studentNumber, firstName, lastName, gender, userType, identityNumber, passportNumber, mobile, race;

  @JsonbDateFormat(value =  "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime lastLoginDate, passwordChangeDate;

  private LocalDateTime otpDate;
  private LocalDate dob;
}
