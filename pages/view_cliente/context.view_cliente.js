function redirectToLogin() {
    window.location.href = '../../index.html';
  }

  // Verificar o estado de autenticação do usuário quando a página carrega
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      redirectToLogin();
    }
  });
