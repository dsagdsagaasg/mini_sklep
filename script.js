async function pobierzKurs(waluta) { //pobiera kursy z API NBP
  if (waluta === 'pln') return 1;

  try {
    const adres = `https://api.nbp.pl/api/exchangerates/rates/a/${waluta}?format=json`;
    const odp = await fetch(adres);

    if (odp.ok) {
      const dane = await odp.json();
      const kurs = dane.rates[0].mid;
      return kurs;
    } else {
      return 1;
    }
  } catch (err) {
    return 1;
  }
}

async function przeliczCeny() { //faktyczna funkcja przeliczająca
  let wybranaWaluta = document.getElementById("currency").value;
  let kurs = await pobierzKurs(wybranaWaluta);
  let produkty = document.querySelectorAll(".product");

  for (let i = 0; i < produkty.length; i++) {
    let p = produkty[i];
    let cenaPln = parseFloat(p.dataset.price);
    let cenaNowa = cenaPln / kurs;
    let tekstWaluty = wybranaWaluta.toUpperCase();
    p.querySelector(".price").textContent = `${cenaNowa.toFixed(2)} ${tekstWaluty}`;
  }
}

window.addEventListener("DOMContentLoaded", function () { //dodatkowa funkcja, żeby po refreshu strony wracało defaultowo na PLN
  document.getElementById("currency").value = "pln";
  przeliczCeny();
});
