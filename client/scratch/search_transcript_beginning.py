import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

logs_dir = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\.system_generated\logs"
transcript_path = os.path.join(logs_dir, "transcript.jsonl")

if os.path.exists(transcript_path):
    print("Searching first 400 lines of transcript for Ertiga/Carens/Swift images...")
    with open(transcript_path, "r", encoding="utf-8") as f:
        for idx, line in enumerate(f):
            if idx > 400:
                break
            if "ertiga" in line.lower() or "carens" in line.lower() or "swift" in line.lower() or "generate_image" in line.lower():
                clean_line = "".join(c if ord(c) < 128 else "?" for c in line)
                print(f"Line {idx}: {clean_line[:180]}...")
else:
    print(f"Transcript not found")
