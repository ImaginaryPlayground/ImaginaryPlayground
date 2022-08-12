// esp8266에 초음파 센서를 사용할 때 적용한 코드

#define echoPin D7 // Echo Pin
#define trigPin D6 // Trigger Pin
 
long duration, distance;
 
void setup()
{
  // trig와 echo 핀 선언
  Serial.begin (115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  // 초음파를 꺼둠
  digitalWrite(trigPin, LOW);
}
 
void loop()
{
  // 초음파를
  digitalWrite(trigPin, HIGH);
  // 딜레이만큼 발생시킨다.
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // echo에서 초음파를 수신한(HIGH) 시간을 측정
  duration = pulseIn(echoPin, HIGH);
  Serial.print("duration : ");
  Serial.println(duration);
  
  // 시간과 음속을 토대로 거리 계산 (cm)
  distance = duration/58.2;
  Serial.print("distance : ");
  Serial.println(distance);

  // 다음 측정을 위한 딜레이
  delay(50);
}
