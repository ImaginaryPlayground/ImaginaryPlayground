package com.yodel.imaginaryPlayground.controller;


import lombok.extern.log4j.Log4j;

import java.sql.DriverManager;

@Log4j
public class TestController {

    static {
        try {
            Class.forName('org.mariadb.jdbc.Driver');
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testConnection()
    {
        try (Connection connection = DriverManager.getConnection(
                "jdbc:mariadb://{IP Address}:{Port Number}/{Database Name}",
                "{USERNAME}",
                "{PASSWORD}"
        )) {
            log.info(connection);
            if (connection != null) {
                System.out.println("DB Connection Success!");
            }
        } catch (Exception e) {
            fail(e.getMessage());
        }
        }
    }
