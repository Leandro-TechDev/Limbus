let doughChart
let personagensDados
let aval

function kpiCall() {
  if (sessionStorage.DADOS == true) {
    livroNotas();
    personagensBuscar();
    temasRecorrentesBuscar();
  } else {
    let error = document.getElementById('error-warning')
    error.style.display = 'flex'
  }
}


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
      let livrosTtl = []
      let livrosNotas = []
      let bookCard = ''
      aval = 0

      data.sort((a, b) => b.nota - a.nota)
      for (let i = 0; i < data.length; i++) {
        if (i < 5) {
          bookCard += `
          <div class="book-card">
            <img class="book-img" src="${data[i].urlCapa}">
            <div class="book-card-text">
              <span class="book-title">${data[i].titulo}</span>
              <span class="book-author">${data[i].autor}</span>
              <span class="book-rating">★${data[i].nota ? data[i].nota : '-'}/5</span>
            </div>
          </div>
          `
        }
        if (data[i].nota != undefined) {
          aval++
        }
      }

      const pct = data.length ? Math.round((aval / data.length) * 100) : 0;
      document.getElementById('donut-percent').innerHTML = pct + '%';

      doughChart = {
        labels: ['Lido', 'Não lido'],
        datasets: [
          {
            label: 'Leitura',
            data: [aval, (data.length - aval)],
            backgroundColor: ['#9b0000', '#000000'],
            borderWidth: 0,
            borderRadius: 0,
          }
        ]
      };

      new Chart(document.getElementById('dough-books').getContext('2d'),
        {
          type: 'doughnut',
          data: doughChart,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: '' }
            }
          }
        })

      data.forEach((a) => {
        if (a.nota != undefined) {
          livrosNotas.push(a.nota)
          livrosTtl.push(a.titulo)
        }
      })

      const dados = {
        labels: livrosTtl,
        datasets: [{
          label: 'Nota',
          data: livrosNotas,
          backgroundColor: '#f1bf02',
          borderColor: '#ffe27a',
          borderWidth: 2,
          borderRadius: 6,
        }]
      }

      const opcoes = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { min: 0, max: 5, ticks: { color: '#fff9e0', stepSize: 1 } },
          x: { ticks: { color: '#fff9e0' } }
        },
        plugins: { legend: { display: false } }
      }

      new Chart(document.getElementById('eval-books').getContext('2d'),
        { type: 'bar', data: dados, options: opcoes }
      );

      document.getElementById('book-grid').innerHTML = bookCard;

      pintarBarra(pct)
      function pintarBarra(preenchimento) {
        const barra = document.getElementById('graph-bar fill')

        barra.style.background = `linear-gradient(90deg, #961814 ${preenchimento}%, transparent ${preenchimento}% )`
        barra.style.height = '100%'
      }

      document.getElementById('kpi-read').innerHTML = aval;

    })
  })

};

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
      let notasVetor = []
      let nomeVetor = []

      data.sort((a, b) => b.curiosidade - a.curiosidade)
      personagensDados = data
      notaMedia()

      document.getElementById('kpi-sinner').innerHTML = data[0].nome
      document.getElementById('kpi-curio').innerHTML = `${data[0].curiosidade} de curiosidade`
      document.getElementById('sinnerCover').src = `/assets/Cards/Sinner_${data[0].id}.webp`

      data.forEach((a) => {
        if (a.nota != undefined) {
          notasVetor.push(a.nota)
          nomeVetor.push(a.nome)
        }
      })

      const dados = {
        labels: nomeVetor,
        datasets: [{
          label: 'Nota',
          data: notasVetor,
          backgroundColor: '#9b0000',
          borderColor: '#ff6464',
          borderWidth: 2,
          borderRadius: 6,
        }]
      }

      const opcoes = {
        responsive: true, maintainAspectRatio: false,
        scales: {
          y: { min: 0, max: 5, ticks: { color: '#fff9e0', stepSize: 1 } },
          x: { ticks: { color: '#fff9e0' } }
        }, plugins: { legend: { display: false } }
      }

      new Chart(
        document.getElementById('eval-characters').getContext('2d'),
        {
          type: 'bar',
          data: dados,
          options: opcoes
        }
      );


    })
  })
}

function temasRecorrentesBuscar() {
  var id = sessionStorage.ID_USUARIO;
  fetch(`/temas/recorrentes/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    console.log(res)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    res.json().then(data => {
      data.sort((a, b) => b.curiosidade - a.curiosidade)
      console.log(data)

      document.getElementById('frstTheme').innerHTML = data[0].descricao
      document.getElementById('scndTheme').innerHTML = data[1].descricao
      document.getElementById('thrdTheme').innerHTML = data[2].descricao
    })
  })
}

function notaMedia() {
  let notaTotal = 0
  for (let i = 0; i < personagensDados.length; i++) {
    notaTotal += personagensDados[i].nota
  }
  notaTotal /= personagensDados.length
  document.getElementById('kpi-eval').innerHTML = notaTotal.toFixed(1)

  pintar(notaTotal)
  function pintar(nota) {
    const estrelas = document.querySelectorAll(".kpi-star .star")

    estrelas.forEach((e, i) => {
      const preenchimento = Math.min(Math.max(nota - i, 0), 1) * 100

      e.style.background = `linear-gradient(90deg, var(--color-gold-500) ${preenchimento}%, var(--color-ink-600) ${preenchimento}%)
      `
      e.style.backgroundClip = 'text'
    })
  }
}