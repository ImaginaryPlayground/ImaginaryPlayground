package com.yodel.imaginaryPlayground.service;

import java.util.Map;

public interface EmailService {
    Map<String, Object> sendEmail(String toAddress, String subject, String body);
}
