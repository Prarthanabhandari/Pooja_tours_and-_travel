from PIL import Image

img = Image.open("public/travel-peek-bg.png")
print("Image format:", img.format)
print("Image size:", img.size)
print("Image mode:", img.mode)
