var LOGIN_URL = "/login/login.html";

function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var id = sessionStorage.ID_USUARIO;

    if (!email || !nome || !id) {
        window.location.replace(LOGIN_URL);
        return false;
    }
    return true;
}

function limparSessao() {
    sessionStorage.clear();
    window.location.replace(LOGIN_URL);
}
