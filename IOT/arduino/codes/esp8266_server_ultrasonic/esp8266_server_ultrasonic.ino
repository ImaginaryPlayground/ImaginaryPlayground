//https://www.hardcopyworld.com/?p=3215
//https://websocket-client.readthedocs.io/en/latest/examples.html
// 초음파 센서를 사용하여 물체의 거리를 반환하는 wemos D1 mini 아두이노 코드
#include <WebSocketServer.h>
#include <ESP8266WiFi.h>

// wifi, 초음파 순서, 터치 인식 매개변수, 화면 크기 등 
// 코드 업로드 하기전 정해야하는 상수
const char* ssid     = "MERCUSYS_5ABA"; // Galaxy Quantum33143
const char* password = "dudtjs972972@";  // qwertyuiop
const char number = '1';  // 초음파 번호(순서)
const int touchRecognizeCnt = 3;  // 터치라고 인식하기 위한 TouchGroup구조체의 최소 cnt

// wifi를 통한 웹소켓 통신시 사용하는 변수들
IPAddress local_IP(192, 168, 1, 111);     // 사용할 IP 주소
IPAddress gateway(192, 168, 0, 1);  // 게이트웨이 주소
IPAddress subnet(255, 255, 255, 0); // 서브넷 주소
IPAddress primaryDNS(8, 8, 8, 8);   //optional
IPAddress secondaryDNS(8, 8, 4, 4); //optional

WiFiClient client;
// 서버 생성시 연결될 포트 지정
WiFiServer server(80);
WebSocketServer webSocketServer;

#define echoPin D7 // 초음파 Echo Pin
#define trigPin D6 // 초음파 Trigger Pin

// 초음파 관련 변수
long duration;  // 초음파 왕복 시간

// https://dojang.io/mod/page/view.php?id=408 (코딩도장 C언어 구조체)
// http://www.tcpschool.com/c/c_struct_intro (tcpschool 구조체의 기본)
// 터치 구조체(초음파를 통해 얻은 거리 정보들 중 서로의 거리가 6cm이하인 그룹의 정보)
typedef struct {
  float top;    // 그룹의 거리 정보 중 가장 큰 값
  float bottom; // 그룹의 거리 정보 중 가장 작은 값
  float sum;    // 그룹의 거리 정보 합
  int cnt;      // 그룹의 거리 정보 수 (위의 touchRecognizeCnt와 관련있음)
} TouchGroup;

void setup() {
  Serial.begin(115200);
  delay(300);  // 너무 빨리 진행하면 serial 초기화되기전에 진행되서 출력문이 무시된다;

  // trig와 echo 핀 선언
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  // 초음파를 꺼둠
  digitalWrite(trigPin, LOW);

  // https://www.arduino.cc/reference/en/libraries/wifi/wifi.status/
  // https://arduino-esp8266.readthedocs.io/en/latest/esp8266wifi/readme.html
  //  Serial.println(WL_CONNECTED);       // 3 WiFi 네트워크에 연결될 때 할당
  //  Serial.println(WL_NO_SHIELD);       // 255 WiFi 실드가 없을 때 할당
  //  // WiFi.begin()이 호출될 때 할당된 임시 상태
  //  // 시도 횟수가 만료되거나(결과적으로 WL_CONNECT_FAILED가 됨)
  //  // 연결이 설정될 때까지(결과적으로 WL_CONNECTED가 됨) 상태
  //  Serial.println(WL_IDLE_STATUS);     // 0
  //  Serial.println(WL_NO_SSID_AVAIL);   // 1 사용 가능한 SSID가 없을 때
  //  Serial.println(WL_SCAN_COMPLETED);  // 2 스캔 네트워크가 완료되면
  //  Serial.println(WL_CONNECT_FAILED);  // 4 모든 시도에 대해 연결이 실패할 때
  //  Serial.println(WL_CONNECTION_LOST); // 5 연결이 끊어지면 할당
  //  Serial.println(WL_DISCONNECTED);    // 7 네트워크 연결이 끊겼을 때

  // 보아하니 3(WL_CONNECTED)이었다가 wifi가 끊어지면, 자동으로 재연결을 계속 시도한다.
  // 이때 7이 되었다가 1이 되고 다시 연결되면 3이된다.

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
    // 터치 그룹들, 그룹의 수가 3이상이 되면 터치를 했다고 인식한다.
    TouchGroup t1 = { .top = -6, .bottom = -6, .sum = 0, .cnt = 0 };
    // 잠시 튀는 값 혹은 다음 터치 값을 저장하기 위한 터치 그룹
    // 만약 해당 그룹의 cnt가 3이되면 t1으로 옮겨지고 터치가 되었다고 인식한다.
    TouchGroup temp = { .top = -6, .bottom = -6, .sum = 0, .cnt = 0 };

    // 연결이 되어있다면
    while (client.connected()) {
      // 측정을 위한 딜레이
      delay(100);
      
      // 초음파로 거리를 측정하고
      distance = sonicDistance();
      Serial.print("거리 : ");
      Serial.println(distance);
      
      // 초음파로 측정한 거리를 기반으로 터치가 있는지 계산한다. 
      // (터치가 없다고 판단되면 -1 반환)
      float tempDist = touchPos(distance, &t1, &temp);
      Serial.print("터치 : ");
      Serial.println(tempDist);
      Serial.printf("top: %f, bottom: %f, cnt: %d\n", t1.top, t1.bottom, t1.cnt);
      Serial.printf("top: %f, bottom: %f, cnt: %d\n", temp.top, temp.bottom, temp.cnt);
      // 터치가 없다고 판단되면 바로 다음 측정을 시작한다.
      if (tempDist == -1){
        continue;
      }

      // 소켓을 통해 터치 데이터를 송신한다.(화면 크기 고려 요망)
      String sendD = String(tempDist);
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

// https://whatchang.tistory.com/10
// 터치가 되었는지 연산하여 거리를 반환하는 함수
// 큰 값과 작은 값의 범위(top, bottom)를 고려하여 비슷한 값들이 3개(cnt)가 되는 순간 터치가 되었다고 인식한다.
// 터치의 위치는 그룹의 위치 평균값(sum/cnt)으로 한다.
// 터치가 되지 않았다고 판단되면 -1을 반환한다.
// 가장 최근 측정한 거리, 터치 그룹(거리 집합에 대한 구조체), 터치 그룹 임시
float touchPos(float distance, TouchGroup* t1, TouchGroup* temp){
  // distance가..
  if ((*t1).bottom > distance){
    if ((*t1).top - distance > 6){ // (bottom보다 작아서) t1 터치 그룹의 오차 범위(6cm)를 넘는다면 temp에 추가한다.
      addDataTemp(temp, distance);
    }else{  // 그렇지 않고 오차 범위 내라면 t1에 거리를 추가한다.
      (*t1).cnt += 1;
      (*t1).sum += distance;
      (*t1).bottom = distance; // // top을 distance로 수정
    }
    
  }else if((*t1).top < distance){
    if (distance - (*t1).bottom > 6){ // distance가 (top보다 커서) t1 터치 그룹의 오차 범위(6cm)를 넘는다면 temp에 등록한다.
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
    if(avg < 10 || 60 < avg){
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
