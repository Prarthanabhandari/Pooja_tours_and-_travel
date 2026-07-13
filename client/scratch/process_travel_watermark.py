from PIL import Image

def process_watermark():
    src_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\travel_watermark_pattern_1783833137478.jpg"
    img = Image.open(src_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # Since it is a line art drawing on a white background, we make all white pixels (R>240, G>240, B>240) transparent.
    # The outlines are grey/black, so they will be preserved!
    for x in range(width):
        for y in range(height):
            r, g, b, a = pixels[x, y]
            if r > 240 and g > 240 and b > 240:
                pixels[x, y] = (0, 0, 0, 0)
                
    # Save the transparent PNG
    img.save("public/travel-watermark-clean.png")
    print("Success! Processed and saved travel-watermark-clean.png")

if __name__ == "__main__":
    process_watermark()
