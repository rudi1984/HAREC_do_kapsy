# Původ a ověřování dat

## Základ databáze

V aplikaci v0.8 je **584 otázek pro třídu A**, převzatých z uživatelem poskytnutého exportu souvisejícího s [HamOtazky.cz](https://hamotazky.cz/). Původní dodané soubory: `hamtest-A_N.json` a `hamtest.sqlite3`. Export obsahoval jak správné odpovědi, tak dvě navržené nesprávné možnosti u každé otázky. Do aplikace byla převedena podmnožina pro třídu A do `questions.json`; samostatná databáze NOVICE zatím není součástí aplikace.

## Úroveň ověření

- **Strukturálně kontrolováno:** počet otázek, unikátní ID, tři varianty a jedna označená správná odpověď, nepřítomnost doslova shodných možností.
- **Není kompletně odborně ověřeno:** věcná správnost všech odpovědí, právní změny, bandplány, vhodnost jednotlivých nesprávných variant.
- **Není potvrzeno:** zda dvě nesprávné možnosti odpovídají možnostem u skutečné zkoušky ČTÚ. Nepředpokládáme to.

## Autoritativní externí dokumentace

- [ČTÚ: druhy průkazů](https://ctu.gov.cz/druhy-prukazu) – ověřovat aktuální sadu zkouškových otázek.
- [ČTÚ: průkazy a zkoušky](https://ctu.gov.cz/prukazy-zkousky).
- [CEPT T/R 61-01](https://docdb.cept.org/document/925) a [T/R 61-02](https://docdb.cept.org/document/927) – při odkazování kontrolovat platné revize.
- [IARU Region 1](https://www.iaru-r1.org/) – bandplány a provozní doporučení.

Odkazy slouží jako rozcestník. **Přítomnost odkazu nezakládá tvrzení, že současná databáze byla proti dokumentu ověřena.**

## Licence a další šíření

[Veřejný GitHub HamOtazky.cz](https://github.com/filipmelik/hamotazky) uvádí licenci MIT k projektu. Licenci aplikačního kódu nelze automaticky zaměňovat za potvrzení práv ke všem textům v exportované databázi, včetně původních otázek ČTÚ a autorských distraktorů. Před veřejným vydáním ověřit oprávnění a podmínky atribuce s autorem / držiteli práv. Do té doby nedeklarovat aplikaci jako oficiální ani tvrdit, že celý obsah je pod MIT.

## Postup kontroly jednotlivých otázek

1. Zjistit identifikátor `id` a původní `code` v `questions.json`.
2. Ověřit shodu zadání a označené správné odpovědi s aktuálním oficiálním zdrojem.
3. Ručně posoudit obě nesprávné možnosti; nemusí být logicky nebo právně jednoznačné.
4. Při sporné otázce založit Issue s datem, zdrojem a návrhem opravy.
5. Při změně dat provést `python scripts/validate_questions.py questions.json` a reálný test PWA.

**Základní pravidlo:** technický průchod validátorem není odborné potvrzení správnosti.
