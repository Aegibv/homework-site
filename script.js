function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

/* HOMEWORK SETTIMANA 1 */

// Seleziona il DIV
const div = document.getElementById("messaggio");

if (div) {
  // Cambia il testo
  div.textContent = "Ciao! Questo messaggio è scritto con JavaScript";

  // Effetto rainbow
  div.style.fontWeight = "bold";
  div.style.fontSize = "24px";

  div.style.background = "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)";
  div.style.backgroundClip = "text";
  div.style.webkitBackgroundClip = "text";
  div.style.webkitTextFillColor = "transparent";
  div.style.color = "transparent";
}
