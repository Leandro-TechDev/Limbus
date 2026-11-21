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
            <span class="book-rating">★${data[i].nota}/5</span>
          </div>
        </div>
        `
        if (data[i].nota != undefined) {
          aval++
        }
      }

      document.getElementById('book-grid').innerHTML = bookCard;
      document.getElementById('kpi-read').innerHTML = aval;
    })
  })
};