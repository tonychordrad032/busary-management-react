package com.varsitygiene.bursarymanagementapi.microservices.deparments;

import com.varsitygiene.bursarymanagementapi.microservices.faculty.Faculty;
import com.varsitygiene.bursarymanagementapi.utils.helpers.ResponseResult;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.UUID;

@Log4j2
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/department")
public class DepartmentController {

    private DepartmentRepository departmentRepository;

    private DepartmentService departmentService;

    @GetMapping()
    @RolesAllowed({"admin", "user"})
    public ResponseEntity listAll(Pageable pageable, @RequestParam String searchText) {
        return  departmentService.listAllPageAble(pageable, searchText);
    }

    @PostMapping
    @RolesAllowed({"admin", "user"})
    public ResponseEntity save(@RequestBody Department department, Authentication authentication) {
        String correlationId = UUID.randomUUID().toString();
        return departmentService.save(department, correlationId, authentication);
    }

    @PutMapping
    public ResponseEntity update(@RequestBody Department department){
        String correlationId = UUID.randomUUID().toString();
        return departmentService.update(department, correlationId);
    }

    @DeleteMapping
    public ResponseEntity delete(@RequestParam("id") long id){
        String correlationId = UUID.randomUUID().toString();
        return departmentService.delete(id, correlationId);
    }

    @GetMapping("/find-by-facultyId")
    public List<Department> findDepartmentByFacultyId(@RequestParam("facultyId") long facultyId) {
        return departmentService.listAllDepartmentByFacultyId(facultyId);
    }




}
