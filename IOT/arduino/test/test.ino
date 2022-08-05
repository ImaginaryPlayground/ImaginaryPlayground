#include <ESP8266WiFi.h>

const char* ssid     = "Galaxy Quantum33143"; //"iptime_mg01" 사용 중 인 와이파이 이름
const char* password = "qwertyuiop"; //"a0128a0128" 와이파이 패스워드

WiFiServer server(80);
 
void setup() {
  Serial.begin(115200); // 시리얼 통신, 속도 115200
  delay(10);
  Serial.println();
 
  // Connect to WiFi network
  WiFi.mode(WIFI_STA);
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
 
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi connected");
 
  // Start the server
  server.begin();
  Serial.println("Server started");
 
  // Print the IP address
  Serial.println(WiFi.localIP());
}
 
void loop() {
  int val = analogRead(A0); // cds 센서값 저장
  delay(50);
  Serial.println(val);
  WiFiClient client = server.available();
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/html");
  client.println("Connection: close");
  client.println("Refresh: 1");  // 자동으로 웹페이지 새로고침 (1초 설정)
  client.println();
  client.println("<!DOCTYPE html>");
  client.println("<html xmlns='http://www.w3.org/1999/xhtml'>");
  client.println("<head>\n<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />");
  //client.println("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />");
  //client.println("<head>\n<meta charset='UTF-8'>");
  
  client.println("<title>DIYver tistory blog test</title>"); // 웹 서버 페이지 제목 설정
  client.println("</head>\n<body>");
  client.println("<center>");
  client.println("<H1>Node MCU Sensor Test</H1>"); // 페이지 내용 설정
 
 
 
  if (val < 250 ) {                      
    client.print("<H2>DARK !</H2> ");  
    client.println("<br>");
    client.println("<H3>LED ON</H3>");
    client.println("<br>");
    client.println("<H4>Sensor Value</H4>");
    client.println(val);
    
    digitalWrite(LED_BUILTIN, LOW);            // LED ON
    digitalWrite(12, HIGH);            // LED ON
  
  }
  else                                        
  {
    client.print("<H2>BRIGHT </H2>");       
    client.println("<br>");
    client.print("<H3>LED OFF</H3>");
    client.println("<br>");
    client.println("<H4>Sensor Value</H4>");
    client.println(val);
    digitalWrite(LED_BUILTIN, HIGH);                   // LED OFF
    digitalWrite(12, LOW);                   // LED OFF
}
  client.println("<br>");
  client.println("<br>");
 
  client.println("<H1> 블로그 주소 https://diyver.tistory.com </H1>"); // 페이지 내용 설정
  client.println("<pre>");
  client.print("</body>\n</html>");

  delay(300);
 
}
