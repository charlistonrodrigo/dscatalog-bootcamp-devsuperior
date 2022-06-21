[![Build Status](https://app.travis-ci.com/charlistonrodrigo/dscatalog-bootcamp-devsuperior.svg?branch=main)](https://app.travis-ci.com/charlistonrodrigo/dscatalog-bootcamp-devsuperior)

# dscatalog-bootcamp-devsuperior

# Sobre

Este é um projeto desenvolvido através do bootcamp devsuperior. O projeto refere-se a um catalogo de produtos onde o usuário poderá interagir com o sistema a partir de 
um credenciamneto feito por um cadastro e sucessivamente efetuar um login para acesso no sistema. Ele também possui uma seção onde so usuários devidamente autorizados e autenticados tem acesso, um setor administrativo que permite um cadastro de produtos e usuários.

E possível tambem fazer uma visualização detalhada de cada produto além de uma busca por nome e categoria de produtos. Este aplicativo possue também uma busca paginada 
e recursos de crud somente para usuários de perfil administrador. 

## Informações adicionais

Este projeto foi desenvolvido com a utilização do framework react, e spring boot. Foi utilizado bibliotecas como NPM, bootstramp, typescript. Este aplicativo foi implementado usando o heroku e netlify como plataforma de acesso a nuvem, mas há também algumas funcionalidades implementadas na AWS. 

Também foi desenvolvido uma implementação de entrega contínua, e testes de integração. Ainda foi implementado um container e uma imagem no docker hub, e foi implantado com padrão de camadas na arquitetura rest do spring e injeção de dependência, além de ser construido dentro dos metódos de segurança do oauth2.
 

## Layout
<p align="center">
  <img width="200" src="assets/CaminhoCerto.png">
  <img width="200" src="assets/Contatos.png">
  <img width="200" src="assets/QRCode.png"><br>
  <img width="200" heigth="200" src="assets/Ligacao.png">
  <img width="200" src="assets/ContatosZap.png">
  <img width="200" src="assets/Localizacao.png">
  
  
</P>

## Como execultar o projeto

Baixe o aplicativo do expo em seu dispositivo móvel. Para execultar o projeto basta importa-lo no vsCode e execultar o comando expo start na pasta do projeto. Selecione a opção tunel na tela que abrir no navegador, isso vai gerar um qrCode. Com o expo aberto em seu dispositivo móvel clique em qrCode para ler o qrCode que abrir na tela do computador.
Isso permitira a execução do aplicativo em seu dispositivo móvel.

