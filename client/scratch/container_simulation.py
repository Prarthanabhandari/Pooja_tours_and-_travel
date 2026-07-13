# We will simulate the container rendering in Python:
# 1. Create a square 600x600 canvas representing the container.
# 2. Scale the 938x612 image to fit the width (600px wide, 600/1.53 = 392px high).
# 3. Paste it centered vertically (y offset = (600 - 392) // 2 = 104px).
# 4. Draw red dots at the calculated percentages on the 600x600 canvas:
#    Left: left=2.5% (x = 15), top=55.9% (y = 335)
#    Right: left=31.5% (x = 189), top=56.6% (y = 340)
# 5. Verify if they land precisely on the upper headlight bulbs.

from PIL import Image, ImageDraw

# Create 600x600 transparent canvas
canvas = Image.new("RGBA", (600, 600), (0, 0, 0, 0))

# Load bus image and resize
bus = Image.open("public/17-seat-tempo-traveller.png")
bus_w, bus_h = bus.size
scale = 600 / bus_w
new_h = int(bus_h * scale)
bus_resized = bus.resize((600, new_h), Image.Resampling.LANCZOS)

# Paste centered vertically
y_offset = (600 - new_h) // 2
canvas.paste(bus_resized, (0, y_offset), bus_resized)

# Draw indicator dots
draw = ImageDraw.Draw(canvas)
# Left: left=2.5%, top=55.9%
left_x = int(0.025 * 600)
left_y = int(0.559 * 600)
draw.ellipse([left_x-8, left_y-8, left_x+8, left_y+8], outline="red", width=2)

# Right: left=31.5%, top=56.6%
right_x = int(0.315 * 600)
right_y = int(0.566 * 600)
draw.ellipse([right_x-8, right_y-8, right_x+8, right_y+8], outline="red", width=2)

canvas.save("scratch/container_simulation.png")
print(f"Resized height: {new_h}, y_offset: {y_offset}")
print(f"Left coordinate: x={left_x}, y={left_y}")
print(f"Right coordinate: x={right_x}, y={right_y}")
