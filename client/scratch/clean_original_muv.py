from PIL import Image

img_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\.tempmediaStorage\media_e3dffb41-85eb-4efb-98a2-9c500598ea31_1783787098562.jpg"
img = Image.open(img_path).convert("RGBA")
width, height = img.size

# We will perform a BFS flood fill starting from all 4 borders.
# To prevent bleeding into the white car body, we use local color similarity propagation.
visited = [[False for _ in range(height)] for _ in range(width)]
is_bg = [[False for _ in range(height)] for _ in range(width)]

queue = []

# Seed queue with border pixels (which are known to be background)
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
    
    r_c, g_c, b_c = img.getpixel((cx, cy))[:3]
    
    # Classify current pixel as background if it is light gray or white
    # Background pixels in this image have R, G, B > 208
    if r_c > 208 and g_c > 208 and b_c > 208:
        is_bg[cx][cy] = True
        
        # Spread to neighbors
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < width and 0 <= ny < height:
                if not visited[nx][ny]:
                    r_n, g_n, b_n = img.getpixel((nx, ny))[:3]
                    
                    # Local color difference check to prevent crossing high-contrast outlines:
                    # Neighbor color must be close to current pixel color
                    if abs(r_c - r_n) < 5 and abs(g_c - g_n) < 5 and abs(b_c - b_n) < 5:
                        visited[nx][ny] = True
                        queue.append((nx, ny))

# Apply transparency to marked background pixels
for x in range(width):
    for y in range(height):
        if is_bg[x][y]:
            img.putpixel((x, y), (0, 0, 0, 0))

img.save("scratch/test_orig_muv_clean.png")
print("Saved scratch/test_orig_muv_clean.png")
