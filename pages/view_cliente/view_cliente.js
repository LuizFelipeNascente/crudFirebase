// Verificar se o Firebase App já existe antes de inicializar
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// Obter uma referência ao Firestore
const db = firebase.firestore();

// Função para obter os dados do cliente com base no ID
function obterDadosCliente(clienteId) {
  return db.collection('clientes').doc(clienteId).get();
}

// Função para preencher o formulário com os dados do cliente
function preencherFormulario(dadosCliente) {
  const form = document.getElementById('editar-cliente-form');
  const hist = document.getElementById('historico')
  const evo = document.getElementById('evolucao')

  // Preencher os campos do formulário com os dados do cliente
  form.nome.value = dadosCliente.nome;
  form.datanascimento.value = dadosCliente.dataNascimento;
  form.cpf.value = dadosCliente.cpf;
  form.cep.value = dadosCliente.cep;
  form.cidade.value = dadosCliente.cidade;
  form.bairro.value = dadosCliente.bairro;
  form.endereco.value = dadosCliente.endereco;
  form.complemento.value = dadosCliente.complemento;
  form.contato.value = dadosCliente.contato;
  historico.innerHTML = dadosCliente.historico;
  evolucao.innerHTML = dadosCliente.evolucao;
  // Preencher outros campos aqui (data de nascimento, cep, endereço, etc.)
  
}


// Chamar a função para obter os dados do cliente quando a página carregar
window.addEventListener('load', () => {
  // Obter o ID do cliente da URL (por exemplo, ?id=ID_DO_CLIENTE)
  const urlParams = new URLSearchParams(window.location.search);
  const clienteId = urlParams.get('id');

  //console.log(clienteId)

  // Verificar se o ID do cliente foi fornecido na URL
  if (clienteId) {
    // Obter os dados do cliente pelo ID
    obterDadosCliente(clienteId)
      .then((doc) => {
        if (doc.exists) {
          // Preencher o formulário com os dados do cliente
          const dadosCliente = doc.data();
          if (dadosCliente.pessoa == "PACIENTE") {
           document.querySelector('#tipopessoa').innerHTML = "Visualizar Paciente"
           document.querySelector('.mostra').classList.remove('hiden')
          } else {
            if (dadosCliente.pessoa == "FORNECEDOR") {
               document.querySelector('#tipopessoa').innerHTML = "Visualizar Fornecedor"
               document.querySelector('.mostra').classList.add('hiden')
            } else {
              if (dadosCliente.pessoa == "PRESTADOR") {
                 document.querySelector('#tipopessoa').innerHTML = "Visualizar Prestador"
                 document.querySelector('.mostra').classList.remove('hiden')
              }
            }
          }

          preencherFormulario(dadosCliente);
        } else {
          console.error('Cliente não encontrado.');
          alert('Cliente não encontrado. Verifique o ID fornecido.');
        }
      })
      .catch((error) => {
        console.error('Erro ao obter dados do cliente: ', error);
        alert('Erro ao obter dados do cliente. Tente novamente mais tarde.');
      });
  } else {
    console.error('ID do cliente não fornecido.');
    alert('ID do cliente não fornecido. Verifique a URL.');
  }
});

// Apagar cliente 

function apagarCliente(clienteId) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  
  if (confirm("Tem certeza que deseja apagar este cliente?")) {
    // Implemente aqui a lógica para apagar o cliente do Firestore
    db.collection('clientes').doc(id).delete()
      .then(() => {
        alert("Cliente apagado com sucesso!");
        window.location.href = '../lista_clientes/lista_clientes.html';
      })
      .catch((error) => {
        console.error('Erro ao apagar cliente: ', error);
        alert('Erro ao apagar cliente. Tente novamente mais tarde.');
      });
  }
}

// voltar para lista

function voltar() {

  window.location.href = '../lista_clientes/lista_clientes.html'
}; 

// Fazer a edição do cliente

function editar() {

  const url = new URLSearchParams(window.location.search);
  const id = url.get('id');

  window.location.href = '../editar_cliente/editar_cliente.html?id=' + id;
}; 


// Função de logout

function logout() {
  firebase.auth().signOut().then(function() {
 // Redirecionar para a página de login após o logout
    window.location.href = '../../index.html';
  }).catch(function(error) {
    alert('Erro ao fazer logout. Tente novamente mais tarde.');
  });
}

//Evento de clique no botão de logout
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
 

