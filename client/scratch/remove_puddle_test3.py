from PIL import Image

img = Image.open("public/17-seat-tempo-traveller.png").convert("RGBA")
width, height = img.size

def get_baseline(x):
    if x < 200:
        return 538
    elif x < 390:
        return 515
    elif x < 540:
        return 510  # front wheel area
    elif x < 770:
        return 498  # side skirts
    elif x < 870:
        return 490  # rear wheel area
    else:
        return 500  # rear bumper

# Bottom-up scan to erase white floor
for x in range(width):
    baseline = get_baseline(x)
    for y in range(height - 1, baseline - 1, -1):
        r, g, b, a = img.getpixel((x, y))
        if a > 0:
            # If we hit a dark tire pixel, stop scanning this column
            if r < 95 and g < 95 and b < 95 and a > 180:
                break
            # Erase white/light-gray floor pixels
            if r > 120 and g > 120 and b > 120:
                img.putpixel((x, y), (r, g, b, 0))

img.save("scratch/test_no_puddle3.png")
print("Saved scratch/test_no_puddle3.png")
