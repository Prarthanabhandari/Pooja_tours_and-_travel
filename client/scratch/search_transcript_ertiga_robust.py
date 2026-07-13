import os
import sys

# Reconfigure stdout to use UTF-8
sys.stdout.reconfigure(encoding='utf-8')

logs_dir = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\.system_generated\logs"
transcript_path = os.path.join(logs_dir, "transcript.jsonl")

if os.path.exists(transcript_path):
    print("Found transcript.jsonl. Searching...")
    with open(transcript_path, "r", encoding="utf-8") as f:
        for idx, line in enumerate(f):
            if "ertiga" in line.lower() or "generate_image" in line.lower():
                # Strip non-ASCII characters to prevent console encoding issues
                clean_line = "".join(c if ord(c) < 128 else "?" for c in line)
                print(f"Line {idx}: {clean_line[:150]}...")
else:
    print(f"Transcript not found at {transcript_path}")
