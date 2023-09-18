// Função para fazer logout do usuário
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


