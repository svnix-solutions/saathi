-- Professions, specializations, skills and the documents each needs (PostgreSQL; loaded after seed_pricing.sql).
-- After launch these are edited in the admin panel (Professions & documents); the partner app only reads them.
INSERT INTO professions (code, name, sort_order) VALUES
    ('house_help',   'House help',   1),
    ('nurse',        'Nurse',        2),
    ('home_service', 'Home service', 3),
    ('barber',       'Barber',       4);

INSERT INTO specializations (profession_id, code, name)
SELECT p.id, v.code, v.name FROM professions p JOIN (VALUES
    ('house_help',   'deep_clean',   'Deep cleaning'),
    ('house_help',   'cooking',      'Cooking'),
    ('nurse',        'elderly',      'Elderly care'),
    ('nurse',        'post_surgery', 'After surgery care'),
    ('nurse',        'baby',         'Mother and baby care'),
    ('home_service', 'electrician',  'Electrician'),
    ('home_service', 'plumber',      'Plumber'),
    ('home_service', 'carpenter',    'Carpenter'),
    ('barber',       'men',          'Men'),
    ('barber',       'kids',         'Kids'),
    ('barber',       'women',        'Women')
) v(prof, code, name) ON v.prof = p.code;

INSERT INTO skills (profession_id, code, name)
SELECT p.id, v.code, v.name FROM professions p JOIN (VALUES
    ('house_help',   'sweep_mop',      'Sweep and mop'),
    ('house_help',   'bathroom',       'Bathroom cleaning'),
    ('house_help',   'dishes',         'Dishes'),
    ('house_help',   'laundry',        'Laundry and ironing'),
    ('nurse',        'injection',      'Injections'),
    ('nurse',        'wound_dressing', 'Wound dressing'),
    ('nurse',        'vitals',         'BP and sugar checks'),
    ('nurse',        'catheter',       'Catheter care'),
    ('home_service', 'wiring',         'Wiring and switches'),
    ('home_service', 'fan_fitting',    'Fan and light fitting'),
    ('home_service', 'tap_leak',       'Taps and leaks'),
    ('home_service', 'furniture',      'Furniture repair'),
    ('barber',       'hair_cut',       'Hair cutting'),
    ('barber',       'beard_trim',     'Beard trim'),
    ('barber',       'shave',          'Shave'),
    ('barber',       'hair_colour',    'Hair colour')
) v(prof, code, name) ON v.prof = p.code;

INSERT INTO document_types (code, name, has_back_side, asks_number, asks_expiry, help_text) VALUES
    ('aadhaar',              'Aadhaar card',                   true,  true,  false, 'Front and back, all four corners visible'),
    ('pan',                  'PAN card',                       false, true,  false, 'Needed so earnings and tax are recorded'),
    ('police_verification',  'Police verification',            false, false, true,  'From your local police station'),
    ('bank',                 'Bank passbook or cheque',        false, false, false, 'For weekly payouts'),
    ('nursing_certificate',  'Nursing certificate (GNM / ANM / B.Sc)', false, false, false, 'Your course certificate'),
    ('nursing_registration', 'Nursing council registration',   false, true,  true,  'State nursing council card'),
    ('iti_certificate',      'ITI certificate',                false, false, false, 'Electrician, plumber or carpenter trade'),
    ('electrical_licence',   'Electrical wireman licence',     false, true,  true,  'From the state electrical licensing board'),
    ('barber_certificate',   'Barber or beauty course certificate', false, false, false, 'Any recognised course'),
    ('child_safety',         'Child safety training',          false, false, true,  'Saathi training, or a course certificate');

-- Who needs what: empty profession and specialization = everyone.
INSERT INTO document_requirements (document_type_id, profession_id, specialization_id, is_mandatory)
SELECT d.id, p.id, s.id, v.mandatory
FROM (VALUES
    ('aadhaar',              NULL,           NULL,          true),
    ('pan',                  NULL,           NULL,          true),
    ('nursing_certificate',  'nurse',        NULL,          true),
    ('nursing_registration', 'nurse',        NULL,          true),
    ('police_verification',  'nurse',        NULL,          true),
    ('iti_certificate',      'home_service', NULL,          false),
    ('electrical_licence',   NULL,           'electrician', true),
    ('barber_certificate',   'barber',       NULL,          false),
    ('child_safety',         NULL,           'kids',        true)
) v(doc, prof, spec, mandatory)
JOIN document_types d ON d.code = v.doc
LEFT JOIN professions p ON p.code = v.prof
LEFT JOIN specializations s ON s.code = v.spec;

-- Which profession can be sent to each service; a specialization narrows it further.
UPDATE services sv SET profession_id = p.id FROM professions p, (VALUES
    ('clean','house_help'), ('deep','house_help'), ('kitchen','house_help'), ('laundry','house_help'), ('custom','house_help'),
    ('nurse_visit','nurse'), ('patient_care','nurse'), ('electrician','home_service'), ('plumber','home_service'),
    ('haircut','barber'), ('kids_haircut','barber')) v(svc, prof)
WHERE sv.code = v.svc AND p.code = v.prof;
UPDATE services sv SET specialization_id = s.id FROM specializations s, (VALUES
    ('electrician','electrician'), ('plumber','plumber'), ('kids_haircut','kids')) v(svc, spec)
WHERE sv.code = v.svc AND s.code = v.spec;
