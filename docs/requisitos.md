# 📄 Documento de Requisitos — LifeGuard

> **Projeto:** LifeGuard — O Piloto Automático da Casa  
> **Versão:** 1.0  
> **Fase:** Etapa I — Concepção, Escopo e Requisitos

---

## 1. Escopo e Visão Geral
O **LifeGuard** é um sistema de monitoramento residencial inteligente e de baixo custo focado na prevenção de acidentes e no combate ao desperdício de recursos. O sistema coleta dados ambientais por meio de sensores e consolida as informações em um **Índice da Casa** (0 a 100), alertando os moradores sobre anomalias em tempo real.

---

## 2. Requisitos Funcionais (RF)

| ID | Descrição | Prioridade |
| :---: | :--- | :---: |
| **RF01** | O sistema deve monitorar e detectar vazamentos de água em pontos críticos da casa. | **Alta** |
| **RF02** | O sistema deve monitorar níveis de fumaça e elevação de temperatura para prevenção de incêndios. | **Alta** |
| **RF03** | O sistema deve verificar o estado (aberto ou fechado) de portas e janelas. | **Média** |
| **RF04** | O sistema deve identificar situações de desperdício de energia (ex: aparelhos ligados sem presença humana). | **Média** |
| **RF05** | O sistema deve calcular o "Índice da Casa" (pontuação de 0 a 100) dividido por categorias (Segurança, Água, Energia e Conforto). | **Alta** |
| **RF06** | O sistema deve emitir alertas sonoros/luminosos locais e atualizar o painel digital em caso de anomalia. | **Alta** |
| **RF07** | O sistema deve identificar desvios de padrão e hábitos da rotina dos moradores. | **Baixa** |

---

## 3. Requisitos Não Funcionais (RNF)

| ID | Descrição | Categoria |
| :---: | :--- | :---: |
| **RNF01** | O hardware deve ser composto por microcontroladores e sensores acessíveis de baixo custo. | Custo |
| **RNF02** | O tempo de resposta entre a leitura do sensor e o disparo do alerta no painel deve ser inferior a 3 segundos. | Desempenho |
| **RNF03** | A interface web do painel deve ser simples, intuitiva e responsiva (mobile e desktop). | Usabilidade |
| **RNF04** | O protótipo deve ser adaptado para demonstração prática em maquete física funcional. | Portabilidade |

---

## 4. Requisitos de Hardware (RH)

| ID | Componente | Função no Sistema |
| :---: | :--- | :--- |
| **RH01** | **ESP32** | Processamento central, leitura de dados e comunicação via Wi-Fi. |
| **RH02** | **Sensor de Água** | Detecção de acúmulo de líquidos e vazamentos no piso. |
| **RH03** | **Sensor de Fumaça (MQ-2)** | Detecção de gases combustíveis e fumaça. |
| **RH04** | **Sensor PIR** | Detecção de presença e movimentação nos ambientes. |
| **RH05** | **Sensor Magnético** | Identificação do estado de portas e janelas (aberto/fechado). |
| **RH06** | **Atuadores (Relé/Buzzer)** | Acionamento de alarmes sonoros e corte/controle de cargas elétricas. |

---

## 5. Regras de Negócio (RN)

* **RN01:** Se o sensor de água detectar líquido por mais de 5 segundos contínuos, o sistema deve registrar estado crítico na categoria "Água" e disparar alarme sonoro.
* **RN02:** Se um cômodo mantiver equipamentos acionados por mais de 30 minutos sem detecção de presença pelo sensor PIR, o sistema deve sinalizar alerta de desperdício de energia.
* **RN03:** O **Índice Geral da Casa** é calculado através da média ponderada dos índices das categorias Segurança (30%), Água (25%), Energia (25%) e Conforto (20%).
