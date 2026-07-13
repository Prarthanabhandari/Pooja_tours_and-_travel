import os

dir_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\.tempmediaStorage"
files = [os.path.join(dir_path, f) for f in os.listdir(dir_path)]
# Sort by modification time
files.sort(key=os.path.getmtime)

for f in files[-5:]:
    print(f, os.path.getmtime(f))
