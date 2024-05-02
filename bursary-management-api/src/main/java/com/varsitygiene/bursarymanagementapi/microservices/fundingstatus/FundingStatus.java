package com.varsitygiene.bursarymanagementapi.microservices.fundingstatus;

import com.varsitygiene.bursarymanagementapi.utils.dto.Base;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@Entity(name = "tbl_funding_status")
public class FundingStatus extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long fundingStatusId;
    private String fundingStatusName;
}
