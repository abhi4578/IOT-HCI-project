#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <SPI.h>
#include <MFRC522.h>

/* Details of wifi connectivity*/
const char* ssid = "";
const char* password = "";
short int last_state[2]={0,0};
short int present_state[2]={0,0};
/* Details from the instance created */
const char* mqttServer = "sever name";
const int mqttPort = "mention port no.";
const char* mqttUser = "username";
const char* mqttPassword = "password";
WiFiClient espClient;
PubSubClient client(espClient);

#define RST_PIN         0         // Configurable, see typical pin layout above
#define SS_1_PIN        2         // Configurable, take a unused pin, only HIGH/LOW required, must be diffrent to SS 2
#define SS_2_PIN        5          // Configurable, take a unused pin, only HIGH/LOW required, must be diffrent to SS 1

#define NR_OF_READERS   2

byte ssPins[] = {SS_1_PIN, SS_2_PIN};
byte nuidPICC[2][4];

MFRC522 mfrc522[NR_OF_READERS];   // Create MFRC522 instance.



boolean reconnect() {
  if (client.connect("ESP32Client", mqttUser, mqttPassword)) {
    // Once connected, publish an announcement...
    client.publish("hi", "I am up and running ");
client.subscribe("test"); //Receives message sent to the topic "test"
    // ... and resubscribe
    Serial.println("connected to MQTT server");
  }
  return client.connected();
}

void setup(void)
{
Serial.begin(115200);
rfid_setup();
WiFi.begin(ssid, password);
/* Connecting ESP8266 to WiFi */
while (WiFi.status() != WL_CONNECTED)
{
delay(500);
Serial.write('.');
}
Serial.println("Connected to the WiFi network");
client.setServer(mqttServer, mqttPort);
client.setCallback(callback);
/* Connecting to CloudMqtt */
while (!client.connected())
{
Serial.println("Connecting to MQTT...");
if (client.connect("ESP32Client", mqttUser, mqttPassword ))
{
Serial.println("connected");
}
else
{
Serial.print("failed with state ");
Serial.print(client.state());
delay(2000);
}
}
/* Sending message to Topic "test1" */
client.publish("node1", "I'm up and running ");
client.subscribe("test"); //Receives message sent to the topic "test"
}

void rfid_setup() {

  while (!Serial);    // Do nothing if no serial port is opened (added for Arduinos based on ATMEGA32U4)

  SPI.begin();        // Init SPI bus

  for (uint8_t reader = 0; reader < NR_OF_READERS; reader++) {
    mfrc522[reader].PCD_Init(ssPins[reader], RST_PIN); // Init each MFRC522 card
    Serial.print(F("Reader "));
    Serial.print(reader);
    Serial.print(F(": "));
    mfrc522[reader].PCD_DumpVersionToSerial();
  }
}
/* This function is used to print the incoming data sent to the topic "test" */
void callback(char* topic, byte* payload, unsigned int length)
{
uint8_t s;
Serial.print("Message arrived in topic: ");
Serial.println(topic);
Serial.print("Message:");
for (int i = 0; i < length; i++)
{
s= payload[i];
Serial.write(s);
}
}

long lastReconnectAttempt = 0;

void loop(void)
{ rfid_loop();
 if (!client.connected()) {
  Serial.println("Connecting to MQTT...");
    long now = millis();
    if (now - lastReconnectAttempt > 5000) {
      lastReconnectAttempt = now;
      // Attempt to reconnect
      if (reconnect()) {
        lastReconnectAttempt = 0;
      }
    }
  }
  else {
client.loop();
  }
}


void rfid_loop() {

 
    // Client connected

  

  
  
  for (uint8_t reader = 0; reader < NR_OF_READERS; reader++) {
    // Look for new cards
    
    if (mfrc522[reader].PICC_IsNewCardPresent() && mfrc522[reader].PICC_ReadCardSerial()) {
      present_state[reader]=1;
      Serial.print(F("Reader "));
      Serial.println(reader);
    
      // Show some details of the PICC (that is: the tag/card)
      
//      if (mfrc522[reader].uid.uidByte[0] != nuidPICC[reader][0] || 
//      mfrc522[reader].uid.uidByte[1] != nuidPICC[reader][1] || 
//      mfrc522[reader].uid.uidByte[2] != nuidPICC[reader][2] || 
//      mfrc522[reader].uid.uidByte[3] != nuidPICC[reader][3] ) {
//      Serial.println(F("A new card has been detected."));
  
//      // Store NUID into nuidPICC array
//      for (byte i = 0; i < 4; i++) {
//        nuidPICC[reader][i] = mfrc522[reader].uid.uidByte[i];
//      }
     
      Serial.println(F("The NUID tag is:"));
      
      Serial.print(F("In dec: "));
      printDec(mfrc522[reader].uid.uidByte, mfrc522[reader].uid.size,reader);
      Serial.println();
      Serial.println();
      Serial.print(F("PICC type: "));
      MFRC522::PICC_Type piccType = mfrc522[reader].PICC_GetType(mfrc522[reader].uid.sak);
      Serial.println(mfrc522[reader].PICC_GetTypeName(piccType));

    
//    else 
//    Serial.println(F("Card read previously."));
      
      
      // Halt PICC
//      mfrc522[reader].PICC_HaltA();
//      // Stop encryption on PCD
//      mfrc522[reader].PCD_StopCrypto1();
    }
    else
      {Serial.println("N"); 
       
       present_state[reader]=0;
      }
     if (last_state[reader]==0 && present_state[reader]==0)
    { String read_=String(reader);
      char* k=(char*)malloc(read_.length());
       for(unsigned int i=0;i<read_.length();i++)
        k[i]=read_[i];
       
      Serial.println("card not present");
      client.publish(k,"0");
      free(k);
    }
    last_state[reader]=present_state[reader];
  delay(500);
  }
    
  }
    
   


void printDec(byte *buffer, byte bufferSize,uint8_t reader) {
String content="";
String read_=String(reader);
    for (byte i = 0; i < bufferSize; i++) 
  {
     content.concat(String(buffer[i], DEC));
  }
  
  
  char* channels=(char*)malloc(read_.length());
  char * payload=(char*)malloc(content.length());
  for(unsigned int i=0;i<content.length();i++)
   payload[i]=content[i];
  
  for(unsigned int i=0;i<read_.length();i++)
    channels[i]=read_[i];
  Serial.println(payload);
  client.publish(channels,payload);
  free(payload);
  free(channels);
}
