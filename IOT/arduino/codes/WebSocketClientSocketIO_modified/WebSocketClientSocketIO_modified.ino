#include <SpacebrewYun.h>

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

// wifi, 초음파 순서, 터치 인식 매개변수, 화면 크기 등 
// 코드 업로드 하기전 정해야하는 상수
const char* ssid     = "MERCUSYS_5ABA"; // Galaxy Quantum33143
const char* password = "dudtjs972972@";  // qwertyuiop
const int numbers = 4;  // 사용하는 초음파 수, 기본적으로 초음파 센서의 개수는 4개
const int number = 1;  // 초음파 번호(순서)
const String num = "3"; 
const int touchRecognizeCnt = 3;  // 터치라고 인식하기 위한 TouchGroup구조체의 최소 cnt
// *터치 가능 높이는 빔 프로젝터의 세로길이의 5~70퍼라고 가정하고 진행한다.*
const int pWidth = 200; // 빔 프로젝터 화면의 가로 길이
const int pHeight = 112;  // 빔 프로젝터 화면의 세로 길이
const int minDistance = pHeight * 0.05; // 터치가능한 초음파로부터의 최소 거리
const int maxDistance = pHeight * 0.95;  // 터치가능한 초음파로부터의 최대 거리
const int mWidth = 1920;   // 모니터 가로 해상도
const int mHeight = 1080;   // 모니터 세로 해상도

const int pX = (pWidth / 2) + (number - numbers / 2) * 50 - 25; // 초음파 센서의 프로젝터 가로 위치
const int mX = pX * mWidth / pWidth; // 초음파 센서의 모니터 화면 가로 위치
const String strX = (String) mX; // 단순히 String으로 만든 x

// 초음판 센서 핀 설정
#define echoPin D7 // Echo Pin
#define trigPin D6 // Trigger Pin
 
// 초음파 관련 변수
long duration;  // 초음파 왕복 시간

// 터치 구조체(초음파를 통해 얻은 거리 정보들 중 서로의 거리가 6cm이하인 그룹의 정보)
typedef struct {
  float top;    // 그룹의 거리 정보 중 가장 큰 값
  float bottom; // 그룹의 거리 정보 중 가장 작은 값
  float sum;    // 그룹의 거리 정보 합
  int cnt;      // 그룹의 거리 정보 수 (위의 touchRecognizeCnt와 관련있음)
} TouchGroup;

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

// 블링크
  pinMode(LED_BUILTIN, OUTPUT);     // Initialize the LED_BUILTIN pin as an output
  digitalWrite(LED_BUILTIN, LOW);  // Turn the LED off by making the voltage LOW
  
    //초음파 센서 셋업
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);

    // 초음파를 꺼둠
    digitalWrite(trigPin, LOW);

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
    WiFiMulti.addAP(ssid,password);

//  IPAddress ip (192, 168, 0, 10); //내가 원하는 IP
//  IPAddress gateway (192, 168, 0, 1);
//  IPAddress subnet (255, 255, 255, 0);
//
//  WiFi.config (ip, gateway, subnet); //내가 원하는 설정 반영
//  WiFi.mode(WIFI_STA);
//  WiFi.begin("KNUCH-WIFI");

//  while (WiFi.status() != WL_CONNECTED) {
//    delay(500);
//    Serial.print(".");
//  }

    //WiFi.disconnect();
    while(WiFiMulti.run() != WL_CONNECTED) {
        USE_SERIAL.println(".");
        delay(100);
    }

    USE_SERIAL.println("");
    USE_SERIAL.println("WiFi connected");
    USE_SERIAL.println("IP address: ");
    USE_SERIAL.println(WiFi.localIP());  
    
    //ip 192.168.0.8
    socketIO.begin("192.168.1.201", 4001, "/socket.io/?EIO=4");
    
    String ip = WiFi.localIP().toString();
    USE_SERIAL.printf("[SETUP] WiFi Connected %s\n", ip.c_str());

    // server address, port and URL
    // 서버의 ip,port,그대로

    
    
    //socketIO.begin("192.168.0.9", 4001, "/socket.io/?EIO=4");
    //socketIO.begin("127.0.0.1:4001", 4001, "/socket.io/?EIO=4");
    //socketIO.begin("192.168.0.6", 4001, "/socket.io/?EIO=4");
     //socketIO.begin("172.30.1.44", 3000, "/socket.io/?EIO=4");

    // event handler
    socketIO.onEvent(socketIOEvent);
}

