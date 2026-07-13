from PIL import Image

img = Image.open("public/17-seat-tempo-traveller.png")
width, height = img.size
print(f"Dimensions: {width} x {height}")

# Find bounding box of non-transparent pixels
bbox = img.getbbox()
print(f"Bounding box: {bbox}")
