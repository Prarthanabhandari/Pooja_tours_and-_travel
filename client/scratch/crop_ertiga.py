from PIL import Image

for filename in ["public/white-ertiga.png", "public/white-ertiga-right.png"]:
    img = Image.open(filename)
    bbox = img.getbbox()
    if bbox:
        # Crop to the bounding box of non-transparent pixels
        cropped_img = img.crop(bbox)
        
        # Add a very small transparent padding (e.g. 15px) around the cropped car 
        # to prevent edges from touching the container boundaries abruptly.
        padding = 15
        padded_width = cropped_img.width + (padding * 2)
        padded_height = cropped_img.height + (padding * 2)
        
        padded_img = Image.new("RGBA", (padded_width, padded_height), (0, 0, 0, 0))
        padded_img.paste(cropped_img, (padding, padding))
        
        padded_img.save(filename)
        print(f"Successfully cropped transparent margins for {filename}. New size: {padded_width}x{padded_height}")
    else:
        print(f"No bounding box found for {filename}")
