# Projeto_Integrador_II
Etapa 1
# LifeGuard — O "Piloto Automático" da Casa

> **Sistema inteligente e de baixo custo para monitoramento preventivo residencial com IoT e análise de padrões.**

---

## Sobre o Projeto

O **LifeGuard** é uma solução de automação residencial e IoT desenvolvida para transformar residências comuns em casas inteligentes focadas na **prevenção de acidentes** e no **uso eficiente de recursos**.

Diferente de sistemas tradicionais que apenas ligam ou desligam dispositivos remotamente, o **LifeGuard** observa a rotina do ambiente, analisa comportamentos e identifica situações anormais antes que se tornem problemas graves.

---

## Objetivo

Desenvolver um sistema inteligente e de baixo custo capaz de monitorar uma residência, identificar situações anormais e auxiliar seus moradores na prevenção de acidentes e no desperdício de recursos.

---

## O que o LifeGuard detecta?

* 💧 **Vazamento de água:** Detecta presença de líquidos em locais indevidos (ex: cozinha, lavanderia) e envia alertas imediatos.
* 🔥 **Risco de incêndio:** Monitora variações bruscas de temperatura e presença de fumaça.
* 🚪 **Porta ou janela aberta:** Monitora o status de aberturas e avisa sobre acessos esquecidos.
* 💡 **Energia desperdiçada:** Identifica equipamentos ligados por longos períodos sem detecção de presença.
* 🌡️ **Conforto térmico:** Analisa a temperatura ambiente e sugere ações de ventilação.
* 🧍 **Presença e circulação:** Detecta ocupação no ambiente para automação de desligamento e análise de segurança.

---

## O Diferencial: "Índice da Casa"

Em vez de exibir apenas dados brutos e gráficos complexos, o LifeGuard consolida as leituras dos sensores em uma **avaliação intuitiva de 0 a 100**, permitindo que qualquer morador entenda o status da residência instantaneamente:

### Status Geral da Casa: `92/100` 🟢

| Categoria | Ícone | Pontuação | Status |
| :--- | :---: | :---: | :---: |
| **Segurança** | 🔥 | **98/100** | Excelente |
| **Água** | 💧 | **94/100** | Normal |
| **Energia** | ⚡ | **86/100** | Atenção |
| **Conforto** | 🌡️ | **91/100** | Bom |

---

## Aprendizado de Hábitos (IA + IoT)

O sistema vai além de regras simples (`se sensor > X monte alerta`). Ele é projetado para aprender a rotina dos moradores:

> **Exemplo Prático:**
> * **Rotina aprendida:** Os moradores costumam chegar em casa às 18:00.
> * **Anomalia identificada:** Às 18:30, a casa está vazia, mas a TV e as luzes continuam ligadas.
> * **Ação do LifeGuard:** ⚠️ *Alerta de comportamento incomum e sugestão de desligamento remoto.*

---

## 🛠️ Tecnologias e Componentes

### **Hardware (Sensores e Atuadores)**
* **Microcontrolador:** ESP32 (Cérebro do sistema)
* **Sensores:**
  * Sensor de Temperatura e Umidade (DHT11/DHT22)
  * Sensor de Fumaça/Gás (MQ-2)
  * Sensor de Presença (PIR)
  * Sensor de Vazamento de Água
  * Sensor Magnético de Abertura (Reed Switch)
* **Atuadores e Sinalizadores:** Módulo Relé, LEDs e Buzzer sonoro

### **Software e Interface**
* **Frontend:** HTML5, CSS3, JavaScript (Painel Web / Mobile)
* **Backend & Processamento:** Python / Java
* **Banco de Dados:** Armazenamento de histórico de leituras e eventos

---

## Demonstração Prática (Maquete MVP)

Para validação do projeto, foi desenvolvida uma maquete física interativa contendo:

1. **Simulação de Vazamento:** Água aplicada no sensor dispara alerta sonoro e notificação no painel.
2. **Simulação de Incêndio:** Elevação térmica / fumaça ativa o alarme de emergência.
3. **Simulação de Desperdício:** Iluminação ativa em cômodo sem presença registrada.
4. **Simulação de Segurança:** Abertura não planejada de portas ou janelas.

---

## Estrutura do Repositório

```text
├── docs/
│   └── requisitos.md       # Documento de Requisitos do Sistema
├── src/                    # Código-fonte (Firmware ESP32, Backend e Frontend)
└── README.md               # Apresentação do projeto
