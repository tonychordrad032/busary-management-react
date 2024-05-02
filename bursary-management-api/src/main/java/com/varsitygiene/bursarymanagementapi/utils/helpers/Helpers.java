package com.varsitygiene.bursarymanagementapi.utils.helpers;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class Helpers {

  public static LocalDate getNextWeekSunday() {
    LocalDate date = LocalDate.now();
    LocalDate newWeekDate = date.plusDays(1);
    while (newWeekDate.getDayOfWeek() != DayOfWeek.SUNDAY) {
      newWeekDate = newWeekDate.plusDays(1);
    }
    return newWeekDate;
  }

  public static LocalDate getLastWeekSunday() {
    LocalDate date = LocalDate.now();
    LocalDate newWeekDate = date.minusDays(1);
    while (newWeekDate.getDayOfWeek() != DayOfWeek.SUNDAY) {
      newWeekDate = newWeekDate.minusDays(1);
    }
    return newWeekDate;
  }

  public static LocalDate getMonthEndDay() {
    LocalDate date = LocalDate.now();
    int numberOfDays = date.lengthOfMonth();
    LocalDate dueDate = LocalDate.of(date.getYear(), date.getMonth(), numberOfDays);
    return dueDate;
  }

  public static LocalDate getMonthStartDay() {
    LocalDate date = LocalDate.now();
    LocalDate startDate = LocalDate.of(date.getYear(), date.getMonth(),1);
    return startDate;
  }

  public static String sanitize(String val) {
    return val == null ? "" : val;
  }

  public static long sanitize(Long val) {
    return val == null ? 0 : val;
  }

  public static LocalDate sanitize(LocalDate val) {
    return val == null ? LocalDate.parse("1900-01-01") : val;
  }

  public static LocalDateTime sanitize(LocalDateTime val) {
    return val == null ? LocalDateTime.parse("1900-01-01T00:00:01") : val;
  }
}
