# Strona internetowa — Restauracja Chleb i Wino, Solec-Zdrój

Statyczna strona w czystym HTML, CSS i JavaScripcie. Bez frameworków, bez bazy danych,
bez systemu CMS — dzięki temu hosting jest **darmowy albo prawie darmowy**, strona ładuje
się błyskawicznie i nie wymaga aktualizacji bezpieczeństwa.

---

## 1. Co jest w środku

```
strona/
├── index.html        strona główna
├── menu.html         pełna karta dań + skany oryginalnej karty
├── o-nas.html        o restauracji, opinie gości
├── kontakt.html      dane kontaktowe, godziny, mapa, FAQ
├── 404.html          strona błędu
├── en/               wersja angielska
│   ├── index.html
│   ├── menu.html
│   ├── about.html
│   └── contact.html
├── robots.txt        dla wyszukiwarek
├── sitemap.xml       mapa strony dla Google
├── css/style.css     wszystkie style (jeden plik, wspólny dla obu języków)
├── js/main.js        menu mobilne, animacje, drobiazgi (wykrywa język sam)
└── img/
    ├── logo.jpg
    ├── wnetrze.jpg
    └── menu/         skany karty (menu1–menu6)
```

Cała witryna waży poniżej 1 MB. Obie wersje językowe korzystają z tego samego
arkusza stylów, tego samego skryptu i tych samych zdjęć — angielskie strony
dokładają zaledwie ok. 85 kB.

---

## 2. Uruchomienie lokalnie (podgląd na własnym komputerze)

Najprościej: kliknąć dwukrotnie `index.html`.

Jeśli chcesz podglądu „jak na serwerze" (żeby działały ścieżki `/`), uruchom w folderze `strona`:

```bash
python -m http.server 5173
```

i wejdź na `http://localhost:5173`.

---

## 3. Publikacja — trzy tanie warianty

### Wariant A: Cloudflare Pages (zalecany, 0 zł)

