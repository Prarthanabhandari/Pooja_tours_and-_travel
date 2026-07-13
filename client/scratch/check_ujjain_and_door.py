from PIL import Image

img = Image.open("public/door-to-door-collage-clean.png")
width, height = img.size
pixels = img.load()

# Check top-left corner pixels
print("Top-left pixel (0,0):", pixels[0, 0])
print("Top-right pixel (width-1,0):", pixels[width-1, 0])
print("Bottom-left pixel (0,height-1):", pixels[0, height-1])
print("Bottom-right pixel (width-1,height-1):", pixels[width-1, height-1])

# Count non-transparent pixels outside the circle of radius width/2
center_x, center_y = width / 2, height / 2
radius = width / 2
non_trans = 0
for x in range(width):
    for y in range(height):
        dist = ((x - center_x)**2 + (y - center_y)**2)**0.5
        if dist > radius:
            r, g, b, a = pixels[x, y]
            if a > 0:
                non_trans += 1

print("Number of non-transparent pixels outside the circle:", non_trans)
