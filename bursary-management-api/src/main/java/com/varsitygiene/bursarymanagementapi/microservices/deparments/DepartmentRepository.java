package com.varsitygiene.bursarymanagementapi.microservices.deparments;

import com.varsitygiene.bursarymanagementapi.microservices.faculty.Faculty;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Department findByDepartmentName(String departmentName);
    Boolean existsByDepartmentName(String departmentName);

    @Query("FROM tbl_departments b WHERE b.deleted = 0 AND (b.departmentName LIKE %:searchText%)")
    Page<Department> findAllBySearch(Pageable pageable, String searchText);
}
