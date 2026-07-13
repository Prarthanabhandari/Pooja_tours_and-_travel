import sys
from PIL import Image
import pillow_avif

try:
    img = Image.open("../travel-accessories-creating-frame-light-blue-background-with-copy-space_87742-45603.avif")
    print("Successfully opened AVIF file with PIL! Size:", img.size)
except Exception as e:
    print("Error opening AVIF with PIL:", e)
