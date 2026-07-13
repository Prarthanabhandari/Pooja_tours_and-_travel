from PIL import Image

img = Image.open("public/17-seat-tempo-traveller.png")
width, height = img.size

# Let's inspect a few rows at the bottom (e.g. Y from 550 to 612)
# We'll print coordinate info for non-transparent pixels that are white-ish (R,G,B close to 255)
for y in range(height - 60, height, 10):
    row_pixels = []
    for x in range(0, width, 50):
        r, g, b, a = img.getpixel((x, y))
        if a > 0:
            row_pixels.append(f"X={x}: ({r},{g},{b},{a})")
    print(f"Row Y={y}: {', '.join(row_pixels[:5])} ...")
