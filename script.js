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

function generaDatiRandom(n, min, max) {
  const dati = [];

  for (let i = 0; i < n; i++) {
    const valore = Math.random() * (max - min) + min;
    dati.push(Number(valore.toFixed(3)));
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
  const nInput = document.getElementById("num-dati");
  const minInput = document.getElementById("min-val");
  const maxInput = document.getElementById("max-val");
  const output = document.getElementById("output-hmw2");

  if (!nInput || !minInput || !maxInput || !output) return;

  const n = parseInt(nInput.value);
  const min = parseFloat(minInput.value);
  const max = parseFloat(maxInput.value);

  if (isNaN(n) || isNaN(min) || isNaN(max)) {
    output.innerHTML = `<p>Inserisci valori validi.</p>`;
    return;
  }

  if (n <= 0) {
    output.innerHTML = `<p>Il numero di dati deve essere positivo.</p>`;
    return;
  }

  if (min >= max) {
    output.innerHTML = `<p>Il valore minimo deve essere minore del massimo.</p>`;
    return;
  }

  const dati = generaDatiRandom(n, min, max);

  const mediaN = mediaNaive(dati);
  const varN = varianzaNaive(dati);
  const online = mediaVarianzaOnline(dati);

  const minCampione = Math.min(...dati);
  const maxCampione = Math.max(...dati);

  const diffAssoluta = Math.abs(varN - online.varianza);
  const diffPercentuale = online.varianza !== 0
    ? (diffAssoluta / Math.abs(online.varianza)) * 100
    : 0;

  const naiveClass = diffPercentuale > 1 ? "color:#c62828; font-weight:700;" : "";
  const barWidth = Math.min(diffPercentuale, 100);

  let warning = "";
  if (diffPercentuale > 1) {
    warning = `
      <div class="hmw2-note" style="border-left: 4px solid #c62828; background:#fff3f3;">
        <strong>⚠️ Attenzione:</strong>
        si osserva una differenza significativa tra metodo naive e online.
        Questo può dipendere da problemi di stabilità numerica.
      </div>
    `;
  } else {
    warning = `
      <div class="hmw2-note">
        <strong>✔️ Confronto:</strong>
        i due metodi producono risultati molto simili su questi dati.
      </div>
    `;
  }

  output.innerHTML = `
    <h3>Risultati</h3>

    <p><strong>Dati generati:</strong></p>
    <p class="hmw2-data">${dati.join(", ")}</p>

    <p><strong>Min campione:</strong> ${minCampione.toFixed(3)}</p>
    <p><strong>Max campione:</strong> ${maxCampione.toFixed(3)}</p>

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
          <td style="${naiveClass}">${mediaN.toFixed(4)}</td>
          <td style="${naiveClass}">${varN.toFixed(6)}</td>
        </tr>
        <tr>
          <td>Online (Welford)</td>
          <td>${online.media.toFixed(4)}</td>
          <td>${online.varianza.toFixed(6)}</td>
        </tr>
      </tbody>
    </table>

    <p><strong>Differenza assoluta:</strong> ${diffAssoluta.toExponential(4)}</p>
    <p><strong>Differenza percentuale:</strong> ${diffPercentuale.toFixed(4)}%</p>

    <div style="margin: 14px 0;">
      <p><strong>Barra dell'errore</strong></p>
      <div style="width:100%; background:#e8f5e9; border-radius:10px; overflow:hidden; height:18px; border:1px solid #c8e6c9;">
        <div style="width:${barWidth}%; height:100%; background:${diffPercentuale > 1 ? "#c62828" : "#66bb6a"};"></div>
      </div>
    </div>

    ${warning}
  `;
}

function esempioCritico() {
  const dati = [];

  for (let i = 0; i < 1000; i++) {
    dati.push(1e9 + Math.random());
  }

  const mediaN = mediaNaive(dati);
  const varN = varianzaNaive(dati);
  const online = mediaVarianzaOnline(dati);

  const diffAssoluta = Math.abs(varN - online.varianza);
  const diffPercentuale = online.varianza !== 0
    ? (diffAssoluta / Math.abs(online.varianza)) * 100
    : 0;

  const naiveClass = diffPercentuale > 1 ? "color:#c62828; font-weight:700;" : "";
  const barWidth = Math.min(diffPercentuale, 100);

  const output = document.getElementById("output-critico");

  if (!output) return;

  output.innerHTML = `
    <h3>Caso critico (instabilità numerica)</h3>

    <p><strong>Tipo di dati:</strong> numeri molto grandi con variazioni molto piccole</p>

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
          <td style="${naiveClass}">${mediaN.toFixed(6)}</td>
          <td style="${naiveClass}">${varN.toExponential(6)}</td>
        </tr>
        <tr>
          <td>Online (Welford)</td>
          <td>${online.media.toFixed(6)}</td>
          <td>${online.varianza.toExponential(6)}</td>
        </tr>
      </tbody>
    </table>

    <p><strong>Differenza assoluta:</strong> ${diffAssoluta.toExponential(6)}</p>
    <p><strong>Differenza percentuale:</strong> ${diffPercentuale.toFixed(4)}%</p>

    <div style="margin: 14px 0;">
      <p><strong>Barra dell'errore</strong></p>
      <div style="width:100%; background:#fdeaea; border-radius:10px; overflow:hidden; height:18px; border:1px solid #ef9a9a;">
        <div style="width:${barWidth}%; height:100%; background:#c62828;"></div>
      </div>
    </div>

    <div class="hmw2-note" style="border-left: 4px solid #c62828; background:#fff3f3;">
      <strong>Conclusione del confronto:</strong>
      con numeri molto grandi e differenze molto piccole, il metodo naive può
      perdere precisione a causa della cancellazione numerica, mentre l’algoritmo
      online di Welford risulta più stabile.
    </div>
  `;
}

/* --------------------
   DEMO OPZIONALE DISTRIBUZIONI
-------------------- */

// Genera Uniforme(0,1)
function generaUniforme(n = 1000) {
  const dati = [];
  for (let i = 0; i < n; i++) {
    dati.push(Math.random());
  }
  return dati;
}

// Trasformazione in Esponenziale
function trasformaEsponenziale(uniformi, lambda = 1) {
  return uniformi.map(u => -Math.log(u) / lambda);
}

// Trasformazione in Bernoulli
function trasformaBernoulli(uniformi, p = 0.4) {
  return uniformi.map(u => (u < p ? 1 : 0));
}

// Trasformazione in Pareto
function trasformaPareto(uniformi, xm = 1, alpha = 3) {
  return uniformi.map(u => xm * Math.pow(1 - u, -1 / alpha));
}

// Costruzione istogramma
function creaIstogramma(array, bins = 10, min = null, max = null) {
  const minimo = min !== null ? min : Math.min(...array);
  const massimo = max !== null ? max : Math.max(...array);

  const ampiezza = (massimo - minimo) / bins || 1;
  const frequenze = new Array(bins).fill(0);

  for (const x of array) {
    let indice = Math.floor((x - minimo) / ampiezza);
    if (indice >= bins) indice = bins - 1;
    if (indice < 0) indice = 0;
    frequenze[indice]++;
  }

  return { frequenze, minimo, massimo };
}

// Disegna istogramma su canvas
function disegnaIstogramma(canvasId, array, bins = 10, min = null, max = null, colore = "#66bb6a") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const { frequenze } = creaIstogramma(array, bins, min, max);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const w = canvas.width;
  const h = canvas.height;
  const padding = 35;
  const chartW = w - 2 * padding;
  const chartH = h - 2 * padding;

  const maxFreq = Math.max(...frequenze, 1);
  const barW = chartW / frequenze.length;

  // assi
  ctx.strokeStyle = "#3d6b4f";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, h - padding);
  ctx.lineTo(w - padding, h - padding);
  ctx.stroke();

  // barre
  for (let i = 0; i < frequenze.length; i++) {
    const barH = (frequenze[i] / maxFreq) * (chartH - 10);
    const x = padding + i * barW + 4;
    const y = h - padding - barH;

    ctx.fillStyle = colore;
    ctx.fillRect(x, y, barW - 8, barH);
  }
}

