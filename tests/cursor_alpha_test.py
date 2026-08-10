from pathlib import Path
from PIL import Image

image = Image.open(Path(__file__).parents[1] / "assets" / "chibi-cursor.png").convert("RGBA")

assert image.getpixel((0, 0))[3] == 0, "cursor corner must remain transparent"

# These points are inside the face, hands, and feet of the Q-version character.
for label, point in {
    "face": (627, 600),
    "hands": (627, 770),
    "left foot": (570, 850),
    "right foot": (690, 850),
}.items():
    assert image.getpixel(point)[3] >= 245, f"{label} was accidentally keyed out"

print("cursor alpha test passed")
