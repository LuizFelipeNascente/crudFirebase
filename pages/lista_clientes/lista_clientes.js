// Verificar se o Firebase já foi iniciado

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// Acessando o banco no Firestore

const db = firebase.firestore();

// Recuperar os dados dos clientes do Firestore 

function exibirClientes() {
  const tableBody = document.querySelector('#clientes-table tbody');

  // Limpar a tabela antes de adicionar os dados

  tableBody.innerHTML = '';

  // Exibindo os clientes na tabela

  db.collection('clientes').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const cliente = doc.data();
        
        if (cliente.pessoa == "PACIENTE") {
          var color = "Lavender"
        } else {
          if (cliente.pessoa == "PRESTADOR") {
            var color = "PowderBlue"
          } else {
            if (cliente.pessoa == "FORNECEDOR") {
              var color = "Thistle"
            }
          }
        }

        const row = `
          <tr style="border: 2px solid black; padding: 10px; background-color: ${color}; ">
            <td>${cliente.nome}</td>
            <td>${cliente.dataNascimento}</td>
            <td>${cliente.contato}</td>
            <td>${cliente.pessoa}</td>
            <td>
              <button style="border-radius: 5px;" onclick="editarCliente('${doc.id}')"><img style="margin-bottom: 5px;" src="../../img/pencil-square.svg"></button> 
              <button style="border-radius: 5px;" onclick="viewCliente('${doc.id}')"><img style="margin-bottom: 5px;" src="../../img/eye-fill.svg"></button> 
              <button style="border-radius: 5px;" onclick="apagarCliente('${doc.id}')"><img style="margin-bottom: 5px;" src="../../img/trash-fill.svg"></button>
            </td>
          </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
       });
    })
    .catch((error) => {
      console.error('Erro ao recuperar clientes: ', error);
    });
    
}

// Função para editar um cliente (REVISADA)

function editarCliente(clienteId) {
  // lógica para redirecionar para a página de edição com o ID do cliente
  window.location.href = `../editar_cliente/editar_cliente.html?id=${clienteId}`;
} 

// Função para ver um cliente (REVISAR)

function viewCliente(clienteId) {
  // redirecionar para a página de visualização com o ID do cliente
  window.location.href = `../view_cliente/view_cliente.html?id=${clienteId}`;
}

// Função para apagar um cliente

function apagarCliente(clienteId) {
  if (confirm("Tem certeza que deseja apagar este cliente?")) {
    // Implemente aqui a lógica para apagar o cliente do Firestore
    db.collection('clientes').doc(clienteId).delete()
      .then(() => {
        alert("Cliente apagado com sucesso!");
        exibirClientes(); // Atualiza a lista após a exclusão
      })
      .catch((error) => {
        console.error('Erro ao apagar cliente: ', error);
        alert('Erro ao apagar cliente. Tente novamente mais tarde.');
      });
  }
}

// Exibir os clientes quando a página carregar
window.addEventListener('load', exibirClientes);

// Função para fazer o logout

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
