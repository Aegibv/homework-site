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

function generaDatiRandom(n = 20, min = 1, max = 100) {
  const dati = [];
  for (let i = 0; i < n; i++) {
    dati.push(Math.floor(Math.random() * (max - min + 1)) + min);
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

      <p><strong>Metodo naive</strong></p>
      <p>Media: ${mediaN.toFixed(4)}</p>
      <p>Varianza: ${varN.toFixed(4)}</p>

      <p><strong>Metodo online (Welford)</strong></p>
      <p>Media: ${online.media.toFixed(4)}</p>
      <p>Varianza: ${online.varianza.toFixed(4)}</p>
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

      <p><strong>Metodo naive</strong></p>
      <p>Media: ${mediaN.toFixed(10)}</p>
      <p>Varianza: ${varN.toFixed(10)}</p>

      <p><strong>Metodo online (Welford)</strong></p>
      <p>Media: ${online.media.toFixed(10)}</p>
      <p>Varianza: ${online.varianza.toFixed(10)}</p>

      <p><em>
        Con numeri molto grandi e differenze piccole, il metodo naive può risultare
        meno stabile numericamente, mentre l’algoritmo online è più robusto.
      </em></p>
    `;
  }
}