// Esegue demo
function eseguiDemoDistribuzioni() {
  const scelta = document.getElementById("demo-dist");
  const output = document.getElementById("demo-output");
  if (!scelta || !output) return;

  const uniformi = generaUniforme(1000);
  let trasformati = [];
  let descrizione = "";

  // Input sempre uniforme
  disegnaIstogramma("canvas-input", uniformi, 10, 0, 1, "#66bb6a");

  if (scelta.value === "exp") {
    trasformati = trasformaEsponenziale(uniformi, 1);

    descrizione = `
      <p><strong>Distribuzione scelta:</strong> Esponenziale</p>
      <p><strong>Trasformazione usata:</strong> X = -ln(U) / λ, con λ = 1.</p>
      <p>
        L'input è uniforme, mentre l'output è continuo e mostra una forte concentrazione
        vicino a 0, con una coda che si estende verso destra.
      </p>
    `;

    disegnaIstogramma("canvas-output", trasformati, 12, 0, Math.max(...trasformati), "#42a5f5");
  }

  if (scelta.value === "bern") {
    trasformati = trasformaBernoulli(uniformi, 0.4);

    descrizione = `
      <p><strong>Distribuzione scelta:</strong> Bernoulli</p>
      <p><strong>Trasformazione usata:</strong> X = 1 se U &lt; p, altrimenti 0, con p = 0.4.</p>
      <p>
        L'input è continuo, mentre l'output è discreto e può assumere solo due valori: 0 e 1.
      </p>
    `;

    disegnaIstogramma("canvas-output", trasformati, 2, 0, 2, "#ab47bc");
  }

  if (scelta.value === "pareto") {
    trasformati = trasformaPareto(uniformi, 1, 3);

    descrizione = `
      <p><strong>Distribuzione scelta:</strong> Pareto</p>
      <p><strong>Trasformazione usata:</strong> X = x<sub>m</sub>(1-U)<sup>-1/α</sup>, con x<sub>m</sub> = 1 e α = 3.</p>
      <p>
        L'output mostra una distribuzione asimmetrica con molti valori piccoli e pochi valori molto grandi,
        cioè una coda pesante.
      </p>
    `;

    // taglio il range per rendere il grafico leggibile
    const maxGrafico = Math.min(Math.max(...trasformati), 10);
    const filtrati = trasformati.map(x => Math.min(x, maxGrafico));
    disegnaIstogramma("canvas-output", filtrati, 12, 1, maxGrafico, "#ffa726");
  }

  output.innerHTML = `
    <h3>Confronto tra input e output</h3>
    <p><strong>Input:</strong> 1000 valori Uniformi(0,1)</p>
    ${descrizione}
    <div class="hmw2-note">
      <strong>Osservazione:</strong>
      il grafico di input mantiene una forma circa uniforme, mentre il grafico di output
      cambia forma in modo coerente con la distribuzione scelta e con la teoria studiata.
    </div>
  `;
}

