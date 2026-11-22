let doughChart
let personagensDados
let aval 

function kpiCall() {
  livroNotas();
  personagensBuscar();
  temasRecorrentesBuscar();
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

      const dough = new Chart(
        document.getElementById('dough-books').getContext('2d'),
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
      data.sort((a, b) => b.curiosidade - a.curiosidade)
      personagensDados = data
      notaMedia()

      document.getElementById('kpi-sinner').innerHTML = data[0].nome
      document.getElementById('kpi-curio').innerHTML = `${data[0].curiosidade} de curiosidade`
      document.getElementById('sinnerCover').src = `/assets/Cards/Sinner_${data[0].id}.webp`
    })
  })
}

function temasRecorrentesBuscar(){
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
    notaTotal+=personagensDados[i].nota
  }
  notaTotal/=personagensDados.length
  document.getElementById('kpi-eval').innerHTML = notaTotal.toFixed(1)

  pintar(notaTotal)
  function pintar(nota) {
    const estrelas = document.querySelectorAll(".kpi-star .star")

    estrelas.forEach((e, i) => {
      const preenchimento = Math.min(Math.max( nota - i, 0 ), 1) * 100

      e.style.background = `linear-gradient(90deg, var(--color-gold-500) ${preenchimento}%, var(--color-ink-600) ${preenchimento}%)
      `
      e.style.backgroundClip = 'text'
    })
  }
}