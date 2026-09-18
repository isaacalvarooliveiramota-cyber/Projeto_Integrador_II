# 🏫 CTBJ Conforto — Monitoramento Inteligente de Conforto Ambiental Escolar

> **Projeto Integrador II — Colégio Técnico de Bom Jesus (CTBJ/UFPI)**  
> **Versão Final:** `v1.0.0`  
> **Autor:** Álvaro Isaac Mota Oliveira  

---

## 📌 Visão Geral do Sistema

O **CTBJ Conforto** é uma solução completa de Internet das Coisas (IoT) desenvolvida para monitorar, diagnosticar e mitigar quatro categorias críticas de desconforto no ambiente escolar: **Térmico**, **Auditivo**, **Visual** e **Físico/Espacial**.

O sistema utiliza um microcontrolador **ESP32** para coletar dados ambientais em tempo real, processa o **Índice de Conforto (0 a 100)** e roteia alertas automáticos diretamente para as equipes responsáveis (TI, Manutenção Predial, Direção e Professores).

---

## 📂 Estrutura do Repositório

```text
Projeto_Integrador_II/
├── README.md                 # Guia principal, instalação e visão geral
├── docs/                     # Documentação técnica e relatórios
│   ├── requisitos.md         # Requisitos funcionais, não funcionais e matriz
│   ├── arquitetura.md        # Diagramas de arquitetura, fluxogramas e payloads
│   └── testes.md             # Relatório de validação e casos de teste
└── src/                      # Código-fonte e artefatos do produto final
    ├── firmware/
    │   └── main.ino          # Código C++ para gravação no ESP32
    ├── dashboard/
    │   ├── index.html        # Interface web do painel de monitoramento
    │   ├── style.css         # Estilização responsiva e alertas visuais
    │   └── script.js         # Lógica de processamento e gráficos
    └── maquete/
        ├── ctbj_conforto.pkt # Simulação física/rede no Cisco Packet Tracer
        └── topologia_rede.png# Exportação em imagem da topologia de rede
