from PIL import Image

img = Image.open("public/17-seat-tempo-traveller.png")
width, height = img.size

# Let's print pixel values around the front bumper: X in [10, 200], Y in [510, 545]
print("Bumper pixels inspection:")
for y in range(510, 546, 5):
    pixels = []
    for x in range(20, 180, 40):
        r, g, b, a = img.getpixel((x, y))
        pixels.append(f"X={x},Y={y}: ({r},{g},{b},{a})")
    print(f"Row Y={y}: {', '.join(pixels)}")
