import os

dir_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31"
files = [os.path.join(dir_path, f) for f in os.listdir(dir_path) if os.path.isfile(os.path.join(dir_path, f))]
files.sort(key=os.path.getmtime)

for f in files[-15:]:
    print(os.path.basename(f), os.path.getsize(f), os.path.getmtime(f))
