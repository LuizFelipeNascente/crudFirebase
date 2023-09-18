// Conectar ao Firebase Initialize Firebase

var config = {
        apiKey: "AIzaSyC4s_jqt6ZJNy3lnOkP6ReqwaX5W_s9PnU",
        authDomain: "teste-25d2b.firebaseapp.com",
        projectId: "teste-25d2b",
        storageBucket: "teste-25d2b.appspot.com",
        messagingSenderId: "1054231548039",
        appId: "1:1054231548039:web:5b02373c8be5be04cd6822"
};
firebase.initializeApp(config);

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


