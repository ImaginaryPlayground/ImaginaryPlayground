#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ArduinoJson.h>

#include <WebSocketsClient.h>
#include <SocketIOclient.h>

#include <Hash.h>

ESP8266WiFiMulti WiFiMulti;
SocketIOclient socketIO;

#define USE_SERIAL Serial

// 초음판 센서 핀 설정
#define echoPin D7 // Echo Pin
#define trigPin D6 // Trigger Pin
 
long duration, distance; // Duration used to calculate distance


//테스트용 : x와 y좌표
//String xy;
void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            USE_SERIAL.printf("[IOc] Disconnected!\n");
            break;
        case sIOtype_CONNECT:
            USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);

            // join default namespace (no auto join in Socket.IO V3)
            socketIO.send(sIOtype_CONNECT, "/");
            break;
        case sIOtype_EVENT:
            USE_SERIAL.printf("[IOc] get event: %s\n", payload);
            break;
        case sIOtype_ACK:
            USE_SERIAL.printf("[IOc] get ack: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_ERROR:
            USE_SERIAL.printf("[IOc] get error: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_EVENT:
            USE_SERIAL.printf("[IOc] get binary: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_ACK:
            USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
            hexdump(payload, length);
            break;
    }
}

void setup() {
    // USE_SERIAL.begin(921600);
     // 시리얼 모니터 사용 시 115200 사용
    USE_SERIAL.begin(115200);

    //초츰파 센서 셋업
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);

    //Serial.setDebugOutput(true);
    USE_SERIAL.setDebugOutput(true);

    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

      for(uint8_t t = 4; t > 0; t--) {
          USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
          USE_SERIAL.flush();
          delay(1000);
      }

    // disable AP
    if(WiFi.getMode() & WIFI_AP) {
        WiFi.softAPdisconnect(true);
    }

    //영선님네 wifi
    WiFiMulti.addAP("happyhouse", "306306306");

    //WiFi.disconnect();
    while(WiFiMulti.run() != WL_CONNECTED) {
        delay(100);
    }

    USE_SERIAL.println("");
    USE_SERIAL.println("WiFi connected");
    USE_SERIAL.println("IP address: ");
    USE_SERIAL.println(WiFi.localIP());  
    String ip = WiFi.localIP().toString();
    USE_SERIAL.printf("[SETUP] WiFi Connected %s\n", ip.c_str());

    // server address, port and URL
    // 서버의 ip,port,그대로

    // 강의장 ip
    socketIO.begin("192.168.0.8", 4001, "/socket.io/?EIO=4");
    
    //socketIO.begin("192.168.1.105", 4001, "/socket.io/?EIO=4");
    //socketIO.begin("127.0.0.1:4001", 4001, "/socket.io/?EIO=4");
    //socketIO.begin("192.168.0.6", 4001, "/socket.io/?EIO=4");
     //socketIO.begin("172.30.1.44", 3000, "/socket.io/?EIO=4");
    

    // event handler
    socketIO.onEvent(socketIOEvent);
}

unsigned long messageTimestamp = 0;
void loop() {
   // 아두이노 시리얼에서 입력 후 테스트 할 부분
   // 밑에 싹 지워도 됨
    //socketIO.loop();

    uint64_t now = millis();

    if(now - messageTimestamp > 50) {
        messageTimestamp = now;

        // Array 
         DynamicJsonDocument doc(1024);
         JsonArray array = doc.to<JsonArray>();

        array.add("chat message");
        //array.add("ESP8266BOARD");

        /* The following trigPin/echoPin cycle is used to determine the
        distance of the nearest object by bouncing soundwaves off of it. */
        digitalWrite(trigPin, LOW);
        delayMicroseconds(2);
        digitalWrite(trigPin, HIGH);
        delayMicroseconds(10);
        digitalWrite(trigPin, LOW);
        duration = pulseIn(echoPin, HIGH);
        //Calculate the distance (in cm) based on the speed of sound.
        distance = duration/58.2;

        //테스트용
        //xy="231 900";


        
        // array에 distance add
       array.add(distance);

       //테스트
       //array.add(xy);
        
       Serial.println(distance);
       //Serial.println(xy);
        //Delay 10ms before next reading.
        //delay(10);
        
        // 서버에 보내기
        // 만들어 놓은 구조를 바탕으로 JSON Seriallize(직렬화)
        
        String output;
        serializeJson(doc, output);

       //시리얼모니터에 테스트 메세지 출력(전송한 메세지 출력)
      USE_SERIAL.println(output);

      // 서버로 전송
      // ["chat message", "원하는 메세지"]
      socketIO.sendEVENT(output);
        

//        // creat JSON message for Socket.IO (event)
//        DynamicJsonDocument doc(1024);
//        JsonArray array = doc.to<JsonArray>();
//
//        // add evnet name
//        // Hint: socket.on('event_name', ....
//        array.add("event_name");
//
//        // add payload (parameters) for the event
//        JsonObject param1 = array.createNestedObject();
//        param1["now"] = (uint32_t) now;
//
//        // JSON to String (serializion)
//        String output;
//        serializeJson(doc, output);
//
//        // Send event
//        socketIO.sendEVENT(output);
//
//        // Print JSON for debugging
//        USE_SERIAL.println(output);
    }
}
