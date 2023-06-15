class App {
    partidas = [];
    containerPartidas = document.querySelector("#lista-partidas");
    modal = document.querySelector("#modal");
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
            this.partidas.forEach((partida) => {
                const elementoPartida = this.criarElemento(
                    "li",
                    partida.titulo
                );
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
