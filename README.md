# 🧵 Business Tracker — Vállalkozás napló

Kézműves vállalkozásokhoz (táska, horgolás, stb.) készült, telefonra optimalizált napló: termékek, bevételek, kiadások, árkalkulátor és statisztikák — **több, egymástól elkülönített vállalkozással**.

**Minden adat kizárólag a saját eszközödön tárolódik** (böngésző IndexedDB). Nincs szerver, nincs felhő, nincs regisztráció.

---

## ✨ Funkciók

- **Több vállalkozás** — válts a fejlécben lévő gombbal vállalkozások között (pl. Táska, Horgolás), mindegyiknek külön termékei, bevételei, kiadásai vannak. Induláskor egy **demó vállalkozás** fiktív adatokkal segít kipróbálni az appot — bármikor törölhető a vállalkozás-váltóban.
- **Kezdőlap** — havi bevétel/kiadás/profit összegző kártya, 6 havi trend grafikon, gyorsgombok, csatornánkénti havi bevétel-sávok, legutóbbi tételek.
- **Termékek** — kártyás nézet fotóval, kategóriával, készlettel, önköltséggel és árral.
- **Pénzügyek** — Bevételek (termék, mennyiség, egységár, csatorna — a jutalék tételenként felülírható, az összege külön is látszik) és Kiadások (kategória, leírás, összeg) — mindkettőhöz megjegyzés, címkék és fizetési mód is rögzíthető; a postaköltség egy kiadás-kategória.
- **Árkalkulátor** — anyagköltség + munkadíj (idő × órabér) × fejlesztési % = bevétel; a csatorna jutaléka alapján ajánlott eladási ár. Menthető presetként vagy közvetlenül termékké alakítható.
- **Statisztika** — havi/negyedéves/éves vagy egy kiválasztott hónapra szűrhető nézet; bevétel/kiadás/profit trend, sok mutató (rendelésszám, átlagos kosárérték, profit ráta, összes jutalék, kiadás/bevétel arány, legjobb időszak, növekedés %), kiadás- és csatorna-megoszlás, top termékek, népszerű címkék.
- **Jegyzetek** — szabad szöveges, kitűzhető jegyzetek.
- **Beállítások** — csatornák és kategóriák szerkesztése, Excel importálás (automatikus oszlop-felismeréssel), teljes JSON export/import mentés, világos/sötét téma, tárhelyhasználat.
- **PWA** — telepíthető a telefon kezdőképernyőjére, offline is működik.

## 📄 Minta importfájl

A `minta_import.xlsx` a régi raktár/bevétel/kiadás excelből lett automatikusan rendszerezve — a Beállítások → Excel importálás funkcióval egy az egyben betölthető (a program felismeri az oszlopokat, mappelés nélkül). A fájl "Olvass el" lapja elmagyarázza, milyen döntésekkel (dátumbecslés, jutalék kezelése) állt össze.

---

## 🚀 Publikálás GitHub Pages-re

1. Hozz létre egy repót (pl. `business-tracker`).
2. Töltsd fel: `index.html`, `manifest.json`, `sw.js`, `icon.svg`.
3. **Settings → Pages → Source: „Deploy from a branch"**, ág: `main`, mappa: `/ (root)` → **Save**.
4. 1–2 perc múlva elérhető: `https://<felhasznalonev>.github.io/business-tracker/`

## 📲 Telepítés telefonra (Chrome, Android)

1. Nyisd meg a `github.io` címet Chrome-ban.
2. **⋮ menü → „Alkalmazás telepítése"**.

> **iPhone (Safari):** Megosztás → „Add to Home Screen".

---

## 💾 Adatok és biztonsági mentés

- Minden adat ezen az egy eszközön, a böngésző IndexedDB-jében tárolódik.
- ⚠️ **Telepítsd az appot a kezdőképernyőre**, hogy a böngésző ne törölhesse a tárhelyet újraindításkor.
- Rendszeresen készíts **Beállítások → Exportálás** biztonsági mentést (JSON fájl, fotókkal együtt) — ez túléli a böngésző-ürítést és eszközváltást is.

---

## 🛠️ Technikai részletek

- Egyetlen `index.html` — React 18 + Babel standalone (@7) CDN-ről, build lépés nélkül.
- Tailwind CSS CDN, Chart.js a grafikonokhoz, SheetJS (xlsx) az Excel importhoz (igény szerint töltődik be).
- Adattárolás: IndexedDB (`business_tracker_db`), `businessId` szerint elkülönítve.
- Service worker (`sw.js`) az offline működéshez.

Helyi futtatás:
```bash
python -m http.server 8130
```
majd nyisd meg: `http://localhost:8130`
