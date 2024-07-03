package com.varsitygiene.bursarymanagementapi.microservices.users;

import com.varsitygiene.bursarymanagementapi.microservices.auth.AppAuth;
import com.varsitygiene.bursarymanagementapi.microservices.history.History;
import com.varsitygiene.bursarymanagementapi.microservices.history.HistoryService;
import com.varsitygiene.bursarymanagementapi.utils.config.utils.EmailSender;
import com.varsitygiene.bursarymanagementapi.utils.dto.ResetPassword;
import com.varsitygiene.bursarymanagementapi.utils.helpers.ResponseResult;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Log4j2
@Service
public class UserService {

  @Autowired
  private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

  @Autowired
  private UserRepository userRepository;


  @Autowired
  private AppAuth appAuth;


  @Autowired
  EmailSender emailSender;


  @Autowired
  @Lazy
  private HistoryService historyService;


  /**
   * List all users from a database
   * @return
   */
  public List<User> listAll() {
    return userRepository.findAll()
      .stream()
      .collect(Collectors.toList());
  }

  public ResponseEntity<Page<User>> listAllPageable(Pageable pageable, String searchText, HttpServletRequest request) throws Exception {
    User user = getUserByHttpRequest(request);

    if("Administrator".equalsIgnoreCase(user.getUserType())) {
      LOG.info("Listing users for admin -> {}", user.getUsername());
      LOG.info("My List of all users => {}", userRepository.findAllBySearchAdmin(pageable, searchText).toList().size());
      return ResponseEntity.ok().body(userRepository.findAllBySearchAdmin(pageable, searchText));
    }else{
      return ResponseEntity.ok().body(userRepository.findAllBySearch(pageable, user.getUserId()));
    }
  }

  /**
   * Save user to the database
   * @param user
   * @return
   */
  public ResponseEntity save(User user, String correlationId, HttpServletRequest request) {
    try {
      LOG.info("start saving user {}", user.toString());

      if (user == null || user.getUsername().equals("")) {
        LOG.warn("{} : no content", correlationId);
        return ResponseEntity.noContent().build();
      }

      if (userRepository.findByEmail(user.getUsername()).size() > 0) {
        LOG.warn("{} : User with email " + user.getUsername() + " already exist");
        return ResponseEntity.status(409).body(new ResponseResult(409, "User with email " + user.getUsername() + " Already exist", null));
      }

      if (userRepository.findByMobile(user.getMobile()).size() > 0) {
        LOG.warn("{} : User with mobile " + user.getMobile() + " already exist");
        return ResponseEntity.status(409).body(new ResponseResult(409, "User with mobile " + user.getMobile() + " Already exist", null));
      }

      //Calling keycloak service
      ResponseEntity<Map> res = appAuth.createAppUser(user);
      LOG.info("ToString -> " + res.toString());
      LOG.info("Code Status -> " + res.getStatusCode().toString());
      LOG.info("Body -> " + res.getBody());

      if (res.getStatusCode().value() == 201) {
        LOG.info("In 201");
        ResponseEntity<List> users = appAuth.getUser(user.getUsername());
        LOG.info("users {}", users);
        List<Map<String, Object>> listss = users.getBody();
        LOG.info("users {}", users);
        if (listss.size() > 0) {
          System.out.println(listss.get(0).get("id"));
          user.setIamId(listss.get(0).get("id").toString());
        }
      } else if(res.getStatusCode().value() == 409) {
        return ResponseEntity.status(409).body(new ResponseResult(409, "User with email " + user.getUsername() + " Already exist", null));
      } else {
        throw new Exception("System failed to create user in Security system.");
      }
      LOG.info("MY Principal before i proceed => {}", request.getUserPrincipal());
      //LOG.info("MY NAME before i proceed => {}", request.getUserPrincipal().getName());

      if (request.getUserPrincipal() != null){
        LOG.info("Inside If");
        User uO = getUserByHttpRequest(request);
        if(uO != null) {
          user.setUserCreated(uO);
          user.setUserUpdated(uO);
        }
      }

      User u = userRepository.save(user);
      LOG.info("AppUser IAM {}, ID {}", u.getIamId(), u.getUserId());
      historyService.record(new History("new user", "save", "", "", u));
      LOG.info("After history");
      //emailSender.sendEmail(user.getUsername(), "Registration successful", "Hi " + user.getFirstName() +"\n\nWelcome to dut, enjoy!.\n\nRegards,\nFai Team!");
      LOG.info("After email");
      return ResponseEntity.created(null).body(new ResponseResult(201, "User created successfully", u));
    }catch (Exception e) {
      LOG.error(e.getMessage());
      return ResponseEntity.badRequest().body(new ResponseResult(400, e.getMessage(), null));
    }
  }

