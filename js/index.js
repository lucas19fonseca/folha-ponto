// Elementos do DOM
const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");
const btnBaterPonto = document.getElementById("btn-bater-ponto");
const dialogPonto = document.getElementById("dialog-ponto");
const btnDialogFechar = document.getElementById("btn-dialog-fechar");
const dialogData = document.getElementById("dialog-data");
const dialogHora = document.getElementById("dialog-hora");
const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");
const typeRegister = document.getElementById("tipos-ponto");
const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");

// Dados iniciais
diaSemana.textContent = getWeekDay();
diaMesAno.textContent = getCurrentDate();
printCurrentHour();

// Event Listeners
btnBaterPonto.addEventListener("click", openRegisterDialog);
btnDialogFechar.addEventListener("click", () => dialogPonto.close());
btnDialogBaterPonto.addEventListener("click", registerPonto);

// Atualiza hora a cada segundo
setInterval(printCurrentHour, 1000);

// Funções
function getWeekDay() {
    const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return days[new Date().getDay()];
}

function getCurrentDate() {
    const date = new Date();
    return date.toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function getCurrentHour() {
    return new Date().toLocaleTimeString("pt-BR", { hour12: false });
}

function printCurrentHour() {
    horaMinSeg.textContent = getCurrentHour();
}

function openRegisterDialog() {
    dialogData.textContent = `Data: ${getCurrentDate()}`;
    dialogHora.textContent = `Hora: ${getCurrentHour()}`;

    const lastRegisterText = `Último registro: ${localStorage.getItem("lastDateRegister")} - ${localStorage.getItem("lastTimeRegister")} | ${localStorage.getItem("lastTypeRegister")}`;
    document.getElementById("dialog-last-register").textContent = lastRegisterText;

    dialogPonto.showModal();
}

function registerPonto() {
    const lastTypeRegister = localStorage.getItem("lastTypeRegister");

    switch (lastTypeRegister) {
        case "entrada":
            typeRegister.value = "intervalo";
            break;
        case "intervalo":
            typeRegister.value = "volta-intervalo";
            break;
        case "volta-intervalo":
            typeRegister.value = "saida";
            break;
        default:
            typeRegister.value = "entrada";
    }

    const ponto = {
        data: getCurrentDate(),
        hora: getCurrentHour(),
        localizacao: getCurrentPosition(),
        id: 1,
        tipo: typeRegister.value
    };

    saveRegisterLocalStorage(ponto);

    localStorage.setItem("lastTypeRegister", typeRegister.value);
    localStorage.setItem("lastDateRegister", ponto.data);
    localStorage.setItem("lastTimeRegister", ponto.hora);

    dialogPonto.close();
    showAlert("Ponto registrado com sucesso!", "sucesso");
}

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            () => reject("Localização não permitida")
        );
    });
}

function saveRegisterLocalStorage(register) {
    const registers = getRegisterLocalStorage();
    registers.push(register);
    localStorage.setItem("register", JSON.stringify(registers));
}

function getRegisterLocalStorage() {
    return JSON.parse(localStorage.getItem("register")) || [];
}

function showAlert(message, type) {
    divAlertaRegistroPonto.textContent = message;
    divAlertaRegistroPonto.classList.remove("hidden");
    divAlertaRegistroPonto.classList.add(type);
    
    setTimeout(() => {
        divAlertaRegistroPonto.classList.add("hidden");
    }, 5000);
}
const uploadFoto = document.getElementById('upload-foto');
        const previewFoto = document.getElementById('preview-foto');

        uploadFoto.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();

                reader.addEventListener('load', function() {
                    previewFoto.setAttribute('src', this.result);
                    previewFoto.style.display = 'block';
                });

                reader.readAsDataURL(file);
            } else {
                previewFoto.style.display = 'none';
            }
        });
        document.getElementById("btn-dialog-bater-ponto").addEventListener("click", function() {
            window.location.href = "/folha-ponto/historico.html";
        });
        
