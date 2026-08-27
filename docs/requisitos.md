# 📄 Documento de Requisitos — CTBJ Conforto

> **Projeto:** CTBJ Conforto — Sistema Inteligente de Monitoramento do Ambiente Escolar  
> **Versão:** 2.0 (Revisada — Segmentação de Desconfortos e Matriz de Responsabilidades)  
> **Fase:** Etapa I — Concepção, Escopo e Requisitos

---

## 1. Escopo, Tipos de Desconforto e Segmentação Escolar

O **CTBJ Conforto** é uma plataforma IoT desenvolvida para monitorar, diagnosticar e mitigar **quatro categorias específicas de desconforto** no ambiente escolar do Colégio Técnico de Bom Jesus (CTBJ), abrangendo salas de aula, laboratórios e auditórios.

### 👥 Perfis de Acesso e Responsabilidades Operacionais

| Perfil de Usuário | Atribuições no Sistema | Tipo de Alerta Recebido |
| :--- | :--- | :--- |
| **Equipe de TI / Infraestrutura** | Mantém a rede Wi-Fi, nós ESP32 e sensores ativos, operacionais e calibrados. | Falha de conectividade, queda de nós IoT e alimentação. |
| **Equipe de Manutenção Predial** | Executa reparos físicos imediatos (manutenção de ar-condicionado, troca de lâmpadas). | Picos de calor, falhas térmicas e níveis inadequados de iluminação. |
| **Gestão Pedagógica e Direção** | Avalia relatórios semanais para tomada de decisão estratégica (remanejamento de turmas/horários). | Relatórios de desconforto recorrente e médias do *Índice de Conforto*. |
| **Corpo Docente (Professores)** | Visualiza o status em tempo real da sala em que está ministrando a aula. | Alertas visuais locais em caso de ruído excessivo ou calor elevado. |

---

### 🎯 Tipos de Desconforto Monitorados

* 🌡️ **Desconforto Térmico:** Calor ou frio excessivo e variações drásticas de umidade que impactam diretamente a concentração dos alunos.
* 🔊 **Desconforto Auditivo (Acústico):** Poluição sonora e ruídos que prejudicam a comunicação entre professor e turma.
* 💡 **Desconforto Visual (Luminoso):** Iluminação insuficiente ou excessiva nas bancadas e quadros de aula.
* 👥 **Desconforto Físico/Espacial:** Superlotação e alta densidade de ocupação em relação à capacidade nominal do ambiente.

---

## 2. Requisitos Funcionais (RF)

| ID | Descrição Detalhada | Fator de Desconforto | Responsável Principal | Prioridade |
| :---: | :--- | :---: | :---: | :---: |
| **RF01** | O sistema deve coletar continuamente a temperatura (°C) e a umidade relativa do ar (%). | Térmico | Manutenção Predial | **Alta** |
| **RF02** | O sistema deve capturar e mensurar a intensidade de ruído ambiente em decibéis (dB). | Auditivo | Corpo Docente | **Alta** |
| **RF03** | O sistema deve medir o nível de iluminamento (lux) focado na superfície de estudo. | Visual | Manutenção Predial | **Média** |
| **RF04** | O sistema deve estimar a presença e densidade ocupacional no ambiente. | Físico/Espacial | Gestão Pedagógica | **Média** |
| **RF05** | O sistema deve calcular o *Índice da Sala* (0 a 100), segmentado por tipo de desconforto. | Todos | Gestão Pedagógica | **Alta** |
| **RF06** | O sistema deve rotear notificações diretas para os responsáveis conforme a categoria do alerta. | Operacional | TI / Manutenção | **Alta** |
| **RF07** | O sistema deve disponibilizar painel filtrável por bloco, tipo de sala e turno letivo. | Visibilidade | Gestão Pedagógica | **Alta** |
| **RF08** | O sistema deve mapear padrões recorrentes (ex: picos térmicos diários das 13h às 15h). | Analítico | Direção | **Baixa** |

---

## 3. Requisitos Não Funcionais (RNF)

| ID | Descrição Detalhada | Categoria | Métrica / Critério de Aceitação |
| :---: | :--- | :---: | :--- |
| **RNF01** | Baixo custo operacional dos nós coletores de dados. | Custo | Custo por sala inferior a R$ 150,00 em hardware. |
| **RNF02** | Latência de atualização do Dashboard Web. | Desempenho | Menor que 3 segundos entre sensor e tela. |
| **RNF03** | Interface web acessível e responsiva. | Usabilidade | Compatível com telas mobile (smartphones) e desktop. |
| **RNF04** | Operação contínua da infraestrutura de dados. | Confiabilidade | Uptime mínimo de 98% dos nós sensores durante o período letivo. |

---

## 4. Requisitos de Hardware (RH)

| ID | Componente | Função no Sistema | Fator Associado |
| :---: | :--- | :--- | :---: |
| **RH01** | **ESP32 NodeMCU** | Unidade central de processamento e envio Wi-Fi. | Infraestrutura |
| **RH02** | **DHT22** | Sensor de temperatura e umidade de alta precisão. | Desconforto Térmico |
| **RH03** | **Módulo Som (MAX4466)** | Medição do nível de ruído acústico em dB. | Desconforto Auditivo |
| **RH04** | **BH1750 / LDR** | Sensor digital de luminosidade ambiente (lux). | Desconforto Visual |
| **RH05** | **HC-SR501 (PIR)** | Detecção de movimentação e estimativa de ocupação. | Desconforto Físico |
| **RH06** | **LEDs/Buzzer Local** | Alarme visual/sonoro imediato na sala monitorada. | Operacional |

---

## 5. Regras de Negócio e Protocolos de Acionamento (RN)

* **RN01 (Desconforto Térmico):** Se a temperatura ultrapassar 28 °C ou a umidade for menor que 30% por mais de 10 minutos contínuos, o sistema dispara um alerta crítico 🔴 para a **Equipe de Manutenção Predial**.
* **RN02 (Desconforto Auditivo):** Se o nível de som exceder 65 dB durante o horário de aula por mais de 5 minutos, o alarme visual local pisca em amarelo 🟡 para alertar o **Professor**.
* **RN03 (Desconforto Visual):** Se a iluminação for inferior a 300 lux durante turnos diurnos ou noturnos com presença detectada, o sistema notifica a **Manutenção Predial** para verificar a iluminação artificial.
* **RN04 (Composição do Índice Geral):** O Índice de Conforto (0 a 100) é calculatedo pela média ponderada dos fatores:
  $$\text{Índice} = (\text{Térmico} \times 0{,}40) + (\text{Auditivo} \times 0{,}30) + (\text{Visual} \times 0{,}20) + (\text{Físico} \times 0{,}10)$$
* **RN05 (Protocolo de Falha de Hardware):** Se um nó ESP32 parar de enviar dados por mais de 15 minutos, o sistema gera um chamado automático para a **Equipe de TI/Infraestrutura**.
