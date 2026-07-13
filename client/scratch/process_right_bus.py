from PIL import Image

def process_bus():
    src_path = "../hero-bus.webp"
    img = Image.open(src_path).convert("RGBA")
    
    # Flip horizontally so the bus moves from the left side to the right side
    img = img.transpose(Image.FLIP_LEFT_RIGHT)
    
    width, height = img.size
    pixels = img.load()
    
    for x in range(width):
        # Calculate horizontal fade factor:
        # 0 opacity on the left (up to 25% width), then linear increase to 100% on the right
        # We multiply by 0.45 to make the bus clearly visible as a soft watermark background
        if x < width * 0.25:
            fade_factor = 0.0
        else:
            fade_factor = (x - width * 0.25) / (width * 0.75)
            
        final_opacity_multiplier = fade_factor * 0.45
        
        for y in range(height):
            r, g, b, a = pixels[x, y]
            new_a = int(a * final_opacity_multiplier)
            pixels[x, y] = (r, g, b, new_a)
            
    # Save the processed image to public/
    img.save("public/bus-peek-bg.png")
    print("Successfully processed and flipped the bus image and saved to public/bus-peek-bg.png")

if __name__ == "__main__":
    process_bus()
