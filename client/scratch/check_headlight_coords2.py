from PIL import Image, ImageDraw

img = Image.open("public/17-seat-tempo-traveller.png").convert("RGBA")
width, height = img.size

candidates = [
    # Left headlight candidates
    (2.3, 63.0, "red"),
    (2.5, 64.0, "blue"),
    (2.4, 62.5, "green"),
    
    # Right headlight candidates
    (32.2, 64.0, "red"),
    (32.5, 65.0, "blue"),
    (32.0, 63.5, "green")
]

draw = ImageDraw.Draw(img)
for left_pct, top_pct, color in candidates:
    x = int((left_pct / 100) * width)
    y = int((top_pct / 100) * height)
    draw.rectangle([x-3, y-3, x+3, y+3], fill=color)
    print(f"Candidate ({left_pct}%, {top_pct}%) -> Pixel ({x}, {y}) color={color}")

img.save("scratch/test_headlights2.png")
