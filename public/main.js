class App {
    partidas = [];
    containerPartidas = document.querySelector("#lista-partidas");
    modal = document.querySelector("#modal");
    criarPartidasForm = document.querySelector("#criar-partida-form");
    mostraModalBtn = document.querySelector("#mostrar-modal-btn");
    fecharModalBtn = document.querySelector("#fechar-modal-btn");

    constructor(partidas) {
        this.partidas = partidas;
    }

    init() {
        this.atualizarPartidas();

        this.mostraModalBtn.addEventListener(
            "click",
            this.mostrarModal.bind(this)
        );

        this.fecharModalBtn.addEventListener(
            "click",
            this.esconderModal.bind(this)
        );

        this.criarPartidasForm.addEventListener(
            "submit",
            this.criarPartida.bind(this)
        );
    }

    async criarPartida(e) {
        e.preventDefault();

        const [tituloInput, dataInput, horaInput] = e.target;

        const dataSplit = dataInput.value.split("-");
        const horaSplit = horaInput.value.split(":");

        const partida = {
            _id: Math.round(Math.random() * 999999),
            titulo: tituloInput.value,
            data: {
                dia: dataSplit[2],
                mes: dataSplit[1],
                ano: dataSplit[0],
            },
            horario: {
                horas: horaSplit[0],
                minutos: horaSplit[1],
            },
            jogadores: [],
        };

        const response = await fetch("/partidas", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(partida),
        });
        const data = await response.json();
        console.log(data);
    }

    // Mostra o modal de criação para o usário
    mostrarModal() {
        this.modal.classList.remove("hidden");
    }

    //esconde o modal de criação ao usuário clicar em "cancelar"
    esconderModal() {
        this.modal.classList.add("hidden");
    }

    //atualiza a interface (lista) com as partidas atualizadas
    atualizarPartidas() {
        if (this.partidas) {
            const children = [];

            //criando um elemento para cada partida
            this.partidas.forEach((partida) => {
                const elementoPartida = this.criarElemento(
                    "li",
                    partida.titulo
                );

                const spanBotoes = document.createElement("span");

                const botaoExcluir = this.criarElemento("button", "remover");
                botaoExcluir.setAttribute("type", "button");
                botaoExcluir.classList.add("remover");

                spanBotoes.replaceChildren(botaoExcluir);
                elementoPartida.appendChild(spanBotoes);

                children.push(elementoPartida);
            });

            this.containerPartidas.replaceChildren(...children);
        } else {
            const vazio = this.criarElemento(
                "li",
                "Lista vazia. Adicione alguma partida!"
            );
            this.containerPartidas.replaceChildren(vazio);
        }
    }

    //cria um elemento
    criarElemento(tag, content) {
        const element = document.createElement(tag);
        const text = document.createTextNode(content);
        element.appendChild(text);

        return element;
    }
}

window.addEventListener("load", async () => {
    const response = await fetch("/partidas");
    const partidas = await response.json();
    const app = new App(partidas);
    app.init();
});
