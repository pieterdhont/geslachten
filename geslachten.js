"use strict";

initialiseerFilters();

function initialiseerFilters() {
  haalPersonenOp();
  const filters = {
    toonAllen: "allen",
    toonMannen: "man",
    toonVrouwen: "vrouw",
    toonX: "x", 
  };

  Object.keys(filters).forEach((id) => {
    document.getElementById(id).addEventListener("click", () => {
      haalPersonenOp(filters[id]);
    });
  });
}

async function haalPersonenOp(filter) {
  const response = await fetch("geslachten.json");

  if (response.ok) {
    const personen = await response.json();
    const gefilterdePersonen =
      filter === "allen"
        ? personen
        : personen.filter((persoon) => persoon.geslacht === filter);
    toonGefilterdePersonen(gefilterdePersonen);
  } else {
    document.getElementById("nietGevonden").hidden = false;
  }
}

function toonGefilterdePersonen(personen) {
  const personenLijst = document.getElementById("personenLijst");
  personenLijst.innerHTML = "";

  personen.forEach((persoon) => {
    const persoonElement = document.createElement("div");
    persoonElement.className = "persoon";

    persoonElement.innerHTML = `<span class="kolom">${persoon.voornaam}</span>
        <span class="kolom">${persoon.familienaam}</span>
        <img src="${persoon.geslacht}.png" alt="${persoon.geslacht}">
        <img src="${persoon.foto}" alt="${persoon.voornaam} ${persoon.familienaam}">`;

    personenLijst.appendChild(persoonElement);
  });
}
