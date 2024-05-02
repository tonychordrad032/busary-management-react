package com.varsitygiene.bursarymanagementapi.microservices.history;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;

@Log4j2
@RestController
@AllArgsConstructor
@RequestMapping("/api/v2/history")
public class HistoryController {

  private HistoryService historyService;

  @GetMapping
  @RolesAllowed({"admin", "user"})
  public ResponseEntity listAll(HttpServletRequest request, Pageable pageable, @RequestParam String searchText) {
    return historyService.listAllPageAble(pageable, searchText, request);
  }
}
