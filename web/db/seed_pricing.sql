-- Starting prices and booking rules. Loaded once into an empty database (by server.py, or: psql -d saathi -f seed_pricing.sql).
-- After that, prices are changed in the admin panel and live only in the database; no app or page contains a price.
-- ON CONFLICT DO NOTHING: safe to run again (server.py runs it at every start), so new services reach an existing
-- database without overwriting prices the team has changed. Works in both PostgreSQL and SQLite.
INSERT INTO services (code, name, description, rate_per_30_min) VALUES
    ('clean',   'General cleaning',         'Sweep, mop, dust, surfaces, windows, balcony', 79),
    ('deep',    'Kitchen & bathroom scrub', 'Bathrooms, slabs, cabinets, fridge, fans',    129),
    ('kitchen', 'Dishes & meal prep',       'Utensils, chopping, basic prep',               79),
    ('laundry', 'Laundry & organizing',     'Wash, fold, iron, wardrobe',                   89),
    ('custom',  'Hourly custom help',       'You decide the chores',                        99),
    ('nurse_visit',  'Nurse visit',           'Injections, dressing, BP and sugar checks',   199),
    ('patient_care', 'Patient & elder care',  'Hourly care at home by a trained attendant',  149),
    ('electrician',  'Electrician',           'Switches, fans, lights, small wiring',        149),
    ('plumber',      'Plumber',               'Taps, leaks, blockages, fittings',            149),
    ('haircut',      'Haircut at home',       'Hair cut, beard trim and shave',               99),
    ('kids_haircut', 'Kids haircut',          'By a barber trained with children',            89)
ON CONFLICT (code) DO NOTHING;
INSERT INTO app_settings (key, value, description) VALUES
    ('min_minutes',       '30',  'Shortest visit that can be booked'),
    ('max_minutes',       '180', 'Longest visit that can be booked'),
    ('step_minutes',      '30',  'Visits are booked in blocks of this many minutes'),
    ('plan_discount_pct', '10',  'Saving on a monthly plan, in percent')
ON CONFLICT (key) DO NOTHING;
