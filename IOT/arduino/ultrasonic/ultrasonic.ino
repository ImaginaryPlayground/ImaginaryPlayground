//#include <ESP8266WiFi.h>
//#include <stdio.h>

//const int trig = D1;
//const int echo = D2;
//
//float distance, duration;
//
//void setup() {
//  Serial.begin(9600); // 시리얼 통신
//
//  pinMode(trig, OUTPUT);
//  pinMode(echo,INPUT);
//  digitalWrite (trig, LOW);
//}
//
//void loop() {  
//  // put your main code here, to run repeatedly:
//  digitalWrite (trig, LOW);
//  delayMicroseconds(3);  // 0.003초
//  digitalWrite (trig, HIGH);
//  delayMicroseconds(12);  // 0.012초
//  digitalWrite (trig, LOW);
//
//  // https://www.arduino.cc/reference/ko/language/functions/advanced-io/pulsein/
//  duration = pulseIn(echo, HIGH);
//  distance = duration * 0.017;
//
//  Serial.println(distance);
//
//  delay(400); // 딜레이
//}

#define echoPin D7 // Echo Pin
#define trigPin D6 // Trigger Pin
 
long duration, distance; // Duration used to calculate distance
 
void setup()
{
    Serial.begin (9600);
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
}
 
void loop()
{
    /* The following trigPin/echoPin cycle is used to determine the
    distance of the nearest object by bouncing soundwaves off of it. */
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    duration = pulseIn(echoPin, HIGH);
    Serial.print("duration : ");
    Serial.println(duration);

    //Calculate the distance (in cm) based on the speed of sound.
    distance = duration/58.2;
    Serial.print("distance : ");
    Serial.println(distance);
    //Delay 50ms before next reading.
    delay(400);
}
