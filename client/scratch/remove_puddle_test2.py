from PIL import Image

img = Image.open("public/17-seat-tempo-traveller.png").convert("RGBA")
width, height = img.size

# We will process pixels where Y > 530
for y in range(530, height):
    for x in range(width):
        r, g, b, a = img.getpixel((x, y))
        if a > 0 and a < 255:
            # If the pixel is semi-transparent and light-colored
            if r > 120 and g > 120 and b > 120:
                img.putpixel((x, y), (r, g, b, 0))
            else:
                # Optionally fade out non-white semi-transparent pixels at the very bottom
                if y > 580:
                    img.putpixel((x, y), (r, g, b, int(a * 0.3)))

img.save("scratch/test_no_puddle2.png")
print("Saved scratch/test_no_puddle2.png")
