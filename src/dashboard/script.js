// Base de Dados Simulada (Aguardando Sensores Físicos)
const salasData = {
    "lab1": { nome: "Laboratório 1", conectado: false },
    "lab2": { nome: "Laboratório 2", conectado: false },
    "bib":  { nome: "Biblioteca",    conectado: false },
    "1a":   { nome: "Primeiro Ano A", conectado: false },
    "1b":   { nome: "Primeiro Ano B", conectado: false },
    "1c":   { nome: "Primeiro Ano C", conectado: false },
    "2a":   { nome: "Segundo Ano A", conectado: false },
    "2b":   { nome: "Segundo Ano B", conectado: false },
    "3a":   { nome: "Terceiro Ano A", conectado: false },
    "3b":   { nome: "Terceiro Ano B", conectado: false }
};

// ==========================================
// LÓGICA DA VISÃO DO ALUNO / PROFESSOR
// ==========================================
function carregarDadosSala(salaKey) {
    const dados = salasData[salaKey];
    if (!dados) return;

    const titleElem = document.getElementById("room-title");
    if (titleElem) titleElem.innerText = `Status Ambiental — ${dados.nome}`;

    const scoreElem = document.getElementById("score-index");
    const badge = document.getElementById("status-badge");

    if (!dados.conectado) {
        if (scoreElem) scoreElem.innerText = "--";
        document.getElementById("val-temp").innerText = "-- °C";
        document.getElementById("val-umid").innerText = "-- %";
        document.getElementById("val-ruido").innerText = "-- dB";
        document.getElementById("val-luz").innerText = "-- lux";
        
        document.getElementById("st-temp").innerText = "Aguardando hardware...";
        
        if(badge) {
            badge.innerText = "⚪ AGUARDANDO CONEXÃO DO ESP32";
            badge.className = "badge-status bg-wait";
        }
    }
}

// Lógica de Envio de Reporte (Salva no LocalStorage do Navegador)
function inicializarSistemaReporte() {
    const btnEnviar = document.getElementById("btn-enviar-reporte");
    if (!btnEnviar) return; // Só roda na página index.html

    btnEnviar.addEventListener("click", () => {
        const texto = document.getElementById("texto-reporte").value;
        const select = document.getElementById("select-sala");
        const salaNome = select.options[select.selectedIndex].text;

        if (texto.trim() === "") {
            alert("Por favor, descreva o problema antes de enviar.");
            return;
        }

        // Cria o objeto do reporte
        const novoReporte = {
            id: Date.now(),
            sala: salaNome,
            mensagem: texto,
            data: new Date().toLocaleString()
        };

        // Puxa relatórios antigos do navegador e adiciona o novo
        let reportsSalvos = JSON.parse(localStorage.getItem("ctbj_reports") || "[]");
        reportsSalvos.push(novoReporte);
        localStorage.setItem("ctbj_reports", JSON.stringify(reportsSalvos));

        alert("✅ Reporte enviado com sucesso! A equipe técnica foi notificada.");
        document.getElementById("texto-reporte").value = "";
    });
}

// Lógica de Autenticação (Senha para o Painel Técnico)
function inicializarAutenticacao() {
    const linkTecnico = document.getElementById("link-tecnico");
    const modalSenha = document.getElementById("modal-senha");
    const btnCancelar = document.getElementById("btn-cancelar-senha");
    const btnConfirmar = document.getElementById("btn-confirmar-senha");
    const inputSenha = document.getElementById("input-senha");
    const erroSenha = document.getElementById("erro-senha");

    if (!linkTecnico || !modalSenha) return;

    linkTecnico.addEventListener("click", (e) => {
        e.preventDefault();
        modalSenha.classList.remove("hidden");
        inputSenha.value = "";
        erroSenha.classList.add("hidden");
        inputSenha.focus();
    });

    btnCancelar.addEventListener("click", () => {
        modalSenha.classList.add("hidden");
    });

    function verificarSenha() {
        if (inputSenha.value === "alvaroisaacctbj") {
            window.location.href = "tecnico.html"; // Libera o acesso
        } else {
            erroSenha.classList.remove("hidden"); // Mostra erro
        }
    }

    btnConfirmar.addEventListener("click", verificarSenha);
    inputSenha.addEventListener("keypress", (e) => {
        if (e.key === "Enter") verificarSenha();
    });
}

