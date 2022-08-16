package com.yodel.imaginaryPlayground.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService{

    private static final String success = "SUCCESS";
    private static final String fail = "FAIL";
    private static final String error = "ERROR";
    private final JavaMailSender sender;

    public Map<String, Object> sendEmail(String toAddress, String subject, String body) {
        Map<String, Object> result = new HashMap<>();
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setTo(toAddress);
            helper.setSubject(subject);
            helper.setText(body);
            result.put("status", success);
        } catch (MessagingException e) {
            e.printStackTrace();
            result.put("status", error);
        }

        sender.send(message);
        return result;
    }
}
