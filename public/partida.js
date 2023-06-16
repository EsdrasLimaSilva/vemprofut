class App {
    idPartida = "";

    constructor(idPartida) {
        this.idPartida = idPartida;
    }

    init() {
        console.log(this.idPartida);
    }
}

window.addEventListener("load", () => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const app = new App(params.get("id"));
    app.init();
});
