import shutil

src_pune = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\pune_heritage_collage_1783789789405.jpg"
src_airport = r"C:\Users\Prarthana\.gemini\antigravity\brain\e3dffb41-85eb-4efb-98a2-9c500598ea31\airport_transit_collage_1783789802433.jpg"

dest_pune = r"public/pune-heritage.jpg"
dest_airport = r"public/airport-transit.jpg"

shutil.copy(src_pune, dest_pune)
shutil.copy(src_airport, dest_airport)

print("Assets copied successfully to public/ directory!")