1. Załóż darmowe konto na [pages.cloudflare.com](https://pages.cloudflare.com).
2. Wybierz **Create a project → Direct Upload**.
3. Przeciągnij zawartość folderu `strona` (nie sam folder — jego zawartość).
4. Gotowe. Dostaniesz adres typu `chlebiwino.pages.dev`.
5. Własna domena: zakładka **Custom domains** → wpisz swoją domenę → Cloudflare pokaże,
   jakie rekordy DNS ustawić u rejestratora.

Koszt: **0 zł/rok** za hosting. Płacisz tylko za domenę (ok. 60–100 zł/rok).
Certyfikat SSL (kłódka HTTPS) jest w cenie, automatycznie i na zawsze.

### Wariant B: GitHub Pages (0 zł)

1. Załóż konto na [github.com](https://github.com), utwórz repozytorium.
2. Wgraj zawartość folderu `strona`.
3. **Settings → Pages → Source: Deploy from a branch → main / (root)**.
4. Domena własna: pole **Custom domain** + rekordy DNS u rejestratora.

### Wariant C: zwykły hosting FTP (np. u operatora domeny)

Wgraj zawartość folderu `strona` do katalogu `public_html` (lub `www`) przez FTP.
Koszt najtańszych pakietów: ok. 50–150 zł/rok razem z domeną.

**Podsumowanie kosztów:** realnie **60–150 zł rocznie** — tylko domena.
Nie ma abonamentu, wtyczek ani opłat za utrzymanie.

---

## 4. ZANIM OPUBLIKUJESZ — lista rzeczy do sprawdzenia

Kilka danych trzeba potwierdzić lub uzupełnić. Są oznaczone poniżej.

### 4.1 Adres — do potwierdzenia ❗

W materiałach źródłowych występują **dwie wersje adresu**:

| Źródło | Adres |
|---|---|
| Wizytówka Google Maps | ul. 1 Maja **1D**, 28-131 Solec-Zdrój |
| Post na Facebooku | ul. 1 Maja **1a**, podziemia budynku Willa „Prus" |

Na stronie użyto wersji z Google Maps (**1D**), bo to ona kieruje nawigację.
Jeśli poprawny jest inny numer — popraw go w plikach:
`index.html`, `menu.html`, `o-nas.html`, `kontakt.html` (stopka + sekcja kontaktu)
oraz w bloku danych strukturalnych w `index.html`.

### 4.2 Godziny otwarcia

Wpisane godziny:

| Dzień | Godziny |
|---|---|
| poniedziałek – czwartek | 08:00 – 20:00 |
| piątek – sobota | 08:00 – 21:00 |
| niedziela | 08:00 – 20:00 |

Jeśli kiedykolwiek się zmienią, popraw je w **dwóch** miejscach:
- `kontakt.html` → tabela `<table class="godziny">`
- `index.html` → blok `openingHoursSpecification` w danych strukturalnych

Ważne, żeby godziny na stronie zgadzały się z wizytówką Google — rozbieżności
generują negatywne opinie (jedna taka już jest w Google).

### 4.3 Domena

Wszystkie adresy w plikach wskazują na przykładową domenę `chlebiwino-solec.pl`.
Po zakupie właściwej domeny podmień ją globalnie w plikach `.html`, `robots.txt`
i `sitemap.xml`. W edytorze tekstu: „Zamień wszystko” → `chlebiwino-solec.pl` → Twoja domena.

Propozycje domen do sprawdzenia: `chlebiwino.pl`, `chlebiwino-solec.pl`,
`restauracjachlebiwino.pl`.

### 4.4 E-mail

Strona nie zawiera adresu e-mail, bo nie było go w materiałach. Jeśli restauracja
ma skrzynkę, warto ją dodać w `kontakt.html` w liście `<ul class="dane">` oraz w stopkach.

### 4.5 Zdjęcia

Dostępne było jedno zdjęcie wnętrza (960 × 540 px). Na dużych ekranach jest lekko
miękkie. **To największy potencjał poprawy tej strony** — kilka dobrych zdjęć
(sala, talerze, chleb, ogródek, zespół) w rozdzielczości min. 1920 px szerokości
zmieni odbiór strony bardziej niż jakakolwiek zmiana kodu.

Gdzie wstawić nowe zdjęcia:
- tło sekcji powitalnej: `css/style.css` → `.hero__bg` (obecnie `img/wnetrze.jpg`)
- zdjęcia przy tekstach: `index.html` i `o-nas.html` → `<div class="duet__foto">`

### 4.6 Logo

Plik `img/logo.jpg` ma szeroki pusty margines wokół znaku. W nagłówku i stopce
logo pokazywane jest w **okrągłej pieczęci** (klasa `.znak` w `css/style.css`),
powiększone o 34%, żeby wypełniło koło — tak jak wygląda na wizytówce Google
i Facebooku. Nie trzeba do tego osobnego pliku graficznego.

Rozmiary: nagłówek 54 px, stopka 88 px (`.znak--duzy`). Żeby zmienić wielkość,
wystarczy poprawić `width` i `height` — reszta przeliczy się sama.

### 4.7 Liczba opinii

Na stronie celowo nie ma dokładnej liczby opinii (jest „ponad 200"), żeby treść
nie dezaktualizowała się z każdym nowym wpisem w Google. Z tego samego powodu
w danych strukturalnych nie ma pola `aggregateRating` — Google i tak pobiera
ocenę bezpośrednio z wizytówki firmy.

---

## 5. Po publikacji — 4 kroki, które dadzą najwięcej ruchu

1. **Wizytówka Google** — w Profilu Firmy w Google podmień link z Facebooka na adres
   nowej strony (pole „Witryna"). To najważniejszy pojedynczy krok: większość gości
   trafia do Was właśnie przez Google Maps.
2. **Google Search Console** — [search.google.com/search-console](https://search.google.com/search-console),
   dodaj domenę i zgłoś `sitemap.xml`. Darmowe, pokazuje na jakie frazy Was znajdują.
3. **Facebook i Instagram** — wstaw adres strony w polu „Strona internetowa" w obu profilach.
4. **Dane strukturalne** — sprawdź stronę w [search.google.com/test/rich-results](https://search.google.com/test/rich-results).
   Powinny wykryć się typy `Restaurant`, `Menu` i `FAQPage` — dzięki nim Google
   wyświetla w wynikach ocenę, godziny i pytania.

---

## 6. Jak samodzielnie zmienić ceny lub dania

Wszystko jest zwykłym tekstem w `menu.html`. Jedna pozycja wygląda tak:

```html
<article class="danie">
  <h3 class="danie__nazwa">Filet z sandacza</h3>
  <span class="danie__cena">67 zł</span>
  <p class="danie__opis">kimchi / puree z marchewki / won ton z warzywami</p>
</article>
```

Zmiana ceny = zmiana liczby między `<span class="danie__cena">` a `</span>`.
Nowe danie = skopiowanie całego bloku `<article>…</article>` i podmiana tekstu.

Etykietę „wege" dodaje się w nazwie dania:
```html
<h3 class="danie__nazwa">Pappardelle <span class="danie__tag">wege</span></h3>
```

Po każdej zmianie wgraj plik ponownie na hosting.

**Uwaga:** karta zmienia się sezonowo — warto ustawić sobie przypomnienie
na aktualizację przy każdej zmianie menu w restauracji.

### Zastrzeżenie o cenach

Ceny na stronie zawsze będą się kiedyś rozjeżdżać z tymi w lokalu — choćby
przez podwyżkę wprowadzoną z dnia na dzień. Dlatego przy cenach jest widoczna
gwiazdka z informacją, że ceny są orientacyjne, a wiążąca jest karta dostępna
w restauracji. Występuje w czterech miejscach:

| Strona | Forma |
|---|---|
| `menu.html` i `en/menu.html` | ramka z gwiazdką pod nagłówkiem + powtórzenie na dole karty |
| `index.html` i `en/index.html` | jedna linijka pod polecanymi daniami |
| `o-nas.html` i `en/about.html` | jedna linijka pod cenami chleba |

To zabezpiecza restaurację przed zarzutem, że strona wprowadza w błąd —
ale **nie zwalnia z aktualizowania cen**. Gość, który zobaczy 49 zł,
a zapłaci 59 zł, zostawi złą opinię niezależnie od gwiazdki.

Klasa CSS: `.zastrzezenie` (ramka) i `.zastrzezenie--drobne` (jedna linijka).

---

## 7. Jak działają przyciski „Zadzwoń" / „Zarezerwuj stolik"

Wszystkie takie przyciski to linki telefoniczne (`tel:`). Zachowują się różnie
w zależności od urządzenia:

| Urządzenie | Co się dzieje po kliknięciu |
|---|---|
| **Telefon** (Android, iPhone) | Otwiera się aplikacja dzwonienia z wpisanym numerem. Gość tylko potwierdza połączenie. |
| **Komputer** | Sam link `tel:` zwykle nie robi nic. Dlatego strona otwiera **okienko z numerem** i przyciskiem „Kopiuj numer". |

To okno powstaje automatycznie w `js/main.js` — nie ma go w plikach HTML,
więc nie trzeba go nigdzie powielać. Na telefonach w ogóle się nie uruchamia,
żeby nie przeszkadzać w dzwonieniu.

Gdyby kopiowanie zostało zablokowane przez przeglądarkę, numer zostaje
zaznaczony, a przycisk podpowiada „Naciśnij Ctrl+C". Przycisk nigdy nie
zostaje bez reakcji.

**Alternatywa na przyszłość:** jeśli restauracja zacznie przyjmować rezerwacje
mailem lub przez system rezerwacyjny, w tym samym oknie można dołożyć drugi
przycisk. Póki co telefon jest jedyną drogą podaną przez restaurację.

---

## 8. Wersja angielska

W prawym górnym rogu każdej strony jest przełącznik **PL / EN**. To zwykłe
linki — działają nawet przy wyłączonym JavaScripcie i prowadzą zawsze na
**odpowiadającą** stronę, a nie na stronę główną:

| Polski | Angielski |
|---|---|
| `index.html` | `en/index.html` |
| `menu.html` | `en/menu.html` |
| `o-nas.html` | `en/about.html` |
| `kontakt.html` | `en/contact.html` |

**Dlaczego osobne pliki, a nie przełączanie tekstu JavaScriptem?**
Bo tylko wtedy każda wersja ma własny adres, własny tytuł w Google i własny
atrybut `lang` (ważny dla czytników ekranu i automatycznych tłumaczeń).
Google indeksuje wtedy obie wersje osobno. Znaczniki `hreflang` w nagłówkach
oraz wpisy w `sitemap.xml` mówią wyszukiwarce, że to ta sama treść w dwóch
językach — dzięki temu Google pokaże Anglikowi wersję angielską, a Polakowi
polską, i nie potraktuje ich jako duplikatu.

### Koszt utrzymania — o czym trzeba pamiętać

**Zmiana ceny lub dania trzeba wprowadzić w dwóch plikach:** `menu.html`
i `en/menu.html`. Struktura jest identyczna, więc wystarczy znaleźć tę samą
pozycję i poprawić liczbę.

To jedyna realna niedogodność tego rozwiązania. Jeżeli okaże się uciążliwa,
najprostszym wyjściem jest zostawić angielską kartę bez cen i dopisać zdanie
„prices as in the Polish menu” — wtedy sezonowe zmiany poprawia się tylko raz.

### Jeśli kiedyś dojdzie trzeci język

Skopiuj folder `en`, przetłumacz teksty, zmień `lang="..."` w znaczniku `<html>`,
dopisz nowy `hreflang` we wszystkich stronach i dodaj trzeci link w bloku
`<div class="jezyk">`. Skrypt `js/main.js` sam rozpozna język strony —
teksty okienka z telefonem dopisuje się w obiekcie `T` na początku sekcji 4b.

---

## 9. Zgodność i drobiazgi techniczne

- **RODO / ciasteczka:** strona nie używa ciasteczek ani analityki, więc nie
  wymaga banera zgody. Wyjątek: mapa Google na stronie kontaktu ładuje się
  z serwerów Google. Jeśli chcesz uniknąć nawet tego, zamień iframe w `kontakt.html`
  na zwykły link „Zobacz na mapie".
- **Czcionki** pobierane są z Google Fonts. Gdyby nie były dostępne, strona
  automatycznie użyje czcionek systemowych i nadal wygląda poprawnie.
- **Dostępność:** kontrasty, nawigacja klawiaturą, opisy alternatywne obrazków
  i link „Przejdź do treści" są na miejscu.
- **Wydruk:** karta dań ma osobne style do druku — `Ctrl+P` na `menu.html`
  daje czytelny wydruk bez nawigacji i tła.
- **Bez zależności:** żadnych bibliotek zewnętrznych, żadnego `npm`, żadnych
  aktualizacji do pilnowania.