// ==========================================
// LÓGICA DA VISÃO TÉCNICA (TI / MANUTENÇÃO)
// ==========================================
function carregarTabelaTecnica() {
    const tableBody = document.getElementById("tech-table-body");
    if (!tableBody) return; // Só roda na página tecnico.html

    tableBody.innerHTML = "";

    Object.keys(salasData).forEach(key => {
        const item = salasData[key];
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><strong>${item.nome}</strong></td>
            <td>-- / --</td>
            <td><strong>⚪ Offline</strong></td>
            <td>Aguardando integração ESP32</td>
            <td>
                <button class="btn-action bg-wait" onclick="alert('Comando de Reset enviado para ${item.nome}. Aguardando hardware.')">🔄 Soft Reset (Ping)</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Carrega os reports enviados pelos alunos
function carregarCaixaDeReports() {
    const listaReports = document.getElementById("lista-reports");
    const contadorChamados = document.getElementById("total-chamados");
    if (!listaReports) return;

    let reportsSalvos = JSON.parse(localStorage.getItem("ctbj_reports") || "[]");
    
    // Atualiza o contador de pendências no topo
    if (contadorChamados) contadorChamados.innerText = reportsSalvos.length;

    listaReports.innerHTML = "";

    if (reportsSalvos.length === 0) {
        listaReports.innerHTML = "<p>✅ Tudo limpo! Nenhum reporte recebido dos alunos no momento.</p>";
        return;
    }

    // Cria as caixas de notificação
    reportsSalvos.forEach(report => {
        const li = document.createElement("li");
        li.className = "report-item";
        li.innerHTML = `
            <div class="report-content">
                <div class="report-meta">📍 <strong>${report.sala}</strong> — 🕒 ${report.data}</div>
                <div>"${report.mensagem}"</div>
            </div>
            <button class="btn-resolve" onclick="resolverReporte(${report.id})">✔️ Marcar Resolvido</button>
        `;
        listaReports.appendChild(li);
    });
}

// Função Global para o botão de resolver reporte do Técnico
window.resolverReporte = function(id) {
    let reportsSalvos = JSON.parse(localStorage.getItem("ctbj_reports") || "[]");
    reportsSalvos = reportsSalvos.filter(r => r.id !== id);
    localStorage.setItem("ctbj_reports", JSON.stringify(reportsSalvos));
    carregarCaixaDeReports(); // Recarrega a lista
};


// ==========================================
// CONFIGURAÇÕES GERAIS E TEMA
// ==========================================
function inicializarTema() {
    const btnTheme = document.getElementById("btn-theme");
    if (!btnTheme) return;

    const temaSalvo = localStorage.getItem("theme");
    if (temaSalvo === "dark") {
        document.body.classList.add("dark-mode");
        btnTheme.innerText = "☀️ Modo Claro";
    }

    btnTheme.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        btnTheme.innerText = isDark ? "☀️ Modo Claro" : "🌙 Modo Escuro";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}

// Executa ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    inicializarTema();
    inicializarAutenticacao();
    inicializarSistemaReporte();
    carregarCaixaDeReports();

    // Comportamento do Seletor (Apenas na tela de Alunos)
    const selectElem = document.getElementById("select-sala");
    if (selectElem) {
        carregarDadosSala(selectElem.value);
        selectElem.addEventListener("change", (e) => {
            carregarDadosSala(e.target.value);
        });
    }

    carregarTabelaTecnica();
});
