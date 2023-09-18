
// Obter uma referência ao Firestore
const db = firebase.firestore();

// Verificar email de quem está logado
firebase.auth().onAuthStateChanged( async function (user){
  
  logado = await user.email
     
});

// Selecionar o formulário de cadastro de clientes
const formCliente = document.getElementById('form-cliente');

// Adicionar um evento submit ao formulário
formCliente.addEventListener('submit', function (e) {
  e.preventDefault();

  // Obter os valores dos campos do formulário
  const servico = document.getElementById('servico').value;
  const desc = document.getElementById('desc').value;
  const repete = document.getElementById('repete').value;
  const valor = document.getElementById('valor').value;
  

  // Criar um objeto com os dados do cliente
  const servicos = {
    servico: servico,
    desc: desc,
    repete: repete,
    valor: valor,    
    responsavel: logado
  };

  // Salvar o cliente no Firestore
  db.collection('serviços').add(servicos)
    .then(function (docRef) {
      console.log('Serviço adicionado com ID: ', docRef.id);
      alert('Serviço cadastrado com sucesso!');
      formCliente.reset();
    })
    .catch(function (error) {
      console.error('Erro ao adicionar Serviço: ', error);
      alert('Erro ao cadastrar Serviço.');
    });
});

// Função de logout

function logout() {
  firebase.auth().signOut().then(function() {
    // Redirecionar para a página de login após o logout
    window.location.href = '../../index.html';
  }).catch(function(error) {
    alert('Erro ao fazer logout. Tente novamente mais tarde.');
  });
}

// Evento de clique no botão de logout
document.getElementById('logout-btn').addEventListener('click', function() {
  logout();
});

document.getElementById('logout-btn-nav').addEventListener('click', function() {
  logout();
});

const menuLateral = document.querySelector('#menu-lateral')
const navToggler = document.querySelector('.navbar-toggler')

navToggler.addEventListener('click', () => {
    menuLateral.classList.toggle('show')
})