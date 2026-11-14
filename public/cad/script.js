function entrar (){
  const userNome = (userName.value).trim()
  const userMail = (userEmail.value).trim()
  const userSenha = (userPwd.value).trim();

  // if(!verificarErro(userNome, userMail, userSenha)) return

  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nameServer: userNome,
      mailServer: userMail,
      senhaServer: userSenha
    })
  }).then(function (resposta) {
    if (resposta.ok) {
      console.log(resposta);

      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));
        sessionStorage.user_name = json.name;
        sessionStorage.user_email = json.email;

        setTimeout(function () {
          window.location = "../login/login.html"
        }, 1000);
      })
    } else {
      console.log("Houve um erro ao tentar realizar o login!");
      resposta.text().then(texto => {
        console.error(texto);
      });
    }
  }).catch(function (erro) {
    console.log(erro);
  })
  return false;
}

function verificarSenhaIgual() {
  const senha = (userPwd.value).trim()
  const senhaConfirma = (userPwdConfirm.value).trim()
  if (senha != senhaConfirma || senha === "") {
    document.getElementById("button-form").disabled = true
    document.getElementById("extra").textContent = 'Diferente de senha'
  } else{
    document.getElementById("button-form").disabled = false
    document.getElementById("extra").textContent = ''
  }
}

function verificarNivel(senha) {
  let pontos = 0;

  if (senha.length < 6){ 
    document.getElementById("button-form").disabled = true
    return
  }
  
  const temMaiuscula = /[A-Z]/.test(senha)
  const temSimbolo = /\w/.test(senha)
  const temNumero = /[0-9]/.test(senha)

  if (temMaiuscula) pontos+=10
  if (temNumero) pontos +=13
  if (temSimbolo) pontos +=20

  if (senha.length < 12) {
    pontos += 10
  } else if (senha.length < 16){
    pontos += 12
  }

  

}