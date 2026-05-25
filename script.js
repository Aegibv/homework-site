function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (!sidebar || !overlay) return;

  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const links = document.querySelectorAll(".sidebar-nav a");

  if (sidebar) sidebar.classList.remove("active");
  if (overlay) overlay.classList.remove("active");

  links.forEach(link => {
    link.addEventListener("click", function () {
      if (sidebar) sidebar.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
    });
  });
});

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
/* --------------------
   DONSKER - HMW4
-------------------- */

// genera variabili di Rademacher (+1 / -1)
function generaRademacher(n) {
  const valori = [];
  for (let i = 0; i < n; i++) {
    valori.push(Math.random() < 0.5 ? -1 : 1);
  }
  return valori;
}

// costruisce il processo scalato
function generaProcessoDonsker(T, n) {
  const dt = T / n;
  const passi = generaRademacher(n);
  const tempi = [0];
  const valori = [0];

  let somma = 0;

  for (let k = 1; k <= n; k++) {
    somma += passi[k - 1];
    tempi.push(k * dt);
    valori.push(somma / Math.sqrt(n));
  }

  return { tempi, valori, passi };
}

// disegna il grafico
function disegnaDonsker(canvasId, tempi, valori) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const w = canvas.width;
  const h = canvas.height;
  const padding = 40;

  const minY = Math.min(...valori);
  const maxY = Math.max(...valori);

  const scalaX = (w - 2 * padding) / (tempi.length - 1);
  const scalaY = (h - 2 * padding) / (maxY - minY || 1);

  ctx.strokeStyle = "#3d6b4f";
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, h - padding);
  ctx.lineTo(w - padding, h - padding);
  ctx.stroke();

  ctx.strokeStyle = "#1565c0";
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (let i = 0; i < valori.length; i++) {
    const x = padding + i * scalaX;
    const y = h - padding - (valori[i] - minY) * scalaY;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.stroke();
}

// funzione principale
function eseguiDonsker() {
  const T = parseFloat(document.getElementById("t-val").value);
  const n = parseInt(document.getElementById("n-val").value);
  const output = document.getElementById("output-hmw4");

  if (isNaN(T) || isNaN(n) || T <= 0 || n <= 0) {
    output.innerHTML = `<p>Inserisci valori validi.</p>`;
    return;
  }

  const processo = generaProcessoDonsker(T, n);

  const finale = processo.valori[processo.valori.length - 1];
  const min = Math.min(...processo.valori);
  const max = Math.max(...processo.valori);

  output.innerHTML = `
    <h3>Risultati</h3>

    <p><strong>Orizzonte T:</strong> ${T}</p>
    <p><strong>Numero di step n:</strong> ${n}</p>
    <p><strong>Valore finale:</strong> ${finale.toFixed(4)}</p>
    <p><strong>Valore minimo:</strong> ${min.toFixed(4)}</p>
    <p><strong>Valore massimo:</strong> ${max.toFixed(4)}</p>

    <p><strong>Primi 20 passi di Rademacher:</strong></p>
    <p class="hmw4-data">${processo.passi.slice(0, 20).join(", ")}</p>

    <div class="hmw4-note">
      Il processo è costruito sommando variabili di Rademacher indipendenti
      e riscalando il risultato per 1/√n. Aumentando n, la traiettoria
      approssima sempre meglio il moto browniano.
    </div>
  `;

  disegnaDonsker("canvas-donsker", processo.tempi, processo.valori);
}

// reset
function resetDonsker() {
  const output = document.getElementById("output-hmw4");
  const canvas = document.getElementById("canvas-donsker");

  if (output) {
    output.innerHTML = `<p>Qui compariranno i risultati della simulazione.</p>`;
  }

  if (canvas) {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }
}

/* --------------------
   HMW5 - ABM vs GBM vs OU
-------------------- */

let hmw5AnimationId = null;

