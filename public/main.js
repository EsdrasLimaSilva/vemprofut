class App {
    partidas = [];
    idPartidaAlvo = "";
    containerPartidas = document.querySelector("#lista-partidas");
    criarPartidasForm = document.querySelector("#criar-partida-form");
    // elementos do modal
    modal = document.querySelector("#modal");
    mostraModalBtn = document.querySelector("#mostrar-modal-btn");
    fecharModalBtn = document.querySelector("#fechar-modal-btn");
    //elementos do modal de exclusão
    modalExclusao = document.querySelector("#modal-remover");
    confirmarExclusaoBtn = document.querySelector("#confirmar-exclusao-btn");
    cancelarExclusaoBtn = document.querySelector("#cancelar-exclusao-btn");

    constructor(partidas) {
        this.partidas = partidas;
    }

    init() {
        this.atualizarUI();

        //adiciona o evento de abrir o modal
        this.mostraModalBtn.addEventListener(
            "click",
            this.mostrarModal.bind(this)
        );

        //adiciona o evento de fechar o modal
        this.fecharModalBtn.addEventListener(
            "click",
            this.esconderModal.bind(this)
        );

        //adiciona o evento de excluir partida
        this.confirmarExclusaoBtn.addEventListener(
            "click",
            this.removerPartida.bind(this)
        );

        //adiciona o evento de cancelar a exclusão da partida
        this.cancelarExclusaoBtn.addEventListener(
            "click",
            this.esconderModalExclusao.bind(this)
        );

        //adiciona o evento de criação (envio do formulário) de criar partidas
        this.criarPartidasForm.addEventListener(
            "submit",
            this.criarPartida.bind(this)
        );

        //adiciona tanto o evento de editar quanto o de abrir o modal de exclusão
        this.containerPartidas.addEventListener("click", (e) => {
            const li = e.target.closest("li");
            const button = e.target.closest("button");

            if (button) {
                this.mostrarModalExclusao();
                this.idPartidaAlvo = li.id;
            } else if (li) {
                window.location.replace(`/partida.html?id=${li.id}`);
            }
        });
    }

    async criarPartida(e) {
        e.preventDefault();

        const [tituloInput, dataInput, horaInput, enderecoInput] = e.target;

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
            local: enderecoInput.value,
            jogadores: [],
        };

        const response = await fetch("/partidas", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(partida),
        });
        const partidas = await response.json();

        await this.atualizarPartidas(partidas);
        this.esconderModal();

        //resetando valores
        tituloInput.value =
            dataInput.value =
            horaInput.value =
            enderecoInput.value =
                "";
    }

    async removerPartida() {
        const response = await fetch(`/partidas?id=${this.idPartidaAlvo}`, {
            method: "DELETE",
        });
        const partidas = await response.json();

        this.partidas = partidas;

        await this.atualizarPartidas(partidas);
        this.esconderModalExclusao();
    }

    // Mostra o modal de criação para o usário
    mostrarModal() {
        this.modal.classList.remove("hidden");
    }

    //esconde o modal de criação ao usuário clicar em "cancelar"
    esconderModal() {
        this.modal.classList.add("hidden");
    }

    mostrarModalExclusao() {
        this.modalExclusao.classList.remove("hidden");
    }

    esconderModalExclusao() {
        this.modalExclusao.classList.add("hidden");
    }

    //atualiza a interface (lista) com as partidas atualizadas
    atualizarUI() {
        if (this.partidas) {
            const children = [];

            //criando um elemento para cada partida
            this.partidas.forEach((partida) => {
                const elementoPartida = this.criarElemento(
                    "li",
                    partida.titulo
                );
                elementoPartida.setAttribute("id", partida._id);

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

    async atualizarPartidas(partidas) {
        this.partidas = partidas;
        this.atualizarUI();
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
