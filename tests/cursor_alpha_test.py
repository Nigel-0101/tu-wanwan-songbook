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

standee = Image.open(Path(__file__).parents[1] / "assets" / "standee-transparent.png").convert("RGBA")
assert standee.getpixel((0, 0))[3] == 0, "standee corner must be transparent"
assert standee.getpixel((standee.width - 1, standee.height - 1))[3] == 0, "standee background must be transparent"
alpha = standee.getchannel("A")
opaque_coverage = sum(1 for value in alpha.get_flattened_data() if value >= 245) / (standee.width * standee.height)
assert 0.12 < opaque_coverage < 0.75, "standee alpha coverage should preserve the character without a rectangular background"
print("standee alpha test passed")
