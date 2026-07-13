from PIL import Image

preview_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\how_it_works_icons_preview_1783673011441.jpg"
img = Image.open(preview_path).convert("RGBA")
width, height = img.size
print(f"Preview dimensions: {width}x{height}")

# Define the 4 quadrants (Top-Left, Top-Right, Bottom-Left, Bottom-Right)
quadrants = [
    ("public/how-it-works-1.png", (0, 0, width // 2, height // 2)),
    ("public/how-it-works-2.png", (width // 2, 0, width, height // 2)),
    ("public/how-it-works-3.png", (0, height // 2, width // 2, height)),
    ("public/how-it-works-4.png", (width // 2, height // 2, width, height))
]

for filename, box in quadrants:
    cropped = img.crop(box)
    w, h = cropped.size
    
    # Create background-removed version
    # Since background is pure white (R=255, G=255, B=255), we make white pixels transparent.
    # We will use a small threshold (e.g. R > 250, G > 250, B > 250) to make sure anti-aliasing edges are clean.
    for x in range(w):
        for y in range(h):
            r, g, b, a = cropped.getpixel((x, y))
            if r > 248 and g > 248 and b > 248:
                cropped.putpixel((x, y), (0, 0, 0, 0))
                
    # Crop empty transparent margin
    bbox = cropped.getbbox()
    if bbox:
        final_cropped = cropped.crop(bbox)
        # Add 15px padding
        p = 15
        final_img = Image.new("RGBA", (final_cropped.width + p*2, final_cropped.height + p*2), (0, 0, 0, 0))
        final_img.paste(final_cropped, (p, p))
        final_img.save(filename)
        print(f"Saved cropped icon to {filename}. Size: {final_img.size}")
    else:
        print(f"Error: BBox not found for {filename}")
