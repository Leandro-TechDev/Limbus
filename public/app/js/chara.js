let personagens = []
let personagemAtual
let notaGeral = 0
let notaCuriosidade = 0


function personagensBuscar() {
  var id = sessionStorage.ID_USUARIO;
  fetch(`/personagens/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    res.json().then(data => {
      let aval = 0
      let charaCard = ''
      personagens = data

      for (let i = 0; i < data.length; i++) {
        let semNota = true
        if (data[i].nota != undefined) {
          semNota = false
          aval++
        }
        charaCard +=
          `
        <button class="grid-card ${semNota ? 'sem-nota' : ''}"
        onclick="charaInfo(${data[i].id - 1})" 
        >
          <div class="grid-body">
            <img src='/assets/banner/Sinner${data[i].id}.webp'>
            <div class="grid-text">
              <span class="character">${data[i].nome}</span>
              <span class="book">Personagem de ${data[i].titulo}</span>
            </div>
          </div>
          <div class="stars">
        `
        for (let x = 0; x < 5; x++) {
          charaCard +=
            `<span style='${x < data[i].nota ? 'color:var(--text-secondary)' : ''}'>★</span>`
        }
        charaCard += `</div></button>`
      }

      document.getElementById('dash-welcome').innerHTML = `Avaliar os personagens — ${aval} de ${data.length} avaliados`

      document.getElementById('grid').innerHTML = charaCard

    })
  })
}

function charaInfo(index) {
  personagemAtual = personagens[index]
  if (!personagemAtual) return;

  document.getElementById('title').textContent = personagemAtual.nome;
  document.getElementById('sub').textContent = personagemAtual.titulo;
  notaGeral = personagemAtual.nota || 0
  notaCuriosidade = personagemAtual.curiosidade || 0
  pintarGeral(notaGeral)
  pintarCuriosidade(notaCuriosidade)

  document.getElementById('dlg').showModal();
}

function pintarGeral(nota) {
  const estrelas = document.querySelectorAll('#dlg-nota .dlg-star')

  estrelas.forEach((e, i) => {
    e.style.color = (i < nota) ? 'var(--text-secondary)' : 'var(--color-ink-600)'
  })

  document.querySelector('#dlg-nota .nv').textContent = nota ? nota + '/5' : 'Sem nota'
}

/* 
  Curiosidade separada de notas
  Dá pra fazer junto? Sim, mas envolve muitas complicações avançadas.
  Me resignei a não fazer junto.
*/

function pintarCuriosidade(nota) {
  const estrelas = document.querySelectorAll('#dlg-curiosidade .dlg-star')

  estrelas.forEach((e, i) => {
    e.style.color = (i < nota) ? 'var(--text-secondary)' : 'var(--color-ink-600)'
  })

  document.querySelector('#dlg-curiosidade .nv').textContent = nota ? nota + '/5' : 'Sem nota'
}

// ---------------------------------------------------------------

function configGeral() {
  const bloco = document.getElementById('dlg-nota')
  const estrelas = bloco.querySelectorAll('.dlg-star')

  estrelas.forEach(function (estrela, i) {
    estrela.addEventListener('click', function () {
      notaGeral = i + 1
      pintarGeral(notaGeral)
    })
    estrela.addEventListener('mouseenter', function () { pintarGeral(i + 1) })
  })

  bloco.querySelector('.dlg-stars').addEventListener('mouseleave', function () {
    pintarGeral(notaGeral)
  })
}

function configCuriosidade() {
  const bloco = document.getElementById('dlg-curiosidade')
  const estrelas = bloco.querySelectorAll('.dlg-star')

  estrelas.forEach(function (estrela, i) {
    estrela.addEventListener('click', function () {
      notaCuriosidade = i + 1
      pintarCuriosidade(notaCuriosidade)
    })
    estrela.addEventListener('mouseenter', function () { pintarCuriosidade(i + 1) })
  })

  bloco.querySelector('.dlg-stars').addEventListener('mouseleave', function () {
    pintarCuriosidade(notaCuriosidade)
  })
}

function salvarAvaliacao() {
  if (!personagemAtual) return;
  if (notaCuriosidade < 1 && notaGeral < 1) {
    alert('Escolha de 1 a 5 estrelas.');
    return;
  }

  fetch('/personagens/avaliacoes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      usuarioId: sessionStorage.ID_USUARIO,
      personagemId: personagemAtual.id,
      nota: notaGeral,
      curiosidade: notaCuriosidade
    })
  })
    .then(function (res) {
      console.log(res)
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function () {
      personagensBuscar()
    })
    .catch(function (erro) {
      console.error('Falha ao salvar avaliação:', erro);
      alert('Não foi possível salvar sua avaliação.');
    });
}

/* Para rodar só quando o html carrega */
document.addEventListener('DOMContentLoaded', configGeral)
document.addEventListener('DOMContentLoaded', configCuriosidade)
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('save').addEventListener('click', salvarAvaliacao)
})