"""The barber (img/raw/pro-barber-a.png, seed 705) came out with a grey apron and trousers. This tints the grey cloth
to the brand's dark green and saves img/raw/pro-barber.png; brand_characters.py then prints the name on it.
Run: ~/Documents/project/toon-studio/.venv/bin/python tint_barber.py   (needs rembg, which the toon-studio venv has)"""
import colorsys, pathlib
import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove

RAW = pathlib.Path(__file__).parent / "img" / "raw"
im = Image.open(RAW / "pro-barber-a.png").convert("RGB")
# tint only the person, not the grey backdrop; the outline is pulled in 3 px so no backdrop pixels at the edge turn green
figure = np.asarray(remove(im, session=new_session("u2net")).getchannel("A").filter(ImageFilter.MinFilter(7))) > 128
a = np.asarray(im).astype(float) / 255
mx, mn = a.max(axis=2), a.min(axis=2)
# grey cloth: little colour, mid brightness. Black hair and beard (dark) and eyes and teeth (bright) stay as they are.
cloth = figure & ((mx - mn) < 0.12) & (mx > 0.09) & (mx < 0.75)
cloth[:340] = False   # ponytail: rows above his collar, read off this one image; keeps hair and beard black
h, s, _ = colorsys.rgb_to_hsv(11 / 255, 93 / 255, 75 / 255)   # brand green #0b5d4b
out = a.copy()
for y, x in zip(*np.nonzero(cloth)):
    out[y, x] = colorsys.hsv_to_rgb(h, s * 0.8, min(1, mx[y, x] * 0.85))   # keep the folds' light and shade
Image.fromarray((out * 255).astype(np.uint8)).save(RAW / "pro-barber.png")
print("tinted", int(cloth.sum()), "pixels")
