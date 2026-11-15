const charactersView = document.getElementById('characters-view');
const profileView = document.getElementById('character-profile');

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

function troca(id) {
  charactersView.hidden = true
  profileView.hidden = false
  profileView.scrollIntoView({
    behavior: 'smooth'
  })
  carregaPersonagem(id)
}

function carregaPersonagem(num) {
  fetch(`/personagens/sinner/${num}`, {
    method: 'get',
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    res.json().then(data => {
      
      renderizador(data)
    });
  }).catch(function (erro) {
    console.log(erro);
  })
}

function renderizador(data) {
  document.getElementById('char-num').textContent = `Pecador #${data.id}`
  document.getElementById('char-name').textContent = `${data.nome}`
  document.getElementById('char-img').src = `assets/Sinners/Sin${data.id}.webp`
  document.getElementById('char-desc').textContent = data.descricao
  document.getElementById('char-book').textContent = data.titulo
  document.getElementById('char-author').textContent = data.autor
}

function fecharPersonagem() {
  profileView.hidden = true
  charactersView.hidden = false
  charactersView.scrollIntoView({ behavior: 'smooth' })
}