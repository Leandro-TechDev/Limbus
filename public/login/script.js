function entrar() {
    let emailVar = userEmail.value;
    let senhaVar = userPwd.value;

    if (emailVar == "" || senhaVar == "") {
      return
    }

    fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emailServer: emailVar,
        senhaServer: senhaVar
      })
    }).then(function (resposta) {
      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then(json => {
          const user = json[0]

          sessionStorage.EMAIL_USUARIO = user.email;
          sessionStorage.NOME_USUARIO = user.nome;
          sessionStorage.ID_USUARIO = user.id;

          setTimeout(function () {
            
          }, 1000);
        });
      } else {
        console.log("Houve um erro ao tentar realizar o login!");
        resposta.text().then(texto => {
          console.error(texto);
          finalizarAguardar(texto);
        });
      }
    }).catch(function (erro) {
      console.log(erro);
    })
    return false;
  }

  function sumirMensagem() {
    cardErro.style.display = "none"
  }