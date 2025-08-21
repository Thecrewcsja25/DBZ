let currentPage = 1;

// Este script carga los planetas por ID y muestra su información.
// Puedes cambiar el ID para mostrar diferentes planetas.

async function loadPlanet(planetId = 1) {
  try {
    const response = await fetch(`https://dragonball-api.com/api/planets/${planetId}`);
    const data = await response.json();

    const container = document.getElementById("characters");
    container.innerHTML = "";

    // Mostrar la información del planeta
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${data.image}" alt="${data.name}">
      <div class="name">${data.name}</div>
      <div class="description">${data.description || "Sin descripción disponible."}</div>
    `;
    container.appendChild(card);

    // Controles para navegar entre planetas por ID
    const navigation = document.createElement("div");
    navigation.className = "pagination";

    if (planetId > 1) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "⬅️ Anterior";
      prevBtn.onclick = () => loadPlanet(planetId - 1);
      navigation.appendChild(prevBtn);
    }

    // Puedes ajustar el límite máximo de planetas según la API
    const maxPlanets = 20; // Cambia este valor si hay más planetas

    if (planetId < maxPlanets) {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Siguiente ➡️";
      nextBtn.onclick = () => loadPlanet(planetId + 1);
      navigation.appendChild(nextBtn);
    }

    container.appendChild(navigation);

  } catch (error) {
    console.error("Error cargando planeta:", error);
    document.getElementById("characters").innerHTML = "<p>Error cargando planeta.</p>";
  }
}

// Carga inicial del planeta con ID 1
loadPlanet();

async function cargarPlanetas() {
      try {
        const response = await fetch('https://dragonball-api.com/api/planets');
        const data = await response.json();
        const planetas = data.items || data;
        const lista = document.getElementById('planetasLista');
        lista.innerHTML = '';

        planetas.forEach(planeta => {
          const card = document.createElement('div');
          card.className = 'planeta-card';
          card.innerHTML = `
            <a href="planetas.html?id=${planeta.id}">
              <img src="${planeta.image}" alt="${planeta.name}">
              <span>${planeta.name}</span>
            </a>
          `;
          lista.appendChild(card);
        });
      } catch (error) {
        document.getElementById('planetasLista').innerHTML = '<p>Error cargando planetas.</p>';
      }
    }

    cargarPlanetas();

     // Obtener el parámetro de la URL (ejemplo: planetas.html?id=1)
    const params = new URLSearchParams(window.location.search);
    let planetId = parseInt(params.get('id')) || 1;

    async function loadPlanet(planetId = 1) {
      try {
        const response = await fetch(`https://dragonball-api.com/api/planets/${planetId}`);
        const data = await response.json();

        const container = document.getElementById("characters");
        container.innerHTML = "";

        // Mostrar la información del planeta
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h1>${data.name}</h1>
          <img src="${data.image}" alt="${data.name}">
          <p>${data.description || "Sin descripción disponible."}</p>
        `;
        container.appendChild(card);

        // Controles para navegar entre planetas por ID
        const navigation = document.createElement("div");
        navigation.className = "pagination";

        if (planetId > 1) {
          const prevBtn = document.createElement("button");
          prevBtn.textContent = "⬅️ Anterior";
          prevBtn.onclick = () => {
            window.location.search = `?id=${planetId - 1}`;
          };
          navigation.appendChild(prevBtn);
        }

        const maxPlanets = 20; // Ajusta según la cantidad real de planetas

        if (planetId < maxPlanets) {
          const nextBtn = document.createElement("button");
          nextBtn.textContent = "Siguiente ➡️";
          nextBtn.onclick = () => {
            window.location.search = `?id=${planetId + 1}`;
          };
          navigation.appendChild(nextBtn);
        }

        container.appendChild(navigation);

      } catch (error) {
        console.error("Error cargando planeta:", error);
        document.getElementById("characters").innerHTML = "<p>Error cargando planeta.</p>";
      }
}

    loadPlanet(planetId);