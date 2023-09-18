
// Obter uma referência ao Firestore
const db = firebase.firestore();

// Enviar o user que fez o cadastro
firebase.auth().onAuthStateChanged( async function (user){
  
  logado = await user.email
  //console.log(user.email)
     
});

// Selecionar o formulário de cadastro de clientes
const formCliente = document.getElementById('form-cliente');

// Adicionar um evento submit ao formulário
formCliente.addEventListener('submit', function (e) {
  e.preventDefault();

  // Obter os valores dos campos do formulário
  const nome = document.getElementById('nome').value;
  const dataNascimento = document.getElementById('datanascimento').value;
  const cpfCNPJ = document.getElementById('ident').value;
  const bairro = document.getElementById('bairro').value;
  const cep = document.getElementById('cep').value;
  const cidade = document.getElementById('cidade').value;
  const endereco = document.getElementById('endereco').value;
  const complemento = document.getElementById('complemento').value;
  const contato = document.getElementById('contato').value;
  const historico = document.getElementById('historico').value;
  

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

  // Criar um objeto com os dados do cliente
  const cliente = {
    nome: nome,
    dataNascimento: dataNascimento,
    cpf: cpfCNPJ,
    cep: cep,
    cidade: cidade,
    bairro: bairro,
    endereco: endereco,
    complemento: complemento,
    contato: contato,
    historico: historico,
    evolucao: "",
    pessoa: pessoa,
    responsavel: logado
  };

  

  // Salvar o cliente no Firestore
  db.collection('clientes').add(cliente)
    .then(function (docRef) {
      //console.log('Cliente adicionado com ID: ', docRef.id);
      alert('Cliente cadastrado com sucesso!');
      formCliente.reset();
    })
    .catch(function (error) {
      //console.error('Erro ao adicionar cliente: ', error);
      alert('Erro ao cadastrar cliente. Tente novamente mais tarde.');
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

function formatarCNPJ(campo) {
  // Remove caracteres não numéricos
  var cnpj = campo.value.replace(/\D/g, '');

  // Adiciona pontos, barra e traço conforme o usuário digita
  cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
  cnpj = cnpj.replace(/(\d{4})(\d{2})$/, '$1-$2');

  // Atualiza o valor do campo
  campo.value = cnpj;
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



// API de buscar CEP

function buscarEnderecoPorCEP(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          //console.log(data)
          if (!data.erro) {
            document.getElementById('cidade').value = data.localidade; 
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('endereco').value = data.logradouro;
            document.getElementById('complemento').value = data.complemento;

            // Outros campos de endereço (bairro, cidade, estado) podem ser preenchidos aqui
          } else {
            //console.error('CEP não encontrado');
            alert('CEP não encontrado. Verifique o CEP informado.');
          }
        })
        .catch(error => {
          //console.error('Erro ao buscar endereço:', error);
          alert('Erro ao buscar endereço. Tente novamente mais tarde.');
        });
    }

    // Evento para buscar o endereço ao digitar o CEP
    document.getElementById('cep').addEventListener('blur', (event) => {
      const cep = event.target.value.replace(/\D/g, '');
      if (cep.length === 8) {
        buscarEnderecoPorCEP(cep);
      } else {
        // evita o alerta em casos de clique acidental no input
        if (cep.length === 0) {

        } else { 
        alert('CEP inválido. Verifique o CEP informado.');
      }
      }
    });
    

    //Logica de separação de dados de cada tipo de pessoa

    const hiden = document.querySelector('#tipo')

    hiden.addEventListener('click', () => {

      const paciente = document.querySelector('#paciente');
      const prestador = document.querySelector('#prestador');
      const fornecedor = document.querySelector('#fornecedor');
      const identificador = document.querySelector('#identificador')

      if (paciente.checked) {
        document.querySelector('.mostra').classList.remove('hiden')
        document.querySelector('.esconde').classList.remove('hiden')
        identificador.innerHTML = `

            <label for="cfp"><strong> CPF:</strong></label>
            <input type="text" id="ident" placeholder="999.999.999-99" maxlength="14"
              title="Informe um CPF no formato 999.999.999-99" pattern="[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}"
              oninput="formatarCPF(this)" required >

        `
      } else {
        if (fornecedor.checked) {
         document.querySelector('.mostra').classList.add('hiden')
         document.querySelector('.esconde').classList.add('hiden')

         identificador.innerHTML = `

            <label for="cnpj"><strong> CNPJ:</strong></label>
            <input type="text" id="ident" placeholder="99.999.999/9999-99" maxlength="18"
              title="Informe um CNPJ no formato 99.999.999/9999-99" 
              oninput="formatarCNPJ(this)" required >

        `

       } else {
        if (prestador.checked) {
          document.querySelector('.mostra').classList.remove('hiden')
          document.querySelector('.esconde').classList.add('hiden')

          identificador.innerHTML = `

            <label for="cnpj"><strong> CNPJ:</strong></label>
            <input type="text" id="ident" placeholder="99.999.999/9999-99" maxlength="18"
              title="Informe um CNPJ no formato 99.999.999/9999-99" 
              oninput="formatarCNPJ(this)" required >

        `

        }
      }
    }

  })

    window.addEventListener('load', () => {

      document.querySelector('#paciente').checked = true
      const paciente = document.querySelector('#paciente');
      const identificador = document.querySelector('#identificador')

      identificador.innerHTML = `

            <label for="cfp"><strong> CPF:</strong></label>
            <input type="text" id="ident" placeholder="999.999.999-99" maxlength="14"
              title="Informe um CPF no formato 999.999.999-99" pattern="[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}"
              oninput="formatarCPF(this)" required >

        `

    })