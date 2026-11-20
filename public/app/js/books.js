let Livros = []
let livroAtual
let notaSelecionada = 0

function livroNotas() {
  var id = sessionStorage.ID_USUARIO;
  fetch(`/livros/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    res.json().then(data => {
      let bookCard = ''
      let aval = 0
      let somaNota = 0

      Livros = data
      for (let i = 0; i < data.length; i++) {
        bookCard +=
          `
        <button class="grid-card"
        onclick="livroInfo(${(data[i].id)-1})" 
        >
          <div class="cover" 
          style="background-image: url('${data[i].urlCapa}')"
          >
            <span class="title">${data[i].titulo}</span>
            <span class="author">${data[i].autor}</span>
          </div>
          <div class="stars">
        `
        if (data[i].nota != undefined) {
          aval++
          somaNota += data[i].nota
        }
        for (let x = 0; x < 5; x++) {
          bookCard +=
            `<span style='${x < data[i].nota ? 'color:var(--text-secondary)' : ''}'>★</span>`

        }
        bookCard += `</div></button>`
      }
      document.getElementById('grid').innerHTML = bookCard;
      document.getElementById('kpi-aval').innerHTML = aval;
      document.getElementById('kpi-medium').innerHTML = aval ? (somaNota / aval).toFixed(1) : '-'
      document.getElementById('kpi-read').innerHTML = data.length
    })
  })
};

function livroInfo(index) {
  livroAtual = Livros[index]
  if (!livroAtual) return;

  document.getElementById('title').textContent = livroAtual.titulo;
  document.getElementById('sub').textContent = livroAtual.autor;

  document.getElementById('dlg-field').value = livroAtual.descricao || '';

  notaSelecionada = livroAtual.nota || 0;
  pintarEstrelas(notaSelecionada)

  document.getElementById('dlg').showModal();
}

function pintarEstrelas(nota) {
  const estrelas = document.querySelectorAll('#dlg-stars .dlg-star')

  estrelas.forEach(function (e, i) {
    e.style.color = (i < nota) ? 'var(--text-secondary)' : 'var(--bg-surface)'
  })
  document.getElementById('nv').textContent = nota ? nota + '/5' : 'Sem nota';
}

function configEstrela() {
  const container = document.getElementById('dlg-stars')
  const estrelas = container.querySelectorAll('.dlg-star')

  estrelas.forEach(function (estrela, i){
    estrela.addEventListener('click', function () {
      notaSelecionada = i + 1
      pintarEstrelas(notaSelecionada)
    });

    estrela.addEventListener('mouseenter', function () { pintarEstrelas(i + 1) })
  }) 

  container.addEventListener('mouseleave', function() {pintarEstrelas(notaSelecionada)})
}

function salvarAvaliacao() {
  if (!livroAtual) return;
  if (notaSelecionada < 1) {
    alert('Escolha de 1 a 5 estrelas.');
    return;
  }

  fetch('/livros/avaliacoes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      usuarioId: sessionStorage.ID_USUARIO,
      livroId: livroAtual.id,
      nota: notaSelecionada,
      descricao: document.getElementById('dlg-field').value
    })
  })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function () {
      livroAtual.nota = notaSelecionada;
      livroAtual.descricao = document.getElementById('dlg-field').value;
      livroNotas();
    })
    .catch(function (erro) {
      console.error('Falha ao salvar avaliação:', erro);
      alert('Não foi possível salvar sua avaliação.');
    });
}


/* Para rodar só quando o html carrega */
document.addEventListener('DOMContentLoaded', configEstrela);

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('save').addEventListener('click', salvarAvaliacao)
})