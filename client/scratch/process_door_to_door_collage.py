from PIL import Image, ImageDraw

def mask_circle():
    img_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\door_to_door_collage_1783837859558.jpg"
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    
    # Create transparency mask
    mask = Image.new("L", (width, height), 0)
    draw = ImageDraw.Draw(mask)
    
    # Define circular bounds (with a 4px inset to ensure clean edges)
    left = 4
    top = 4
    right = width - 4
    bottom = height - 4
    draw.ellipse((left, top, right, bottom), fill=255)
    
    # Apply mask
    result = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    result.paste(img, (0, 0), mask=mask)
    
    # Save to public directory
    result.save("public/door-to-door-collage-clean.png")
    print("Successfully circular-masked Door-to-Door collage and saved to public/door-to-door-collage-clean.png")

if __name__ == "__main__":
    mask_circle()
