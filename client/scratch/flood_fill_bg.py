from PIL import Image
import sys

img_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\white_ertiga_new_1783580716858.png"
img = Image.open(img_path).convert("RGBA")
width, height = img.size

# We will perform a BFS flood fill from the borders
visited = [[False for _ in range(height)] for _ in range(width)]
is_bg = [[False for _ in range(height)] for _ in range(width)]

queue = []

# Add all border pixels to queue
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

# Process queue
head = 0
while head < len(queue):
    cx, cy = queue[head]
    head += 1
    
    r, g, b = img.getpixel((cx, cy))[:3]
    
    # Check if current pixel is part of background (very light colored)
    # Background in this image is generally R > 200, G > 200, B > 200
    if r > 200 and g > 200 and b > 200:
        is_bg[cx][cy] = True
        
        # Spread to neighbors
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < width and 0 <= ny < height:
                if not visited[nx][ny]:
                    visited[nx][ny] = True
                    queue.append((nx, ny))

# Apply transparency to background
for x in range(width):
    for y in range(height):
        if is_bg[x][y]:
            r, g, b, a = img.getpixel((x, y))
            img.putpixel((x, y), (r, g, b, 0))

img.save("scratch/test_ertiga_clean.png")
print("Saved scratch/test_ertiga_clean.png")
