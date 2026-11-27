# HAREC do kapsy

**Neoficiální vzdělávací PWA** pro přípravu na českou radioamatérskou zkoušku HAREC, třída A. Aplikace se spouští v moderním prohlížeči nebo přes ikonu na ploše telefonu. Po prvním úplném načtení umožňuje procvičování bez internetu.

**Verze:** 0.8 beta · **Databáze:** 584 otázek pro třídu A z uživatelem poskytnutého exportu HamOtazky.cz (základ srpen 2025). **Pozor:** Databáze není kompletně nezávisle zkontrolována vůči aktuálním materiálům ČTÚ. Aplikace není oficiálním produktem ČTÚ ani HamOtazky.cz.

## Spuštění a instalace

- Webová aplikace: [Spustit aplikaci](https://rudi1984.github.io/HAREC_do_kapsy/)
- Android (Chrome): otevřete web → nabídka prohlížeče → **Nainstalovat aplikaci** nebo **Přidat na plochu**.
- Na počítači lze aplikaci otevřít přímo v prohlížeči.
- Pro offline provoz nejprve aplikaci jednou **kompletně načtěte online**. Potom lze otestovat režim letadlo.

## Funkce

- Rychlé procvičování 10 otázek, vlastní filtr podle oblasti a podtématu.
- Test A/B/C, studijní kartičky s odhalením správné odpovědi, opakování chybných otázek.
- Výsledek série a opakování chyb z právě dokončené série.
- Lokální statistiky a export zálohy JSON (obnova z exportu zatím **není implementována**).
- PWA pro mobil a běžný prohlížeč, offline podpora po prvním načtení.

## Stav projektu a omezení

Beta software. Alternativní odpovědi převzaté z HamOtazky.cz nejsou oficiálními nesprávnými možnostmi ČTÚ. Podmínky případného veřejného přebírání a šíření databázového obsahu ještě vyžadují posouzení. Výukové komentáře, simulace oficiální struktury zkoušky a synchronizace mezi zařízeními nejsou součástí 0.8. Údaje zůstávají na zařízení, dokud je uživatel nesmaže.

## Technický základ

HTML, CSS, **Vanilla JavaScript**, JSON, Service Worker, Cache API, localStorage a GitHub Pages. Pro kontrolu databáze Python 3 (standardní knihovna). Bez backendu a bez povinných instalovaných JS balíčků.

## Vývoj a dokumentace

- [Uživatelská příručka](docs/user-guide.md)
- [Architektura aplikace](docs/architecture.md)
- [Zdroje otázek, licence a původ dat](docs/data-sources.md)
- [Postup vývoje a nasazení](docs/development.md)
- [Testovací postup a přístupnost](docs/testing.md)
- [Historie verzí](CHANGELOG.md)

### Lokální spuštění

```bash
python -m http.server 8000
```

Pak otevřete `http://localhost:8000`. Service Worker se typicky používá při nasazení na HTTPS; prohlížeče podporují i výjimku pro `localhost`. Pro běžný lokální test lze stránku jednoduše načíst jako web, ne přímo otevřením `file://`, protože `fetch()` načítá JSON.

### Kontrola databáze

```bash
python scripts/validate_questions.py questions.json
```

Kontroluje **strukturu**, nikoliv odbornou správnost odpovědí. Kontrola se spouští také ve workflow GitHub Actions při změnách kódu nebo dat.

## Příspěvky a hlášení problémů

Problém s konkrétní otázkou lze nahlásit přímo z testu odkazem na GitHub Issues. Uveďte kód otázky, důvod a ověřitelný zdroj. Úpravy databáze nesmí být vydávány za oficiální změny ČTÚ bez ověření.

## Práva a licence

Zdrojový repozitář HamOtazky.cz uvádí licenci MIT pro svůj kód. **Tento údaj sám o sobě neprokazuje, že všechny exportované otázky a autorské distraktory lze bez dalších podmínek veřejně šířit.** Pro tento projekt zatím není určena definitivní licence; není správné přidělit mu jednostranně MIT jako celku. Před veřejným oznámením a přebíráním dat je třeba ověřit práva a atribuci. Podrobnosti viz [data-sources.md](docs/data-sources.md).
