from PIL import Image
from collections import deque

def make_logo_transparent():
    img_path = "public/pooja-logo.png"
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()

    # Flood fill outer white background starting from the corners
    visited = [[False for _ in range(height)] for _ in range(width)]
    queue = deque()

    # Add all four corners and edge pixels to start queue
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

    # Flood fill BFS
    while queue:
        cx, cy = queue.popleft()
        r, g, b, a = pixels[cx, cy]

        # If pixel is white or very close to white, make it transparent and propagate
        if r > 248 and g > 248 and b > 248:
            pixels[cx, cy] = (0, 0, 0, 0)
            
            # Check 4-connected neighbors
            for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
                if 0 <= nx < width and 0 <= ny < height:
                    if not visited[nx][ny]:
                        visited[nx][ny] = True
                        queue.append((nx, ny))

    # Also trim empty transparent margins to make it scale nicely
    bbox = img.getbbox()
    if bbox:
        trimmed = img.crop(bbox)
        # Add 10px padding for safety
        p = 10
        final_img = Image.new("RGBA", (trimmed.width + p*2, trimmed.height + p*2), (0, 0, 0, 0))
        final_img.paste(trimmed, (p, p))
        final_img.save("public/pooja-logo-clean.png")
        print(f"Success! Saved clean transparent logo to public/pooja-logo-clean.png with size {final_img.size}")
    else:
        img.save("public/pooja-logo-clean.png")
        print("Success! Saved clean transparent logo without cropping.")

if __name__ == "__main__":
    make_logo_transparent()
