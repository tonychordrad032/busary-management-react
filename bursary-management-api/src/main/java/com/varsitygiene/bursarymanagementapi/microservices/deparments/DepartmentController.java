package com.varsitygiene.bursarymanagementapi.microservices.deparments;

import com.varsitygiene.bursarymanagementapi.microservices.faculty.Faculty;
import com.varsitygiene.bursarymanagementapi.utils.helpers.ResponseResult;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Log4j2
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/department")
public class DepartmentController {

    private DepartmentRepository departmentRepository;

    private DepartmentService departmentService;

    @GetMapping()
    public ResponseEntity listAll(Pageable pageable, @RequestParam String searchText) {
        return  departmentService.listAllPageAble(pageable, searchText);
    }

    @PostMapping
    //@RolesAllowed({"admin", "user"})
    public ResponseEntity save(@RequestBody Department department) {
        String correlationId = UUID.randomUUID().toString();
        return departmentService.save(department, correlationId);
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



}
