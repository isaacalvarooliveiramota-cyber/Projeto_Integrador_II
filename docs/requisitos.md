# 📄 Documento de Requisitos — CTBJ Conforto

> **Projeto:** CTBJ Conforto — Sistema Inteligente de Monitoramento do Ambiente Escolar  
> **Versão:** 1.0  
> **Fase:** Etapa I — Concepção, Escopo e Requisitos

---

## 1. Escopo e Visão Geral
O **CTBJ Conforto** é um sistema de monitoramento ambiental inteligente e de baixo custo projetado para coletar e analisar variáveis físicas (temperatura, umidade, ruído, luminosidade e ocupação) em salas de aula e laboratórios do Colégio Técnico de Bom Jesus (CTBJ). O sistema consolida as leituras em um **Índice de Conforto da Sala** (0 a 100), mapeando pontos de desconforto em tempo real e fornecendo diagnósticos para apoio à decisão da gestão escolar.

---

## 2. Requisitos Funcionais (RF)

| ID | Descrição | Prioridade |
| :---: | :--- | :---: |
| **RF01** | O sistema deve monitorar e registrar continuamente a temperatura e umidade relativa do ar. | **Alta** |
| **RF02** | O sistema deve medir o nível de ruído sonoro em decibéis (dB) no ambiente escolar. | **Alta** |
| **RF03** | O sistema deve medir a intensidade de iluminação (lux) presente na sala de aula. | **Média** |
| **RF04** | O sistema deve registrar a estimativa de presença e movimentação para cálculo de ocupação. | **Média** |
| **RF05** | O sistema deve calcular o "Índice de Conforto da Sala" (pontuação de 0 a 100) com base nas métricas ambientais. | **Alta** |
| **RF06** | O sistema deve exibir em painel digital o status geral das salas (🟢 Confortável, 🟡 Atenção, 🔴 Crítico) e alertas. | **Alta** |
| **RF07** | O sistema deve identificar padrões temporais de desconforto (ex: picos térmicos em horários específicos). | **Média** |
| **RF08** | O sistema deve gerar recomendações automáticas de ações corretivas com base no histórico de dados. | **Baixa** |

---

## 3. Requisitos Não Funcionais (RNF)

| ID | Descrição | Categoria |
| :---: | :--- | :---: |
| **RNF01** | O hardware deve ser composto por microcontroladores e sensores acessíveis de baixo custo. | Custo |
| **RNF02** | O tempo de resposta entre a leitura dos sensores e a atualização no painel digital deve ser inferior a 5 segundos. | Desempenho |
| **RNF03** | A interface web do painel deve ser simples, intuitiva e responsiva (mobile e desktop). | Usabilidade |
| **RNF04** | O protótipo deve ser adaptado para demonstração em maquete física funcional de uma sala do CTBJ. | Portabilidade |

---

## 4. Requisitos de Hardware (RH)

| ID | Componente | Função no Sistema |
| :---: | :--- | :--- |
| **RH01** | **ESP32** | Processamento central, leitura de dados e comunicação via Wi-Fi. |
| **RH02** | **Sensor de Temp./Umidade (DHT22)** | Medição da temperatura e umidade relativa do ar. |
| **RH03** | **Sensor de Som (Módulo Microfone)** | Medição do nível de ruído sonoro (dB) no ambiente. |
| **RH04** | **Sensor de Iluminação (LDR / BH1750)** | Medição da intensidade luminosa (lux) na sala. |
| **RH05** | **Sensor PIR** | Detecção de presença e movimentação nos ambientes. |
| **RH06** | **Sinalizadores (LEDs / Buzzer)** | Sinalização visual e sonora de alertas locais na maquete. |

---

## 5. Regras de Negócio (RN)

* **RN01:** Se a temperatura ambiente ultrapassar 30 °C ou o nível de ruído exceder 70 dB, o sistema deve alterar o status da sala para estado de **Atenção** (🟡) ou **Crítico** (🔴) e registrar a ocorrência.
* **RN02:** O **Índice Geral de Conforto** da sala é calculado através da média ponderada dos fatores: Temperatura e Umidade (40%), Ruído (30%), Iluminação (20%) e Ocupação (10%).
* **RN03:** A identificação de um padrão de desconforto ocorre quando uma mesma métrica ultrapassa o limite tolerável por mais de 3 dias seguidos no mesmo intervalo de horário.
