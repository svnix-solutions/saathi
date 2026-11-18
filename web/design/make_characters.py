"""Draws one 3D-style character per Saathi service with the local Toon Studio SDXL model.
Run from the toon-studio folder (it has the model venv):
  cd ~/Documents/project/toon-studio && caffeinate -i .venv/bin/python ../saathi/web/design/make_characters.py [name ...]
Raw 1024 px images land in saathi/web/design/img/raw/<name>.png; brand_characters.py then prints the name on them."""
import pathlib, sys
sys.path.insert(0, str(pathlib.Path.home() / "Documents/project/toon-studio"))
from gen import gen

RAW = pathlib.Path(__file__).parent / "img" / "raw"
RAW.mkdir(parents=True, exist_ok=True)
# CLIP reads only the first 77 tokens, so the look and the white background come first.
# "adult" and an age are stated twice over because the model otherwise draws helpers as children.
STYLE = "3D render, stylized cartoon adult, one person alone, full body, plain grey studio background, "
END = ", dark green apron, yellow details, friendly smile, glossy animation film style, soft studio light"
NEG = ("food, cake, bread, white apron, dress, skirt, waitress, tray, green hair, blue hair, angry, frown, serious, broom, child, kid, boy, girl, teenager, baby face, two people, group, pedestal, room, kitchen, furniture, photo, realistic, "
       "flat 2d, sketch, blurry, deformed, extra limbs, extra fingers, text, logo, watermark, cropped")
CHARS = {  # name: (who and what they hold, seed)
    "clean":   ("young Indian woman house helper holding a mop next to a yellow bucket", 11),
    "deep":    ("happy laughing Indian man in his thirties with a moustache, yellow rubber gloves, scrub brush in one hand, spray bottle in the other", 222),
    "kitchen": ("Indian woman in her thirties in a dark green bib apron over a yellow shirt, hair in a bun, standing, holding a stack of white plates", 334),
    "laundry": ("tall Indian man in his thirties with a short beard, carrying a laundry basket of folded clothes", 144),
    "custom":  ("young Indian woman helper holding a big round alarm clock and giving a thumbs up", 55),
    "hero":    ("Indian woman in her thirties, hair in a bun, waving hello with one raised hand, holding a cleaning bucket", 166),
}
# Head-and-shoulders portraits for named partners who had no face yet (names starting "face-").
FACE = "3D render, stylized cartoon adult, one person alone, head and shoulders portrait, facing the camera, plain grey studio background, "
CHARS["face-gk"] = ("Indian woman in her forties wearing glasses, hair in a low bun", 301)
CHARS["face-mt"] = ("Indian woman in her late twenties with shoulder-length black hair", 402)
# Customers wear their own clothes, so no apron ending for names starting "cust-".
CHARS["cust-nk"] = ("Indian man in his thirties, short black hair, light stubble, blue casual shirt", 501)
# More sample customers, so lists do not show only initials.
CHARS["cust-ms"] = ("Indian woman in her thirties, long black hair, maroon kurta", 511)
CHARS["cust-ap"] = ("Indian man in his twenties, clean shaven, glasses, white t-shirt", 512)
CHARS["cust-rg"] = ("Indian man in his forties, grey at the temples, checked shirt", 513)
CHARS["cust-fa"] = ("Indian woman in her twenties, shoulder-length black hair, teal top", 514)
CHARS["cust-pn"] = ("Indian woman in her forties, black hair in a bun, orange saree blouse", 515)
CHARS["cust-st"] = ("Indian man in his thirties, curly black hair, grey hoodie", 516)
# Dishes character, full body: the wording that worked for "clean", three seeds to choose from.
KSTYLE = "3D render, cute stylized cartoon character, full body, shoes visible, plain grey studio background, "
for i, seed in enumerate((33, 734, 935)):
    CHARS[f"kitchen-{'abc'[i]}"] = ("young Indian woman house helper, hair in a bun, holding one big white dinner plate and a yellow sponge", seed)
CHARS["kitchen-d"] = ("young Indian woman house helper, hair in a bun, carrying a tall stack of plain white dinner plates in both hands", 61)
CHARS["kitchen-e"] = ("young Indian woman house helper, hair in a bun, carrying a tall stack of plain white dinner plates in both hands", 62)
CHARS["deep-b"] = ("happy laughing Indian man in his thirties with a moustache, yellow rubber gloves, holding up a blue scrubbing brush in one hand, spray bottle in the other", 71)
CHARS["deep-c"] = ("happy laughing Indian man in his thirties with a moustache, yellow rubber gloves, holding up a blue scrubbing brush in one hand, spray bottle in the other", 72)
CHARS["cust-rv"] = ("Indian man in his twenties, short black hair, thin moustache, green polo shirt", 521)
CHARS["cust-ak"] = ("Indian man in his twenties, wavy black hair, clean shaven, red t-shirt", 522)
CHARS["cust-kd"] = ("Indian woman in her fifties, grey-streaked black hair in a bun, blue kurta", 523)
CHARS["face-pv"] = ("Indian woman in her early twenties, long black braid", 531)
CHARS["face-ls"] = ("Indian woman in her fifties, black hair with grey, in a bun", 532)
plain = ", friendly smile, glossy animation film style, soft studio light"
# New professions (names starting "pro-"): their own work clothes in Saathi green, so no apron ending.
CHARS["pro-nurse"] = ("Indian woman nurse in her thirties, dark green nurse scrubs, stethoscope around her neck, holding a small first-aid bag, hair in a bun", 701)
# Scissors come out huge or sword-like, so the barber is drawn with a comb only; two seeds to choose from.
for i, seed in enumerate((705, 706)):
    CHARS[f"pro-barber-{'ab'[i]}"] = ("Indian man barber in his twenties standing, short black hair with a neat side part, trimmed beard, dark green apron over a grey shirt, small black comb in his shirt pocket, arms crossed", seed)
CHARS["pro-repair"] = ("Indian man electrician in his thirties, dark green work overalls with yellow trim, yellow safety helmet, holding a toolbox and a screwdriver", 702)
for name in sys.argv[1:] or CHARS:
    who, seed = CHARS[name]
    portrait = name.startswith(("cust-", "face-"))
    prompt = STYLE + who + ", yellow details" + plain if name.startswith("pro-") else FACE + who + plain if name.startswith("cust-") else (FACE if portrait else KSTYLE if name.startswith("kitchen-") else STYLE) + who + END
    # portraits are only ever shown as small avatars, so they are drawn smaller and faster
    gen(prompt, str(RAW / f"{name}.png"), seed=seed, neg=NEG, size=(768, 768) if portrait else (1024, 1024), steps=20 if portrait else 25,
        on_step=lambda i, n: print(name, i, n, flush=True) if i % 5 == 0 else None)
    print("saved", name, flush=True)
