# Projeto_Integrador_II
Etapa 1
# 🏫 CTBJ Conforto — Sistema Inteligente de Monitoramento do Ambiente Escolar

> **Transformar as condições dos ambientes escolares em dados inteligentes para identificar desconfortos, compreender suas causas e auxiliar a instituição na criação de ambientes melhores para a aprendizagem.**

---

## 📌 Sobre o Projeto

Em instituições de ensino como o **CTBJ**, salas de aula e laboratórios frequentemente enfrentam problemas ambientais como calor excessivo, pouca ventilação, iluminação inadequada, ruído elevado e desconforto térmico em horários específicos.

Tradicionalmente, a gestão só toma conhecimento dessas situações após reclamações dos alunos ou professores. O **CTBJ Conforto** surge para mudar esse paradigma: transformamos percepções subjetivas em **dados concretos e contínuos**, permitindo identificar o que está prejudicando o aprendizado, em quais horários e por quais motivos.

---

## 🎯 Objetivo

Desenvolver um sistema inteligente de monitoramento ambiental de baixo custo para mapear as condições de conforto das salas de aula do CTBJ, diagnosticar as causas de desconforto e fornecer dados estratégicos para apoio à tomada de decisão da gestão escolar.

---

## 🔍 O que o CTBJ Conforto monitora?

* 🌡️ **Temperatura:** Identifica calor ou frio excessivo e horários críticos de pico térmico nas salas.
* 💧 **Umidade do Ar:** Monitora a qualidade e umidade do ar para garantir um ambiente saudável.
* 🔊 **Nível de Ruído:** Mede a poluição sonora (em dB) durante as aulas e atividades práticas.
* 💡 **Luminosidade:** Avalia se o nível de iluminação (em lux) está adequado para a leitura e estudo.
* 👥 **Ocupação do Ambiente:** Estima a quantidade de pessoas no local para correlacionar com a lotação e sensação térmica.

---

## 🤖 O Diferencial: "Índice de Conforto"

Em vez de exibir apenas dados brutos e gráficos complexos, o CTBJ Conforto consolida as leituras dos sensores em uma **avaliação intuitiva de 0 a 100**, permitindo diagnosticar a situação de cada sala instantaneamente:

### 🏫 Sala 02 (Bloco A): `63/100` 🟡

| Métrica | Ícone | Valor Lido | Status |
| :--- | :---: | :---: | :---: |
| **Temperatura** | 🌡️ | **31,4 °C** | Crítico |
| **Umidade** | 💧 | **68%** | Normal |
| **Ruído** | 🔊 | **72 dB** | Atenção |
| **Iluminação** | 💡 | **410 lux** | Adequado |
| **Ocupação** | 👥 | **34 pessoas** | Alta |

> ⚠️ **Principal Problema Identificado:** Temperatura elevada acima da média tolerada.

---

## 🧠 Análise de Padrões e Recomendações (IA + IoT)

O sistema analisa o histórico de dados para identificar problemas recorrentes e gerar recomendações automáticas para a gestão da escola:

> **Exemplo Prático:**
> * **Padrão Detectado:** A Sala 02 apresenta temperatura elevada de forma recorrente entre 13h e 15h.
> * **Diagnóstico:** Desconforto térmico no período da tarde decorrente de incidência solar direta e alta ocupação.
> * **Ação Sugerida:** 💡 *Melhorar a ventilação natural, verificar ventiladores/ar-condicionado ou remanejar turmas para outro ambiente nesse intervalo.*

---

## 📱 Painel de Monitoramento (Dashboard)

```text
         🏫 CTBJ CONFORTO

SALAS MONITORADAS: 12
🟢 Confortáveis: 7  |  🟡 Atenção: 4  |  🔴 Críticas: 1

────────────────────────────────────────────────────────

MAIOR PROBLEMA ATUAL:
🌡️ Sala 07 — 31,8 °C (Temperatura Crítica)

────────────────────────────────────────────────────────

📈 EVOLUÇÃO DA TEMPERATURA (SALA 07)
08h  ████ 25°C
10h  █████ 27°C
12h  ██████ 30°C
14h  ███████ 32°C  ⚠️ Pico de desconforto
16h  █████ 28°C
