package com.varsitygiene.bursarymanagementapi.microservices.faculty;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    Faculty findByFacultyName(String facultyName);
    Boolean existsByFacultyName(String facultyName);

    @Query("FROM tbl_faculties b WHERE b.deleted = 0 AND (b.facultyName LIKE %:searchText%)")
    Page<Faculty> findAllBySearch(Pageable pageable, String searchText);



}
