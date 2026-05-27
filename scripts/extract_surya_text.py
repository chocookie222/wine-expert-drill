import json
import sys
from pathlib import Path


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: python extract_surya_text.py results.json output_dir")

    source = Path(sys.argv[1])
    output_dir = Path(sys.argv[2])
    output_dir.mkdir(parents=True, exist_ok=True)
    data = json.loads(source.read_text(encoding="utf-8"))

    combined = []
    for name, pages in sorted(data.items(), key=lambda item: int(item[0]) if item[0].isdigit() else item[0]):
        lines = []
        for page in pages:
            for line in page.get("text_lines", []):
                text = (line.get("text") or "").strip()
                if text:
                    lines.append(text)
        text = "\n".join(lines)
        (output_dir / f"{name}.txt").write_text(text, encoding="utf-8")
        combined.append(f"---- {name} ----\n{text}")

    (output_dir / "_combined.txt").write_text("\n\n".join(combined), encoding="utf-8")
    print(f"Wrote {len(data)} OCR text files to {output_dir}")


if __name__ == "__main__":
    main()
