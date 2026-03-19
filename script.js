function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

/* HOMEWORK SETTIMANA 1 */

// Cambia testo
function cambiaTesto() {
  const div = document.getElementById("messaggio");

  if (div) {
    div.textContent = "Ciao! Questo messaggio è stato modificato con JavaScript.";
  }
}

// Cambia stile
function cambiaStile() {
  const div = document.getElementById("messaggio");

  if (div) {
    div.style.fontWeight = "bold";
    div.style.fontSize = "24px";

    div.style.background = "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)";
    div.style.backgroundClip = "text";
    div.style.webkitBackgroundClip = "text";
    div.style.webkitTextFillColor = "transparent";
    div.style.color = "transparent";
  }
}

// Nascondi / mostra
function toggleMessaggio() {
  const div = document.getElementById("messaggio");

  if (div) {
    div.style.display = div.style.display === "none" ? "block" : "none";
  }
}

// Reset
function resetMessaggio() {
  const div = document.getElementById("messaggio");

  if (div) {
    div.style.display = "block";
    div.textContent = "Questo è il testo originale del DIV. Usa i bottoni qui sotto per modificarmi!";

    div.style.fontWeight = "normal";
    div.style.fontSize = "1.2rem";
    div.style.background = "#d9edf8";
    div.style.backgroundClip = "initial";
    div.style.webkitBackgroundClip = "initial";
    div.style.webkitTextFillColor = "initial";
    div.style.color = "#144d70";
  }
}

// --------------------
// HOMEWORK 2
// --------------------

function generaDatiRandom(n = 20, min = -50, max = 50) {
  const dati = [];

  for (let i = 0; i < n; i++) {
    const valore = Math.random() * (max - min) + min;
    dati.push(Number(valore.toFixed(3))); // 3 decimali
  }

  return dati;
}

function mediaNaive(array) {
  let somma = 0;
  for (let i = 0; i < array.length; i++) {
    somma += array[i];
  }
  return somma / array.length;
}

function varianzaNaive(array) {
  const media = mediaNaive(array);
  let sommaQuadrati = 0;

  for (let i = 0; i < array.length; i++) {
    sommaQuadrati += (array[i] - media) ** 2;
  }

  return sommaQuadrati / array.length;
}

function mediaVarianzaOnline(array) {
  let n = 0;
  let media = 0;
  let M2 = 0;

  for (let i = 0; i < array.length; i++) {
    n++;
    const x = array[i];
    const delta = x - media;
    media = media + delta / n;
    const delta2 = x - media;
    M2 = M2 + delta * delta2;
  }

  return {
    media: media,
    varianza: M2 / n
  };
}

function eseguiHomework2() {
  const dati = generaDatiRandom(20, 1, 100);

  const mediaN = mediaNaive(dati);
  const varN = varianzaNaive(dati);

  const online = mediaVarianzaOnline(dati);

  const output = document.getElementById("output-hmw2");

  if (output) {
    output.innerHTML = `
      <h3>Risultati sui dati casuali</h3>

      <p><strong>Dati generati:</strong></p>
      <p class="hmw2-data">${dati.join(", ")}</p>

      <table class="hmw2-table">
        <thead>
          <tr>
            <th>Metodo</th>
            <th>Media</th>
            <th>Varianza</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Naive</td>
            <td>${mediaN.toFixed(4)}</td>
            <td>${varN.toFixed(4)}</td>
          </tr>
          <tr>
            <td>Online (Welford)</td>
            <td>${online.media.toFixed(4)}</td>
            <td>${online.varianza.toFixed(4)}</td>
          </tr>
        </tbody>
      </table>

      <div class="hmw2-note">
        <strong>Conclusione del confronto:</strong>
        sui dati casuali i due metodi producono risultati molto vicini.
        L’algoritmo online, però, è più adatto quando i dati arrivano
        progressivamente ed è anche più stabile numericamente.
      </div>
    `;
  }
}

function esempioCritico() {
  const dati = [
    1000000001,
    1000000002,
    1000000003,
    1000000004,
    1000000005
  ];

  const mediaN = mediaNaive(dati);
  const varN = varianzaNaive(dati);

  const online = mediaVarianzaOnline(dati);

  const output = document.getElementById("output-critico");

  if (output) {
    output.innerHTML = `
      <h3>Caso critico</h3>

      <p><strong>Dati:</strong></p>
      <p class="hmw2-data">${dati.join(", ")}</p>

      <table class="hmw2-table">
        <thead>
          <tr>
            <th>Metodo</th>
            <th>Media</th>
            <th>Varianza</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Naive</td>
            <td>${mediaN.toFixed(10)}</td>
            <td>${varN.toFixed(10)}</td>
          </tr>
          <tr>
            <td>Online (Welford)</td>
            <td>${online.media.toFixed(10)}</td>
            <td>${online.varianza.toFixed(10)}</td>
          </tr>
        </tbody>
      </table>

      <div class="hmw2-note">
        <strong>Conclusione del confronto:</strong>
        con numeri molto grandi e differenze molto piccole, il metodo naive può
        risultare meno stabile numericamente, mentre l’algoritmo online conserva
        meglio il significato del calcolo.
      </div>
    `;
  }
}

function resetHomework2() {
  const output = document.getElementById("output-hmw2");
  const critico = document.getElementById("output-critico");

  if (output) {
    output.innerHTML = `<p>Qui compariranno i dati generati, la media e la varianza calcolate con i due metodi.</p>`;
  }

  if (critico) {
    critico.innerHTML = `<p>Qui comparirà una sequenza critica utile a mostrare i limiti del metodo naive.</p>`;
  }
}