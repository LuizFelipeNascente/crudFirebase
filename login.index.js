'use strict'

// Submeter o formulário de login

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Autenticar usuário com o Firebase Authentication
  
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      window.location.href = 'pages/dashboard/dashboard.html';
      //alert('login realizado');
    })
    .catch((error) => {
      alert('Falha no login. Verifique suas credenciais.');
    });
});