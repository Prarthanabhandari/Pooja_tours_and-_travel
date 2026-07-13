from PIL import Image

img_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\.tempmediaStorage\media_e3dffb41-85eb-4efb-98a2-9c500598ea31_1783787098562.jpg"
img = Image.open(img_path)
width, height = img.size
print("Original MUV dimensions:", img.size)

# Print some border background pixel colors
print("Top-Left (5, 5):", img.getpixel((5, 5)))
print("Top-Right (width-6, 5):", img.getpixel((width-6, 5)))
print("Bottom-Left (5, height-6):", img.getpixel((5, height-6)))
print("Bottom-Right (width-6, height-6):", img.getpixel((width-6, height-6)))
print("Middle-Left (5, height//2):", img.getpixel((5, height//2)))
print("Middle-Right (width-6, height//2):", img.getpixel((width-6, height//2)))
