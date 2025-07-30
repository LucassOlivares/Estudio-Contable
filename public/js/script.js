document.addEventListener("DOMContentLoaded", () => {
  const contenido = document.getElementById("contenido-dinamico");

  // Inicializa AOS
  AOS.init({ duration: 1000 });

  // Función para cargar el contenido según la sección
  function cargarSeccion(seccion) {
    const seccionesValidas = ["inicio", "servicios", "contacto"];
    if (!seccionesValidas.includes(seccion)) seccion = "inicio";

    fetch(`partials/${seccion}.html`)
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar el contenido.");
        return res.text();
      })
      .then(html => {
        contenido.innerHTML = html;
        AOS.refresh();
      })
      .catch(err => {
        contenido.innerHTML = "<p>Error al cargar la sección.</p>";
        console.error(err);
      });
  }

  // Carga la sección inicial o por hash
  const hash = window.location.hash.replace("#", "") || "inicio";
  cargarSeccion(hash);

  // Escucha clicks en menú
  document.querySelectorAll("a[data-link]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const seccion = e.target.getAttribute("href").replace("#", "");
      window.location.hash = seccion;
      cargarSeccion(seccion);
    });
  });

  // Escucha cambio de hash manual
  window.addEventListener("hashchange", () => {
    const nuevaSeccion = window.location.hash.replace("#", "");
    cargarSeccion(nuevaSeccion);
  });
});
