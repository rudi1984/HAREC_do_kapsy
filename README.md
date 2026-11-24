# HAREC do kapsy – v0.7 beta

Offline-first vzdělávací PWA. Není oficiálním produktem ČTÚ ani HamOtazky.cz.

## Data
584 otázek třídy A filtrovaných z uživatelem dodaných souborů `hamtest-A_N.json` a `hamtest.sqlite3` ze služby HamOtazky.cz. Datový základ označen srpen 2025. Správné odpovědi a dvě alternativy byly převzaty beze změn z nahraného exportu. Kompletní odborné ověření proti ČTÚ 05/2026 ani oprávnění k veřejnému převzetí databázového obsahu nejsou dokončeny. Před veřejným vydáním ověřit licenci a aktuálnost.

## Nasazení
Nahrát všechny soubory z balíčku do kořene GitHub Pages repozitáře, přepsat původní `index.html` a `sw.js`, neodstraňovat lokální data prohlížeče. `questions.json`, `app.js`, `styles.css` jsou nově povinné soubory. GitHub Pages: branch main, /root.

## Ukládání
Nový pokrok: localStorage `harec-ham-A-v07` s identifikátory `ham-<id>`. Starší klíče `harec-v1` a `harec-bank-2025` zůstávají beze změny. Součástí aplikace je export zálohy starých i nových výsledků.
