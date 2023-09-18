  function redirectToDash() {
    window.location.href = 'pages/dashboard/dashboard.html';
  }

    // Verificar o estado de autenticação do usuário quando a página carrega
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      redirectToDash();
    }
  });