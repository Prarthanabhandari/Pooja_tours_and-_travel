from PIL import Image

gen_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\white_ertiga_realistic_1783787449914.jpg"
img = Image.open(gen_path)
print("Original dimensions:", img.size)
