import shutil

# Copy the processed image without the white puddle to the public folder
shutil.copy("scratch/test_no_puddle5.png", "public/17-seat-tempo-traveller.png")
print("Successfully overwrote public/17-seat-tempo-traveller.png with puddle-free version!")
