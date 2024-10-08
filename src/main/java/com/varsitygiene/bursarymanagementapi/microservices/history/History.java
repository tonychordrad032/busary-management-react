package com.varsitygiene.bursarymanagementapi.microservices.history;


import com.varsitygiene.bursarymanagementapi.microservices.users.User;
import com.varsitygiene.bursarymanagementapi.utils.dto.Base;
import lombok.Data;

import javax.persistence.*;


@Data
@Entity(name = "tbl_history")
public class History extends Base {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long historyId;

  @Lob
  private String activity;

  @Lob
  private String functionMethod;

  @Lob
  private String dataBefore;

  @Lob
  private String dataAfter;

  @Lob
  private String description;




  public History() {}

  public History(String activity, String functionMethod, String dataBefore, String dataAfter, User user) {
    //super(user);
    this.activity = activity;
    this.functionMethod = functionMethod;
    this.dataBefore = dataBefore;
    this.dataAfter = dataAfter;
  }
}
