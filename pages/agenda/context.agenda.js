var config = {
        apiKey: "AIzaSyC4s_jqt6ZJNy3lnOkP6ReqwaX5W_s9PnU",
        authDomain: "teste-25d2b.firebaseapp.com",
        projectId: "teste-25d2b",
        storageBucket: "teste-25d2b.appspot.com",
        messagingSenderId: "1054231548039",
        appId: "1:1054231548039:web:5b02373c8be5be04cd6822"
};
firebase.initializeApp(config);

function redirectToLogin() {
    window.location.href = '../../index.html';
  }

  // Verificar o estado de autenticação do usuário quando a página carrega
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      redirectToLogin();
    }
  });
