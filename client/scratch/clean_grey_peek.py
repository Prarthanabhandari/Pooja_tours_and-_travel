from PIL import Image

def remove_grey():
    img_path = "public/travel-peek-bg.png"
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    removed = 0
    for x in range(width):
        for y in range(height):
            r, g, b, a = pixels[x, y]
            if a > 0:
                # Check if color is greyish (low saturation)
                diff = max(r, g, b) - min(r, g, b)
                # Chauffeur/suitcase handles are usually neutral grey:
                # Let's target pixels where R, G, B are similar (diff < 25) and not too bright (max < 160)
                if diff < 25 and max(r, g, b) < 160:
                    pixels[x, y] = (0, 0, 0, 0)
                    removed += 1
                    
    img.save("public/travel-peek-bg.png")
    print(f"Successfully removed {removed} dark grey pixels from travel-peek-bg.png")

if __name__ == "__main__":
    remove_grey()
