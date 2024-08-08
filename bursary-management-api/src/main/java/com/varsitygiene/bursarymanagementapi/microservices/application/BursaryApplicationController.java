package com.varsitygiene.bursarymanagementapi.microservices.application;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@Log4j2
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/bursary-application")
public class BursaryApplicationController {
    private BursaryApplicationService bursaryApplicationService;

    @PostMapping(path = "data-and-image", consumes = {"multipart/form-data", "application/octet-stream", "application/json"})
    @RolesAllowed({"admin", "user"})
    public ResponseEntity save(@RequestParam("files") MultipartFile[] files, @RequestPart("data") BursaryApplication bursaryApplication, Authentication authentication){
        String correlationId = UUID.randomUUID().toString();
        return bursaryApplicationService.save(bursaryApplication, correlationId,authentication, null);
    }

    @PostMapping
    @RolesAllowed({"admin", "user"})
    public ResponseEntity save(@RequestBody BursaryApplication bursaryApplication, Authentication authentication){
        String correlationId = UUID.randomUUID().toString();
        return bursaryApplicationService.save(bursaryApplication, correlationId,authentication, null);
    }


    @GetMapping()
    public ResponseEntity listAll(Pageable pageable, @RequestParam String searchText, HttpServletRequest request) {
        return  bursaryApplicationService.listAllPageAble(pageable, searchText, request);
    }

    @PutMapping()
    public ResponseEntity update(@RequestBody BursaryApplication bursaryApplication, Authentication authentication){
        String correlationId = UUID.randomUUID().toString().toLowerCase();
        return bursaryApplicationService.update(bursaryApplication, correlationId, authentication);
    }

    @DeleteMapping
    @RolesAllowed({"admin", "user"})
    public ResponseEntity delete(@RequestParam("id") long id, Authentication authentication){
        String correlationId = UUID.randomUUID().toString();
        return bursaryApplicationService.delete(id, correlationId, authentication);
    }
}
