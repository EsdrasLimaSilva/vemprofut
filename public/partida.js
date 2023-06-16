class App {
    partida;
    elementoRaiz = document.querySelector("#root");

    constructor(partida) {
        this.partida = partida;
    }

    init() {
        this.preencherUi();

        this.elementoRaiz.addEventListener("change", (e) =>
            this.mudarStatusJogador(e.target.closest("li").id, e.target.value)
        );
    }

    async mudarStatusJogador(idJogador, novoStatus) {
        const jogador = this.partida.jogadores.find(
            (jogador) => jogador._id === idJogador
        );
        jogador.status = novoStatus;

        await fetch("/jogador", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idPartida: this.partida._id, jogador }),
        });

        this.atualizarPartida();
        this.preencherUi();
    }
    async atualizarPartida() {
        const response = await fetch(`/partida/${this.partida._id}`);
        const partida = await response.json();

        this.partida = partida;
    }

    preencherUi() {
        //titulo da partida
        const tituloElemento = this.criarElemento("h1", this.partida.titulo);
        //lista de jogadores
        const listaJogadores = this.criarElemento("ul");

        //preenchendo a lista de jogadores
        const childrenJogadores = [];
        this.partida.jogadores.forEach((jogador) => {
            const elementoJogador = this.criarElemento("li");
            elementoJogador.classList.add(jogador.status);
            elementoJogador.setAttribute("id", jogador._id);

            //criando elemento de informações
            const elementoInfo = this.criarElemento("span");
            elementoInfo.classList.add("info");
            const elementoNome = this.criarElemento("span", jogador.nome);
            const elementoTelefone = this.criarElemento(
                "span",
                jogador.telefone
            );

            elementoInfo.replaceChildren(elementoNome, elementoTelefone);

            //criando elemento de ações
            const elementoAcoes = this.criarElemento("select");
            elementoAcoes.classList.add("acoes");

            const opacaoConfirmado = this.criarElemento("option", "confirmado");
            opacaoConfirmado.setAttribute("value", "confirmado");

            const opacaoDuvida = this.criarElemento("option", "dúvida");
            opacaoDuvida.setAttribute("value", "duvida");

            const opacoDesfalque = this.criarElemento("option", "desfalque");
            opacoDesfalque.setAttribute("value", "desfalque");

            switch (jogador.status) {
                case "confirmado":
                    opacaoConfirmado.setAttribute("selected", "true");
                    break;
                case "duvida":
                    opacaoDuvida.setAttribute("selected", "true");
                    break;
                case "desfalque":
                    opacoDesfalque.setAttribute("selected", "true");
                    break;
            }

            elementoAcoes.replaceChildren(
                opacaoDuvida,
                opacaoConfirmado,
                opacoDesfalque
            );

            //prechendo o elemento jogador
            elementoJogador.replaceChildren(elementoInfo, elementoAcoes);
            childrenJogadores.push(elementoJogador);
        });

        listaJogadores.replaceChildren(...childrenJogadores);

        //preenchendo o elemento raiz
        this.elementoRaiz.replaceChildren(tituloElemento, listaJogadores);
    }

    //cria um elemento
    criarElemento(tag, content = null) {
        const element = document.createElement(tag);
        if (content) {
            const text = document.createTextNode(content);
            element.appendChild(text);
        }

        return element;
    }
}

window.addEventListener("load", async () => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const idPartida = params.get("id");

    const response = await fetch(`/partida/${idPartida}`);
    const partida = await response.json();

    const app = new App(partida);
    app.init();
});
