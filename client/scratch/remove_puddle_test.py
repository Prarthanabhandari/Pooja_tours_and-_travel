from PIL import Image

img = Image.open("public/17-seat-tempo-traveller.png").convert("RGBA")
width, height = img.size

# We will process pixels where Y > 530
for y in range(530, height):
    for x in range(width):
        r, g, b, a = img.getpixel((x, y))
        if a > 0:
            # If the pixel is light-colored (white/gray reflection)
            # Let's check if R, G, B are all high
            if r > 120 and g > 120 and b > 120:
                # Make it transparent
                img.putpixel((x, y), (r, g, b, 0))
            else:
                # Optionally fade out other pixels slightly at the very bottom
                # to create a clean transition into the background
                if y > 590:
                    img.putpixel((x, y), (r, g, b, int(a * 0.2)))
                elif y > 580:
                    img.putpixel((x, y), (r, g, b, int(a * 0.5)))

img.save("scratch/test_no_puddle.png")
print("Saved scratch/test_no_puddle.png")
