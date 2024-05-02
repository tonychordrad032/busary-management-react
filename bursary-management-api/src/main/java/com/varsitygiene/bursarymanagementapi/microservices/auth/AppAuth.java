package com.varsitygiene.bursarymanagementapi.microservices.auth;

import com.varsitygiene.bursarymanagementapi.microservices.users.User;
import com.varsitygiene.bursarymanagementapi.microservices.users.UserService;
import com.varsitygiene.bursarymanagementapi.utils.dto.Login;
import com.varsitygiene.bursarymanagementapi.utils.helpers.ResponseResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


import javax.websocket.server.PathParam;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v2/auth")
public class AppAuth {
/*
    private static Logger LOG = LoggerFactory.getLogger(AppAuth.class);

    @Value("${iam.baseurl:default}")
    private String BASE_URL;

    @Value("${iam.realm:default}")
    private String REALM;

    @Value("${iam.username:default}")
    private String USERNAME;

    @Value("${iam.password:default}")
    private String PASSWORD;

    @Value("${iam.scope:default}")
    private String SCOPE;

    @Value("${iam.grant_type:default}")
    private String GRANT_TYPE;

    @Value("${iam.clientid:default}")
    private String CLIENTID;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    @Lazy
    private UserService userService;

    @PostMapping
    public ResponseEntity<ResponseResult> adminLogin(@RequestBody Login login) {
        ResponseEntity<Map> res = login(login.getUsername(), login.getPassword());
        if(res == null) {
            LOG.warn("{} Failed to login with password {}", login.getUsername(), login.getPassword());
            return ResponseEntity.status(401).body(new ResponseResult(401, "Incorrect username or password", ""));
        }

        //LOG.info(res.toString());
        if(res.getStatusCode().is2xxSuccessful()) {
            LOG.info("{} logged in successfully.", login.getUsername());
            userService.updateLastLogin(login.getUsername());
            return ResponseEntity.ok(new ResponseResult(200, "login was successfully", res.getBody()));
        }else if(res.getStatusCodeValue() == 401) {
            return ResponseEntity.badRequest().body(new ResponseResult(401, "Incorrect username or password", ""));
        }else if(res.getStatusCode().is4xxClientError()) {
            return ResponseEntity.badRequest().body(new ResponseResult(res.getStatusCodeValue(), "Error occurred", ""));
        }else{
            return ResponseEntity.internalServerError().body(new ResponseResult(res.getStatusCodeValue(), "Error occurred", ""));
        }
    }

    public ResponseEntity<Map> login(String username, String password) {
    try {
      String url = BASE_URL + "/realms/" + REALM + "/protocol/openid-connect/token";
      //LOG.info(url);
      //LOG.info(username);
      //LOG.info(password);

      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

      MultiValueMap<String, String> map = new LinkedMultiValueMap<>();

      map.add("grant_type", GRANT_TYPE);
      map.add("client_id", CLIENTID);
      map.add("scope", SCOPE);
      map.add("username", username);
      map.add("password", password);

      HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);

      ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

      return response;
    }catch (Exception e) {
      LOG.error("->" + e.getMessage());
      return null;
    }
  }

    @GetMapping("refresh-token")
    public ResponseEntity<ResponseResult> refreshToken(@PathParam("username") String username, @PathParam("refreshToken") String refreshToken) {
    try {
      String url = BASE_URL + "/realms/" + REALM + "/protocol/openid-connect/token";
      //LOG.info(url);
      //LOG.info(username);
      //LOG.info(password);

      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

      MultiValueMap<String, String> map = new LinkedMultiValueMap<>();

      map.add("grant_type", "refresh_token");
      map.add("client_id", CLIENTID);
      map.add("scope", SCOPE);
      map.add("refresh_token", refreshToken);

      HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);

      ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

      if(response.getStatusCode().is2xxSuccessful()) {
        LOG.info("{} token refreshed successfully.", username);
        userService.updateLastLogin(username);
        return ResponseEntity.ok(new ResponseResult(200, "login was successfully", response.getBody()));
      }else{
        LOG.warn("{} refresh token failed.", username);
        return ResponseEntity.ok(new ResponseResult(400, "refresh token failed", null));
      }
    }catch (Exception e) {
      LOG.error("->" + e.getMessage());
      return ResponseEntity.ok(new ResponseResult(400, "refresh token failed", null));
    }
  }

    public ResponseEntity<List> getUser(String username) {
        try {
            String url = BASE_URL + "/admin/realms/" + REALM + "/users?username=" + username;

            ResponseEntity<Map> resLogin = login(USERNAME, PASSWORD);

            if(!resLogin.getStatusCode().is2xxSuccessful()) {
                throw new Exception("Couldn't login admin");
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            //LOG.info(resLogin.getBody().get("access_token").toString());
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(resLogin.getBody().get("access_token").toString());

            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();

            HttpEntity<String> entity = new HttpEntity<String>(headers);

            ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, entity, List.class);

            return response;
        }catch (Exception e) {
            LOG.error(e.getMessage());
            return null;
        }
    }

    public ResponseEntity<Map> changePassword(String iamId, String newPassword) {
      try {
        String url = BASE_URL + "/admin/realms/" + REALM + "/users/" + iamId + "/reset-password";

        ResponseEntity<Map> resLogin = login(USERNAME, PASSWORD);

        if(!resLogin.getStatusCode().is2xxSuccessful()) {
          throw new Exception("Couldn't login admin");
        }

        String requestJson = "{\"type\":\"password\",\"value\":\"" + newPassword + "\",\"temporary\":false}";

        //LOG.info(resLogin.getBody().get("access_token").toString());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(resLogin.getBody().get("access_token").toString());

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();

        HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.PUT, entity, Map.class);
        //LOG.info("code={}, codeValue={}, body={}", response.getStatusCode(), response.getStatusCodeValue(), response.getBody());
        return response;
      }catch (Exception e) {
        LOG.error(e.getMessage());
        return null;
      }
    }

    public ResponseEntity<Map> createAppUser(User user) {
        try {
            String url = BASE_URL + "/admin/realms/" + REALM + "/users";

            ResponseEntity<Map> resLogin = login(USERNAME, PASSWORD);

            if(!resLogin.getStatusCode().is2xxSuccessful()) {
                throw new Exception("Couldn't login admin");
            }

            String requestJson = "{\n  \"createdTimestamp\": 1588880747548,\n  \"username\": \"" + user.getUsername() + "\",\n  \"enabled\": true,\n  \"totp\": false,\n  \"emailVerified\": true,\n  \"firstName\": \"" + user.getFirstName() + "\",\n  \"lastName\": \"" + user.getLastName() + "\",\n  \"email\": \"" + user.getUsername() + "\",\n  \"disableableCredentialTypes\": [],\n  \"requiredActions\": [],\n  \"notBefore\": 0,\n  \"credentials\":[{\"type\":\"password\",\"value\":\"" + user.getPassword() + "\",\"temporary\":false}],\n  \"attributes\": {\n      \"Source Client\":\"" + CLIENTID + "\"\n  },\n  \"access\": {\n    \"manageGroupMembership\": true,\n    \"view\": true,\n    \"mapRoles\": true,\n    \"impersonate\": true,\n    \"manage\": true\n  },\n  \"clientRoles\": {\n    \""+ CLIENTID +"\": [\"user\", \"admin\"]\n  },\n  \"realmRoles\": [\"user\",\"admin\"]\n}";

            //LOG.info(resLogin.getBody().get("access_token").toString());
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(resLogin.getBody().get("access_token").toString());

            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();

            HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
            LOG.info("response {}", response);
            return response;
        }catch (Exception e) {
            LOG.error("-> :: <- " + e.getMessage());
            if(e.getMessage().contains("409")) {
              ResponseEntity rr = new ResponseEntity(HttpStatus.CONFLICT);
              return rr;
            }
            return null;
        }
    }*/
}
