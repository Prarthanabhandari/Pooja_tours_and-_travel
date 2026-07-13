from PIL import Image

img_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\white_ertiga_new_1783580716858.png"
img = Image.open(img_path)

print("Middle vertical scan (X=500):")
for y in range(0, 500, 20):
    r, g, b = img.getpixel((500, y))[:3]
    print(f"Y={y}: ({r},{g},{b})")
