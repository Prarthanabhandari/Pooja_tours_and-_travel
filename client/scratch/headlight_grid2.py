from PIL import Image, ImageDraw

img = Image.open("public/17-seat-tempo-traveller.png").convert("RGBA")
width, height = img.size

draw = ImageDraw.Draw(img)

# Left headlight area: X from 1.5% to 3.5%, Y from 57% to 61%
for x_pct in [1.5, 2.0, 2.5, 3.0, 3.5]:
    x = int((x_pct / 100) * width)
    draw.line([(x, int(0.55*height)), (x, int(0.63*height))], fill="red" if x_pct == 2.2 else "gray", width=1)

for y_pct in [57.0, 58.0, 59.0, 60.0, 61.0]:
    y = int((y_pct / 100) * height)
    draw.line([(int(0.01*width), y), (int(0.04*width), y)], fill="red" if y_pct == 59.0 else "gray", width=1)


# Right headlight area: X from 30.5% to 33.0%, Y from 58% to 62%
for x_pct in [30.5, 31.0, 31.5, 32.0, 32.5, 33.0]:
    x = int((x_pct / 100) * width)
    draw.line([(x, int(0.56*height)), (x, int(0.64*height))], fill="blue" if x_pct == 31.5 else "gray", width=1)

for y_pct in [58.0, 59.0, 60.0, 61.0, 62.0]:
    y = int((y_pct / 100) * height)
    draw.line([(int(0.29*width), y), (int(0.34*width), y)], fill="blue" if y_pct == 60.0 else "gray", width=1)

img.save("scratch/headlight_grid2.png")
