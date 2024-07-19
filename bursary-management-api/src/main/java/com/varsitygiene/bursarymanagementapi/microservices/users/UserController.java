package com.varsitygiene.bursarymanagementapi.microservices.users;

import com.varsitygiene.bursarymanagementapi.utils.dto.ResetPassword;
import com.varsitygiene.bursarymanagementapi.utils.helpers.ResponseResult;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;
import java.util.List;
import java.util.UUID;

@Log4j2
@RestController
@RequestMapping("/api/v1/user")
public class UserController {
  @Autowired
  private UserService userService;

  @GetMapping("/health")
  public ResponseEntity health(HttpServletRequest request) throws Exception {
    return ResponseEntity.ok(new ResponseResult(200, "Connected...", null));
  }

  @GetMapping
  @RolesAllowed({"admin", "user"})
  public ResponseEntity listAllPageable(Pageable pageable, @RequestParam String searchText, HttpServletRequest request) throws Exception {
    return userService.listAllPageable(pageable, searchText, request);
  }

  @GetMapping("/list")
  @RolesAllowed({"admin", "user"})
  public List<User> list() throws Exception {
    return userService.listAll();
  }

  @PostMapping
  //@RolesAllowed({"admin", "user"})
  public ResponseEntity save(@RequestBody User user, HttpServletRequest request) {
    String correlationId = UUID.randomUUID().toString();
    return userService.save(user, correlationId, request);
  }

  @DeleteMapping("{id}")
  @RolesAllowed({"admin", "user"})
  public ResponseEntity delete(@PathVariable long id, Authentication authentication) {
    String correlationId = UUID.randomUUID().toString();
    return userService.delete(id, correlationId, authentication);
  }

  @GetMapping("/profile")
  @RolesAllowed({"admin", "user"})
  public ResponseEntity userProfile(HttpServletRequest request) throws Exception {
    User user = userService.getUserByHttpRequest(request);
    return ResponseEntity.ok(new ResponseResult(200, "User Profile for " + user.getFirstName(), user));
  }



  @PutMapping
  @RolesAllowed({"admin", "user"})
  public ResponseEntity update(Authentication authentication, @RequestBody User user) {
    String correlationId = UUID.randomUUID().toString();
    return userService.update(user, correlationId, authentication);
  }

  @GetMapping("/get-otp")
  public ResponseEntity getOpt(@PathParam("email") String email) {
    return userService.getOTP(email);
  }

  @PostMapping("/reset-password")
  public ResponseEntity resetPassword(@RequestBody ResetPassword ch) {
    return userService.resetPassword(ch);
  }

  @PostMapping("/change-password")
  @RolesAllowed({"admin", "user"})
  public ResponseEntity changePassword(Authentication authentication, @RequestBody ResetPassword ch) {
    String correlationId = UUID.randomUUID().toString();
    return userService.changePassword(authentication, ch);
  }

  @PostMapping("/register-user")
  public ResponseEntity registerUser(@RequestBody User user, HttpServletRequest request) {
    String correlationId = UUID.randomUUID().toString();
    return userService.registerUser(user, correlationId, request);
  }


}
