# Saathi Partner app — route names

Tabs (reset the stack): `home`, `jobs`, `earnings`

## v1 — launch (area `v1/`)
Sign-up is 6 steps: details → work → specializations → skills → references → refCode → aadhaar → pan → documents
(only when the work needs more than Aadhaar and PAN) → waiting.
signin.phone (1), signin.otp (2; correct code 4821), signin.details (3 Name and email, step 1), signin.references (4, step 3),
signin.refCode (5), signin.aadhaar (6, step 4), signin.pan (7, step 5), signin.waiting (8),
signin.work (9 Your work, step 2), signin.specializations (10), signin.skills (11), signin.documents (12/14, step 6),
signin.docUpload (13; params { doc: DocId, sample?: boolean }),
finishCode (42 Finish code; happy 3907 / not-happy 6154 from codes in src/data/decisions.ts), finish.happy (43), finish.notHappy (44),
home (9), jobRequest (10), onJob (11), earnings (12), jobs (Jobs tab: today's and upcoming jobs — not drawn in the design, build it in the same style),
joining (13), hours (14), idCard (15), help (16),
checkIn (17), selfie (18), live (19), checkOut (20),
err.noJobs (21), err.offline (22), err.cancelled (23), err.locationOff (24),
profile (25), bank (26), alerts (27)

## v2 (area `v2/`)
shiftCheck (32), training (33), doorCode (34 start code; route name kept), payoutEarly (35),
route (36), ratings (37), bonuses (38), timeOff (39),
rateCustomer (40), reviews (41), quality (42), badges (43),
stories (44), kindWords (45), shareStory (46)

## v3 (area `v3/`)
voiceGuide (47), demandMap (48), photoCheck (49), planner (50),
benefits (51), advance (52), kitShop (53), community (54),
career (55), documents (56), swapJob (57), savings (58)
