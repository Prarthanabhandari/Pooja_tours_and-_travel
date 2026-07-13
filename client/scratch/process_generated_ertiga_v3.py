from PIL import Image

gen_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\white_ertiga_realistic_1783787449914.jpg"

def remove_background(img):
    width, height = img.size
    
    visited = [[False for _ in range(height)] for _ in range(width)]
    is_bg = [[False for _ in range(height)] for _ in range(width)]
    
    queue = []
    
    # Add border pixels to queue
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
        
    head = 0
    while head < len(queue):
        cx, cy = queue[head]
        head += 1
        
        r, g, b = img.getpixel((cx, cy))[:3]
        
        # The background is neutral gray with color value between 135 and 205.
        # This keeps dark tires/windows (< 100) and bright white car paint (> 215)
        # completely protected from being classified as background.
        is_gray = abs(r - g) < 12 and abs(g - b) < 12 and abs(r - b) < 12
        if is_gray and 135 < r < 205:
            is_bg[cx][cy] = True
            
            # Spread to neighbors
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = cx + dx, cy + dy
                if 0 <= nx < width and 0 <= ny < height:
                    if not visited[nx][ny]:
                        visited[nx][ny] = True
                        queue.append((nx, ny))
                        
    # Create copy with alpha channel
    res = img.convert("RGBA")
    for x in range(width):
        for y in range(height):
            if is_bg[x][y]:
                res.putpixel((x, y), (0, 0, 0, 0))
                
    return res

# 1. Process LEFT-facing version
print("Processing left-facing Ertiga...")
img_left_src = Image.open(gen_path)
img_left = remove_background(img_left_src)
bbox_l = img_left.getbbox()
if bbox_l:
    img_left_cropped = img_left.crop(bbox_l)
    # Add 15px padding
    p = 15
    final_l = Image.new("RGBA", (img_left_cropped.width + p*2, img_left_cropped.height + p*2), (0, 0, 0, 0))
    final_l.paste(img_left_cropped, (p, p))
    final_l.save("public/white-ertiga.png")
    print(f"Saved left-facing Ertiga to public/white-ertiga.png. Size: {final_l.size}")
else:
    print("Error: Left bbox not found")

# 2. Process RIGHT-facing version
print("Processing right-facing Ertiga...")
img_right_src = Image.open(gen_path).transpose(Image.FLIP_LEFT_RIGHT)
img_right = remove_background(img_right_src)
bbox_r = img_right.getbbox()
if bbox_r:
    img_right_cropped = img_right.crop(bbox_r)
    # Add 15px padding
    p = 15
    final_r = Image.new("RGBA", (img_right_cropped.width + p*2, img_right_cropped.height + p*2), (0, 0, 0, 0))
    final_r.paste(img_right_cropped, (p, p))
    final_r.save("public/white-ertiga-right.png")
    print(f"Saved right-facing Ertiga to public/white-ertiga-right.png. Size: {final_r.size}")
else:
    print("Error: Right bbox not found")
