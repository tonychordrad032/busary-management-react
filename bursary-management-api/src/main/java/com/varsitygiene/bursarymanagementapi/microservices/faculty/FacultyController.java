package com.varsitygiene.bursarymanagementapi.microservices.faculty;

import com.varsitygiene.bursarymanagementapi.utils.helpers.ResponseResult;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.UUID;

@Log4j2
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/faculty")
public class FacultyController {
    private FacultyService facultyService;

    private FacultyRepository facultyRepository;

    @PostMapping
    //@RolesAllowed({"admin", "user"})
    public ResponseEntity save(@RequestBody Faculty faculty) {
        String correlationId = UUID.randomUUID().toString();
        return facultyService.save(faculty, correlationId);
    }

    @GetMapping
    public ResponseEntity listAllPageable(Pageable pageable, @RequestParam String searchText){
        return facultyService.listAllPageAble(pageable, searchText);
    }



    @PutMapping
    public ResponseEntity update(@RequestBody Faculty faculty){
        String correlationId = UUID.randomUUID().toString();
        return facultyService.update(faculty, correlationId);
    }

    @DeleteMapping
    public ResponseEntity delete(@RequestParam("id") long id){
        String correlationId = UUID.randomUUID().toString();
        return facultyService.delete(id, correlationId);
    }
}
