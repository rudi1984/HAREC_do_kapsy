# Vývoj, verze a nasazení

## Workflow

1. Otevřít GitHub Issue s cílem a kritérii přijetí změny.
2. Upravit soubory v nové větvi nebo přímo v pracovní kopii; pokud se mění data, doložit zdroj.
3. Spustit `python scripts/validate_questions.py questions.json` a `node --check app.js && node --check sw.js` (Node je volitelný).
4. Ověřit mobilní rozhraní, scénáře testování a offline použití.
5. Aktualizovat `CHANGELOG.md`, relevantní dokumentaci a číslo verze v rozhraní.
6. Při vydání PWA změnit jméno cache v `sw.js`, aby šla nová verze nainstalovat.
7. Publikovat na GitHub Pages, ověřit běh aplikace online a offline.

## Nahrání aktualizace do GitHub Pages

V repozitáři používaném jako zdroj GitHub Pages přepište **všechny aplikační soubory** v kořeni: `index.html`, `styles.css`, `app.js`, `questions.json`, `sw.js`, `manifest.json`. Ponechte ikony, nebo nahrajte celý balíček pro úplnou instalaci. Stejnou změnou přidejte dokumentaci v `docs/`, `CHANGELOG.md`, `README.md`, `scripts/` a `.github/workflows/`.

**Pozor:** nahrání ZIP archivu jako jediného souboru na GitHub nestačí. Jeho obsah je potřeba rozbalit. Pro zachování složek a skrytého adresáře `.github` může být nejpohodlnější lokální Git nebo webové vytvoření jednotlivých souborů.

## Umístění obsahu

`questions.json` se generuje z importovaného exportu a je nasazený staticky. Neprovádět neověřené živé přepisování z externího API. S aktualizací odpovědí případně zachovat `id` stávajících otázek, pokud se nezměnila jejich identita; jinak zajistit migraci historie.

## Zásady dokumentace

- README: co aplikace dělá a jak ji spustit.
- CHANGELOG: co se změnilo v jednotlivých verzích.
- `docs/user-guide.md`: jak se používá.
- `docs/architecture.md`: jak funguje.
- `docs/data-sources.md`: odkud data pocházejí a s jakou jistotou.
- `docs/testing.md`: co se ověřuje a co zbývá.

## Opravy a vydání

Při každém vydání zapsat výsledky testů, známé chyby a datový původ. Nikdy nezaměňovat „automatická kontrola prošla“ s „obsah je odborně ověřen“.
