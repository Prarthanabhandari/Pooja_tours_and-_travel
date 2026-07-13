from PIL import Image, ImageDraw

img = Image.open("public/17-seat-tempo-traveller.png").convert("RGBA")
width, height = img.size

# Let's test a few candidate coordinates:
# Candidate 1:
# Left: left=2.8%, top=61.5%
# Right: left=32.2%, top=63.0%
#
# Candidate 2:
# Left: left=2.2%, top=60.0%
# Right: left=32.8%, top=62.0%
#
# Candidate 3:
# Left: left=2.0%, top=61.0%
# Right: left=33.2%, top=62.5%

candidates = [
    # (left_pct, top_pct)
    (2.0, 61.0, "red"),
    (2.8, 61.5, "blue"),
    (2.2, 60.0, "green"),
    
    # Right headlight candidates
    (32.2, 63.0, "red"),
    (32.8, 62.0, "blue"),
    (33.2, 62.5, "green")
]

draw = ImageDraw.Draw(img)
for left_pct, top_pct, color in candidates:
    x = int((left_pct / 100) * width)
    y = int((top_pct / 100) * height)
    # Draw a small 6x6 rectangle
    draw.rectangle([x-3, y-3, x+3, y+3], fill=color)
    print(f"Candidate ({left_pct}%, {top_pct}%) -> Pixel ({x}, {y}) color={color}")

img.save("scratch/test_headlights.png")
