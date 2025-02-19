package com.varsitygiene.bursarymanagementapi.microservices.history;

import com.varsitygiene.bursarymanagementapi.microservices.users.User;
import com.varsitygiene.bursarymanagementapi.microservices.users.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;


@AllArgsConstructor
@Log4j2
@Service
public class HistoryService {

  private HistoryRepository historyRepository;
  private UserService userService;

  @Async
  public void record(History history) {
    historyRepository.save(history);
  }

  public ResponseEntity<Page<History>> listAllPageAble(Pageable pageable, String searchText, HttpServletRequest request) {
    try {
      User a = userService.getUserByHttpRequest(request);
      return ResponseEntity.ok().body(historyRepository.findAllBySearch(pageable, searchText));
    }catch (Exception e) {
      log.error("cid=>{} error on create listAllPageAble function.", e);
      return ResponseEntity.badRequest().build();
    }
  }

}
