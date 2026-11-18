# Saathi customer app — route names

Every screen registers under one of these names in its area's `routes.ts`. Use them with
`nav.push(name, params)` / `nav.reset(name)` to link across areas. Pushing a name that does
not exist yet shows a "not in this prototype yet" toast instead of crashing.

Tabs (reset the stack): `home`, `bookings`, `account`

## v1 — launch (area `v1/`)
| route | design screen |
|---|---|
| signin.phone | 1 Mobile number |
| signin.otp | 2 SMS code (correct code in the prototype: 4821, anything else shows the error) |
| signin.name | 3 New customer: name |
| signin.address | 4 New customer: address |
| home | 5 Home, with Cleaning / Nursing / Repair / Barber on top (params: { category }) |
| chores | 6 Choose chores (params: { service }) |
| time | 7 Duration and time |
| confirm | 8 Confirm and pay |
| tracking | 9 Helper on the way |
| tracking (params: { arrived: true }) | 9b Start code at the door |
| inProgress | 10 Job in progress |
| visit.finish | 9d Two finish codes (happy 3907 / not happy 6154) |
| visit.notHappy | 9e After the not-happy code |
| rate | 11 Rate and tip |
| bookings | 12 My bookings |
| addresses | 13 Addresses and home details |
| changeBooking | 14 Change or cancel |
| help | 15 Help and safety |
| err.noHelper / err.offline / err.paymentFailed / err.outsideArea | 20–23 |
| account | 28 My account |
| paymentMethods | 29 Payment methods |
| alertSettings | 30 Alert settings |
| deleteAccount | 31 Delete my account |

## v2 (area `v2a/`)
plan (32), favourites (33), supplies (34), receipt (35), wallet (36), refer (37), chat (38), alerts (39),
helperProfile (40), visitReport (41), bookForFamily (42), deepClean (43),
ratingDetailed (44), ratingLow (45), helperReviews (46), rewards (47)

## v2 (area `v2b/`)
language (48), gift (49), supportChat (50), society (51),
homeTestimonial (52 — the home screen with the testimonial card), testimonials (53), testimonialConsent (54), myTestimonial (55)

## v3 (area `v3/`)
voiceBooking (56), photoEstimate (57), smartHome (58), lockScreen (59),
plus (60), damageClaim (61), sharedHome (62), notHome (63)
