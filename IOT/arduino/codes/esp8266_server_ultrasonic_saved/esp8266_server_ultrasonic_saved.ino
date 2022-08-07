//https://www.hardcopyworld.com/?p=3215
//https://websocket-client.readthedocs.io/en/latest/examples.html
// 초음파 센서를 사용하여 물체의 거리를 반환하는 wemos D1 mini 아두이노 코드
// + 초음파 센서를 활용하여 만든 첫번째 코드, 중간에 1번이라도 값이 튀면 더블 클릭이되는 문제가 있다.
#include <WebSocketServer.h>
#include <ESP8266WiFi.h>

const char* ssid     = "MERCUSYS_5ABA"; // Galaxy Quantum33143
const char* password = "dudtjs972972@";  // qwertyuiop
const char number = '1';  // 초음파 번호

IPAddress local_IP(192, 168, 1, 111);     // 사용할 IP 주소
IPAddress gateway(192, 168, 0, 1);  // 게이트웨이 주소
IPAddress subnet(255, 255, 255, 0); // 서브넷 주소
IPAddress primaryDNS(8, 8, 8, 8);   //optional
IPAddress secondaryDNS(8, 8, 4, 4); //optional

WiFiClient client;

// 서버 생성시 연결될 포트 지정
WiFiServer server(80);
WebSocketServer webSocketServer;

#define echoPin D7 // 초음파의 Echo Pin
#define trigPin D6 // 초음파의 Trigger Pin

// 초음파 관련 변수
long duration;  // 초음파 왕복 시간

void setup() {
  Serial.begin(115200);
  delay(300);  // 너무 빨리 진행하면 serial 초기화되기전에 진행되서 출력문이 무시된다;

  // trig와 echo 핀 선언
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  // 초음파를 꺼둠
  digitalWrite(trigPin, LOW);

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  // 고정 IP 할당.. 이 왜 안되지..?
  Serial.println(local_IP);
  Serial.println(gateway);
  Serial.println(subnet);

//  WiFi.mode(WIFI_STA);
//  WiFi.persistent(false);
//  WiFi.setAutoConnect(false);
//  while (!WiFi.config(local_IP, gateway, subnet)) {
//    Serial.println("STA Failed to configure");
//    delay(400);
//  }

//  WiFi.config(local_IP, gateway, subnet);
  WiFi.begin(ssid, password);

  startServer();
}

void loop() {
  // wifi가 끊겼다면 다시 연결 후 서버 시작
  if (WiFi.status() != WL_CONNECTED) {
    startServer();
  }

  // 클라이언트 연결 대기
  client = server.available();

  // 클라이언트가 연결되면 파일 전송 시작
  if (client.connected() && webSocketServer.handshake(client)) {
    float distance; // 물체 거리
    float top = -5, bottom = -5, sum = 0;
    int cnt = 0;
    int x, y;

    // 연결이 되어있다면
    while (client.connected()) {
      // 측정을 위한 딜레이
      delay(100);
      
      // 초음파로 거리를 측정하고
      distance = sonicDistance();
      Serial.print("거리 : ");
      Serial.println(distance);

      // 터치한 위치를 반환받는다.
//      float touchY = isTouch(distance, &top, &bottom, &sum, &cnt);
      // 터치가 없다고 판단되면 바로 다음 측정을 시작한다.
      // 아.. 그런데 너무 응답 안보내면 클라이언트에서 timeout 에러 뜨는데..
//      if (touchY == -1){
//        continue;
//      }

      // 소켓을 통해 거리를 송신한다.
      String sendD = String(distance);
      webSocketServer.sendData(sendD);
    }
    
    Serial.println("The client is disconnected");
    delay(100);
  }
  delay(100);
}

// 서버 시작
void startServer() {
  // 와이파이망에 연결될 때까지 . 출력
  while (WiFi.status() != WL_CONNECTED) {
    delay(400);
    Serial.print(".");
  }

  // 연결되면 wifi ip 주소 출력
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  Serial.println("Server start");
  server.begin();
}

// 초음파 센서를 통해서 거리를 측정하는 함수
float sonicDistance(){
  // 초음파를
  digitalWrite(trigPin, HIGH);
  // 딜레이만큼 발생시킨다.
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // echo에서 초음파를 수신한(HIGH) 시간을 측정
  //https://www.arduino.cc/reference/ko/language/functions/advanced-io/pulsein/
  duration = pulseIn(echoPin, HIGH);
  Serial.print("duration : ");
  Serial.println(duration);
  
  // 시간과 음속을 토대로 거리 계산 (cm)
//  distance = duration/58.2;
//  Serial.print("distance : ");
//  Serial.println(distance);

  return duration/58.2;
}

// 터치가 되었는지 연산하여 거리를 반환하는 함수
// 큰 값과 작은 값의 범위(top, bottom)를 고려하여 비슷한 값들이 3개(cnt)가 되는 순간 터치가 되었다고 인식한다.
// 터치의 위치는 현재 입력된 위치들의 평균값이 들어간다.
// 터치가 되지 않았다고 판단되면 -1을 반환한다.
// 가장 최근 측정한 거리, 측정했던 거리 집합 중에서 가장 큰 값(top)과 가장 작은 값(bottom)
float isTouch(float distance, float* top, float* bottom, float* sum, int* cnt){
  cnt += 1;
  
  // distance가 bottom보다 작으면 bottom을 distance로 수정
  if (*bottom < distance){
    *bottom = distance;
  }else if (distance > *top){ // distance가 top보다 크면 top을 distance로 수정
    *top = distance;
  }

  // top과 bottom이 6cm(오차 허용 범위)차이가 넘는다면 두 변수를 distance로 수정
  if (*top - *bottom > 6){
    *top = distance;
    *bottom = distance;
    *cnt = 1;
    *sum = distance;
  }else if(*cnt == 3){
    *sum += distance;
    return *sum / *cnt;
  }

  return -1;
}
