
# 🧪 Relatório de Validação e Testes — CTBJ Conforto

> **Projeto:** CTBJ Conforto — Sistema Inteligente de Monitoramento do Ambiente Escolar  
> **Versão:** 1.0  
> **Fase:** Etapa III — Execução, Validação e Entrega Final  
> **Autor:** Álvaro Isaac Mota Oliveira  

---

## 1. Escopo e Metodologia da Validação

Este documento valida o funcionamento do **CTBJ Conforto** por meio da execução de testes funcionais, de hardware, de integração de software e de regras de negócio. 

As bancadas de teste foram estruturadas combinando a leitura dos sensores no firmware do **ESP32**, a simulação da topologia de rede no **Cisco Packet Tracer** e o processamento de dados no **Dashboard Web**.

---

## 2. Matriz Geral de Casos de Teste (TC)

| ID Teste | Requisito / Regra | Cenário de Teste | Resultado Esperado | Resultado Obtido | Status |
| :---: | :---: | :--- | :--- | :--- | :---: |
| **TC01** | RF01 / RN01 | Elevação da temperatura no sensor DHT22 acima de 28 °C por > 10 min. | Disparo de alerta crítico 🔴 com notificação para a **Manutenção Predial**. | Alerta gerado com timestamp correto e direcionado à Manutenção. | **APROVADO** 🟢 |
| **TC02** | RF02 / RN02 | Captura de ruído ambiente acima de 65 dB durante o período letivo. | Ativação do indicador visual local (LED) para o **Professor** em sala. | O LED onboard/alerta acendeu imediatamente após limite ultrapassado. | **APROVADO** 🟢 |
| **TC03** | RF03 / RN03 | Iluminação abaixo de 300 lux com sala ocupada durante o dia. | Notificação enviada à **Manutenção Predial** para checagem de lâmpadas. | Evento registrado no painel apontando deficiência luminosa. | **APROVADO** 🟢 |
| **TC04** | RF04 | Ativação do sensor PIR (HC-SR501) com movimentação no ambiente. | Atualização do status de ocupação da sala para `presenca: true`. | O payload JSON refletiu com precisão o estado do sensor. | **APROVADO** 🟢 |
| **TC05** | RF05 / RN04 | Execução do cálculo do Índice de Conforto com métricas mistas. | Cálculo ponderado preciso (0 a 100) refletido no Dashboard. | Valor exato obtido conforme a fórmula matemática definida. | **APROVADO** 🟢 |
| **TC06** | RN05 / RNF04 | Desconexão proposital do Wi-Fi do nó ESP32 por mais de 15 min. | Disparo de alerta de falha de conectividade para a **Equipe de TI**. | O sistema identificou o nó *offline* e sinalizou o chamado técnico. | **APROVADO** 🟢 |
| **TC07** | RNF02 | Medição da latência de envio entre a leitura e a exibição web. | Atualização da interface em tempo inferior a 3 segundos. | Média de latência medida: **1,2 segundos**. | **APROVADO** 🟢 |

---

## 3. Detalhamento das Validações Críticas

### 📐 Validação Matemática do Índice de Conforto (RN04)

O algoritmo do sistema calcula o índice ambiental através da média ponderada das quatro categorias de desconforto:

$$\text{Índice} = (\text{Térmico} \times 0{,}40) + (\text{Auditivo} \times 0{,}30) + (\text{Visual} \times 0{,}20) + (\text{Físico} \times 0{,}10)$$

#### Teste de Mesa Executado:
* **Entradas do Teste:**
  * Sub-índice Térmico: $60{,}0$ (Temperatura em 29,5 °C)
  * Sub-índice Auditivo: $80{,}0$ (Ruído controlado em 55 dB)
  * Sub-índice Visual: $100{,}0$ (Iluminação ideal de 500 lux)
  * Sub-índice Físico: $100{,}0$ (Presença normal detectada)

* **Cálculo:**
  $$\text{Índice} = (60{,}0 \times 0{,}40) + (80{,}0 \times 0{,}30) + (100{,}0 \times 0{,}20) + (100{,}0 \times 0{,}10)$$
  $$\text{Índice} = 24{,}0 + 24{,}0 + 20{,}0 + 10{,}0 = 78{,}0$$

* **Resultado do Sistema:** O Dashboard processou a pontuação **78 / 100**, classificando o ambiente corretamente no status **ATENÇÃO (🟡)** devido ao fator térmico.

---

### 📡 Validação do Roteamento de Alertas por Perfil

Foi validada a matriz de permissões e direcionamento das notificações do sistema:

```text
[ Sensor DHT22 > 28°C ] ----> [ Backend/API ] ----> [ Notificação: Equipe de Manutenção ]
[ Sensor Ruído > 65dB ] ----> [ Hardware ESP32] ---> [ Alerta Visual: LED em Sala (Professor) ]
[ Queda de Nó ESP32 ]   ----> [ Timed Worker ] ----> [ Chamado Técnico: Equipe de TI ]
