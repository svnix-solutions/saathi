"""Puts the scrub brush (cut from img/raw/brush-object.png) into the scrub character's right hand, keeping his gloved
fingers in front of it so he looks like he is holding it. Writes img/raw/deep-brush.png; the original is not changed.
Run: ~/Documents/project/toon-studio/.venv/bin/python place_brush.py"""
import pathlib
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
RAW = pathlib.Path(__file__).parent / "img" / "raw"
# the blue brush block on the left of the brush picture, traced by eye on a grid
src = Image.open(RAW / "brush-object.png").convert("RGBA")
mask = Image.new("L", src.size, 0)
ImageDraw.Draw(mask).polygon([(58, 508), (252, 306), (344, 398), (146, 584)], fill=255)
src.putalpha(mask.filter(ImageFilter.GaussianBlur(1.5)))
brush = src.crop(mask.getbbox())
brush = brush.rotate(-40, expand=True, resample=Image.BICUBIC)            # bristles down, as if held at the hip
brush = brush.resize((int(brush.width * .5), int(brush.height * .5)), Image.LANCZOS)
man = Image.open(RAW / "deep.png").convert("RGBA")
x, y = 588, 392                                                           # where it sits under his right glove
before = np.asarray(man).copy()
man.alpha_composite(brush, (x, y))
# bring his glove back in front: bright green pixels near the hand
a = np.asarray(man).copy()
r, g, b = before[..., 0].astype(int), before[..., 1].astype(int), before[..., 2].astype(int)
glove = (g > 150) & (g - r > 60) & (g - b > 60)
box = np.zeros_like(glove); box[380:540, 540:760] = True
keep = glove & box
a[keep] = before[keep]
Image.fromarray(a).convert("RGB").save(RAW / "deep-brush.png")
print("placed")
