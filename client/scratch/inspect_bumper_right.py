from PIL import Image

img = Image.open("public/17-seat-tempo-traveller.png")
width, height = img.size

# Let's inspect the bumper and the missing block area: X in [250, 410], Y in [500, 560]
for y in range(500, 561, 5):
    pixels = []
    for x in range(260, 410, 30):
        r, g, b, a = img.getpixel((x, y))
        pixels.append(f"X={x},Y={y}: ({r},{g},{b},{a})")
    print(f"Row Y={y}: {', '.join(pixels)}")
