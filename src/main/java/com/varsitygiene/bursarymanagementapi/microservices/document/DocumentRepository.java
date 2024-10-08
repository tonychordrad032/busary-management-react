package com.varsitygiene.bursarymanagementapi.microservices.document;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DocumentRepository extends JpaRepository<Document, Long> {


    @Query("" +
            "FROM tbl_documents b " +
            "WHERE b.deleted = 0 " +
            "AND (b.documentType LIKE %:searchText%)"
    )
    Page<Document> findAllBySearch(Pageable pageable, String searchText);
    @Query("FROM tbl_documents b WHERE b.deleted = 0")
    Page<Document> listAllDocuments(Pageable pageable);
}
