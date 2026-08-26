# 🏛️ Documento de Arquitetura e Modelagem — CTBJ Conforto

> **Projeto:** CTBJ Conforto — Sistema Inteligente de Monitoramento do Ambiente Escolar  
> **Versão:** 1.0  
> **Fase:** Etapa II — Planejamento Operacional e Arquitetura da Solução  
> **Autor:** Álvaro Isaac Mota Oliveira

---

## 1. Visão Geral da Arquitetura

O **CTBJ Conforto** adota uma arquitetura em camadas baseada em IoT (Internet das Coisas). Os dados são coletados nos ambientes escolares por sensores conectados ao microcontrolador **ESP32**, transmitidos via protocolo HTTP/REST para um servidor backend em **Python**, e exibidos no **Dashboard Web**.

```mermaid
graph TD
    subgraph Camada de Hardware - Sala de Aula CTBJ
        S1[Sensor DHT22 - Temp/Umidade] -->|Digital| ESP[ESP32 - Processador Central]
        S2[Módulo Som - Ruído dB] -->|Analógico| ESP
        S3[Sensor LDR/BH1750 - Luz Lux] -->|Analógico/I2C| ESP
        S4[Sensor PIR - Presença] -->|Digital| ESP
    end

    subgraph Camada de Processamento & Regras
        ESP -->|Wi-Fi / JSON HTTP| API[Backend Python / API REST]
        API -->|Gravação de Leituras| DB[(Banco de Dados)]
        API -->|Cálculo do Índice| ENGINE[Engine de Regras de Negócio]
    end

    subgraph Camada de Apresentação
        API -->|JSON Response| DASH[Dashboard Web - HTML/CSS/JS]
        DASH -->|Exibição dos Indicadores| GESTOR[Painel da Gestão Escolar]
    end