void loop() {
   socketIO.loop();
    // wifi가 연결 되어있을 때만 진행
    if(WiFiMulti.run() == WL_CONNECTED) {
        // 초음파 센서
       
        
        float distance; // 물체까지의 거리
//        float pY; // 거리를 프로젝터 화면 크기에 맞게 변환시킨 값
        int mY; //모니터 화면 크기에 맞게 변환 시킨 값
        // 터치 그룹들, 그룹의 수가 3이상이 되면 터치를 했다고 인식한다.
        TouchGroup t1 = { .top = -6, .bottom = -6, .sum = 0, .cnt = 0 };
        // 잠시 튀는 값 혹은 다음 터치 값을 저장하기 위한 터치 그룹
        // 만약 해당 그룹의 cnt가 3이되면 t1으로 옮겨지고 터치가 되었다고 인식한다.
        TouchGroup temp = { .top = -6, .bottom = -6, .sum = 0, .cnt = 0 };

         
        // 초음파로 거리를 측정하고
        distance = sonicDistance();
        Serial.print("거리 : ");
        Serial.println(distance);

       // Array 
         DynamicJsonDocument doc(1024);
         JsonArray array = doc.to<JsonArray>();

        array.add("chat message");
        //array.add("ESP8266BOARD");
        
        // array에 distance add
        //array.add(distance);
        
        // 초음파로 측정한 거리를 기반으로 터치가 있는지 계산한다. 
        // (터치가 없다고 판단되면 -1 반환)
//        float touchY = touchPos(distance, &t1, &temp);
        //Serial.print("터치 : ");
        //Serial.println(touchY);
  //      Serial.printf("top: %f, bottom: %f, cnt: %d\n", t1.top, t1.bottom, t1.cnt);
  //      Serial.printf("top: %f, bottom: %f, cnt: %d\n", temp.top, temp.bottom, temp.cnt);
        // 터치가 없다고 판단되면 바로 다음 측정을 시작한다.
         //y값 비율 화면 변환기
        mY = (int) (distance / pHeight * mHeight); 
         if(mY <= 1200) {
         (String)mY;
         array.add(num+" "+strX +" "+mY);
         //array.add((String)mY);

         // 서버에 보내기
        // 만들어 놓은 구조를 바탕으로 JSON Seriallize(직렬화)
        
        String output;
        serializeJson(doc, output);

        //시리얼모니터에 테스트 메세지 출력(전송한 메세지 출력)
      USE_SERIAL.println(output);

      // 서버로 전송
      // ["chat message", "원하는 메세지"]
      socketIO.sendEVENT(output);
         }
//        if (touchY != -1){
//          // 화면 크기에 비례하여 x축의 위치와 y축의 위치 를 계산한다.
//        // x축은 초음파 번호(number)와 비례하고 y축은 터치 위치에 비례한다.
//        // x의 경우 상수들을 사용하여 구할 수 있는 수이기에 미리 계산이 끝난 상태이다.
//
//        Serial.print("strX : " + strX + "mY : " + mY);
//        //Serial.println(strX);
//       
//        //Serial.print("mY : ");
//        //Serial.println(mY);
//
//         
//        
//        
//    
//        // 소켓을 통해 터치 데이터를 송신한다.
//        //socketIO.sendEVENT(strX + " " + String(mY));
//        
//        }

    }

    // 다음작업까지의 딜레이
    delay(300);
}

