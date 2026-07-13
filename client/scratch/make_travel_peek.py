import os
import math
from PIL import Image

def process_peek_image():
    src_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\.tempmediaStorage\media_e3dffb41-85eb-4efb-98a2-9c500598ea31_1783833432106.png"
    img = Image.open(src_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # Check the background color at middle-right (width * 0.75, height // 2)
    # This is guaranteed to be the sky-blue background area
    bg_r, bg_g, bg_b, bg_a = pixels[int(width * 0.75), height // 2]
    print(f"Detected background color at center-right: R={bg_r}, G={bg_g}, B={bg_b}")
    
    # Also, we check if the detected color is too white. If it is, fallback to the sky-blue.
    if bg_r > 240 and bg_g > 240 and bg_b > 240:
        bg_r, bg_g, bg_b = 155, 215, 253
        print("Fallback to hardcoded sky-blue color.")
        
    for x in range(width):
        # Calculate horizontal fade factor:
        # Full opacity up to x=200, then fade linearly to 0 at x=500
        if x < 200:
            fade_factor = 1.0
        elif x < 500:
            fade_factor = (500 - x) / 300.0
        else:
            fade_factor = 0.0
            
        # We want the elements to look like a subtle background watermark, so we limit the maximum opacity factor to 0.40
        final_opacity_multiplier = fade_factor * 0.40
        
        for y in range(height):
            r, g, b, a = pixels[x, y]
            
            # Distance from detected sky-blue background color
            dist = math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
            
            # If the pixel is very close to the background sky-blue, make it completely transparent
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
                
    # Save the processed image
    img.save("public/travel-peek-bg.png")
    print("Success! Created public/travel-peek-bg.png")

if __name__ == "__main__":
    process_peek_image()