// Reset demo
function resetDemoDistribuzioni() {
  const output = document.getElementById("demo-output");
  const c1 = document.getElementById("canvas-input");
  const c2 = document.getElementById("canvas-output");

  if (output) {
    output.innerHTML = `<p>Qui comparirà il confronto tra distribuzione uniforme in input e distribuzione trasformata in output.</p>`;
  }

  if (c1) c1.getContext("2d").clearRect(0, 0, c1.width, c1.height);
  if (c2) c2.getContext("2d").clearRect(0, 0, c2.width, c2.height);
}
/* --------------------
   RANDOM WALK - HMW3
-------------------- */

// genera salti +1 / -1
function generaSalti(n) {
  const salti = [];
  for (let i = 0; i < n; i++) {
    salti.push(Math.random() < 0.5 ? -1 : 1);
  }
  return salti;
}

// costruisce la traiettoria
function generaRandomWalk(start, salti) {
  const valori = [start];

  for (let i = 0; i < salti.length; i++) {
    const nuovo = valori[i] + salti[i];
    valori.push(nuovo);
  }

  return valori;
}

// disegna il grafico
function disegnaRandomWalk(canvasId, dati) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const w = canvas.width;
  const h = canvas.height;
  const padding = 40;

  const min = Math.min(...dati);
  const max = Math.max(...dati);

  const scalaX = (w - 2 * padding) / (dati.length - 1);
  const scalaY = (h - 2 * padding) / (max - min || 1);

  // assi
  ctx.strokeStyle = "#3d6b4f";
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, h - padding);
  ctx.lineTo(w - padding, h - padding);
  ctx.stroke();

  // linea random walk
  ctx.strokeStyle = "#2e7d32";
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (let i = 0; i < dati.length; i++) {
    const x = padding + i * scalaX;
    const y = h - padding - (dati[i] - min) * scalaY;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.stroke();
}

// funzione principale
function eseguiRandomWalk() {
  const startInput = document.getElementById("start-val");
  const stepsInput = document.getElementById("num-steps");
  const output = document.getElementById("output-hmw3");

  if (!startInput || !stepsInput || !output) return;

  const start = parseFloat(startInput.value);
  const n = parseInt(stepsInput.value);

  if (isNaN(start) || isNaN(n)) {
    output.innerHTML = `<p>Inserisci valori validi.</p>`;
    return;
  }

  const salti = generaSalti(n);
  const valori = generaRandomWalk(start, salti);

  const finale = valori[valori.length - 1];
  const min = Math.min(...valori);
  const max = Math.max(...valori);

  // output testuale
  output.innerHTML = `
    <h3>Risultati</h3>

    <p><strong>Valore iniziale:</strong> ${start}</p>
    <p><strong>Numero di passi:</strong> ${n}</p>
    <p><strong>Valore finale:</strong> ${finale}</p>

    <p><strong>Valore minimo:</strong> ${min}</p>
    <p><strong>Valore massimo:</strong> ${max}</p>

    <p><strong>Primi salti:</strong></p>
    <p class="hmw3-data">${salti.slice(0, 20).join(", ")}</p>

    <div class="hmw3-note">
      Il random walk è costruito sommando progressivamente salti casuali +1 e -1.
      Questo tipo di modello è spesso utilizzato per simulare l’andamento dei prezzi nei mercati finanziari.
    </div>
  `;

  // grafico
  disegnaRandomWalk("canvas-randomwalk", valori);
}

// reset
function resetRandomWalk() {
  const output = document.getElementById("output-hmw3");
  const canvas = document.getElementById("canvas-randomwalk");

  if (output) {
    output.innerHTML = `<p>Qui compariranno i risultati della simulazione.</p>`;
  }

  if (canvas) {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
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