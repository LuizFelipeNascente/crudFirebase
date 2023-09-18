
// Verificar se o Firebase App já existe antes de inicializar
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// Obter uma referência ao Firestore
const db = firebase.firestore();

// Chamar a função para obter os dados do cliente quando a página carregar
window.addEventListener('load', () => {
  // Obter o ID do cliente da URL (por exemplo, ?id=ID_DO_CLIENTE)
  const urlParams = new URLSearchParams(window.location.search);
  const clienteId = urlParams.get('id');

  // Verificar se o ID do cliente foi fornecido na URL
 
    obterDadosCliente(clienteId)
      .then((doc) => {
        if (doc.exists) {
          // Preencher o formulário com os dados do cliente
          const dadosCliente = doc.data();
          if (dadosCliente.pessoa == "PACIENTE") {
           document.querySelector('#tipopessoa').innerHTML = "Editar Paciente"
          } else {
            if (dadosCliente.pessoa == "FORNECEDOR") {
               document.querySelector('#tipopessoa').innerHTML = "Editar Fornecedor"
            } else {
              if (dadosCliente.pessoa == "PRESTADOR") {
                 document.querySelector('#tipopessoa').innerHTML = "Editar Prestador"
              }
            }
          }
          preencherFormulario(dadosCliente);
        } else {
          console.error('ID não encontrado.');
          alert('Cliente não encontrado.');
        }
      })
      .catch((error) => {
        console.error('Erro ao obter dados do cliente: ', error);
        alert('Erro ao obter dados do cliente.');
      });
  
});

// ---------------------------------------------------

// Função para obter os dados do cliente com base no ID
function obterDadosCliente(clienteId) {
  return db.collection('clientes').doc(clienteId).get();
}

// Função para preencher o formulário com os dados do cliente
function preencherFormulario(dadosCliente) {
  const form = document.getElementById('editar-cliente-form');

   // Preencher checkbox do tipo de pessoa

  if (dadosCliente.pessoa == "PACIENTE") {
   document.querySelector('#paciente').checked = true
  } else {
    if (dadosCliente.pessoa == "FORNECEDOR") {
      document.querySelector('#fornecedor').checked = true
    } else {
      if (dadosCliente.pessoa == "PRESTADOR") {
        document.querySelector('#prestador').checked = true
      }
    }
  }

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
  form.historico.value = dadosCliente.historico;
  form.evolucao.value = dadosCliente.evolucao;
    
}


// Função para atualizar os dados do cliente no Firestore
function atualizarDadosCliente(clienteId, novosDados) {
  return db.collection('clientes').doc(clienteId).update(novosDados);
}

// Capturar o evento de envio do formulário
document.getElementById('editar-cliente-form').addEventListener('submit', (event) => {
  event.preventDefault(); // Impede o envio do formulário padrão

  // Obter o ID do cliente da URL (por exemplo, ?id=ID_DO_CLIENTE)
  const urlParams = new URLSearchParams(window.location.search);
  const clienteId = urlParams.get('id');

  // Verificar se o ID do cliente foi fornecido na URL
  if (clienteId) {
    // Obter os novos dados do cliente do formulário
    const form = event.target;

    const paciente = document.querySelector('#paciente');
    const prestador = document.querySelector('#prestador');
    const fornecedor = document.querySelector('#fornecedor');

    let pessoa = ""
    if (paciente.checked) {
      pessoa = "PACIENTE"
    } else {
      if (prestador.checked) {
        pessoa = "PRESTADOR"
      } else {
        if (fornecedor.checked) {
         pessoa = "FORNECEDOR"
       }
     }
   }


    const novosDadosCliente = {
      nome: form.nome.value,
      dataNascimento: form.datanascimento.value,
      cpf: form.cpf.value,
      cep: form.cep.value,
      cidade: form.cidade.value,
      bairro: form.bairro.value,
      endereco: form.endereco.value,
      complemento: form.complemento.value,
      contato: form.contato.value,
      historico: form.historico.value,
      evolucao: form.evolucao.value,
      pessoa: pessoa
      // Adicione os demais campos do cliente aqui
    };

    // Atualizar os dados do cliente no Firestore
    atualizarDadosCliente(clienteId, novosDadosCliente)
      .then(() => {
        console.log('Dados atualizados com sucesso.');
        alert('Dados atualizados com sucesso.');
        window.location.href = '../lista_clientes/lista_clientes.html'
      })
      .catch((error) => {
        console.error('Erro ao atualizar', error);
        alert('Erro ao atualizar');
      });
  } else {
    console.error('ID não fornecido.');
    alert('ID não fornecido.');
  }
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

// Formatações de campos

function formatarCPF(campo) {
  // Remove caracteres não numéricos
  var cpf = campo.value.replace(/\D/g, '');

  // Adiciona pontos e traço conforme o usuário digita
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  // Atualiza o valor do campo
  campo.value = cpf;
}

function formatarTEL(campo) {
  // Remove caracteres não numéricos
  var contato = campo.value.replace(/\D/g, '');

  // Formatação correta para (DDD) 99999-9999
  contato = contato.replace(/(\d{2})(\d)/, '($1) $2');
  contato = contato.replace(/(\d{5})(\d)/, '$1-$2');

  // Atualiza o valor do campo
  campo.value = contato;
}

function formatarCEP(cep) {
      cep = cep.replace(/\D/g, ''); // Remove caracteres não numéricos
      cep = cep.replace(/^(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen no formato
      return cep;
    }

    // Evento para formatar o CEP no formato "xxxxx-xxx" ao digitar
    document.getElementById('cep').addEventListener('input', (event) => {
      event.target.value = formatarCEP(event.target.value);
    });


