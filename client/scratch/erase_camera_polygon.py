from PIL import Image, ImageDraw

def erase_camera():
    img_path = "public/travel-peek-bg.png"
    img = Image.open(img_path).convert("RGBA")
    
    # Create mask for the camera polygon
    mask = Image.new("L", img.size, 0)
    draw = ImageDraw.Draw(mask)
    
    # Polygon that perfectly wraps the camera
    # Vertices coordinates in travel-peek-bg.png space
    polygon = [
        (210, 350),
        (340, 305),
        (415, 390),
        (385, 481),
        (210, 481)
    ]
    
    draw.polygon(polygon, fill=255)
    
    # Apply mask: make the polygon area transparent
    pixels = img.load()
    mask_pixels = mask.load()
    
    erased_count = 0
    for x in range(img.width):
        for y in range(img.height):
            if mask_pixels[x, y] == 255:
                # If it's not already transparent, make it transparent
                if pixels[x, y][3] > 0:
                    pixels[x, y] = (0, 0, 0, 0)
                    erased_count += 1
                    
    img.save("public/travel-peek-bg.png")
    print(f"Successfully erased camera within polygon. Cleared {erased_count} active pixels.")

if __name__ == "__main__":
    erase_camera()
