import math
from PIL import Image
import pillow_avif

def process_avif():
    src_path = "../travel-accessories-creating-frame-light-blue-background-with-copy-space_87742-45603.avif"
    img = Image.open(src_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # Detect background color in the center-right empty space (x=550, y=240)
    bg_r, bg_g, bg_b, bg_a = pixels[550, 240]
    print(f"Detected background color in AVIF: R={bg_r}, G={bg_g}, B={bg_b}")
    
    for x in range(width):
        # Calculate horizontal fade factor:
        # Full opacity up to x=150, then fade linearly to 0 at x=380
        if x < 150:
            fade_factor = 1.0
        elif x < 380:
            fade_factor = (380 - x) / 230.0
        else:
            fade_factor = 0.0
            
        # We want the elements to look like a subtle background watermark, so we limit the maximum opacity factor to 0.40
        final_opacity_multiplier = fade_factor * 0.40
        
        for y in range(height):
            r, g, b, a = pixels[x, y]
            
            # Distance from detected light-blue background color
            dist = math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
            
            # If the pixel is very close to the background light-blue, make it completely transparent
            if dist < 65:
                pixels[x, y] = (0, 0, 0, 0)
            elif dist < 95:
                # Smooth transition at the edges of the items
                edge_factor = (dist - 65) / 30.0
                new_a = int(a * edge_factor * final_opacity_multiplier)
                pixels[x, y] = (r, g, b, new_a)
            else:
                # Fully preserve the item pixel, scaled by the horizontal fade factor
                new_a = int(a * final_opacity_multiplier)
                pixels[x, y] = (r, g, b, new_a)
                
    # Save the processed image to public/
    img.save("public/travel-peek-bg.png")
    print("Success! Processed the clean user AVIF and saved to public/travel-peek-bg.png")

if __name__ == "__main__":
    process_avif()
