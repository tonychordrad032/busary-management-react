package com.varsitygiene.bursarymanagementapi.microservices.application;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@Log4j2
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/bursary-application")
public class BursaryApplicationController {
    private BursaryApplicationService bursaryApplicationService;

    @PostMapping
    public ResponseEntity save(@RequestBody BursaryApplication bursaryApplication){
        String correlationId = UUID.randomUUID().toString();
        return bursaryApplicationService.save(bursaryApplication, correlationId);
    }

    @GetMapping()
    public ResponseEntity listAll(Pageable pageable, @RequestParam String searchText, HttpServletRequest request) {
        return  bursaryApplicationService.listAllPageAble(pageable, searchText, request);
    }
}
