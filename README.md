### Crud simples para cadastro de pessoas ### 

 ** Funções: 

Realiza cadastro de pessoas podendo ser do tipo paciente, prestador ou fornecedor. Os tipos determinam alguns campos a aparecerem para o cadastro, exemplo: Tipo paciente possui os campos de data de nascimento, CPF e Histórico médico. 
Todos possuem o campo de endereço, que se inicia com o preenchimento do CEP, que após preenchido, é pesquisado automaticamente em uma api e se localizado, preenche todos os demais campos relacionados ao endereço. Possui um tela de Cadastro 
de serviços e também uma tela para realizar vendas, onde os clientes e serviços são puxados dos cadastros realizados. A tela de listagem de pessoas, possui as funções de editar o cadastro, apagar o cadastro e visualizar o cadastro. 

 

** Projeto:  

Desenvolvido com Javascript puro, html, css e bootstrap consumindo API viacep, para consulta de endereços. Usa o Firebase Auth para autenticação e Firebase Firestore como banco de dados não relacional. Necessário criar um app no console do Firebase 
e conectar ao projeto no arquivo fire.js.  

#Cadastro

![Tela de cadastro](https://github.com/LuizFelipeNascente/crudFirebase/assets/65420416/adeae4c5-54e9-43e4-9e16-4852fdf7a773)

#Lista

![Lista de pessoas](https://github.com/LuizFelipeNascente/crudFirebase/assets/65420416/ffde9d09-37b1-4bc8-90c9-8350ca45247f)

