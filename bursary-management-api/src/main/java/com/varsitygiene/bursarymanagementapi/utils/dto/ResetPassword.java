package com.varsitygiene.bursarymanagementapi.utils.dto;

import lombok.Data;

@Data
public class ResetPassword {
  private String email, otp, newPassword;
}
