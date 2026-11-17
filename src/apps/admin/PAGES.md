# Saathi Admin — page names

Use `go(name, params)` from `useAdmin()`. `section` = which sidebar item is highlighted.

## v1a (area `v1a/`)
| page | section | design |
|---|---|---|
| login | — (full screen) | 70 Sign in (email+password → 6-digit code → errors) |
| dashboard | dashboard | 5 Live operations |
| partners | partners | 6 Partners and pricing (partner list + docs; pricing block links to `services`) |
| payouts | payouts | 71 Payouts, offers and support |
| support | support | support ticket list (from 71) — rows open `ticket` |
| assign | bookings | 73 Assign and track a booking (params: { id }) |
| live | live | 74 Live map and attendance |
| bookings | bookings | 79 All bookings — rows open `assign` |
| ticket | support | 80 One support ticket (params: { id }) |

## v1b (area `v1b/`)
team (85, team), permissions (86, team), roleView (87 — switches the session to Support for two zones, then shows the dashboard as Support sees it), signups (88, partners),
safety (89, safety), services (90, pricing), partnerDetail (91, partners; params: { id })

## v2/v3 (area `v2v3/`)
customers (72, customers), ratings (75, ratings), zones (77, pricing), customerDetail (81, customers; params: { id }),
testimonials (84, support), offers (92, pricing), smallScreens (95 — tablet + phone layouts, render inside the page),
smart (76, automation), campaigns (78, campaigns), claims (93, support), advances (94, payouts)
