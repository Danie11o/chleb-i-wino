/* =========================================================
   Chleb i Wino — skrypty witryny
   Bez bibliotek zewnętrznych. Wszystko jest opcjonalne:
   strona działa poprawnie także z wyłączonym JavaScriptem.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. Menu mobilne ---------- */
  var hamburger = document.querySelector(".hamburger");
  var nav = document.querySelector(".nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      var otwarte = nav.classList.toggle("otwarte");
      hamburger.setAttribute("aria-expanded", otwarte ? "true" : "false");
    });

    // zamknij po kliknięciu w link
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("otwarte");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });

    // zamknij klawiszem Esc
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("otwarte")) {
        nav.classList.remove("otwarte");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.focus();
      }
    });
  }

  /* ---------- 2. Cień nagłówka po przewinięciu ---------- */
  var header = document.querySelector(".header");
  if (header) {
    var przewijanie = function () {
      header.classList.toggle("przewiniety", window.scrollY > 12);
    };
    przewijanie();
    window.addEventListener("scroll", przewijanie, { passive: true });

    // Rzeczywista wysokość nagłówka trafia do zmiennej CSS. Dzięki temu
    // rozwijane menu i przyklejony pasek kategorii zawsze siadają dokładnie
    // pod nagłówkiem, niezależnie od szerokości ekranu i długości napisów.
    var zmierzNaglowek = function () {
      document.documentElement.style.setProperty(
        "--h-naglowek", header.offsetHeight + "px"
      );
    };
    zmierzNaglowek();
    window.addEventListener("resize", zmierzNaglowek);
    window.addEventListener("load", zmierzNaglowek);
  }

  /* ---------- 3. Delikatne wejście sekcji ---------- */
  var doAnimacji = document.querySelectorAll(".wjazd");
  if (doAnimacji.length) {
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(
        function (wpisy) {
          wpisy.forEach(function (w) {
            if (w.isIntersecting) {
              w.target.classList.add("widoczne");
              obs.unobserve(w.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
      );
      doAnimacji.forEach(function (el) { obs.observe(el); });

      // Bezpiecznik: gdyby obserwator z jakiegokolwiek powodu nie zadziałał,
      // po 2 sekundach pokazujemy wszystko. Treść nigdy nie zostaje ukryta.
      window.setTimeout(function () {
        doAnimacji.forEach(function (el) { el.classList.add("widoczne"); });
      }, 2000);
    } else {
      doAnimacji.forEach(function (el) { el.classList.add("widoczne"); });
    }
  }

  /* ---------- 4. Podświetlanie aktywnej kategorii w karcie menu ---------- */
  var linkiMenu = document.querySelectorAll(".menu-nawigacja a");
  if (linkiMenu.length && "IntersectionObserver" in window) {
    var sekcje = [];
    linkiMenu.forEach(function (a) {
      var cel = document.querySelector(a.getAttribute("href"));
      if (cel) sekcje.push({ link: a, sekcja: cel });
    });

    var obsMenu = new IntersectionObserver(
      function (wpisy) {
        wpisy.forEach(function (w) {
          if (!w.isIntersecting) return;
          linkiMenu.forEach(function (a) { a.classList.remove("aktywny"); });
          var trafiony = sekcje.find(function (s) { return s.sekcja === w.target; });
          if (trafiony) {
            trafiony.link.classList.add("aktywny");
            // Przewijamy WYŁĄCZNIE poziomy pasek kategorii — nigdy całą stronę.
            // (scrollIntoView przewijałby też dokument i blokował przewijanie myszką.)
            var pasek = trafiony.link.parentElement;
            var cel = trafiony.link.offsetLeft
                    - (pasek.clientWidth / 2)
                    + (trafiony.link.offsetWidth / 2);
            pasek.scrollTo({ left: cel, behavior: "smooth" });
          }
        });
      },
      { rootMargin: "-140px 0px -65% 0px" }
    );
    sekcje.forEach(function (s) { obsMenu.observe(s.sekcja); });
  }

  /* ---------- 4b. Kliknięcie w numer telefonu na komputerze ----------
     Na telefonie link tel: otwiera dzwonienie i zostawiamy go w spokoju.
     Na komputerze taki link zwykle nie robi NIC — przycisk wygląda na zepsuty.
     Dlatego pokazujemy okno z numerem: do przepisania albo skopiowania.
     Okno budujemy w JS, żeby nie powielać go w każdym pliku HTML. */
  var linkiTel = document.querySelectorAll('a[href^="tel:"]');
  var dotykowy = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  if (linkiTel.length && !dotykowy && typeof HTMLDialogElement === "function") {
    var okno = null;

    // teksty okna w wersji polskiej i angielskiej
    var ANG = document.documentElement.lang === "en";
    var T = ANG ? {
      zamknij: "Close",
      nad: "Table reservation",
      tytul: "Give us a call",
      opis: "We take reservations by phone, daily during opening hours.",
      kopiuj: "Copy number",
      ok: "Copied ✓",
      recznie: "Press Ctrl+C"
    } : {
      zamknij: "Zamknij",
      nad: "Rezerwacja stolika",
      tytul: "Zadzwoń do nas",
      opis: "Rezerwacje przyjmujemy telefonicznie, codziennie w godzinach otwarcia.",
      kopiuj: "Kopiuj numer",
      ok: "Skopiowano ✓",
      recznie: "Naciśnij Ctrl+C"
    };

    var zbudujOkno = function (numer, ladny) {
      var d = document.createElement("dialog");
      d.className = "okno-tel";
      d.innerHTML =
        '<div class="okno-tel__in">' +
          '<button class="okno-tel__zamknij" type="button" aria-label="' + T.zamknij + '">&times;</button>' +
          '<p class="nadtytul">' + T.nad + '</p>' +
          '<h2>' + T.tytul + '</h2>' +
          '<p>' + T.opis + '</p>' +
          '<a class="okno-tel__numer" href="' + numer + '">' + ladny + '</a>' +
          '<div class="btn-grupa" style="justify-content:center">' +
            '<button class="btn" type="button" data-kopiuj>' + T.kopiuj + '</button>' +
          '</div>' +
        '</div>';

      var przycisk = d.querySelector("[data-kopiuj]");
      var pierwotny = przycisk.textContent;

      przycisk.addEventListener("click", function () {
        var komunikat = function (tekst) {
          przycisk.textContent = tekst;
          window.setTimeout(function () { przycisk.textContent = pierwotny; }, 2600);
        };
        var udalo = function () { komunikat(T.ok); };

        // Gdy kopiowanie się nie uda (brak HTTPS, brak zgody przeglądarki),
        // zaznaczamy numer, żeby wystarczyło Ctrl+C. Przycisk zawsze reaguje.
        var zapasowo = function () {
          if (kopiujStarymSposobem(d)) udalo();
          else { zaznacz(d); komunikat(T.recznie); }
        };

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(ladny).then(udalo, zapasowo);
        } else {
          zapasowo();
        }
      });

      d.querySelector(".okno-tel__zamknij").addEventListener("click", function () { d.close(); });
      // kliknięcie w tło zamyka okno
      d.addEventListener("click", function (e) { if (e.target === d) d.close(); });

      document.body.appendChild(d);
      return d;
    };

    // zaznacza numer w oknie, żeby dało się go skopiować ręcznie
    var zaznacz = function (d) {
      try {
        var zakres = document.createRange();
        zakres.selectNodeContents(d.querySelector(".okno-tel__numer"));
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(zakres);
        return true;
      } catch (e) { return false; }
    };

    // starsza metoda kopiowania — działa też bez HTTPS
    var kopiujStarymSposobem = function (d) {
      try {
        return zaznacz(d) && document.execCommand("copy");
      } catch (e) { return false; }
    };

    linkiTel.forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        if (!okno) okno = zbudujOkno(a.getAttribute("href"), a.dataset.numer || "41 357 68 57");
        okno.showModal();
      });
    });
  }

  /* ---------- 5. Godziny otwarcia — podświetl dzisiejszy dzień ---------- */
  var tabelaGodzin = document.querySelector(".godziny");
  if (tabelaGodzin) {
    // getDay(): 0 = niedziela … 6 = sobota; wiersze w tabeli: pon…niedz
    var indeks = (new Date().getDay() + 6) % 7;
    var wiersze = tabelaGodzin.querySelectorAll("tbody tr");
    if (wiersze[indeks]) wiersze[indeks].classList.add("dzis");
  }

  /* ---------- 6. Rok w stopce ---------- */
  var rok = document.querySelector("[data-rok]");
  if (rok) rok.textContent = new Date().getFullYear();
})();
