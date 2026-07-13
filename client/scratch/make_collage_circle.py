from PIL import Image, ImageDraw

def apply_circle_mask(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    
    # Create mask image
    mask = Image.new("L", (width, height), 0)
    draw = ImageDraw.Draw(mask)
    
    # Draw a filled circle. We add a tiny margin of 5px for safety.
    margin = 8
    draw.ellipse((margin, margin, width - margin, height - margin), fill=255)
    
    # Apply mask
    result = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    result.paste(img, (0, 0), mask=mask)
    
    # Trim transparent borders dynamically using getbbox
    bbox = result.getbbox()
    if bbox:
        result = result.crop(bbox)
        
    result.save(output_path)
    print(f"Applied circular mask to {image_path} and saved to {output_path}. Size: {result.size}")

if __name__ == "__main__":
    apply_circle_mask("public/pune-heritage.jpg", "public/pune-heritage-clean.png")
    apply_circle_mask("public/airport-transit.jpg", "public/airport-transit-clean.png")