  public User getUserByAuthJWT(Authentication authentication) throws Exception {
    String principal = authentication.getPrincipal() == null ? "default" : authentication.getPrincipal().toString();
    User user = userRepository.findByIamId(principal);

    if(user == null) {
      LOG.error("User doesn't exist principal={}" + principal);
      throw new Exception("User principal doesn't exist");
    }
    return user;
  }

  public User getUserByHttpRequest(HttpServletRequest request) throws Exception {
    LOG.info("Start getting User by HttpRequest");
    String principal = request.getUserPrincipal() == null ? null : request.getUserPrincipal().getName();
    User user = userRepository.findByIamId(principal);

    if(user == null){
      LOG.error("User doesn't exist principal={}" + principal);
      throw new Exception("User principal doesn't exist");
    }
    return user;
  }

  /**
   * Update user
   */
  public ResponseEntity update(User user, String correlationId, Authentication authentication) {
    try {
      LOG.info("{} : Start updating user", correlationId);

      if (user == null){
        LOG.warn("{} : no content", correlationId);
        return ResponseEntity.noContent().build();
      }

      LOG.info("MY USER ID => {}", user.getUserId());

      User _user = userRepository.findById(user.getUserId()).orElseThrow(() -> new RuntimeException("User Not found"));


      User userUpdating = getUserByAuthJWT(authentication);

      _user.setUserUpdated(userUpdating);
      _user.setFirstName(user.getFirstName());
      _user.setLastName(user.getLastName());
      _user.setMobile(user.getMobile());
      _user.setUserType(user.getUserType());
      _user.setGender(user.getGender());
      _user.setIdentityNumber(user.getIdentityNumber());
      _user.setPassportNumber(user.getPassportNumber());
      _user.setStudentNumber(user.getStudentNumber());

      userRepository.save(_user);
      userRepository.flush();
      LOG.info("{} : User was successfully updated", correlationId);

      return ResponseEntity.ok().body(new ResponseResult(200, "User was updated successfully", _user));
    }catch (Exception e){
      LOG.error("{} : Error while updating user", correlationId);
      return ResponseEntity.badRequest().body(new ResponseResult(400, e.getMessage(), null));
    }finally {
      LOG.info("{} : Done updating user", correlationId);
    }
  }

  public ResponseEntity delete(long id, String correlationId, Authentication authentication) {
    try {
      LOG.info("{} : Start deleting user {}", correlationId, id);

      if (id == 0) {
        LOG.warn("{} : no content", correlationId);
        return ResponseEntity.noContent().build();
      }

      User _User = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));

      User updater = getUserByAuthJWT(authentication);
      _User.setDeleted(1);
      _User.setUserUpdated(updater);

      //appAuth.changePassword(_User.getIamId(),  UUID.randomUUID().toString().replaceAll("-", ""));

      userRepository.save(_User);
      userRepository.flush();
      LOG.info("{} : User was successfully deleted", correlationId);

