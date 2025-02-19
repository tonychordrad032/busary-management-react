package com.varsitygiene.bursarymanagementapi.utils.utils;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Component
public class EmailSender {

  @Value("${email.host:default}")
  private String HOST;

  @Value("${email.port}")
  private int PORT;

  @Value("${email.username:default}")
  private String USERNAME;

  @Value("${email.password:default}")
  private String PASSWORD;

  @Value("${email.from:default}")
  private String FROM;

  //@Bean
  public JavaMailSender getJavaMailSender() {
    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
    mailSender.setHost(HOST);
    mailSender.setPort(PORT);

    mailSender.setUsername(USERNAME);
    mailSender.setPassword(PASSWORD);

    Properties props = mailSender.getJavaMailProperties();
    props.put("mail.transport.protocol", "smtp");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.debug", "true");

    return mailSender;
  }

  @Async
  public void sendEmail(String to, String subject, String body) {

    Properties props = new Properties();
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.smtp.host", HOST);
    props.put("mail.smtp.port", "25");

    // Get the Session object.
    Session session = Session.getInstance(props,
      new Authenticator() {
        protected PasswordAuthentication getPasswordAuthentication() {
          return new PasswordAuthentication(USERNAME, PASSWORD);
        }
      });

    try {
      // Create a default MimeMessage object.
      Message message = new MimeMessage(session);

      // Set From: header field of the header.
      message.setFrom(new InternetAddress(FROM));

      // Set To: header field of the header.
      message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));

      // Set Subject: header field
      message.setSubject(subject);

      // Now set the actual message
      message.setText(body);

      // Send message
      Transport.send(message);

      System.out.println("Sent message successfully...." + Thread.currentThread().getName());

    } catch (MessagingException e) {
      throw new RuntimeException(e);
    }
  }
}
