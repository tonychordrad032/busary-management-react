package com.varsitygiene.bursarymanagementapi.microservices.qualification;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QualificationRepository extends JpaRepository<Qualification, Long> {
    Qualification findByQualificationName(String qualificationName);
    Boolean existsByQualificationName(String qualificationName);

    @Query("FROM tbl_qualifications b WHERE b.deleted = 0 AND (b.qualificationName LIKE %:searchText%)")
    Page<Qualification> findAllBySearch(Pageable pageable, String searchText);
}
