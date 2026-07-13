from PIL import Image

img = Image.open("public/white-ertiga-right.png")
width, height = img.size

# Let's scan from the bottom of the image upwards
# to see where the opacity (alpha channel) becomes high
print("Bottom-up alpha scan:")
for y in range(height - 1, 0, -20):
    row_alphas = [img.getpixel((x, y))[3] for x in range(0, width, 50)]
    max_alpha = max(row_alphas)
    if max_alpha > 0:
        print(f"Y={y}: Max Alpha = {max_alpha}")
