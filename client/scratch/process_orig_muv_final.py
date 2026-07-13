from PIL import Image

# Load the clean background-removed original three-quarters Ertiga image (currently facing left)
img_l = Image.open("scratch/test_orig_muv_clean.png")

# 1. Save Left-facing version (white-ertiga.png)
bbox_l = img_l.getbbox()
if bbox_l:
    cropped_l = img_l.crop(bbox_l)
    p = 15
    final_l = Image.new("RGBA", (cropped_l.width + p*2, cropped_l.height + p*2), (0, 0, 0, 0))
    final_l.paste(cropped_l, (p, p))
    final_l.save("public/white-ertiga.png")
    print(f"Saved cropped left-facing Ertiga. Size: {final_l.size}")
else:
    print("Error: Left bbox not found")

# 2. Save Right-facing version (white-ertiga-right.png)
img_r = img_l.transpose(Image.FLIP_LEFT_RIGHT)
bbox_r = img_r.getbbox()
if bbox_r:
    cropped_r = img_r.crop(bbox_r)
    p = 15
    final_r = Image.new("RGBA", (cropped_r.width + p*2, cropped_r.height + p*2), (0, 0, 0, 0))
    final_r.paste(cropped_r, (p, p))
    final_r.save("public/white-ertiga-right.png")
    print(f"Saved cropped right-facing Ertiga. Size: {final_r.size}")
else:
    print("Error: Right bbox not found")
