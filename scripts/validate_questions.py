"""Validate the HAREC app JSON structure (not factual correctness)."""
import json
import sys
from pathlib import Path


def main(path: Path) -> int:
    try:
        raw = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        print(f"ERROR: Nelze načíst JSON: {exc}")
        return 2
    questions = raw.get("questions") if isinstance(raw, dict) else None
    if not isinstance(questions, list):
        print("ERROR: Kořenový objekt musí obsahovat pole 'questions'.")
        return 1
    errors = []
    if len(questions) != 584:
        errors.append(f"Počet otázek je {len(questions)}, očekáváno 584.")
    seen = set()
    for number, item in enumerate(questions, 1):
        if not isinstance(item, dict):
            errors.append(f"Položka {number}: není objekt")
            continue
        qid = item.get("id")
        prefix = f"Otázka {number} ({qid})"
        if not isinstance(qid, str) or not qid.strip():
            errors.append(f"{prefix}: chybí neprázdné id")
        elif qid in seen:
            errors.append(f"{prefix}: duplicitní id")
        seen.add(qid)
        for field in ("code", "question", "group", "topic"):
            value = item.get(field)
            if not isinstance(value, str) or not value.strip():
                errors.append(f"{prefix}: chybí textové pole {field}")
        options = item.get("options")
        if not isinstance(options, list) or len(options) != 3:
            errors.append(f"{prefix}: očekávány přesně 3 varianty")
        else:
            if any(not isinstance(option, str) or not option.strip() for option in options):
                errors.append(f"{prefix}: prázdná nebo netextová varianta")
            if len({option.strip().casefold() for option in options if isinstance(option, str)}) != 3:
                errors.append(f"{prefix}: duplicitní varianty")
        correct = item.get("correct")
        if type(correct) is not int or correct not in (0, 1, 2):
            errors.append(f"{prefix}: neplatný index správné odpovědi")
    for issue in errors[:40]:
        print("ERROR:", issue)
    if len(errors) > 40:
        print(f"... a dalších {len(errors) - 40} chyb")
    if errors:
        print(f"FAIL: {len(errors)} strukturálních problémů")
        return 1
    print(f"OK: {len(questions)} otázek, všechna ID unikátní, 3 odlišné varianty a platný index správné odpovědi.")
    print("POZOR: Odborná správnost odpovědí tímto nebyla ověřena.")
    return 0


if __name__ == "__main__":
    filename = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("questions.json")
    raise SystemExit(main(filename))
