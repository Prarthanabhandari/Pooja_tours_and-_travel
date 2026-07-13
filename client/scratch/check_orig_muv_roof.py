from PIL import Image

img_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\.tempmediaStorage\media_e3dffb41-85eb-4efb-98a2-9c500598ea31_1783787098562.jpg"
img = Image.open(img_path)

print("Roof vertical scan (X=600):")
for y in range(250, 380, 5):
    print(f"Y={y}: {img.getpixel((600, y))}")
