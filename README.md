# 🏫 CTBJ Conforto — Monitoramento Inteligente de Conforto Ambiental Escolar

> **Transformar as condições dos ambientes escolares em dados inteligentes para identificar desconfortos, compreender suas causas e auxiliar a instituição na criação de ambientes melhores para a aprendizagem.**

---

## 📌 Visão Geral do Projeto

Em instituições de ensino como o **Colégio Técnico de Bom Jesus (CTBJ/UFPI)**, salas de aula e laboratórios frequentemente enfrentam problemas ambientais que afetam diretamente a concentração e a saúde dos estudantes. Tradicionalmente, a gestão só toma conhecimento dessas situações após reclamações.

O **CTBJ Conforto** transforma percepções subjetivas em **dados concretos e contínuos**. Através de nós sensores IoT com **ESP32**, o sistema mensura indicadores ambientais em tempo real, calcula o *Índice de Conforto* da sala e direciona alertas automáticos às equipes responsáveis.

* **Status do Projeto:** `Concluído (v1.0.0)`
* **Autor:** Álvaro Isaac Mota Oliveira
* **Gestão Ágil:** Quadro Kanban no Notion com Rastreabilidade GitHub

---

## 🎯 Tipos de Desconforto Monitorados

Para atender ao diagnóstico preciso da instituição, o sistema monitora quatro categorias específicas de desconforto:

* 🌡️ **Desconforto Térmico:** Calor/frio excessivo e variações drásticas de umidade relativa do ar.
* 🔊 **Desconforto Auditivo:** Poluição sonora e ruídos que atrapalham a comunicação e a atenção.
* 💡 **Desconforto Visual:** Níveis de iluminação (lux) insuficientes ou com ofuscamento na área de estudo.
* 👥 **Desconforto Físico/Espacial:** Densidade de ocupação e lotação em relação à capacidade nominal da sala.

---

## 👥 Perfis de Acesso e Matriz de Responsabilidades

| Perfil de Usuário | Atribuições no Sistema | Alertas Recebidos |
| :--- | :--- | :--- |
| **Equipe de TI / Infraestrutura** | Mantém a rede Wi-Fi, nós ESP32 e sensores ativos e calibrados. | Queda de nós IoT, falhas de envio e desconectividade. |
| **Equipe de Manutenção Predial** | Executa reparos físicos (manutenção de ar-condicionado, troca de lâmpadas). | Picos de temperatura (> 28 °C) e iluminação inadequada (< 300 lux). |
| **Gestão Pedagógica / Direção** | Avalia relatórios estratégicos e remaneja turmas/horários críticos. | Relatórios semanais e salas com *Índice de Conforto* em nível crítico. |
| **Corpo Docente (Professores)** | Visualiza o status em tempo real da sala onde está ministrando a aula. | Alerta visual local (LED em sala) em caso de ruído excessivo (> 65 dB). |

---

## 🤖 O "Índice de Conforto"

O sistema consolida as métricas dos sensores em uma avaliação de **0 a 100**, calculada por média ponderada:

$$\text{Índice} = (\text{Térmico} \times 0{,}40) + (\text{Auditivo} \times 0{,}30) + (\text{Visual} \times 0{,}20) + (\text{Físico} \times 0{,}10)$$

### Exemplo Prático: 🏫 Sala 02 (Bloco A) — `63/100` 🟡 (Atenção)

| Métrica | Ícone | Valor Lido | Fator Associado | Status |
| :--- | :---: | :---: | :---: | :---: |
| **Temperatura** | 🌡️ | **31,4 °C** | Desconforto Térmico | Crítico |
| **Umidade** | 💧 | **68%** | Desconforto Térmico | Normal |
| **Ruído** | 🔊 | **72 dB** | Desconforto Auditivo | Atenção |
| **Iluminação** | 💡 | **410 lux** | Desconforto Visual | Adequado |
| **Ocupação** | 👥 | **34 pessoas** | Desconforto Físico | Alta |

> ⚠️ **Diagnóstico:** Elevação térmica decorrente da incidência solar da tarde combinada à alta lotação. Notificação enviada à **Manutenção Predial**.

---

## 📱 Painel de Monitoramento (Dashboard Web)

```text
         🏫 CTBJ CONFORTO — PAINEL GERAL

SALAS MONITORADAS: 12
🟢 Confortáveis: 7  |  🟡 Atenção: 4  |  🔴 Críticas: 1

────────────────────────────────────────────────────────

MAIOR PROBLEMA ATUAL:
🌡️ Sala 07 — 31,8 °C (Desconforto Térmico) -> Encaminhado à Manutenção

────────────────────────────────────────────────────────

📈 EVOLUÇÃO DA TEMPERATURA (SALA 07)
08h  ████ 25°C
10h  █████ 27°C
12h  ██████ 30°C
14h  ███████ 32°C  ⚠️ Pico de desconforto
16h  █████ 28°C