// normale standard con Box-Muller
function normaleHMW5() {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

// ABM
function generaABM_HMW5(x0, T, n, mu, sigma) {
  const dt = T / n;
  const x = [x0];

  for (let i = 0; i < n; i++) {
    const z = normaleHMW5();
    x.push(x[i] + mu * dt + sigma * Math.sqrt(dt) * z);
  }

  return x;
}

// GBM
function generaGBM_HMW5(x0, T, n, mu, sigma) {
  const dt = T / n;
  const x = [x0];

  for (let i = 0; i < n; i++) {
    const z = normaleHMW5();
    const next = x[i] * Math.exp((mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * z);
    x.push(next);
  }

  return x;
}

// OU (mean reversion)
function generaOU_HMW5(x0, T, n, theta, m, sigma) {
  const dt = T / n;
  const x = [x0];

  for (let i = 0; i < n; i++) {
    const z = normaleHMW5();
    const next = x[i] + theta * (m - x[i]) * dt + sigma * Math.sqrt(dt) * z;
    x.push(next);
  }

  return x;
}

function disegnaAssiHMW5(ctx, canvas, min, max) {
  const padding = 45;

  ctx.strokeStyle = "#476657";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.stroke();

  return padding;
}

function drawLinePartialHMW5(ctx, data, color, indexMax, min, max, width, height, padding) {
  const scaleX = (width - 2 * padding) / (data.length - 1);
  const scaleY = (height - 2 * padding) / (max - min || 1);

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (let i = 0; i <= indexMax; i++) {
    const x = padding + i * scaleX;
    const y = height - padding - (data[i] - min) * scaleY;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.stroke();
}

function animaConfrontoHMW5(canvasId, abm, gbm, ou) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (hmw5AnimationId) {
    cancelAnimationFrame(hmw5AnimationId);
  }

  const all = abm.concat(gbm).concat(ou);
  const min = Math.min(...all);
  const max = Math.max(...all);

  let step = 1;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = disegnaAssiHMW5(ctx, canvas, min, max);

    drawLinePartialHMW5(ctx, abm, "#1565c0", step, min, max, canvas.width, canvas.height, padding);
    drawLinePartialHMW5(ctx, gbm, "#2e7d32", step, min, max, canvas.width, canvas.height, padding);
    drawLinePartialHMW5(ctx, ou, "#c62828", step, min, max, canvas.width, canvas.height, padding);

    if (step < abm.length - 1) {
      step++;
      hmw5AnimationId = requestAnimationFrame(animate);
    }
  }

  animate();
}

function eseguiHMW5() {
  const x0 = parseFloat(document.getElementById("x0").value);
  const T = parseFloat(document.getElementById("T").value);
  const n = parseInt(document.getElementById("n").value);
  const mu = parseFloat(document.getElementById("mu").value);
  const sigma = parseFloat(document.getElementById("sigma").value);
  const theta = parseFloat(document.getElementById("theta").value);
  const m = parseFloat(document.getElementById("m").value);

  const output = document.getElementById("output-hmw5");

  if ([x0, T, n, mu, sigma, theta, m].some(v => Number.isNaN(v))) {
    output.innerHTML = `<p>Inserisci valori validi.</p>`;
    return;
  }

  if (T <= 0 || n <= 0 || sigma < 0 || theta < 0) {
    output.innerHTML = `<p>Controlla i parametri: T e n devono essere positivi, σ e θ non negativi.</p>`;
    return;
  }

  const abm = generaABM_HMW5(x0, T, n, mu, sigma);
  const gbm = generaGBM_HMW5(x0, T, n, mu, sigma);
  const ou = generaOU_HMW5(x0, T, n, theta, m, sigma);

  animaConfrontoHMW5("canvas-hmw5", abm, gbm, ou);

  const abmFinal = abm[abm.length - 1];
  const gbmFinal = gbm[gbm.length - 1];
  const ouFinal = ou[ou.length - 1];

  output.innerHTML = `
    <h3>Confronto tra processi</h3>

    <p><strong>ABM:</strong> valore finale = ${abmFinal.toFixed(3)}</p>
    <p><strong>GBM:</strong> valore finale = ${gbmFinal.toFixed(3)}</p>
    <p><strong>OU:</strong> valore finale = ${ouFinal.toFixed(3)}</p>

    <div class="hmw5-note">
      <strong>Interpretazione:</strong>
      l’<strong>ABM</strong> evolve in modo additivo e può assumere anche valori negativi;
      il <strong>GBM</strong> evolve in modo moltiplicativo e resta positivo, per questo è più usato
      per modellare prezzi; il processo di <strong>Ornstein–Uhlenbeck</strong> mostra invece
      <em>mean reversion</em>, cioè tende a ritornare verso una media di lungo periodo.
    </div>
  `;
}

function resetHMW5() {
  const output = document.getElementById("output-hmw5");
  const canvas = document.getElementById("canvas-hmw5");

  if (hmw5AnimationId) {
    cancelAnimationFrame(hmw5AnimationId);
    hmw5AnimationId = null;
  }

  if (output) {
    output.innerHTML = `<p>Qui comparirà il confronto tra ABM, GBM e processo di Ornstein–Uhlenbeck.</p>`;
  }

  if (canvas) {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }
}

/* =========================
   HMW6 - Strategy, PnL, Drawdown
========================= */

function normalHMW6() {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function generaGBM_HMW6(S0, n, mu, sigma) {
  const dt = 1 / n;
  const prices = [S0];

  for (let i = 1; i <= n; i++) {
    const z = normalHMW6();
    const next = prices[i - 1] * Math.exp(
      (mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * z
    );
    prices.push(next);
  }

  return prices;
}

function strategiaTrendFollowing(prices) {
  const position = [0];
  const pnl = [0];

  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];

    const pos = change >= 0 ? 1 : -1;
    position.push(pos);

    const profit = position[i - 1] * change;
    pnl.push(pnl[i - 1] + profit);
  }

  return { position, pnl };
}

function mediaMobile(prices, window) {
  const ma = [];

  for (let i = 0; i < prices.length; i++) {
    if (i < window) {
      ma.push(null);
    } else {
      let sum = 0;
      for (let j = i - window; j < i; j++) {
        sum += prices[j];
      }
      ma.push(sum / window);
    }
  }

  return ma;
}

function strategiaMediaMobile(prices, window) {
  const ma = mediaMobile(prices, window);
  const position = [0];
  const pnl = [0];

  for (let i = 1; i < prices.length; i++) {
    let pos = 0;

    if (ma[i] !== null) {
      pos = prices[i - 1] > ma[i - 1] ? 1 : -1;
    }

    position.push(pos);

    const change = prices[i] - prices[i - 1];
    const profit = position[i - 1] * change;
    pnl.push(pnl[i - 1] + profit);
  }

  return { position, pnl, ma };
}

function calcolaDrawdown(pnl) {
  const dd = [];
  let peak = pnl[0];
  let maxDD = 0;

  for (let i = 0; i < pnl.length; i++) {
    if (pnl[i] > peak) peak = pnl[i];

    const drawdown = peak - pnl[i];
    dd.push(drawdown);

    if (drawdown > maxDD) maxDD = drawdown;
  }

  return { dd, maxDD };
}

function disegnaLineaHMW6(canvasId, datasets) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 40;

  const allValues = datasets
    .flatMap(d => d.data)
    .filter(v => v !== null && !Number.isNaN(v));

  const min = Math.min(...allValues);
  const max = Math.max(...allValues);

  const scaleX = (canvas.width - 2 * padding) / (datasets[0].data.length - 1);
  const scaleY = (canvas.height - 2 * padding) / (max - min || 1);

  ctx.strokeStyle = "#466653";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.stroke();

  datasets.forEach(dataset => {
    ctx.strokeStyle = dataset.color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    let started = false;

    for (let i = 0; i < dataset.data.length; i++) {
      const value = dataset.data[i];

      if (value === null || Number.isNaN(value)) continue;

      const x = padding + i * scaleX;
      const y = canvas.height - padding - (value - min) * scaleY;

      if (!started) {
        ctx.moveTo(x, y);
        started = true;
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
  });
}

function eseguiHMW6() {
  const S0 = parseFloat(document.getElementById("s0-hmw6").value);
  const n = parseInt(document.getElementById("n-hmw6").value);
  const mu = parseFloat(document.getElementById("mu-hmw6").value);
  const sigma = parseFloat(document.getElementById("sigma-hmw6").value);
  const window = parseInt(document.getElementById("window-hmw6").value);

  const output = document.getElementById("output-hmw6");

  if ([S0, n, mu, sigma, window].some(v => Number.isNaN(v)) || n <= 0 || window <= 1) {
    output.innerHTML = "<p>Inserisci parametri validi.</p>";
    return;
  }

  const prices = generaGBM_HMW6(S0, n, mu, sigma);

  const trend = strategiaTrendFollowing(prices);
  const movingAverage = strategiaMediaMobile(prices, window);

  const ddTrend = calcolaDrawdown(trend.pnl);
  const ddMA = calcolaDrawdown(movingAverage.pnl);

  const pnlTrendFinale = trend.pnl[trend.pnl.length - 1];
  const pnlMAFinale = movingAverage.pnl[movingAverage.pnl.length - 1];

  disegnaLineaHMW6("canvas-price-hmw6", [
    { data: prices, color: "#2f5d44" },
    { data: movingAverage.ma, color: "#c48a3a" }
  ]);

  disegnaLineaHMW6("canvas-pnl-hmw6", [
    { data: trend.pnl, color: "#2f5d44" },
    { data: movingAverage.pnl, color: "#8b5cf6" }
  ]);

  disegnaLineaHMW6("canvas-dd-hmw6", [
    { data: ddTrend.dd, color: "#b91c1c" },
    { data: ddMA.dd, color: "#c48a3a" }
  ]);

  output.innerHTML = `
    <h2>Risultati</h2>

    <p><strong>Strategia 1 - Trend following</strong></p>
    <p>PnL finale: <strong>${pnlTrendFinale.toFixed(3)}</strong></p>
    <p>Massimo Drawdown: <strong>${ddTrend.maxDD.toFixed(3)}</strong></p>

    <p><strong>Strategia 2 - Media mobile</strong></p>
    <p>PnL finale: <strong>${pnlMAFinale.toFixed(3)}</strong></p>
    <p>Massimo Drawdown: <strong>${ddMA.maxDD.toFixed(3)}</strong></p>

    <p>
      La strategia trend-following reagisce immediatamente alla variazione del prezzo,
      mentre la strategia basata su media mobile è più lenta ma può filtrare parte del rumore.
      Il drawdown permette di valutare il rischio della strategia, misurando la massima perdita
      rispetto a un precedente picco del PnL.
    </p>
  `;
}

function resetHMW6() {
  ["canvas-price-hmw6", "canvas-pnl-hmw6", "canvas-dd-hmw6"].forEach(id => {
    const canvas = document.getElementById(id);
    if (canvas) {
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    }
  });

  const output = document.getElementById("output-hmw6");
  if (output) {
    output.innerHTML = "<p>Qui compariranno i risultati della simulazione.</p>";
  }
}

/* =========================
   HMW8 - Payoff opzioni
========================= */

let portfolioOptions = [];

function payoffSingolaOpzione(option, ST) {
  let intrinsicValue = 0;

  if (option.type === "call") {
    intrinsicValue = Math.max(ST - option.strike, 0);
  } else if (option.type === "put") {
    intrinsicValue = Math.max(option.strike - ST, 0);
  }

  let payoff = intrinsicValue - option.premium;

  if (option.position === "short") {
    payoff = -payoff;
  }

  return payoff * option.quantity;
}

function payoffTotalePortfolio(options, ST) {
  let total = 0;

  for (let i = 0; i < options.length; i++) {
    total += payoffSingolaOpzione(options[i], ST);
  }

  return total;
}

function aggiungiOpzione() {
  const type = document.getElementById("option-type").value;
  const position = document.getElementById("option-position").value;
  const strike = parseFloat(document.getElementById("option-strike").value);
  const premium = parseFloat(document.getElementById("option-premium").value);
  const quantity = parseFloat(document.getElementById("option-quantity").value);

  if (
    Number.isNaN(strike) ||
    Number.isNaN(premium) ||
    Number.isNaN(quantity) ||
    strike <= 0 ||
    premium < 0 ||
    quantity === 0
  ) {
    alert("Inserisci valori validi.");
    return;
  }

  portfolioOptions.push({
    type,
    position,
    strike,
    premium,
    quantity
  });

  aggiornaPortfolio();
}

function rimuoviOpzione(index) {
  portfolioOptions.splice(index, 1);
  aggiornaPortfolio();
}

function resetOpzioni() {
  portfolioOptions = [];
  aggiornaPortfolio();

  const canvas = document.getElementById("payoff-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  const output = document.getElementById("payoff-output");
  if (output) {
    output.innerHTML = "<p>Qui compariranno i risultati del payoff complessivo.</p>";
  }
}

function caricaEsempioStraddle() {
  portfolioOptions = [
    {
      type: "call",
      position: "long",
      strike: 100,
      premium: 5,
      quantity: 1
    },
    {
      type: "put",
      position: "long",
      strike: 100,
      premium: 4,
      quantity: 1
    }
  ];

  aggiornaPortfolio();
}

function aggiornaPortfolio() {
  const list = document.getElementById("options-list");
  const output = document.getElementById("payoff-output");

  if (!list) return;

  if (portfolioOptions.length === 0) {
    list.innerHTML = "<p>Nessuna opzione inserita.</p>";
    return;
  }

  let html = `
    <table class="hmw2-table">
      <tr>
        <th>#</th>
        <th>Tipo</th>
        <th>Posizione</th>
        <th>Strike</th>
        <th>Premio</th>
        <th>Quantità</th>
        <th>Azione</th>
      </tr>
  `;

  portfolioOptions.forEach((opt, index) => {
    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${opt.type}</td>
        <td>${opt.position}</td>
        <td>${opt.strike}</td>
        <td>${opt.premium}</td>
        <td>${opt.quantity}</td>
        <td><button onclick="rimuoviOpzione(${index})">Rimuovi</button></td>
      </tr>
    `;
  });

  html += "</table>";

  list.innerHTML = html;

  disegnaPayoffPortfolio();

  if (output) {
    const risultati = calcolaRisultatiPayoff();

    output.innerHTML = `
      <h2>Risultati</h2>

      <p><strong>Payoff minimo simulato:</strong> ${risultati.minPayoff.toFixed(2)}</p>
      <p><strong>Payoff massimo simulato:</strong> ${risultati.maxPayoff.toFixed(2)}</p>
      <p><strong>Break-even approssimativi:</strong> ${risultati.breakEvenText}</p>

      <p>
        Il grafico mostra il payoff complessivo ottenuto sommando i payoff
        delle singole opzioni inserite nel portafoglio.
      </p>
    `;
  }
}

function calcolaRisultatiPayoff() {
  const range = generaRangePrezzi();
  const payoffValues = range.map(ST => payoffTotalePortfolio(portfolioOptions, ST));

  const minPayoff = Math.min(...payoffValues);
  const maxPayoff = Math.max(...payoffValues);

  const breakEven = [];

  for (let i = 1; i < payoffValues.length; i++) {
    if (
      payoffValues[i - 1] === 0 ||
      payoffValues[i] === 0 ||
      payoffValues[i - 1] * payoffValues[i] < 0
    ) {
      breakEven.push(range[i].toFixed(2));
    }
  }

  return {
    minPayoff,
    maxPayoff,
    breakEvenText: breakEven.length > 0 ? breakEven.join(", ") : "nessuno nel range simulato"
  };
}

function generaRangePrezzi() {
  let minStrike = 50;
  let maxStrike = 150;

  if (portfolioOptions.length > 0) {
    const strikes = portfolioOptions.map(opt => opt.strike);
    minStrike = Math.min(...strikes) * 0.5;
    maxStrike = Math.max(...strikes) * 1.5;
  }

  const range = [];
  const steps = 160;

  for (let i = 0; i <= steps; i++) {
    const ST = minStrike + (i / steps) * (maxStrike - minStrike);
    range.push(ST);
  }

  return range;
}

function disegnaPayoffPortfolio() {
  const canvas = document.getElementById("payoff-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const range = generaRangePrezzi();
  const payoffValues = range.map(ST => payoffTotalePortfolio(portfolioOptions, ST));

  const padding = 50;
  const minX = Math.min(...range);
  const maxX = Math.max(...range);
  const minY = Math.min(...payoffValues, 0);
  const maxY = Math.max(...payoffValues, 0);

  const scaleX = (canvas.width - 2 * padding) / (maxX - minX);
  const scaleY = (canvas.height - 2 * padding) / (maxY - minY || 1);

  function xToCanvas(x) {
    return padding + (x - minX) * scaleX;
  }

  function yToCanvas(y) {
    return canvas.height - padding - (y - minY) * scaleY;
  }

  // sfondo
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // assi
  ctx.strokeStyle = "#466653";
  ctx.lineWidth = 1.2;

  ctx.beginPath();
  ctx.moveTo(padding, yToCanvas(0));
  ctx.lineTo(canvas.width - padding, yToCanvas(0));
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(xToCanvas(minX), padding);
  ctx.lineTo(xToCanvas(minX), canvas.height - padding);
  ctx.stroke();

  // linea payoff
  ctx.strokeStyle = "#2f5d44";
  ctx.lineWidth = 3;
  ctx.beginPath();

  for (let i = 0; i < payoffValues.length; i++) {
    const x = xToCanvas(range[i]);
    const y = yToCanvas(payoffValues[i]);

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.stroke();

  // label
  ctx.fillStyle = "#244535";
  ctx.font = "14px Arial";
  ctx.fillText("Prezzo sottostante S_T", canvas.width / 2 - 70, canvas.height - 12);
  ctx.fillText("Payoff", 12, 24);
}