"""Draws a scrub brush on its own (to be placed into the scrub character's hand afterwards), and redraws three staff
portraits: Ops lead in the same glossy 3D style as the others, Support 2 and Marketing in sleeved office tops."""
import pathlib, sys
sys.path.insert(0, str(pathlib.Path.home() / "Documents/project/toon-studio"))
from gen import gen
RAW = pathlib.Path(__file__).parent / "img" / "raw"
gen("3D render, single object, a blue scrubbing brush with a wooden handle and stiff white bristles, product shot, plain white background, glossy animation film style",
    str(RAW / "brush-object.png"), seed=901, neg="person, hand, text, logo, watermark, blurry, two objects", size=(768, 768), steps=20)
print("saved brush-object", flush=True)
FACE = "3D render, full colour, glossy Pixar style, stylized cartoon adult, one single person alone, one head, head and shoulders portrait, facing the camera, warm brown skin, plain grey studio background, "
END = ", friendly smile, soft studio light"
NEG = "flat 2d, illustration, sketch, two heads, two people, profile, greyscale, grey skin, sleeveless, bare shoulders, tank top, cleavage, apron, text, logo, watermark, blurry, deformed, child"
for name, who, seed in [("staff-ol", "Indian woman in her thirties, shoulder-length black hair, dark green kurta with long sleeves", 802),
                        ("staff-s2", "Indian woman in her twenties, black hair in a ponytail, maroon long-sleeved office blouse buttoned up", 804),
                        ("staff-mk", "Indian woman in her twenties, wavy black hair, mustard yellow long-sleeved office shirt with collar", 806)]:
    gen(FACE + who + END, str(RAW / f"{name}-v2.png"), seed=seed, neg=NEG, size=(768, 768), steps=20)
    print("saved", name, flush=True)
