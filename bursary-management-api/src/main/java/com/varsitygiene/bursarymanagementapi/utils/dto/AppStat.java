package com.varsitygiene.bursarymanagementapi.utils.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppStat {
    private String key;
    private Long value;
}
