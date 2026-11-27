# Historie změn

Formát vychází z principů Keep a Changelog. Verze před 0.7 jsou zrekonstruovány pouze ve stručnosti podle dostupného vývojového přehledu; nejsou zde vydávány za ověřený Git log.

## [0.8.0-beta] – 2026-11-27

### Přidáno
- Mobilní úvodní obrazovka se zkratkami pro rychlý test, vlastní test, učení a chyby.
- Přehledná testová obrazovka s většími odpověďmi, samostatná stránka výsledků, opakování chyb z aktuální série.
- Textový indikátor dostupné aktualizace PWA (instalace aktualizace vyžaduje potvrzení uživatelem).
- Dokumentace, Python validátor a GitHub Actions kontrola dat.

### Změněno
- Výraznější typografická hierarchie, větší mobilní dotykové cíle a přístupnější stav odpovědi.
- Data verzí 0.7 a 0.8 používají **stejný localStorage klíč**, takže statistiky zůstávají zachované.
- Service Worker již nepřepíná novou verzi automaticky během rozpracované série, pokud ji nová aplikace nainstaluje v režimu čekání.

### Bez změny
- Databáze zůstává totožná s v0.7: 584 otázek ze souboru `questions.json`.
- Není přidána automatická synchronizace ani import zálohy.

## [0.7.0-beta] – 2026-11-23
- Import 584 otázek třídy A ze strukturovaného exportu HamOtazky.cz.
- Oddělení `questions.json`, `app.js`, `styles.css`, PWA offline režim a lokalizované statistiky.

## [0.6-beta] – historický přehled
- 573 otázek A/B/C s autorsky doplněnými alternativami; později nahrazeno databází 0.7.
