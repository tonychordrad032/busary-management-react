package com.varsitygiene.bursarymanagementapi.microservices.faculty;

import com.varsitygiene.bursarymanagementapi.utils.helpers.ResponseResult;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@Log4j2
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/faculty")
public class FacultyController {
    private FacultyService facultyService;

    @PostMapping
    @RolesAllowed({"admin", "user"})
    public ResponseEntity save(@RequestBody Faculty faculty, HttpServletRequest request) {
        String correlationId = UUID.randomUUID().toString();
        return facultyService.save(faculty, correlationId, request);
    }

    @GetMapping()
    @RolesAllowed({"admin", "user"})
    public ResponseEntity listAllPageable(Pageable pageable, @RequestParam String searchText){
        return facultyService.listAllPageAble(pageable, searchText);
    }


    @PutMapping
    @RolesAllowed({"admin", "user"})
    public ResponseEntity update(@RequestBody Faculty faculty){
        String correlationId = UUID.randomUUID().toString();
        return facultyService.update(faculty, correlationId);
    }

    @DeleteMapping
    @RolesAllowed({"admin", "user"})
    public ResponseEntity delete(@RequestParam("id") long id){
        String correlationId = UUID.randomUUID().toString();
        return facultyService.delete(id, correlationId);
    }
}