// 초음파 센서를 통해서 거리를 측정하는 함수
float sonicDistance(){
  // 초음파를
  digitalWrite(trigPin, HIGH);
  // 딜레이만큼 발생시킨다.
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // echo에서 초음파를 수신한(HIGH) 시간을 측정
  duration = pulseIn(echoPin, HIGH);
  //Serial.print("duration : ");
 //Serial.println(duration);
  
  // 시간과 음속을 토대로 거리 계산 (cm)
//  distance = duration/58.2;
//  Serial.print("distance : ");
//  Serial.println(distance);

  return duration/58.2;
}

// 터치가 되었는지 연산하여 거리를 반환하는 함수
// 큰 값과 작은 값의 범위(top, bottom)를 고려하여 비슷한 값들이 3개(cnt)가 되는 순간 터치가 되었다고 인식한다.
// 터치의 위치는 그룹의 위치 평균값(sum/cnt)으로 한다.
// 터치가 되지 않았다고 판단되면 -1을 반환한다.
// 가장 최근 측정한 거리, 터치 그룹(거리 집합에 대한 구조체), 터치 그룹 임시
float touchPos(float distance, TouchGroup* t1, TouchGroup* temp){
  // distance가..
  if ((*t1).bottom > distance){
    if ((*t1).top - distance > 30){ // (bottom보다 작아서) t1 터치 그룹의 오차 범위(6cm)를 넘는다면 temp에 추가한다.
      addDataTemp(temp, distance);
    }else{  // 그렇지 않고 오차 범위 내라면 t1에 거리를 추가한다.
      (*t1).cnt += 1;
      (*t1).sum += distance;
      (*t1).bottom = distance; // // top을 distance로 수정
    }
    
  }else if((*t1).top < distance){
    if (distance - (*t1).bottom > 30){ // distance가 (top보다 커서) t1 터치 그룹의 오차 범위(6cm)를 넘는다면 temp에 등록한다.
      addDataTemp(temp, distance);
    }else{  // 그렇지 않고 오차 범위 내라면 t1에 거리를 추가한다.
      (*t1).cnt += 1;
      (*t1).sum += distance;
      (*t1).top = distance; // bottom을 distance로 수정
    }
  }else{
    (*t1).cnt += 1;
    (*t1).sum += distance;
  }

  // 만약 temp 터치 그룹의 cnt가 3이 되면
  // temp 터치그룹을 t1으로 바꾸고 temp 그룹은 초기화한 후 터치 데이터를 반환한다.
  if ((*temp).cnt == 3){
    // t1으로 데이터를 옮기고 temp 초기화 후
    *t1 = *temp;
    *temp = { .top = -6, .bottom = -6, .sum = 0, .cnt = 0 };

    // 만약 유효하지 못한 거리라면 -1 반환(터치 안함)
    float avg = (*t1).sum / (*t1).cnt;
    if(avg < minDistance || maxDistance < avg){
      return -1;
    }
    // 유효한 거리라면 터치 데이터 반환
    return (*t1).sum / (*t1).cnt;
  }

  // 터치가 없다고 판단되면 -1 반환
  return -1;
}

// temp 터치그룹에 distance를 추가하는데 만약 오차 범위를 벗어나면 새 그룹을 만드는 함수
// temp 터치그룹, 최근 측정한 거리
void addDataTemp(TouchGroup* temp, float distance){
    // 측정한 거리를 오차 신경쓰지 않고 일단 가장 큰 값인지 작은 값인지만 확인하여 입력한 후
    if (distance < (*temp).bottom){
      (*temp).bottom = distance;
    }else if ((*temp).top < distance){
      (*temp).top = distance;
    }
  
    // 오차 범위를 벗어나면 들어온 정보를 토대로 새 그룹을 만든다.
    if ((*temp).top - (*temp).bottom > 6){
      *temp = { .top = distance, .bottom = distance, .sum = distance, .cnt = 1 };
    }else{  // 그렇지 않으면 데이터만 추가한다.
      (*temp).sum += distance;
      (*temp).cnt += 1;
    }
    
    return;
}
