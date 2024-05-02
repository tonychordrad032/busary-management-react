package com.varsitygiene.bursarymanagementapi.microservices.fundingstatus;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FundingStatusRepository extends JpaRepository<FundingStatus, Long> {
    FundingStatus findByFundingStatusName(String fundingStatusName);
    Boolean existsByFundingStatusName(String fundingStatusName);

    @Query("FROM tbl_funding_status b WHERE b.deleted = 0 AND (b.fundingStatusName LIKE %:searchText%)")
    Page<FundingStatus> findAllBySearch(Pageable pageable, String searchText);
}
