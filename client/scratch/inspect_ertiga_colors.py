from PIL import Image

img_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\white_ertiga_new_1783580716858.png"
img = Image.open(img_path)
width, height = img.size

# Let's inspect the vertical line at X = 500 (middle of the image)
# scanning from Y = 0 to Y = 500
print("Middle vertical scan (X=500):")
for y in range(0, 500, 10):
    r, g, b = img.getpixel((500, y))[:3]
    if r < 235: # if we hit the car roof/windshield
        print(f"HIT CAR at Y={y}: ({r},{g},{b})")
        break
    else:
        print(f"Y={y}: ({r},{g},{b})")

# Let's inspect the corner background color
print("Corners:")
print("Top-Left (10, 10):", img.getpixel((10, 10))[:3])
print("Top-Right (990, 10):", img.getpixel((990, 10))[:3])
