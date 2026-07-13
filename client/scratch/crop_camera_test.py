from PIL import Image

img = Image.open("public/travel-peek-bg.png")
# Crop potential camera region
cropped = img.crop((220, 320, 420, 481))
cropped.save("scratch/crop_camera.png")
print("Saved cropped potential camera region to scratch/crop_camera.png")
