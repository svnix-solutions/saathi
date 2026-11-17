"""Prints the Saathi name on each character's apron. The image model cannot spell, so the name is drawn on afterwards.
Run: ~/Documents/project/toon-studio/.venv/bin/python brand_characters.py   (only needs Pillow)
Reads img/raw/<name>.png, writes img/<name>.png."""
import pathlib
from PIL import Image, ImageDraw, ImageFont

D = pathlib.Path(__file__).parent / "img"
FONT = "/System/Library/Fonts/Avenir Next.ttc"  # index 8 = Heavy
# name: (centre x, centre y, text width in px, tilt in degrees) on the 1024 px image, read by eye off each apron.
# ponytail: positions are hand-set per image; redo the numbers whenever a character is redrawn.
SPOTS = {
    "clean": (626, 392, 69, 0),
    "custom": (489, 425, 69, 0),
    "deep": (520, 408, 76, 0),
    "kitchen": (487, 640, 71, 0),
    "laundry": (447, 600, 102, 0),
    "hero": (505, 352, 75, 0),
    "pro-nurse": (528, 452, 63, 0),
    "pro-repair": (522, 378, 57, 0),
    "pro-barber": (548, 790, 70, 0),
}

for name, (cx, cy, width, tilt) in SPOTS.items():
    raw = D / "raw" / f"{name}.png"
    if not raw.exists():
        continue
    im = Image.open(raw).convert("RGBA")
    font = ImageFont.truetype(FONT, 120, index=8)  # Heavy weight; drawn big, then shrunk, so small text stays smooth
    w, h = font.getbbox("Saathi")[2:]
    label = Image.new("RGBA", (w + 20, h + 20), (0, 0, 0, 0))
    ImageDraw.Draw(label).text((10, 4), "Saathi", font=font, fill=(255, 255, 255, 235))
    label = label.resize((width, round(width * label.height / label.width)), Image.LANCZOS).rotate(tilt, expand=True, resample=Image.BICUBIC)
    im.alpha_composite(label, (cx - label.width // 2, cy - label.height // 2))
    im.convert("RGB").save(D / f"{name}.png")
    print("branded", name)

# Cut each character out of its background so it can sit on brand-coloured tiles (needs rembg, which the toon-studio venv has).
from rembg import new_session, remove
(D / "cut").mkdir(exist_ok=True)
session = new_session("u2net")
for name in SPOTS:
    if (D / f"{name}.png").exists():
        remove(Image.open(D / f"{name}.png"), session=session).save(D / "cut" / f"{name}.png")
        print("cut out", name)

# Trimmed copies (cropped to the figure's outline) so a page can show the whole character with "contain" and never cut it off.
(D / "trim").mkdir(exist_ok=True)
for f in (D / "cut").glob("*.png"):
    im = Image.open(f)
    im.crop(im.getchannel("A").point(lambda v: 255 if v > 40 else 0).getbbox()).save(D / "trim" / f.name)
