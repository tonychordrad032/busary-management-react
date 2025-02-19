package com.varsitygiene.bursarymanagementapi.microservices.application;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BursaryApplicationRepository extends JpaRepository<BursaryApplication, Long> {
    @Query("FROM tbl_bursary_applications b WHERE b.deleted = 0 AND (b.enrolmentType LIKE %:searchText%)")
    Page<BursaryApplication> findAllBySearchAdmin(Pageable pageable, String searchText);

    @Query("FROM tbl_bursary_applications b WHERE b.deleted = 0 AND (b.applicant.userId = :userId)")
    Page<BursaryApplication> findAllBySearch(Pageable pageable, long userId);

    @Query("FROM tbl_bursary_applications b WHERE b.deleted = 0 AND b.bursaryApplicationId = :bursaryApplicationId")
    List<BursaryApplication> findByBursaryId(long bursaryApplicationId);
}
