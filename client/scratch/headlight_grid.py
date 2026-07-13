# Let's inspect the vertical and horizontal center of the main upper headlight bulbs.
# We will draw lines crossing the headlight areas so we can see the exact coordinate intersections.

from PIL import Image, ImageDraw

img = Image.open("public/17-seat-tempo-traveller.png").convert("RGBA")
width, height = img.size

# We will draw a grid of fine lines in the headlight areas:
# Left headlight area: X in [10, 40], Y in [320, 370]
# Right headlight area: X in [290, 320], Y in [320, 370]

draw = ImageDraw.Draw(img)

# Left area lines (X percentages 1.5% to 3.5%, Y percentages 52% to 58%)
for x_pct in [1.5, 2.0, 2.5, 3.0, 3.5]:
    x = int((x_pct / 100) * width)
    draw.line([(x, int(0.50*height)), (x, int(0.60*height))], fill="red" if x_pct == 2.5 else "gray", width=1)

for y_pct in [52.0, 53.0, 54.0, 55.0, 56.0, 57.0, 58.0]:
    y = int((y_pct / 100) * height)
    draw.line([(int(0.01*width), y), (int(0.05*width), y)], fill="red" if y_pct == 55.0 else "gray", width=1)


# Right area lines (X percentages 30% to 33%, Y percentages 52% to 58%)
for x_pct in [30.0, 30.5, 31.0, 31.5, 32.0, 32.5]:
    x = int((x_pct / 100) * width)
    draw.line([(x, int(0.50*height)), (x, int(0.60*height))], fill="blue" if x_pct == 31.5 else "gray", width=1)

for y_pct in [52.0, 53.0, 54.0, 55.0, 56.0, 57.0, 58.0]:
    y = int((y_pct / 100) * height)
    draw.line([(int(0.29*width), y), (int(0.34*width), y)], fill="blue" if y_pct == 55.0 else "gray", width=1)

img.save("scratch/headlight_grid.png")
