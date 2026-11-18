let Livros = []

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
      Livros = data
      for (let i = 0; i < data.length; i++) {
        bookCard +=
          `
        <button class="grid-card"
        onclick="livroInfo(${i}); 
        dlg.showModal()" 
        >
          <div class="cover" 
          style="background-image: url('${data[i].urlCapa}')"
          >
            <span class="title">${data[i].titulo}</span>
            <span class="author">${data[i].autor}</span>
          </div>
          <div class="stars">
        `
        if (data[i].nota == undefined) aval++
        for (let x = 0; x < 5; x++) {
          bookCard +=
            `<span style='${x < data[i].nota ? 'color:var(--text-secondary)' : ''}'>★</span>`

        }
        bookCard += `</div></button>`
      }
      document.getElementById('grid').innerHTML = bookCard;
      document.getElementById('kpi-aval').innerHTML = aval;
      document.getElementById('kpi-medium').innerHTML = aval / data.length
      document.getElementById('kpi-read').innerHTML = aval
    })
  })
};

function livroInfo(index) {
  let livroAtual = Livros[index]
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

/* Para rodar só quando o html carrega */
document.addEventListener('DOMContentLoaded', configEstrela);