function entrar (){
  const userNome = (userName.value).trim()
  const userMail = (userEmail.value).trim()
  const userSenha = (userPwd.value).trim();

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
  let ex = document.getElementById("extra")
  
  if (senha != senhaConfirma || senha === "") {
    document.getElementById("button-form").disabled = true
    ex.textContent = 'Diferente de senha'
    ex.style.color = 'Red'
  } else{
    document.getElementById("button-form").disabled = false
    ex.textContent = ''
  }
}

function verificarNivel(senha) {
  const barras = [
    document.getElementById('b1'),
    document.getElementById('b2'),
    document.getElementById('b3')
  ]
  const cores = ['#ff4d6d', '#ffd23f', '#06d6a0']
  const temMaiuscula = /[A-Z]/.test(senha)
  const temSimbolo = /[^A-Za-z0-9]/.test(senha)
  const temNumero = /[0-9]/.test(senha)

  let nivel = 1
  let pontos = 0;
  if (temMaiuscula) pontos+=10
  if (temNumero) pontos +=13
  if (temSimbolo) pontos +=20

  if (senha.length > 20) { pontos += 10 } 
  else if (senha.length > 14) { pontos += 12 }
    
  if (senha.length >= 12) {
    nivel = 2
    if (pontos > 30) nivel = 3
  }

  for (let i = 0; i < barras.length; i++) {
    if (i < nivel) {
      barras[i].style.backgroundColor = cores[nivel - 1]
    } else {
      barras[i].style.backgroundColor = 'var(--color-input-unfocus)'
    }
  }
}