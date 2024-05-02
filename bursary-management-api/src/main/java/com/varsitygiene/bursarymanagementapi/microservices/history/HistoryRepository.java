package com.varsitygiene.bursarymanagementapi.microservices.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HistoryRepository extends JpaRepository<History, Long> {
  @Query("FROM tbl_history b WHERE b.deleted = 0 AND (b.activity LIKE %:searchText%) AND (b.functionMethod LIKE %:searchText%) AND (b.dataBefore LIKE %:searchText%) AND (b.dataAfter LIKE %:searchText%)")
  Page<History> findAllBySearch(Pageable pageable, String searchText);
}
