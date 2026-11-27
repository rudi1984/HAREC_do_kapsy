# Testování a přístupnost

## Automatické kontroly

`python scripts/validate_questions.py questions.json` ověřuje strukturu otázek, unikátnost identifikátorů, typy polí, jednu správnou odpověď a různost variant. GitHub Actions `.github/workflows/validate.yml` skript spouští na push a pull request.

Je-li dostupný Node.js: `node --check app.js` a `node --check sw.js` ověří syntaxi. To není náhrada testování v prohlížeči.

## Ruční akceptační scénáře

| Scénář | Očekávaný výsledek |
|---|---|
| Rychlý test | Spustí 10 otázek |
| Vlastní filtr | Zobrazí správnou oblast, podtéma a dostupný počet |
| Správná/chybná odpověď | Odlišné zvýraznění, správná odpověď je vždy viditelná |
| Přeskočit | Neovlivní počet vyhodnocených, ve výsledku je samostatně |
| Učení | Nejprve odhalení odpovědi, potom Umím/Neumím |
| Opakování chyb | Nabídne dříve chybné otázky a také chyby dokončené série |
| Zavřít a znovu otevřít | Lokální statistiky zůstanou |
| Režim letadlo | Po přednačtení funguje bez internetu |
| Přejít z v0.7 na v0.8 | Klíč localStorage zůstane nezměněný |
| Aktualizace | Oznámení, potvrzení, nový kód; nemažou se data |
| Mobil do 350 px | Žádné vodorovné posouvání, odpovědi čitelné |

## Přístupnost

Doporučené cíle: WCAG 2.2 AA tam, kde je to prakticky proveditelné. V této beta verzi se používá skutečný text, popisky formulářů, stav odpovědi přes `role="status"`, barevné rozlišení doplněné textem, zřetelný focus a velké dotykové plochy.

Ještě ověřit ručně: čtečka TalkBack, 200% zoom, kontrasty, klávesnicové ovládání napříč přechody mezi obrazovkami, zobrazení při vypnutých animacích. **Neuvádíme, že aplikace byla certifikována podle WCAG.**

## Bezpečnost dat

Ukládaná data obsahují pouze průběh procvičování v zařízení. `localStorage` není zálohovaná cloudová služba. Export JSON má být uživateli dostupný, ale v0.8 není implementován import. Neinstalovat závislosti ani neimportovat cizí HTML bez prověření.