      return ResponseEntity.ok().body(new ResponseResult(200, "User was deleted successfully", _User));
    }catch (Exception e){
      LOG.error("{} : Error while deleting user", correlationId);
      return ResponseEntity.badRequest().body(new ResponseResult(400, e.getMessage(), null));
    }finally {
      LOG.info("{} : Done deleting user", correlationId);
    }
  }

  public void updateLastLogin(String username) {
    User user = userRepository.findByUsername(username);

    if(user != null) {
      user.setLastLoginDate(LocalDateTime.now());
      userRepository.save(user);
    }
  }

  public ResponseEntity getOTP(String email) {
    try{
      User user = userRepository.findByUsername(email);
      if(user == null) {
        throw new Exception("Email not found");
      }

      String otp = generateOtp();
      LOG.info(otp);
      user.setOtp(otp);
      user.setOtpDate(LocalDateTime.now());

      userRepository.save(user);

      emailSender.sendEmail(user.getUsername(), "Reset Password OTP", "Hi " + user.getFirstName() + "\n\nYour OTP is: " + otp + "\n\nRegards,\nCsBox App Team!");
      LOG.info("OTP Sent -> " + user.getUsername());
      return ResponseEntity.ok().body(new ResponseResult(200, "OTP Sent to your email.", null));
    }catch (Exception e) {
      LOG.error("Get OTP {}", e.getMessage());
      return ResponseEntity.badRequest().body(new ResponseResult(400, e.getMessage(), null));
    }
  }

  public String generateOtp() {
    String otp = "";

    ArrayList<Integer> list = new ArrayList<Integer>();
    for (int i=1; i<11; i++) {
      list.add(i);
    }
    Collections.shuffle(list);
    for (int i=0; i<5; i++) {
      //System.out.println(list.get(i));
      otp +=  "" + list.get(i);
    }

    return otp;
  }

  public ResponseEntity resetPassword(ResetPassword ch) {
    try{
      User user = userRepository.findByUsername(ch.getEmail());
      if(user == null) {
        throw new Exception("Email not found");
      }

      if(ch.getOtp().equalsIgnoreCase(user.getOtp())) {
        LOG.info("about to change user password, {}", user);
        ResponseEntity<Map> res = appAuth.changePassword(user.getIamId(), ch.getNewPassword());
          LOG.info(res.toString());
          user.setPasswordChangeDate(LocalDateTime.now());
          user.setOtp("");
          user.setOtpDate(null);
          userRepository.save(user);
          //historyService.record();
          LOG.info("Password changed successfully. {}", user.getUsername());
          emailSender.sendEmail(user.getUsername(), "Change Password", "Hi " + user.getFirstName() + "\n\nYour password has been changed successfully.\n\nRegards,\nCsBox App Team!");
        return ResponseEntity.ok().body(new ResponseResult(200, "Password changed successfully.", null));
      }else{
        throw new Exception("Invalid OTP {} " + user.getUsername());
      }

    }catch (Exception e) {
      LOG.error("Change password {}", e.getMessage());
      return ResponseEntity.badRequest().body(new ResponseResult(400, e.getMessage(), null));
    }
  }

  public User findByIam(String iamGuid) {
    return userRepository.findByIamId(iamGuid);
  }

  public ResponseEntity changePassword(Authentication authentication, ResetPassword ch) {
    try{
      User user = userRepository.findByUsername(ch.getEmail());
      if(user == null) {
        throw new Exception("Email not found");
      }

      User supportUser = getUserByAuthJWT(authentication);

      LOG.info("about to change user password, {}", user);
      ResponseEntity<Map> res = appAuth.changePassword(user.getIamId(), ch.getNewPassword());
      LOG.info(res.toString());
      user.setPasswordChangeDate(LocalDateTime.now());
      user.setUserUpdated(supportUser);
      userRepository.save(user);
      //historyService.record();
      LOG.info("Password changed successfully. {}", user.getUsername());
      emailSender.sendEmail(user.getUsername(), "Change Password", "Hi " + user.getFirstName() + "\n\nYour password has been changed successfully.\n\nRegards,\nCsBox App Team!");
      return ResponseEntity.ok().body(new ResponseResult(200, "Password changed successfully.", null));
    }catch (Exception e) {
      LOG.error("Change password {}", e.getMessage());
      return ResponseEntity.badRequest().body(new ResponseResult(400, e.getMessage(), null));
    }
  }


}

