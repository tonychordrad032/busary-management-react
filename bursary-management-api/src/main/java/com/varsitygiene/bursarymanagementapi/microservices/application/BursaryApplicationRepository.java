package com.varsitygiene.bursarymanagementapi.microservices.application;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BursaryApplicationRepository extends JpaRepository<BursaryApplication, Long> {
    @Query("FROM tbl_bursary_applications b WHERE b.deleted = 0 AND (b.enrolmentType LIKE %:searchText%)")
    Page<BursaryApplication> findAllBySearch(Pageable pageable, String searchText);
}
