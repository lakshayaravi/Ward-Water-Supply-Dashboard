const int sensorPin = 32;

float previous1 = 0;
float previous2 = 0;

float totalFlow = 0;
int readingCount = 0;
float averageFlow = 0;

unsigned long previousMillis = 0;
const long interval = 2000;

void setup() {
  Serial.begin(115200);
}

void loop() {

  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {

    previousMillis = currentMillis;

    int sensorValue = analogRead(sensorPin);

    float flow = map(sensorValue, 0, 4095, 0, 1000);

    float smoothFlow = (flow + previous1 + previous2) / 3;

    previous2 = previous1;
    previous1 = flow;

    if (smoothFlow > 900) {

      Serial.println("Rejected : Out of Range");

    } else {

      totalFlow += smoothFlow;
      readingCount++;
      averageFlow = totalFlow / readingCount;

      Serial.print("Current Flow : ");
      Serial.print(smoothFlow);
      Serial.println(" Litres");

      Serial.print("Average Flow : ");
      Serial.print(averageFlow);
      Serial.println(" Litres");

      Serial.println("---------------------------");
    }
  }
}