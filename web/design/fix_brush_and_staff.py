"""1. Puts a scrub brush in the scrub character's right hand by repainting only that area (the rest of him is kept).
2. Draws portraits for the admin team, who appeared only as initials.
Run from the toon-studio folder (it has the model venv):
  cd ~/Documents/project/toon-studio && caffeinate -i .venv/bin/python ../saathi/web/design/fix_brush_and_staff.py"""
import pathlib, sys
sys.path.insert(0, str(pathlib.Path.home() / "Documents/project/toon-studio"))
from PIL import Image, ImageDraw, ImageFilter
from gen import gen, inpaint

RAW = pathlib.Path(__file__).parent / "img" / "raw"
NEG = "text, logo, watermark, blurry, deformed, extra fingers, extra hands, child, photo, realistic"

# 1. brush: his right hand (viewer's right) rests on his hip at about x 600, y 440 on the 1024 image
base = Image.open(RAW / "deep.png").convert("RGB")
mask = Image.new("L", base.size, 0)
ImageDraw.Draw(mask).ellipse((540, 340, 790, 640), fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(12))
for i, seed in enumerate((81, 82, 83)):
    inpaint(base, mask, "3D cartoon, green rubber glove gripping the handle of a blue scrubbing brush with stiff bristles, held at the hip",
            strength=0.92, steps=30, seed=seed, neg=NEG).save(RAW / f"deep-brush-{'abc'[i]}.png")
    print("saved brush", i, flush=True)

# 2. staff portraits, head and shoulders, in plain office clothes (no apron: they are office staff)
FACE = "3D render, stylized cartoon adult, one person alone, head and shoulders portrait, facing the camera, plain grey studio background, "
END = ", friendly smile, glossy animation film style, soft studio light"
STAFF = {
    "staff-ad": ("Indian man in his forties, short grey-black hair, rimless glasses, navy blazer over a white shirt", 601),
    "staff-ol": ("Indian woman in her thirties, shoulder-length black hair, dark green kurta", 602),
    "staff-s1": ("Indian man in his twenties, short black hair, light beard, headset around his neck, grey polo shirt", 603),
    "staff-s2": ("Indian woman in her twenties, black hair in a ponytail, headset around her neck, maroon top", 604),
    "staff-ac": ("Indian man in his fifties, receding hair, moustache, light blue formal shirt", 605),
    "staff-mk": ("Indian woman in her twenties, wavy black hair, mustard yellow top", 606),
    "staff-au": ("Indian woman in her forties, short black hair, black blazer", 607),
}
for name, (who, seed) in STAFF.items():
    gen(FACE + who + END, str(RAW / f"{name}.png"), seed=seed, neg="apron, " + NEG, size=(768, 768), steps=20)
    print("saved", name, flush=True)
