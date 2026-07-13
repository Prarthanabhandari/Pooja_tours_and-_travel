from PIL import Image

gen_path = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\white_ertiga_realistic_1783787449914.jpg"
img = Image.open(gen_path)
width, height = img.size

# Let's inspect background colors at various points (corners and edges)
print("Top-Left (5, 5):", img.getpixel((5, 5))[:3])
print("Top-Right (width-6, 5):", img.getpixel((width-6, 5))[:3])
print("Middle-Left (5, height//2):", img.getpixel((5, height//2))[:3])
print("Middle-Right (width-6, height//2):", img.getpixel((width-6, height//2))[:3])
print("Bottom-Left (5, height-6):", img.getpixel((5, height-6))[:3])
print("Bottom-Right (width-6, height-6):", img.getpixel((width-6, height-6))[:3])
print("Top-Middle (width//2, 5):", img.getpixel((width//2, 5))[:3])
print("Bottom-Middle (width//2, height-6):", img.getpixel((width//2, height-6))[:3])
