package com.varsitygiene.bursarymanagementapi.microservices.qualification;

import com.varsitygiene.bursarymanagementapi.utils.helpers.ResponseResult;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Log4j2
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/qualification")
public class QualificationController {
    private QualificationService qualificationService;
    private QualificationRepository qualificationRepository;

    @PostMapping
    public ResponseEntity save(@RequestBody Qualification qualification){
        String correlationId = UUID.randomUUID().toString();
        return qualificationService.save(qualification, correlationId);
    }

    @PutMapping
    public ResponseEntity update(@RequestBody Qualification qualification){
        String correlationId = UUID.randomUUID().toString();
        return qualificationService.update(qualification, correlationId);
    }

    @DeleteMapping
    public ResponseEntity delete(long id){
        String correlationId = UUID.randomUUID().toString();
        return qualificationService.delete(id, correlationId);
    }

    @GetMapping
    public ResponseEntity listAll(Pageable pageable, @RequestParam String searchText){
        return qualificationService.listAllPageAble(pageable, searchText);
    }


}
