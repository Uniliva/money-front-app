# MoneyFrontApp

[![Build Status](https://travis-ci.com/Uniliva/money-front-app.svg?branch=master)](https://travis-ci.com/Uniliva/money-front-app)

---

Projeto criado a partir do curso de fullstack Angular e Spring da Algaworks

---

## Tecnologias

- Angular 8
- Angular Material 
- Docker
- Travis ci

--- 

### Executar localmente (Jeito demorado)

Para executar esse projeto é necessario baixar e utilizar a api disponivel em: https://github.com/Uniliva/money-api

Caso necessario alterar a porta em **environment.ts**.

Depois é so executar o comando:

```shell
ng serve
```

### Executando com Docker (Jeito rapido)

Apesar desse projeto criar uma imagem e salvar no docker hub, não recomendo a execução individual da imagem, em vez disso vamos usar o docker-compose para montar nosso ambiente de teste:

- Primeiro é necessario ter o docker e o docker-compose instalar.
- Acesse e baixe o projeto : https://github.com/Uniliva/money-docker-compose.
- Acesse a pasta e execute:

```shell
docker-compose up -d
```

Pronto ambiente se construido utilizando docker

- Para acessar use - localhost:8095/login



