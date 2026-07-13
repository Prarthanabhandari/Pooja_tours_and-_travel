from PIL import Image

img_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\.tempmediaStorage\media_e3dffb41-85eb-4efb-98a2-9c500598ea31_1783787098562.jpg"
img = Image.open(img_path)

print("Door colors (Y=550, scanning X from 600 to 800):")
for x in range(600, 800, 20):
    print(f"X={x}: {img.getpixel((x, 550))}")
