package com.varsitygiene.bursarymanagementapi.utils.config.defaultdata;

import com.varsitygiene.bursarymanagementapi.microservices.users.User;
import com.varsitygiene.bursarymanagementapi.microservices.users.UserRepository;
import com.varsitygiene.bursarymanagementapi.microservices.users.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;


import java.util.UUID;

@Log4j2
@AllArgsConstructor
//@Configuration
public class AppUserDataConfig {
  private UserService userService;

  @Bean
  public CommandLineRunner loadUser(UserRepository userRepository) {
    return (args) -> {
      User user = new User();
      user.setFirstName("Nkanyiso");
      user.setLastName("Cele");
      user.setMobile("0000000001");
      user.setUsername("admin1@dut4life.ac.za");
      load(user);

      User user2 = new User();
      user2.setFirstName("Mondli");
      user2.setLastName("Mgenge");
      user2.setMobile("0000000002");
      user2.setUsername("admin2@dut4life.ac.za");
      load(user2);

      User user3 = new User();
      user3.setFirstName("Solomon");
      user3.setLastName("Lovengood");
      user3.setMobile("0000000003");
      user3.setUsername("admin3@dut4life.ac.za");
      load(user3);
    };
  }

  public void load(User user) {
    try {
      String uid = UUID.randomUUID().toString();
      //appUserService.save(null, user, uid);
    }catch (Exception e) {
      log.warn(e.getMessage());
    }
  }
}
