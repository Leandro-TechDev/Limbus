const charactersView = document.getElementById('characters-view');
const profileView = document.getElementById('character-profile');
let indice = 0;


function initCarousel() {
  const anterior = document.getElementById('carousel-prev');
  const proximo = document.getElementById('carousel-next');
  const slides = document.querySelectorAll('.carousel-slide');
  const carrosel = document.querySelector('.carousel-track');

  function goTo(i) {
    indice = (i + slides.length) % slides.length;
    carrosel.style.transform = `translateX(-${indice * 100}%)`;
  }

  anterior.addEventListener('click', () => goTo(indice - 1));
  proximo.addEventListener('click', () => goTo(indice + 1));
}

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
  document.getElementById('char-desc').textContent = data.descricaoLivro
  document.getElementById('char-game').textContent = data.descricaoJogo
  document.getElementById('char-author').textContent = data.autor
}

function fecharPersonagem() {
  profileView.hidden = true
  charactersView.hidden = false
  charactersView.scrollIntoView({ behavior: 'smooth' })
}

function livroNotas() {
  let aux = 0 
  fetch(`/livros/${aux}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    res.json().then(data => {
      let bookCard = `
      <span id="books-title">Livros</span>
      <div class="archive">`
      for (let i = 0; i < data.length; i++) {
        bookCard +=`
        <div class="books-card">
          <img class="cover" src="${data[i].urlCapa}">
          <span class="book-title">
            ${data[i].titulo}
          </span>
        </div>
        `
      }
      bookCard += `</div>`
      document.getElementById('books-view').innerHTML = bookCard;
    })
  })
};