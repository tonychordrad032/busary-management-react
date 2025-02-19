package com.varsitygiene.bursarymanagementapi.microservices.users;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
  @Query("FROM tbl_users b WHERE b.deleted = 0 AND b.username =:username")
  List<User> findByEmail(String username);

  @Query("FROM tbl_users b WHERE b.deleted = 0 AND b.mobile=:mobile")
  List<User> findByMobile(String mobile);

  //Admin
  @Query("FROM tbl_users b WHERE b.deleted = 0 AND (b.firstName LIKE %:searchText% OR b.lastName LIKE %:searchText% OR b.mobile LIKE %:searchText%)")
  Page<User> findAllBySearchAdmin(Pageable pageable, String searchText);

  //Other
  @Query("FROM tbl_users b WHERE b.deleted = 0 AND (b.userId = :userId)")
  Page<User> findAllBySearch(Pageable pageable, long userId);

  User findByIamId(String iamId);
  User findByUsername(String username);

}
