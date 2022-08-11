FROM mariadb

# ENV MYSQL_DATABASE imagination_playground
ENV MYSQL_ROOT_PASSWORD yodel1234

WORKDIR /etc/mysql/setDB
RUN pwd

# 초기 세팅 SQL 파일 Docker로 Copy
COPY ./setDB.sql /etc/mysql/setDB/setDB.sql
RUN ls -al

EXPOSE 3306

# MariaDB Config Setting (table 소문자, 한국 시간, 한글 깨짐 수정 등)
RUN echo lower_case_table_names=1 >> /etc/mysql/conf.d/docker.cnf
RUN echo default-time-zone='+9:00' >> /etc/mysql/conf.d/docker.cnf
RUN echo collation-server = utf8mb4_general_ci >> /etc/mysql/conf.d/docker.cnf
RUN echo character-set-server = utf8mb4 >> /etc/mysql/conf.d/docker.cnf
RUN echo skip-character-set-client-handshake >> /etc/mysql/conf.d/docker.cnf
