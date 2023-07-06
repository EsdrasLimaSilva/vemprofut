class App {
    partida;
    idJogadorAlvo = "";
    elementoRaiz = document.querySelector("#root");
    modalCriacao = document.querySelector("#modal-criacao");
    novoJogadorForm = document.querySelector("form");
    cancelarModalCriacaoBtn = document.querySelector(
        "#cancelar-modal-criacao-btn"
    );
    adicionarJogadorBtn = document.querySelector("#adicionar-jogador-btn");
    modalConfirmacao = document.querySelector("#modal-confirmacao");
    confirmarExclusaoBtn = document.querySelector("#confirmar-btn");
    cancelarConfirmacaoBtn = document.querySelector(
        "#cancelar-confirmacao-btn"
    );

    constructor(partida) {
        this.partida = partida;
    }

    //inicia a aplicação
    init() {
        //atualiza a UI com as partidas (passadas na construção da classe)
        this.preencherUi();

        //adiciona o listencer de mudar o status do jogador
        this.elementoRaiz.addEventListener("change", (e) =>
            this.mudarStatusJogador(e.target.closest("li").id, e.target.value)
        );

        //adiciona o listencer de remover jogador (via event delegation)
        this.elementoRaiz.addEventListener("click", (e) => {
            const removerBtn = e.target.closest("button");

            if (
                removerBtn &&
                removerBtn.classList.contains("remover-jogador-btn")
            ) {
                this.idJogadorAlvo = e.target.closest("li").id;
                this.mostrarModal(this.modalConfirmacao);
            }
        });

        //adiciona o listencer de adicionar um novo jogador
        this.novoJogadorForm.addEventListener(
            "submit",
            this.criarNovoJogador.bind(this)
        );

        //adiciona o listencer de mostrar o form de adicionar jogador
        this.adicionarJogadorBtn.addEventListener("click", () => {
            this.mostrarModal(this.modalCriacao);
        });

        //adiciona o listencer de esconder o formulário
        this.cancelarModalCriacaoBtn.addEventListener("click", () => {
            this.esconderModal(this.modalCriacao);
        });

        //adiciona o listencer de remover jogador
        this.confirmarExclusaoBtn.addEventListener("click", () =>
            this.excluirJogador()
        );

        //adiciona o listencer de cancelar exclusão
        this.cancelarConfirmacaoBtn.addEventListener("click", () => {
            this.esconderModal(this.modalConfirmacao);
        });
    }

    //mostra um modal genérico
    mostrarModal(modal) {
        modal.classList.remove("hidden");
        modal.classList.remove("hidden");
    }

    //esconde um modal genérico
    esconderModal(modal) {
        modal.classList.add("hidden");
        modal.classList.add("hidden");
    }

    //muda o status do jogador
    async mudarStatusJogador(idJogador, novoStatus) {
        //encontrando o jogador dentro da partida
        const jogador = this.partida.jogadores.find(
            (jogador) => jogador._id === idJogador
        );

        //atualizando o status do jogador
        jogador.status = novoStatus;

        //fazendo a requisção de atualização com os dados do jogador atualizado
        const response = await fetch("/jogador", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idPartida: this.partida._id,
                jogador,
                novoJogador: false,
            }),
        });

        //recebendo a nova partida e atualizando estado e ui
        const partida = await response.json();
        this.partida = partida;
        this.preencherUi();
    }

    //cria um novo jogador
    async criarNovoJogador(e) {
        e.preventDefault();

        //coletando as referências do input
        const [nomeInput, telefoneInput] = e.target;

        //construindo o objeto do novo jogador
        const jogador = {
            _id: String(Math.round(Math.random() * 99999999)),
            nome: nomeInput.value,
            telefone: telefoneInput.value,
            status: "duvida",
        };

        //fazendo a requisição de criação
        const response = await fetch("/jogador", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idPartida: this.partida._id,
                jogador,
                novoJogador: true,
            }),
        });

        const partida = await response.json();

        //resetando os "values" dos inputs
        nomeInput.value = telefoneInput.value = "";

        //atualizando estado e interface
        this.partida = partida;
        this.preencherUi();

        this.esconderModal(this.modalCriacao);
    }

    //remove um jogador da partida
    async excluirJogador() {
        //fazendo a requisição de remoção
        const response = await fetch(
            `/jogador?idJogador=${this.idJogadorAlvo}&idPartida=${this.partida._id}`,
            {
                method: "DELETE",
            }
        );

        //coletando a partida e atualizando estado e interface
        const partida = await response.json();
        this.partida = partida;
        this.preencherUi();

        this.esconderModal(this.modalConfirmacao);
    }

    preencherUi() {
        //titulo da partida
        const tituloElemento = this.criarElemento("h1", this.partida.titulo);
        //local da partida
        const localPartida = this.criarElemento(
            "h2",
            `Local: ${this.partida.local}`
        );
        //data da partida
        const dataPartida = this.criarElemento(
            "h2",
            `Data: ${this.partida.data.dia} / ${this.partida.data.mes} / ${this.partida.data.ano}`
        );
        //hora da partida
        const horaPartida = this.criarElemento(
            "h2",
            `Hora: ${this.partida.horario.horas} : ${this.partida.horario.minutos}h`
        );
        //lista de jogadores
        const listaJogadores = this.criarElemento("ul");

        const titutloJogadores = this.criarElemento("h3", "Jogadores");

        //preenchendo a lista de jogadores
        const childrenJogadores = [];
        this.partida.jogadores.forEach((jogador) => {
            //crianndo o elemento do jogador (container)
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

            //criando botao de remocao
            const removerBtn = this.criarElemento("button", "x");
            removerBtn.setAttribute("type", "button");
            removerBtn.classList.add("remover-jogador-btn");

            //prechendo o elemento jogador
            elementoJogador.replaceChildren(
                removerBtn,
                elementoInfo,
                elementoAcoes
            );
            childrenJogadores.push(elementoJogador);
        });

        listaJogadores.replaceChildren(...childrenJogadores);

        //preenchendo o elemento raiz
        this.elementoRaiz.replaceChildren(
            tituloElemento,
            dataPartida,
            horaPartida,
            localPartida,
            titutloJogadores,
            listaJogadores
        );
    }

    //cria um elemento genérico
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
