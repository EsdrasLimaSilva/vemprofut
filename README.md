# vemprofut

O objetivo deste projeto é criar uma aplicação que facilite a organização e marcação de partidas de futebol entre amigos.
As seguintes funcionalidades são esperadas:

- Criar partidas. Cada partida deve ter um título, um local, data e horário.
- Criar lista de presença dos jogadores. Após criar a partida, deve ser permitido adicionar/remover
  uma lista com os participantes e um telefone para contato.
- Acompanhar a presença. Essa funcionalidade será usada para "confirmar" quem vai estar presente no dia da partida marcada.
  Deverá ser apresentada a lista dos jogadores com uma opção para confirmar sua presença.
- Excluir partida. Deve ser permitido excluir a partida.

Para esse projeto deve ser construído os seguintes módulos:

- Frontend utilizando HTML, CSS e Javascript para controlar os eventos da tela e realizar as requisições para o backend para salvar e recuperar os
  dados. É permitido utilizar bibliotecas para a estilização das páginas, tais como Bootstrap, Bulma, Semantic, UIKit, etc.
- Backend utilizando NodeJS + Express. Aqui, fique a vontade para utilizar outras bibliotecas que possam facilitar seu trabalho.

Os dados da aplicação devem ser guardados em um arquivo do tipo JSON. Para isso, utilize as
funções nativas do NodeJS para ler (readFile) e escrever arquivos (writeFile). Sinta-se
à vontade para personalizar esse projeto conforme necessário e adicionar funcionalidades adicionais, se desejar.

## Como rodar

basta clonar este reposiório, e digitar o seguinte comando dentro da pasta do projeto
```
npm install
```
em seguida basta rodar o comando abaixo e abrir o navegador no endereço localhost:3000
```
npm start
```
