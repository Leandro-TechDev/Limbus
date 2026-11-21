let doughChart

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
      Livros = data
      let aval = 0

      data.sort((a, b) => b.nota - a.nota)

      console.log('Sorteado: ', data)
      for (let i = 0; i < 5; i++) {
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
      document.getElementById('kpi-read').innerHTML = aval;
    })
  })
};