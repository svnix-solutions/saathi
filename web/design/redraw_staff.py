"""Second attempt at three staff portraits that came out wrong (greyscale, two heads, grey skin)."""
import pathlib, sys
sys.path.insert(0, str(pathlib.Path.home() / "Documents/project/toon-studio"))
from gen import gen
RAW = pathlib.Path(__file__).parent / "img" / "raw"
FACE = "3D render, full colour, stylized cartoon adult, one single person alone, one head, head and shoulders portrait, facing the camera, warm brown skin, plain grey studio background, "
END = ", friendly smile, glossy animation film style, soft studio light"
NEG = "two heads, two people, profile view, greyscale, black and white, grey skin, monochrome, sketch, flat 2d, apron, text, logo, watermark, blurry, deformed, child"
for name, who, seed in [("staff-s1", "Indian man in his twenties, short black hair, light beard, grey polo shirt", 703),
                        ("staff-s2", "Indian woman in her twenties, black hair in a ponytail, maroon top", 704),
                        ("staff-mk", "Indian woman in her twenties, wavy black hair, mustard yellow top", 706)]:
    gen(FACE + who + END, str(RAW / f"{name}.png"), seed=seed, neg=NEG, size=(768, 768), steps=20)
    print("saved", name, flush=True)
