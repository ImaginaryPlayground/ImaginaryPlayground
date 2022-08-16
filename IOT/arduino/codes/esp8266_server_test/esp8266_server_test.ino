//https://www.hardcopyworld.com/?p=3215
//https://websocket-client.readthedocs.io/en/latest/examples.html
#include <WebSocketServer.h>
#include <ESP8266WiFi.h>

const char* ssid     = "MERCUSYS_5ABA";
const char* password = "dudtjs972972@";
const char number = '1';

// 서버 생성시 연결될 포트 지정
WiFiServer server(80);
WebSocketServer webSocketServer;

void setup() {
    Serial.begin(115200);
    delay(10);
    
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    //WiFi 라이브러리의 네트워크 설정을 초기화한다.
    // wifi는 현상태를 제공한다.
    WiFi.begin(ssid, password);

    // 와이파이망에 연결
    while (WiFi.status() != WL_CONNECTED) {
        delay(400);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());  
    
    startServer();
}

// 서버 시작
void startServer() {
    Serial.println("Server start");
    server.begin();
}

void loop() {
    // 클라이언트 연결 대기
    WiFiClient client = server.available();

    // 클라이언트가 연결되면 파일 전송 시작
    if(client.connected() && webSocketServer.handshake(client)) {
        String data;
        while(client.connected()) {
            data = webSocketServer.getData();
            if(data.length() > 0) {
                Serial.println("received: "+data);
                webSocketServer.sendData("send back - "+data); 
            }
            delay(10);
        }
        Serial.println("The client is disconnected");
        delay(100);
    }
    delay(100);
}
