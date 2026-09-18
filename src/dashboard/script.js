
// Dados simulados da telemetria IoT do CTBJ
const dadosSensores = {
    sala: "Sala 02 (Bloco A)",
    temp: 31.4,      // RN01: Crítico (> 28°C)
    umid: 55.0,
    ruido: 72.0,     // RN02: Atenção (> 65dB)
    luz: 450.0,
    presenca: true
};

// Algoritmo de cálculo do Índice de Conforto (RN04)
function calcularIndiceConforto(t, r, l, p) {
    let subT = t > 28 ? 40 : 100;
    let subA = r > 65 ? 50 : 100;
    let subV = l < 300 ? 50 : 100;
    let subF = p ? 80 : 100;

    let indice = (subT * 0.40) + (subA * 0.30) + (subV * 0.20) + (subF * 0.10);
    return Math.round(indice);
}

// Atualização da Visão Pública (Alunos/Professores)
function atualizarPaginaAlunos() {
    const scoreElem = document.getElementById("score-index");
    if (!scoreElem) return; // Se não estiver na página do aluno, encerra

    const score = calcularIndiceConforto(dadosSensores.temp, dadosSensores.ruido, dadosSensores.luz, dadosSensores.presenca);
    scoreElem.innerText = score;

    document.getElementById("val-temp").innerText = `${dadosSensores.temp} °C`;
    document.getElementById("val-umid").innerText = `${dadosSensores.umid} %`;
    document.getElementById("val-ruido").innerText = `${dadosSensores.ruido} dB`;
    document.getElementById("val-luz").innerText = `${dadosSensores.luz} lux`;

    const badge = document.getElementById("status-badge");
    const orientacao = document.getElementById("orientacao-aula");

    if (score >= 80) {
        badge.innerText = "🟢 AMBIENTE CONFORTÁVEL";
        badge.className = "badge-status bg-ok";
        orientacao.innerText = "Condições ideais para aula e concentração.";
    } else if (score >= 60) {
        badge.innerText = "🟡 ATENÇÃO — ELEVAÇÃO TÉRMICA E RUÍDO";
        badge.className = "badge-status bg-warn";
        orientacao.innerText = "Recomendação: Manter portas/janelas abertas e ligar ventiladores de apoio.";
    } else {
        badge.innerText = "🔴 AMBIENTE CRÍTICO";
        badge.className = "badge-status bg-danger";
        orientacao.innerText = "Solicitada intervenção da Manutenção Predial.";
    }
}

// Atualização da Visão Técnica (TI/Manutenção)
function atualizarPaginaTecnica() {
    const tableBody = document.getElementById("tech-table-body");
    if (!tableBody) return; // Se não estiver na página do técnico, encerra

    const nos = [
        { sala: "Sala 02 (Bloco A)", ip: "192.168.1.102", rssi: "-58 dBm", temp: "31.4 °C", umid: "55%", ruido: "72 dB", luz: "450 lux", st: "🟡 Alerta", acao: "Atender Manutenção (Ar-Cond.)" },
        { sala: "Lab. Informática 01", ip: "192.168.1.105", rssi: "-62 dBm", temp: "22.1 °C", umid: "60%", ruido: "45 dB", luz: "520 lux", st: "🟢 OK", acao: "Nenhuma" },
        { sala: "Sala 07 (Bloco B)", ip: "192.168.1.110", rssi: "OFFLINE", temp: "--", umid: "--", ruido: "--", luz: "--", st: "🔴 Falha (RN05)", acao: "Verificar Nó ESP32 (TI)" }
    ];

    tableBody.innerHTML = "";
    nos.forEach(no => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${no.sala}</strong></td>
            <td>${no.ip} <br><small>${no.rssi}</small></td>
            <td>${no.temp} / ${no.umid}</td>
            <td>${no.ruido} / ${no.luz}</td>
            <td><strong>${no.st}</strong></td>
            <td><button class="btn-action" onclick="alert('Chamado registrado para: ${no.sala}')">${no.acao}</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Execução ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    atualizarPaginaAlunos();
    atualizarPaginaTecnica();
});
