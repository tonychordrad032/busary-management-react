package com.varsitygiene.bursarymanagementapi.microservices.document;

import com.varsitygiene.bursarymanagementapi.microservices.application.BursaryApplication;
import com.varsitygiene.bursarymanagementapi.microservices.application.BursaryApplicationRepository;
import com.varsitygiene.bursarymanagementapi.microservices.file.File;
import com.varsitygiene.bursarymanagementapi.microservices.file.FileRepository;
import com.varsitygiene.bursarymanagementapi.utils.config.utils.FilesStorageService;
import com.varsitygiene.bursarymanagementapi.utils.helpers.ResponseResult;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.time.LocalDateTime;

@AllArgsConstructor
@Log4j2
@Service
public class DocumentService {
    private DocumentRepository documentRepository;
    private FileRepository fileRepository;

    private BursaryApplicationRepository bursaryApplicationRepository;

    private final FilesStorageService storageService;


    /**
     * save document to the database
     * @return document
     */
    public ResponseEntity save(Document document, String correlationId, HttpServletRequest request, MultipartFile file){
        try {
            log.info("{} : Start saving document", correlationId);

            if (document == null){
                log.warn("{} : No content", correlationId);
                return ResponseEntity.noContent().build();
            }
            LocalDateTime ldt = LocalDateTime.now();
            document.setCapturedDate(ldt);


            Document doc = documentRepository.save(document);

            // This handles documents
            if(file != null && file.getSize() > 0){
                log.info("start adding file...{}", file.getOriginalFilename());
                String fileName = "document-"+ document.getDocumentId() + "-" + file.getOriginalFilename().replaceAll(" ", "_");
                storageService.save(file, fileName);
                File _file = new File();
                _file.setDocument(doc);
                _file.setFileName(fileName);
                _file.setFileSize(file.getSize());
                _file.setFileType(file.getContentType());
                _file.setCapturedDate(doc.getCapturedDate());
                fileRepository.save(_file);
            }

            log.info("{} : document was successfully added", correlationId);

            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(document.getDocumentId()).toUri();

            return ResponseEntity.created(uri).body(new ResponseResult(201, "document was successfully added", null));
        }catch (Exception e){
            log.error("{} : Error while saving document", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(400, e.getMessage(), null));
        }finally {
            log.info("{} : Done saving document", correlationId);
        }
    }

    public ResponseEntity<Page<Document>> searchAllPageable(Pageable pageable, String searchText, HttpServletRequest request) {
        return ResponseEntity.ok().body(documentRepository.findAllBySearch(pageable, searchText));
    }

    public ResponseEntity<Page<Document>> listAllPageable(Pageable pageable, HttpServletRequest request) {
        return ResponseEntity.ok().body(documentRepository.listAllDocuments(pageable));
    }

    /**
     * update document
     * @return document
     */
    public ResponseEntity update(Document document, String correlationId, HttpServletRequest request) {
        try {
            log.info("{} : Start updating document", correlationId);

            if (document == null) {
                log.warn("{} : No content", correlationId);
                return ResponseEntity.noContent().build();
            }
            Document _document = documentRepository.findById(document.getDocumentId()).orElseThrow();

            _document.setDocumentType(document.getDocumentType());
            _document.setDocumentName(document.getDocumentName());

            documentRepository.save(_document);
            documentRepository.flush();

            log.info("{} :document was updated successfully", correlationId);

            return ResponseEntity.ok().body(new ResponseResult(200, "document was updated successfully", _document));


        } catch (Exception e) {
            log.error("{} : Error while updating document", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(400, e.getMessage(), null));
        } finally {
            log.info("{} : Done updating document", correlationId);
        }
    }

    /**
     * delete document
     */
    public ResponseEntity delete(long id, String correlationId){
        try {
            log.info("{} : Start deleting document", correlationId);
            Document document = documentRepository.findById(id).orElseThrow();

            if (document.getDeleted() == 1){
                log.warn("{} : Not Found", correlationId);
                return ResponseEntity.status(404).body(new ResponseResult(404, "document with id "+ document.getDocumentId() + " is not found", null));
            }

            document.setDeleted(1);
            documentRepository.save(document);
            documentRepository.flush();

            log.info("{} : Document was deleted successfully", correlationId);
            return ResponseEntity.ok().body(new ResponseResult(200, "Document was deleted successfully", null));
        }catch (Exception e){
            log.error("{} : Error while deleting document", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(400, e.getMessage(), null));
        }finally {
            log.info("{} : Done deleting document", correlationId);
        }
    }
}
