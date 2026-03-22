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