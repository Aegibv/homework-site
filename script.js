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

function generaDatiRandom(n = 20) {
  const dati = [];
  for (let i = 0; i < n; i++) {
    dati.push(Math.floor(Math.random() * 100) + 1);
  }
  return dati;
}

function mediaNaive(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}

function varianzaNaive(arr) {
  const media = mediaNaive(arr);
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += (arr[i] - media) ** 2;
  }

  return sum / arr.length;
}

function mediaVarianzaOnline(arr) {
  let n = 0;
  let media = 0;
  let M2 = 0;

  for (let i = 0; i < arr.length; i++) {
    n++;
    const x = arr[i];
    const delta = x - media;
    media += delta / n;
    const delta2 = x - media;
    M2 += delta * delta2;
  }

  return {
    media: media,
    varianza: M2 / n
  };
}

function eseguiHomework2() {
  const dati = generaDatiRandom();

  const mediaN = mediaNaive(dati);
  const varN = varianzaNaive(dati);

  const online = mediaVarianzaOnline(dati);

  const out = document.getElementById("output-hmw2");

  out.innerHTML = `
    <p><strong>Dati:</strong> ${dati.join(", ")}</p>

    <h3>Naive</h3>
    <p>Media: ${mediaN.toFixed(4)}</p>
    <p>Varianza: ${varN.toFixed(4)}</p>

    <h3>Online (Welford)</h3>
    <p>Media: ${online.media.toFixed(4)}</p>
    <p>Varianza: ${online.varianza.toFixed(4)}</p>
  `;
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

  const out = document.getElementById("output-critico");

  out.innerHTML = `
    <p><strong>Dati critici:</strong> ${dati.join(", ")}</p>

    <h3>Naive</h3>
    <p>Media: ${mediaN.toFixed(10)}</p>
    <p>Varianza: ${varN.toFixed(10)}</p>

    <h3>Online</h3>
    <p>Media: ${online.media.toFixed(10)}</p>
    <p>Varianza: ${online.varianza.toFixed(10)}</p>

    <p><em>
    Il metodo naive può perdere precisione con numeri grandi e differenze piccole.
    L’algoritmo online è più stabile.
    </em></p>
  `;
}