  
  // Verificar se o Firebase App já existe antes de inicializar
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // Obter uma referência ao Firestore
  const db = firebase.firestore();
  
  // Função para carregar os clientes cadastrados no campo de seleção
  function carregarClientes() {
    const clienteSelect = document.getElementById('cliente');
    const clienteInput = document.getElementById('cliente');

    /* Limpar as opções do select antes de carregar os clientes NÂO ESTOU USANDO -- 

    clienteSelect.innerHTML = '<option value="">Selecione um cliente</option>';

    */
  
    // Recuperar os dados dos clientes do Firestore
    db.collection('clientes').get()
      .then((querySnapshot) => {
        //criando o array vazio para receber para o autocomplete
        const clientes = [];
        const cpfs = [];
        querySnapshot.forEach((doc) => {

          const cliente = doc.data();
          /* Parte que criava as opitons NÂO ESTOU USANDO -- 

          
          const option = document.createElement('option');
          //option.value = doc._document.proto.fields.nome.stringValue;
          option.value = cliente.nome;
          option.textContent = cliente.nome;
          clienteSelect.appendChild(option);

          */

          //Jogar os clientes da base dentro do array vazio clientes

          clientes.push(cliente.nome);
          clientes.push(cliente.cpf);
          //console.log(doc._document.proto.fields.nome.stringValue)
        }); 
        // Recuperar dados no input atraves di array montado
        new Awesomplete(clienteInput, {
          list: clientes, cpfs,
          minChars: 2,
        });
      })
      .catch((error) => {
        console.error('Erro ao carregar clientes: ', error);
        alert('Erro ao carregar clientes. Tente novamente mais tarde.');
      });
  }
  
  // Função para carregar os produtos cadastrados no campo de seleção
  function carregarProdutos() {
    const produtoSelect = document.getElementById('produto');
    const produtoInput = document.getElementById('produto');

     /* Limpar as opções do select antes de carregar os serviços NÂO ESTOU USANDO -- 

    produtoSelect.innerHTML = '<option value="">Selecione um serviço</option>';

    */
   
  
    // Recuperar os dados dos produtos do Firestore
    db.collection('serviços').get()
      .then((querySnapshot) => {
        //criando o array vazio para receber para o autocomplete
        const produtos = [];
        querySnapshot.forEach((doc) => {
          const produto = doc.data();

          /*

          const option = document.createElement('option');
          //option.value = doc._document.proto.fields.servico.stringValue;
          option.value = produto.servico;
          option.textContent = produto.servico; // Substitua "nome" pelo campo que contém o nome do produto
          produtoSelect.appendChild(option);

          */

          //Jogar os clientes da base dentro do array vazio clientes
          produtos.push(produto.servico);
        });
        // Recuperar dados no input atraves di array montado
        new Awesomplete(produtoInput, {
          list: produtos,
          minChars: 2,
        });
      })
      .catch((error) => {
        console.error('Erro ao carregar produtos: ', error);
        alert('Erro ao carregar produtos. Tente novamente mais tarde.');
      });
  }
  
  // Função para salvar a venda no banco de dados
  function salvarVenda(clienteId, dataHora, produtoId) {
    db.collection('saida').add({
      cliente: clienteId,
      dataHora: dataHora,
      produto: produtoId
      // Outros campos da venda, como quantidade, valor, etc., podem ser adicionados aqui
    })
    .then((docRef) => {
      console.log('Venda registrada com ID: ', docRef.id);
      alert('Venda registrada com sucesso!');
      // Redirecionar para a página de vendas novamente
      window.location.href = 'saidas.html';
    })
    .catch((error) => {
      console.error('Erro ao salvar venda: ', error);
      alert('Erro ao salvar venda. Tente novamente mais tarde.');
    });
  }
  
  // Função para manipular o envio do formulário
  function submitForm(event) {
    event.preventDefault();
  
    const clienteSelect = document.getElementById('cliente');
    const dataHoraInput = document.getElementById('dataHora');
    const produtoSelect = document.getElementById('produto');
  
    const clienteId = clienteSelect.value;
    const dataHora = dataHoraInput.value;
    const produtoId = produtoSelect.value;
  
    // Verificar se os campos obrigatórios foram preenchidos
    if (clienteId && dataHora && produtoId) {
      salvarVenda(clienteId, dataHora, produtoId);
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
  
  // Adicionar um ouvinte de eventos para o formulário de vendas
  document.getElementById('form-vendas').addEventListener('submit', submitForm);
  
  // Chamar a função para carregar os clientes e produtos quando a página carregar
  window.addEventListener('load', () => {
    carregarClientes();
    carregarProdutos();
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

 // Função para formatar a data e hora no formato adequado para o input "datetime-local"
    function formatarDataHora(data) {
      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const dia = String(data.getDate()).padStart(2, '0');
      const hora = String(data.getHours()).padStart(2, '0');
      const minutos = String(data.getMinutes()).padStart(2, '0');
      return `${ano}-${mes}-${dia}T${hora}:${minutos}`;
    }

    // Preencher automaticamente o campo de data e hora quando a página carregar
    window.addEventListener('load', () => {
      const dataHoraInput = document.getElementById('dataHora');
      const dataHoraAtual = new Date();
      dataHoraInput.value = formatarDataHora(dataHoraAtual);
    });