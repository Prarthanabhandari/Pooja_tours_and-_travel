from PIL import Image

# Path to the original realistic left-facing Ertiga image
img_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\white_ertiga_muv_1783576912260.png"
img = Image.open(img_path).convert("RGBA")

# 1. Flip horizontally so the car faces right
img_right = img.transpose(Image.FLIP_LEFT_RIGHT)
width, height = img_right.size

# 2. BFS flood fill to remove the light-gray studio background
visited = [[False for _ in range(height)] for _ in range(width)]
is_bg = [[False for _ in range(height)] for _ in range(width)]

queue = []

# Seed queue with border pixels
for x in range(width):
    queue.append((x, 0))
    queue.append((x, height - 1))
    visited[x][0] = True
    visited[x][height - 1] = True

for y in range(height):
    queue.append((0, y))
    queue.append((width - 1, y))
    visited[0][y] = True
    visited[width - 1][y] = True

# Process BFS queue
head = 0
while head < len(queue):
    cx, cy = queue[head]
    head += 1
    
    r, g, b = img_right.getpixel((cx, cy))[:3]
    
    # Background in this image is generally light gray/white (R, G, B > 200)
    # We will spread to neighbors if color is light gray (R > 210, G > 210, B > 210)
    if r > 210 and g > 210 and b > 210:
        is_bg[cx][cy] = True
        
        # Spread to neighbors
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < width and 0 <= ny < height:
                if not visited[nx][ny]:
                    visited[nx][ny] = True
                    queue.append((nx, ny))

# Apply transparency to marked background pixels
for x in range(width):
    for y in range(height):
        if is_bg[x][y]:
            img_right.putpixel((x, y), (0, 0, 0, 0))

# 3. Save as white-ertiga-right.png in public folder
img_right.save("public/white-ertiga-right.png")
print("Saved clean, realistic right-facing Ertiga to public/white-ertiga-right.png")
