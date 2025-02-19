package com.varsitygiene.bursarymanagementapi.microservices.document;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@Log4j2
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/document")
public class DocumentController {

    //@Autowired
    private DocumentService documentService;

    @PostMapping(path = "data-and-image", consumes = {"multipart/form-data", "application/octet-stream", "application/json"})
    @RolesAllowed({"admin", "user"})
    public ResponseEntity save(@RequestPart("data") Document document, HttpServletRequest request, @RequestParam("file") MultipartFile file){
        String correlationId = UUID.randomUUID().toString();
        return documentService.save(document, correlationId, request, file);
    }

    @GetMapping("/search")
    @RolesAllowed({"admin", "user"})
    public ResponseEntity search(HttpServletRequest request, Pageable pageable, @RequestParam String searchText) {
        return documentService.searchAllPageable(pageable, searchText, request);
    }

    @GetMapping
    @RolesAllowed({"admin", "user"})
    public ResponseEntity listAll(HttpServletRequest request, Pageable pageable) {
        return documentService.listAllPageable(pageable, request);
    }

    @PutMapping
    @RolesAllowed({"admin", "user"})
    public ResponseEntity update(@RequestBody Document document, HttpServletRequest request){
        String correlationId = UUID.randomUUID().toString();
        return documentService.update(document, correlationId, request);
    }

    @DeleteMapping
    @RolesAllowed({"admin", "user"})
    public ResponseEntity delete(@RequestParam("id") long id){
        String correlationId = UUID.randomUUID().toString();
        return documentService.delete(id, correlationId);
    }

}
