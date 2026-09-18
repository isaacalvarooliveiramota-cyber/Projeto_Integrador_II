
#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

// ============================================================================
// CONFIGURAÇÕES DE REDE E SERVIDOR
// ============================================================================
const char* WIFI_SSID     = "SEU_NOME_DE_REDE_WIFI";
const char* WIFI_PASSWORD = "SUA_SENHA_WIFI";
const char* SERVER_URL    = "http://seu-servidor-api.com/api/leituras"; // Endpoint HTTP
const char* SALA_ID       = "SALA_02_BLOCO_A";

// ============================================================================
// MAPEAMENTO DE PINOS (ESP32 NodeMCU)
// ============================================================================
#define DHTPIN        4     // Pino de dados do DHT22 (GPIO4)
#define DHTTYPE       DHT22 // Modelo do sensor
#define SOUND_PIN     34    // Pino analógico do Sensor de Ruído (ADC1_CH6)
#define LDR_PIN       35    // Pino analógico do Sensor de Luz (ADC1_CH7)
#define PIR_PIN       13    // Pino digital do Sensor de Presença (GPIO13)
#define LED_ALERTA    2     // LED onboard / indicador visual local (GPIO2)
#define BUZZER_PIN    12    // Buzzer indicador sonoro local (GPIO12)

// ============================================================================
// OBJETOS E VARIÁVEIS GLOBAIS
// ============================================================================
DHT dht(DHTPIN, DHTTYPE);

unsigned long lastTime = 0;
const unsigned long timerDelay = 5000; // Intervalo de leitura: 5 segundos

// ============================================================================
// SETUP
// ============================================================================
void setup() {
  Serial.begin(115200);

  // Configuração dos pinos de E/S
  pinMode(SOUND_PIN, INPUT);
  pinMode(LDR_PIN, INPUT);
  pinMode(PIR_PIN, INPUT);
  pinMode(LED_ALERTA, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  digitalWrite(LED_ALERTA, LOW);
  digitalWrite(BUZZER_PIN, LOW);

  // Inicialização do sensor DHT22
  dht.begin();

  // Conexão Wi-Fi
  Serial.print("Conectando a rede Wi-Fi: ");
  Serial.println(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWi-Fi Conectado!");
  Serial.print("Endereço IP atribuído: ");
  Serial.println(WiFi.localIP());
}

// ============================================================================
// LOOP PRINCIPAL
// ============================================================================
void loop() {
  // Executa a leitura a cada intervalo definido (não bloqueante)
  if ((millis() - lastTime) > timerDelay) {
    lastTime = millis();

    // 1. Coleta de dados dos sensores
    float temp = dht.readTemperature();
    float umid = dht.readHumidity();
    int rawSound = analogRead(SOUND_PIN);
    int rawLdr = analogRead(LDR_PIN);
    bool presenca = digitalRead(PIR_PIN);

    // Validação de leitura do DHT22
    if (isnan(temp) || isnan(umid)) {
      Serial.println("[ERRO] Falha ao ler os dados do sensor DHT22!");
      temp = 0.0;
      umid = 0.0;
    }

    // Conversão e tratamento dos sinais analógicos do ESP32 (0 a 4095)
    float ruido_db = map(rawSound, 0, 4095, 30, 90);    // Estimativa escalada para dB
    float luz_lux = map(rawLdr, 0, 4095, 1000, 0);       // Estimativa em Lux (inverso do LDR)

    // 2. Aplicação das Regras de Negócio de Alertas Locais (RN01, RN02)
    if (temp > 28.0 || ruido_db > 65.0) {
      digitalWrite(LED_ALERTA, HIGH); // Liga o LED local em estado de alerta
    } else {
      digitalWrite(LED_ALERTA, LOW);
    }

    // 3. Estruturação do Payload JSON
    String jsonPayload = "{";
    jsonPayload += "\"sala_id\":\"" + String(SALA_ID) + "\",";
    jsonPayload += "\"metricas\":{";
    jsonPayload += "\"temperatura_celsius\":" + String(temp, 1) + ",";
    jsonPayload += "\"umidade_percentual\":" + String(umid, 1) + ",";
    jsonPayload += "\"ruido_db\":" + String(ruido_db, 1) + ",";
    jsonPayload += "\"luminosidade_lux\":" + String(luz_lux, 1) + ",";
    jsonPayload += "\"presenca_detectada\":" + String(presenca ? "true" : "false");
    jsonPayload += "}}";

    Serial.println("\n--- Enviando Dados ---");
    Serial.println(jsonPayload);

    // 4. Envio dos dados via Requisição HTTP POST
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(SERVER_URL);
      http.addHeader("Content-Type", "application/json");

      int httpResponseCode = http.POST(jsonPayload);

      if (httpResponseCode > 0) {
        Serial.print("Código de resposta do servidor HTTP: ");
        Serial.println(httpResponseCode);
      } else {
        Serial.print("Erro na transmissão HTTP: ");
        Serial.println(httpResponseCode);
      }

      http.end(); // Libera os recursos de conexão
    } else {
      Serial.println("[ERRO] Conexão Wi-Fi perdida. Impossível enviar dados.");
    }
  }
}
