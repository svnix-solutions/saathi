-- Saathi database design (PostgreSQL 16).
-- Load into an empty database:  psql -d saathi -f schema.sql
-- Sections 1 to 7 are what Version 1 needs. Section 8 is Version 2 (plans, wallet, offers, referrals).
-- Money is numeric(10,2) in rupees. Times are timestamptz (stored in UTC, shown in IST by the apps).
-- Every table has created_at, last_modified (kept current by a trigger, see the end of this file) and is_active.
-- is_active = false is a soft delete: the row is hidden from the apps but kept for history. It is separate from
-- is_live (on sale to customers) and from status columns.
-- Sign-in is by mobile number and SMS code; the codes themselves live with the SMS/auth provider, not here.

-- ---------------------------------------------------------------- 1. Areas, professions and services

CREATE TABLE zones (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name                text NOT NULL UNIQUE,                 -- "Block C", "Sector 21"
    city                text NOT NULL,
    is_live             boolean NOT NULL DEFAULT false,       -- off until enough partners are trained
    opens_at            time NOT NULL DEFAULT '06:00',
    closes_at           time NOT NULL DEFAULT '21:00',
    busy_surcharge_pct  numeric(5,2) NOT NULL DEFAULT 0 CHECK (busy_surcharge_pct BETWEEN 0 AND 100),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE professions (                                   -- the kind of work: house help, nurse, home service, barber
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code                text NOT NULL UNIQUE,                 -- house_help, nurse, home_service, barber
    name                text NOT NULL,
    sort_order          smallint NOT NULL DEFAULT 0,
    is_live             boolean NOT NULL DEFAULT true,        -- off: hidden from customers and from partner sign-up
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE specializations (                                -- a focus inside one profession; a partner may hold several
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    profession_id       bigint NOT NULL REFERENCES professions(id),
    code                text NOT NULL,                        -- barber: kids, men, bridal · nurse: elderly, post_surgery
    name                text NOT NULL,
    UNIQUE (profession_id, code),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE skills (                                         -- things a partner can do; a partner may tick many
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    profession_id       bigint NOT NULL REFERENCES professions(id),
    code                text NOT NULL,                        -- barber: hair_cut, beard_trim · nurse: injection, wound_dressing
    name                text NOT NULL,
    UNIQUE (profession_id, code),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE document_types (                                 -- every document a partner can be asked for
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code                text NOT NULL UNIQUE,                 -- aadhaar, pan, police_verification, bank, gnm_certificate ...
    name                text NOT NULL,
    has_back_side       boolean NOT NULL DEFAULT false,       -- ask for a second photo (Aadhaar)
    asks_number         boolean NOT NULL DEFAULT false,       -- ask for the document number (last 4 kept)
    asks_expiry         boolean NOT NULL DEFAULT false,       -- licences and registrations that run out
    help_text           text NOT NULL DEFAULT '',             -- shown on the upload screen
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE document_requirements (                          -- which documents sign-up asks for; the app reads this, nothing is hardcoded
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    document_type_id    bigint NOT NULL REFERENCES document_types(id),
    profession_id       bigint REFERENCES professions(id),    -- both empty: every partner (Aadhaar, PAN)
    specialization_id   bigint REFERENCES specializations(id),-- set: only partners with this specialization
    is_mandatory        boolean NOT NULL DEFAULT true,        -- false: optional, shown as "add if you have it"
    CHECK (profession_id IS NULL OR specialization_id IS NULL),   -- a specialization already names its profession
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE UNIQUE INDEX one_requirement ON document_requirements
    (document_type_id, COALESCE(profession_id, 0), COALESCE(specialization_id, 0)) WHERE is_active;

CREATE TABLE services (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code                text NOT NULL UNIQUE,                 -- clean, deep, nurse_visit, electrician, haircut ...
    profession_id       bigint REFERENCES professions(id),    -- who can be sent; set by seed_professions.sql
    specialization_id   bigint REFERENCES specializations(id),-- set: only partners with this specialization (kids haircut)
    name                text NOT NULL,
    description         text NOT NULL DEFAULT '',
    rate_per_30_min     numeric(10,2) NOT NULL CHECK (rate_per_30_min > 0),
    needs_skill         boolean NOT NULL DEFAULT false,       -- true for deep cleaning: only trained partners
    is_live             boolean NOT NULL DEFAULT true,
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE app_settings (                                   -- booking rules the apps read instead of hardcoding them
    key                 text PRIMARY KEY,                     -- min_minutes, max_minutes, step_minutes, plan_discount_pct ...
    value               text NOT NULL,
    description         text NOT NULL DEFAULT '',
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
-- Starting prices and rules are in seed_pricing.sql. Apps never contain a price: they ask the server, which reads
-- services.rate_per_30_min and app_settings, and the amount is copied onto each booking when it is made.

CREATE TABLE service_tasks (                                  -- the tick-list shown under a service
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    service_id          bigint NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    name                text NOT NULL,                        -- "Sweep and mop floors"
    sort_order          smallint NOT NULL DEFAULT 0,
    UNIQUE (service_id, name),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

-- ---------------------------------------------------------------- 2. Customers

CREATE TABLE customers (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    mobile              varchar(10) NOT NULL UNIQUE CHECK (mobile ~ '^[6-9][0-9]{9}$'),
    name                text NOT NULL DEFAULT '',
    language            text NOT NULL DEFAULT 'en' CHECK (language IN ('en','hi','pa')),
    photo_url           text,
    profile_completed_at timestamptz,                         -- null = registration not finished: the app shows the detail screens, never Home
    is_blocked          boolean NOT NULL DEFAULT false,
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE addresses (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id         bigint NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    zone_id             bigint REFERENCES zones(id),          -- null = outside the service area
    label               text NOT NULL DEFAULT 'Home',
    line1               text NOT NULL,                        -- flat, building
    area                text NOT NULL,
    pin_code            varchar(6) CHECK (pin_code ~ '^[0-9]{6}$'),
    lat                 numeric(9,6) NOT NULL,
    lng                 numeric(9,6) NOT NULL,
    home_size           text CHECK (home_size IN ('1bhk','2bhk','3bhk_plus')),
    bathrooms           smallint CHECK (bathrooms BETWEEN 0 AND 20),
    has_pets            boolean NOT NULL DEFAULT false,
    has_elderly         boolean NOT NULL DEFAULT false,       -- an elderly person is at home
    entry_note          text NOT NULL DEFAULT '',             -- "Gate 2, tell the guard flat 204"
    is_default          boolean NOT NULL DEFAULT false,
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE UNIQUE INDEX one_default_address ON addresses (customer_id) WHERE is_default;

-- ---------------------------------------------------------------- 3. Partners (the helpers)

CREATE TABLE partners (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    mobile              varchar(10) NOT NULL UNIQUE CHECK (mobile ~ '^[6-9][0-9]{9}$'),
    name                text NOT NULL,
    email               text UNIQUE,
    email_verified_at   timestamptz,
    language            text NOT NULL DEFAULT 'hi' CHECK (language IN ('en','hi','pa')),
    home_area           text,                                 -- "Area you live in", as typed at sign-up
    profession_id       bigint REFERENCES professions(id),    -- one at a time; chosen at sign-up, changed only by the team
    signup_completed_at timestamptz,                          -- set when details, work, both references and every document in partner_required_documents are in; Home needs this and status 'active'
    photo_url           text,
    zone_id             bigint REFERENCES zones(id),          -- home zone
    status              text NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending','active','suspended','left')),
    is_online           boolean NOT NULL DEFAULT false,
    last_lat            numeric(9,6),                         -- updated only while online
    last_lng            numeric(9,6),
    last_seen_at        timestamptz,
    rating_avg          numeric(3,2),                         -- kept up to date from ratings
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE INDEX partners_dispatch ON partners (zone_id) WHERE is_online AND status = 'active';

CREATE TABLE partner_documents (                              -- the joining steps
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    partner_id          bigint NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    document_type_id    bigint NOT NULL REFERENCES document_types(id),
    status              text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','in_review','verified','rejected')),
    file_url            text,                                 -- front side or only side; kept in private storage, never a public link
    file_back_url       text,                                 -- back side (Aadhaar)
    number_last4        char(4),                              -- last 4 characters only. Never store a full Aadhaar number here:
                                                              -- the law requires it masked or held in a separate encrypted vault
    name_on_document    text,
    rejected_reason     text,                                 -- "Photo not clear": the partner is asked to upload again
    verified_by         bigint,                               -- admin_users.id, set below
    verified_at         timestamptz,
    expires_at          date,
    CHECK (status <> 'rejected' OR rejected_reason IS NOT NULL),
    UNIQUE (partner_id, document_type_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE partner_references (                             -- two people who vouch for the partner, each confirmed by a code on their own phone
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    partner_id          bigint NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    position            smallint NOT NULL CHECK (position IN (1, 2)),
    name                text NOT NULL,
    mobile              varchar(10) NOT NULL CHECK (mobile ~ '^[6-9][0-9]{9}$'),
    relation            text NOT NULL CHECK (relation IN ('neighbour','past_employer','relative','other')),
    verified_at         timestamptz,                          -- set when the code sent to this number is entered correctly
    UNIQUE (partner_id, position),
    UNIQUE (partner_id, mobile),                              -- the two references must be different people
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
-- The cross-row rule for this table is enforced by a trigger in section 10.

CREATE TABLE partner_specializations (                        -- several per partner, all in the partner's profession (trigger, section 10)
    partner_id          bigint NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    specialization_id   bigint NOT NULL REFERENCES specializations(id),
    PRIMARY KEY (partner_id, specialization_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE partner_skills (                                 -- many per partner, all in the partner's profession (trigger, section 10)
    partner_id          bigint NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    skill_id            bigint NOT NULL REFERENCES skills(id),
    PRIMARY KEY (partner_id, skill_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE partner_services (                               -- extra training the team has signed off (services with needs_skill)
    partner_id          bigint NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    service_id          bigint NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    PRIMARY KEY (partner_id, service_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE partner_shifts (                                 -- working hours
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    partner_id          bigint NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    weekday             smallint NOT NULL CHECK (weekday BETWEEN 0 AND 6),   -- 0 = Monday
    starts_at           time NOT NULL,
    ends_at             time NOT NULL,
    CHECK (ends_at > starts_at),
    UNIQUE (partner_id, weekday, starts_at),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

-- ---------------------------------------------------------------- 3b. Sign-in
-- Customers and partners sign in with a mobile number and an SMS code; there are no passwords.
-- A number that is not known yet gets a new customers row with profile_completed_at empty, and the app keeps that
-- person on the registration screens until name and address are saved. A known, complete number goes to Home.

CREATE TABLE otp_requests (                                   -- one row per code sent
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    mobile              varchar(10) NOT NULL CHECK (mobile ~ '^[6-9][0-9]{9}$'),
    audience            text NOT NULL CHECK (audience IN ('customer','partner','reference')),   -- 'reference' = code sent to a partner's reference
    code_hash           text NOT NULL,                        -- the code itself is never stored
    expires_at          timestamptz NOT NULL,                 -- 5 minutes after sending
    attempts            smallint NOT NULL DEFAULT 0 CHECK (attempts BETWEEN 0 AND 5),   -- wrong guesses; 5 locks the code
    used_at             timestamptz,                          -- set when it signs someone in, or when a newer code replaces it
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE INDEX otp_latest ON otp_requests (mobile, audience, created_at DESC);

CREATE TABLE auth_sessions (                                  -- who is signed in, on which device
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    token_hash          text NOT NULL UNIQUE,                 -- the token lives only on the device
    customer_id         bigint REFERENCES customers(id) ON DELETE CASCADE,
    partner_id          bigint REFERENCES partners(id) ON DELETE CASCADE,
    device              text,
    expires_at          timestamptz NOT NULL,
    CHECK ((customer_id IS NULL) <> (partner_id IS NULL)),    -- a session belongs to exactly one of them
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

-- ---------------------------------------------------------------- 4. Bookings and visits

CREATE TABLE bookings (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id         bigint NOT NULL REFERENCES customers(id),
    address_id          bigint NOT NULL REFERENCES addresses(id),
    zone_id             bigint NOT NULL REFERENCES zones(id),
    service_id          bigint NOT NULL REFERENCES services(id),
    partner_id          bigint REFERENCES partners(id),       -- null until someone accepts
    minutes             smallint NOT NULL CHECK (minutes BETWEEN 30 AND 180 AND minutes % 30 = 0),
    scheduled_for       timestamptz,                          -- null = "now"
    status              text NOT NULL DEFAULT 'searching'
                        CHECK (status IN ('searching','assigned','on_the_way','in_progress','done','cancelled')),
    notes               text NOT NULL DEFAULT '',
    -- Three one-time codes, shown only in the customer's app. The partner types the one the customer reads out.
    start_code          char(4) NOT NULL CHECK (start_code ~ '^[0-9]{4}$'),        -- at the door: starts the job and the clock
    finish_ok_code      char(4) NOT NULL CHECK (finish_ok_code ~ '^[0-9]{4}$'),    -- at the end, if the customer is happy
    finish_issue_code   char(4) NOT NULL CHECK (finish_issue_code ~ '^[0-9]{4}$'), -- at the end, if not: the partner cannot tell which one it is
    CHECK (finish_ok_code <> finish_issue_code AND start_code NOT IN (finish_ok_code, finish_issue_code)),
    -- prices are copied onto the booking so later price changes never alter old bills
    rate_per_30_min     numeric(10,2) NOT NULL,
    surcharge_pct       numeric(5,2) NOT NULL DEFAULT 0,
    amount              numeric(10,2) NOT NULL CHECK (amount >= 0),
    partner_earning     numeric(10,2) NOT NULL DEFAULT 0 CHECK (partner_earning >= 0),
    cancelled_by        text CHECK (cancelled_by IN ('customer','partner','admin')),
    cancel_fee          numeric(10,2) NOT NULL DEFAULT 0,
    created_at          timestamptz NOT NULL DEFAULT now(),
    CHECK ((status = 'cancelled') = (cancelled_by IS NOT NULL)),
    CHECK (status IN ('searching','cancelled') OR partner_id IS NOT NULL),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE INDEX bookings_customer ON bookings (customer_id, created_at DESC);
CREATE INDEX bookings_partner  ON bookings (partner_id, created_at DESC);
CREATE INDEX bookings_open     ON bookings (zone_id, status) WHERE status NOT IN ('done','cancelled');
-- The cross-row rule for this table is enforced by a trigger in section 10.

CREATE TABLE booking_tasks (                                  -- the chores chosen, ticked off by the partner
    booking_id          bigint NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    task_id             bigint NOT NULL REFERENCES service_tasks(id),
    done_at             timestamptz,
    PRIMARY KEY (booking_id, task_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE booking_offers (                                 -- who was asked to take the job, and what they said
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    booking_id          bigint NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    partner_id          bigint NOT NULL REFERENCES partners(id),
    sent_at             timestamptz NOT NULL DEFAULT now(),
    response            text NOT NULL DEFAULT 'waiting' CHECK (response IN ('waiting','accepted','declined','no_answer')),
    responded_at        timestamptz,
    assigned_by_admin   boolean NOT NULL DEFAULT false,
    UNIQUE (booking_id, partner_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE visits (                                         -- check-in and check-out; one per booking
    booking_id          bigint PRIMARY KEY REFERENCES bookings(id) ON DELETE CASCADE,
    check_in_at         timestamptz,
    check_in_lat        numeric(9,6),
    check_in_lng        numeric(9,6),
    check_in_distance_m integer,                              -- metres from the door
    check_in_selfie_url text,
    check_in_matched    boolean,                              -- selfie matched the partner's photo
    check_out_at        timestamptz,
    check_out_selfie_url text,
    check_out_matched   boolean,
    start_code_at       timestamptz,                          -- start code matched; the job clock runs from here
    finish_code_at      timestamptz,                          -- a finish code matched
    outcome             text CHECK (outcome IN ('satisfied','not_satisfied')),   -- which finish code it was
    code_tries          smallint NOT NULL DEFAULT 0 CHECK (code_tries BETWEEN 0 AND 5),
                                                              -- wrong codes for the current step; reset when a code matches.
                                                              -- At 5 the app stops asking and support finishes the step.
    CHECK ((outcome IS NULL) = (finish_code_at IS NULL)),
    CHECK (finish_code_at IS NULL OR start_code_at IS NOT NULL),
    CHECK (finish_code_at IS NULL OR finish_code_at >= start_code_at),
    -- not_satisfied: the server opens a support ticket for the booking and holds the partner's earning for it
    -- (partner_earnings) until support has called the customer.
    extra_minutes       smallint NOT NULL DEFAULT 0 CHECK (extra_minutes >= 0 AND extra_minutes % 30 = 0),
    CHECK (check_out_at IS NULL OR check_out_at >= check_in_at),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE visit_photos (                                   -- photos of the finished work
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    booking_id          bigint NOT NULL REFERENCES visits(booking_id) ON DELETE CASCADE,
    label               text NOT NULL DEFAULT '',             -- "Floor", "Kitchen"
    file_url            text NOT NULL,
    taken_at            timestamptz NOT NULL DEFAULT now(),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE ratings (                                        -- both directions, at most one each per booking
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    booking_id          bigint NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    rated_by            text NOT NULL CHECK (rated_by IN ('customer','partner')),
    stars               smallint NOT NULL CHECK (stars BETWEEN 1 AND 5),
    tags                text[] NOT NULL DEFAULT '{}',         -- "On time", "Thorough"
    comment             text NOT NULL DEFAULT '',
    tip                 numeric(10,2) NOT NULL DEFAULT 0 CHECK (tip >= 0),
    created_at          timestamptz NOT NULL DEFAULT now(),
    UNIQUE (booking_id, rated_by),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE customer_partner_prefs (                         -- favourites and "do not send again"
    customer_id         bigint NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    partner_id          bigint NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    pref                text NOT NULL CHECK (pref IN ('favourite','blocked')),
    PRIMARY KEY (customer_id, partner_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

-- ---------------------------------------------------------------- 5. Money

CREATE TABLE payments (                                       -- money from the customer
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    booking_id          bigint NOT NULL REFERENCES bookings(id),
    method              text NOT NULL CHECK (method IN ('online','cash','wallet')),   -- online = through a payment gateway
    amount              numeric(10,2) NOT NULL CHECK (amount > 0),
    status              text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','failed')),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE INDEX payments_booking ON payments (booking_id);

CREATE TABLE refunds (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payment_id          bigint NOT NULL REFERENCES payments(id),
    amount              numeric(10,2) NOT NULL CHECK (amount > 0),
    reason              text NOT NULL,
    approved_by         bigint,                               -- admin_users.id, set below
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE payouts (                                        -- the weekly (or early) transfer to a partner
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    partner_id          bigint NOT NULL REFERENCES partners(id),
    period_start        date NOT NULL,
    period_end          date NOT NULL,
    amount              numeric(10,2) NOT NULL CHECK (amount >= 0),
    fee                 numeric(10,2) NOT NULL DEFAULT 0,     -- charged for taking money out early
    status              text NOT NULL DEFAULT 'to_approve' CHECK (status IN ('to_approve','approved','on_hold','processing','paid','failed')),
    paid_at             timestamptz,
    gateway_id          bigint,                               -- which provider sent the money (payment_gateways.id, set below)
    provider_payout_id  text,                                 -- the provider's payout id, e.g. RazorpayX pout_...
    utr                 text,                                 -- bank reference number once the transfer lands
    failure_reason      text,
    CHECK (period_end >= period_start),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE partner_earnings (                               -- one line per thing a partner is owed
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    partner_id          bigint NOT NULL REFERENCES partners(id),
    booking_id          bigint REFERENCES bookings(id),       -- null for bonuses not tied to a job
    kind                text NOT NULL CHECK (kind IN ('job','tip','bonus','cancel_compensation','adjustment')),
    amount              numeric(10,2) NOT NULL,
    payout_id           bigint REFERENCES payouts(id),        -- null until included in a payout
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE INDEX earnings_unpaid ON partner_earnings (partner_id) WHERE payout_id IS NULL;

-- ---------------------------------------------------------------- 5b. Payment gateways (Razorpay first; others can be added)
-- More than one gateway can be live at once. Each is one row in payment_gateways; every gateway table carries
-- gateway_id and stores the provider's own ids in provider_* columns, so adding PayU, Cashfree or PhonePe later
-- needs a new row and new server code, not new tables. The notes in brackets give Razorpay's names for each id.
-- How an online payment flows:
--   1. Customer confirms a booking  -> a payments row (method 'online', status 'pending') and an order
--      is created with the chosen gateway (Razorpay: Orders API); its id is saved in gateway_orders.
--   2. The gateway's checkout opens in the app. Every try the customer makes is one gateway_transactions row
--      (a failed UPI attempt and then a successful one are two rows on the same order).
--   3. The app sends back the payment id and a signature; the server checks the signature and sets
--      signature_verified (Razorpay: HMAC-SHA256 of "order_id|payment_id" with the key secret).
--   4. The gateway also calls our webhook (payment.captured, payment.failed, refund.processed ...). Each call is
--      stored once in gateway_webhook_events; the unique event id makes a repeated delivery harmless.
--   5. On 'captured' the payments row becomes 'paid'. Refunds are sent to the same gateway that took the payment and tracked in gateway_refunds.
-- Gateways report money as whole paise, so the gateway tables keep integer paise exactly as received.
-- API keys and secrets are configuration, never stored in the database.

CREATE TABLE payment_gateways (                               -- the providers we can take or send money through
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code                text NOT NULL UNIQUE,                 -- 'razorpay', later 'payu', 'cashfree', 'phonepe'
    name                text NOT NULL,
    takes_payments      boolean NOT NULL DEFAULT true,        -- can collect from customers
    sends_payouts       boolean NOT NULL DEFAULT false,       -- can pay partners (Razorpay: RazorpayX)
    is_live             boolean NOT NULL DEFAULT false,       -- offered to customers right now
    priority            smallint NOT NULL DEFAULT 100,        -- lowest number is tried first; the next is the fallback
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
INSERT INTO payment_gateways (code, name, takes_payments, sends_payouts, is_live, priority)
VALUES ('razorpay', 'Razorpay', true, true, true, 1);
ALTER TABLE payouts ADD FOREIGN KEY (gateway_id) REFERENCES payment_gateways(id);
ALTER TABLE payouts ADD UNIQUE (gateway_id, provider_payout_id);

CREATE TABLE partner_payout_accounts (                        -- where a partner's money goes, per gateway
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    partner_id          bigint NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    gateway_id          bigint NOT NULL REFERENCES payment_gateways(id),
    provider_contact_id text,                                 -- (Razorpay: cont_...)
    provider_account_id text NOT NULL,                        -- (Razorpay: fund account fa_...); the bank number itself is never stored
    account_hint        text,                                 -- what to show the partner, e.g. "State Bank ···· 4821"
    is_default          boolean NOT NULL DEFAULT false,
    UNIQUE (gateway_id, provider_account_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE UNIQUE INDEX one_default_payout_account ON partner_payout_accounts (partner_id) WHERE is_default;

CREATE TABLE gateway_orders (                                 -- one order with a gateway per online payment try-set
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payment_id          bigint NOT NULL REFERENCES payments(id),   -- several rows if the customer switches gateway
    gateway_id          bigint NOT NULL REFERENCES payment_gateways(id),
    provider_order_id   text NOT NULL,                        -- (Razorpay: order_...)
    amount_paise        integer NOT NULL CHECK (amount_paise > 0),
    currency            char(3) NOT NULL DEFAULT 'INR',
    receipt             text NOT NULL UNIQUE,                 -- our own reference sent to the gateway, e.g. "bk_2041_1"
    status              text NOT NULL DEFAULT 'created' CHECK (status IN ('created','attempted','paid')),
    expires_at          timestamptz,                          -- when the held helper is released if unpaid
    UNIQUE (gateway_id, provider_order_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE gateway_transactions (                           -- every payment attempt a gateway reports
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    gateway_order_id    bigint NOT NULL REFERENCES gateway_orders(id),
    gateway_id          bigint NOT NULL REFERENCES payment_gateways(id),   -- same as the order's; kept here so ids stay unique per gateway
    provider_payment_id text NOT NULL,                        -- (Razorpay: pay_...)
    status              text NOT NULL CHECK (status IN ('created','authorized','captured','failed','refunded')),
    method              text CHECK (method IN ('upi','card','netbanking','wallet','emi','paylater')),
    amount_paise        integer NOT NULL CHECK (amount_paise > 0),
    fee_paise           integer CHECK (fee_paise >= 0),       -- the gateway's charge, known after capture
    tax_paise           integer CHECK (tax_paise >= 0),       -- GST on that charge
    vpa                 text,                                 -- UPI id used, when method = 'upi'
    bank                text,
    card_network        text,
    card_last4          char(4),                              -- never the full card number
    error_code          text,                                 -- filled when status = 'failed'
    error_description   text,
    signature_verified  boolean NOT NULL DEFAULT false,
    captured_at         timestamptz,
    raw                 jsonb NOT NULL DEFAULT '{}',          -- the payment object exactly as the gateway sent it
    CHECK (status <> 'failed' OR error_code IS NOT NULL),
    UNIQUE (gateway_id, provider_payment_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE INDEX gateway_tx_order ON gateway_transactions (gateway_order_id);
CREATE UNIQUE INDEX one_capture_per_order ON gateway_transactions (gateway_order_id) WHERE status IN ('captured','refunded');
-- The cross-row rule for this table is enforced by a trigger in section 10.

CREATE TABLE gateway_refunds (                                -- a refund as the gateway sees it
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    refund_id           bigint NOT NULL UNIQUE REFERENCES refunds(id),
    gateway_transaction_id bigint NOT NULL REFERENCES gateway_transactions(id),
    gateway_id          bigint NOT NULL REFERENCES payment_gateways(id),
    provider_refund_id  text,                                 -- (Razorpay: rfnd_...), null until the gateway accepts the request
    amount_paise        integer NOT NULL CHECK (amount_paise > 0),
    status              text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processed','failed')),
    processed_at        timestamptz,
    raw                 jsonb NOT NULL DEFAULT '{}',
    UNIQUE (gateway_id, provider_refund_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE gateway_webhook_events (                         -- every webhook call, kept as received
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    gateway_id          bigint NOT NULL REFERENCES payment_gateways(id),
    provider_event_id   text NOT NULL,                        -- (Razorpay: x-razorpay-event-id header); a repeat delivery is rejected
    event_type          text NOT NULL,                        -- payment.captured, payment.failed, refund.processed, payout.processed ...
    signature_valid     boolean NOT NULL,                     -- the gateway's signature header checked against its webhook secret
    payload             jsonb NOT NULL,
    processed_at        timestamptz,                          -- null = not yet applied to our tables
    error               text,                                 -- why processing failed, if it did
    UNIQUE (gateway_id, provider_event_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE INDEX webhook_unprocessed ON gateway_webhook_events (created_at) WHERE processed_at IS NULL;

-- ---------------------------------------------------------------- 6. Support

CREATE TABLE admin_users (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email               text NOT NULL UNIQUE,
    name                text NOT NULL,
    password_hash       text,                                 -- a salted hash (argon2 or bcrypt), never the password itself
    last_login_at       timestamptz,
    phone               varchar(10) CHECK (phone ~ '^[6-9][0-9]{9}$'),   -- where the second-step code is sent
    failed_logins       smallint NOT NULL DEFAULT 0 CHECK (failed_logins >= 0),   -- reset on a good sign-in
    locked_until        timestamptz,                          -- set after too many wrong passwords; an Owner can clear it
    is_active           boolean NOT NULL DEFAULT true,
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE refunds ADD FOREIGN KEY (approved_by) REFERENCES admin_users(id);
ALTER TABLE partner_documents ADD FOREIGN KEY (verified_by) REFERENCES admin_users(id);

-- ---------------------------------------------------------------- 6a. Admin roles and access
-- What an admin can see and do comes from roles, not from the person. A person can hold several roles at once
-- (for example Support and Finance), and a role can be limited to one zone. A permission is one thing the admin
-- panel can check, named area.action. To change what a role may do, edit role_permissions; no code change needed.

CREATE TABLE roles (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code                text NOT NULL UNIQUE,                 -- owner, operations, support, finance, quality, marketing, viewer
    name                text NOT NULL,
    description         text NOT NULL DEFAULT '',
    refund_limit        numeric(10,2) NOT NULL DEFAULT 0 CHECK (refund_limit >= 0),   -- most one refund may be without escalation
    is_system           boolean NOT NULL DEFAULT false,       -- built-in role: may be edited but not deleted
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE permissions (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code                text NOT NULL UNIQUE CHECK (code ~ '^[a-z_]+\.[a-z_]+$'),   -- area.action, e.g. payouts.approve
    area                text NOT NULL,                        -- the admin menu item it belongs to
    description         text NOT NULL,
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE role_permissions (                               -- which permissions each role has
    role_id             bigint NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id       bigint NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE admin_user_roles (                               -- which roles each person holds; several rows = several roles
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    admin_user_id       bigint NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    role_id             bigint NOT NULL REFERENCES roles(id),
    zone_id             bigint REFERENCES zones(id),          -- null = all zones; set = this role applies in that zone only
    granted_by          bigint REFERENCES admin_users(id),
    expires_at          timestamptz,                          -- for temporary cover; null = no end
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE UNIQUE INDEX one_grant_per_role_and_zone ON admin_user_roles (admin_user_id, role_id, COALESCE(zone_id, 0));
-- The cross-row rule for this table is enforced by a trigger in section 10.

INSERT INTO roles (code, name, description, refund_limit, is_system) VALUES
    ('owner',      'Owner',      'Everything, including team and roles',                  100000, true),
    ('operations', 'Operations', 'Bookings, assignment, live map, partners, zones',         1000, true),
    ('support',    'Support',    'Tickets, customers, small refunds',                        200, true),
    ('finance',    'Finance',    'Payouts, refunds, reports',                               5000, true),
    ('quality',    'Quality',    'Ratings, reviews, testimonials, partner quality',            0, true),
    ('marketing',  'Marketing',  'Campaigns, offer codes, testimonials',                       0, true),
    ('viewer',     'Viewer',     'Can look at everything, change nothing',                     0, true);

INSERT INTO permissions (code, area, description) VALUES
    ('dashboard.view',     'Dashboard',       'See the live dashboard'),
    ('bookings.view',      'Bookings',        'See bookings'),
    ('bookings.assign',    'Bookings',        'Assign or reassign a partner by hand'),
    ('bookings.cancel',    'Bookings',        'Cancel a booking for a customer'),
    ('live_map.view',      'Live map',        'See partner locations and attendance'),
    ('safety.handle',      'Safety',          'Open and close safety alerts'),
    ('automation.manage',  'Automation',      'Change auto-assign rules and review alerts'),
    ('partners.view',      'Partners',        'See partners and their documents'),
    ('partners.manage',    'Partners',        'Approve, suspend or edit a partner'),
    ('partners.verify',    'Partners',        'Check sign-up documents and references'),
    ('customers.view',     'Customers',       'See customers'),
    ('customers.manage',   'Customers',       'Block a customer or add wallet credit'),
    ('ratings.view',       'Ratings',         'See ratings and quality'),
    ('reviews.moderate',   'Ratings',         'Approve, hide or reply to reviews and testimonials'),
    ('pricing.manage',     'Pricing & zones', 'Change service prices'),
    ('zones.manage',       'Pricing & zones', 'Open, close or tune a zone'),
    ('payouts.view',       'Payouts',         'See partner payouts'),
    ('payouts.approve',    'Payouts',         'Approve and send payouts'),
    ('refunds.issue',      'Payouts',         'Refund a customer, up to the role''s limit'),
    ('campaigns.manage',   'Campaigns',       'Create offer codes and send campaigns'),
    ('support.view',       'Support',         'See support tickets'),
    ('support.reply',      'Support',         'Reply to and close tickets'),
    ('team.manage',        'Team',            'Add admins and change roles'),
    ('audit.view',         'Team',            'See who changed what');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r JOIN permissions p ON
       r.code = 'owner'
    OR (r.code = 'viewer'     AND p.code LIKE '%.view')
    OR (r.code = 'operations' AND p.code IN ('dashboard.view','bookings.view','bookings.assign','bookings.cancel','live_map.view','automation.manage',
                                             'partners.view','partners.manage','partners.verify','safety.handle','customers.view','ratings.view','zones.manage','support.view','refunds.issue'))
    OR (r.code = 'support'    AND p.code IN ('dashboard.view','bookings.view','bookings.cancel','customers.view','partners.view','support.view','support.reply','refunds.issue','safety.handle'))
    OR (r.code = 'finance'    AND p.code IN ('dashboard.view','bookings.view','customers.view','partners.view','payouts.view','payouts.approve','refunds.issue','audit.view'))
    OR (r.code = 'quality'    AND p.code IN ('dashboard.view','bookings.view','partners.view','partners.verify','customers.view','ratings.view','reviews.moderate','live_map.view'))
    OR (r.code = 'marketing'  AND p.code IN ('dashboard.view','customers.view','ratings.view','reviews.moderate','campaigns.manage'));

-- Everything a signed-in admin may do, worked out from all their active roles. The admin panel reads this.
CREATE VIEW admin_user_permissions AS
    SELECT ur.admin_user_id, p.code AS permission, p.area, ur.zone_id, r.code AS via_role, r.refund_limit
    FROM admin_user_roles ur
    JOIN admin_users u       ON u.id = ur.admin_user_id AND u.is_active
    JOIN roles r             ON r.id = ur.role_id AND r.is_active
    JOIN role_permissions rp ON rp.role_id = r.id AND rp.is_active
    JOIN permissions p       ON p.id = rp.permission_id AND p.is_active
    WHERE ur.is_active AND (ur.expires_at IS NULL OR ur.expires_at > now());

-- admin_can(person, 'payouts.approve')           -> may they do this anywhere? (use to show or hide a menu item)
-- admin_can(person, 'bookings.assign', zone_id)  -> may they do this in that zone? (use before the action itself)
CREATE FUNCTION admin_can(p_admin bigint, p_permission text, p_zone bigint DEFAULT NULL) RETURNS boolean LANGUAGE sql STABLE AS $$
    SELECT EXISTS (SELECT 1 FROM admin_user_permissions
                   WHERE admin_user_id = p_admin AND permission = p_permission
                     AND (zone_id IS NULL OR p_zone IS NULL OR zone_id = p_zone));
$$;

-- The largest single refund this person may make (the highest limit among their roles that can refund).
CREATE FUNCTION admin_refund_limit(p_admin bigint) RETURNS numeric LANGUAGE sql STABLE AS $$
    SELECT COALESCE(max(refund_limit), 0) FROM admin_user_permissions WHERE admin_user_id = p_admin AND permission = 'refunds.issue';
$$;


CREATE TABLE support_tickets (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    booking_id          bigint REFERENCES bookings(id),
    customer_id         bigint REFERENCES customers(id),      -- exactly one of customer or partner raised it
    partner_id          bigint REFERENCES partners(id),
    reason              text NOT NULL,                        -- "Work was not finished"
    status              text NOT NULL DEFAULT 'open' CHECK (status IN ('open','answered','closed')),
    assigned_to         bigint REFERENCES admin_users(id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    closed_at           timestamptz,
    CHECK ((customer_id IS NULL) <> (partner_id IS NULL)),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE INDEX tickets_open ON support_tickets (created_at) WHERE status <> 'closed';

CREATE TABLE ticket_messages (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ticket_id           bigint NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
    sender              text NOT NULL CHECK (sender IN ('customer','partner','admin')),
    admin_user_id       bigint REFERENCES admin_users(id),
    body                text NOT NULL,
    is_private_note     boolean NOT NULL DEFAULT false,       -- visible to staff only
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

-- ---------------------------------------------------------------- 6b. Reviews and testimonials
-- A rating (section 4) is the stars and tags every visit can get. A review is the written part a customer chooses
-- to make public on the helper's profile. A testimonial is a quote picked by the team for the website or app.
-- Both start as 'pending' and are shown to users only after an admin approves them.

CREATE TABLE reviews (                                        -- the public, written part of a customer's rating
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rating_id           bigint NOT NULL UNIQUE REFERENCES ratings(id) ON DELETE CASCADE,
    customer_id         bigint NOT NULL REFERENCES customers(id),
    partner_id          bigint NOT NULL REFERENCES partners(id),   -- whose profile it shows on
    on_time_stars       smallint CHECK (on_time_stars BETWEEN 1 AND 5),
    quality_stars       smallint CHECK (quality_stars BETWEEN 1 AND 5),
    behaviour_stars     smallint CHECK (behaviour_stars BETWEEN 1 AND 5),
    body                text NOT NULL CHECK (length(trim(body)) > 0),
    show_first_name     boolean NOT NULL DEFAULT false,       -- false = shown as "A customer"
    status              text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','published','hidden')),
    approved_by         bigint REFERENCES admin_users(id),    -- the admin who approved it for public view
    approved_at         timestamptz,
    hidden_reason       text,                                 -- abusive, personal details, contested and upheld ...
    contested_by_partner boolean NOT NULL DEFAULT false,      -- the partner said "this was not fair"
    reply               text,                                 -- Saathi's public reply
    replied_by          bigint REFERENCES admin_users(id),
    replied_at          timestamptz,
    CHECK ((reply IS NULL) = (replied_by IS NULL)),
    CHECK (status <> 'hidden' OR hidden_reason IS NOT NULL),
    CHECK (status <> 'published' OR (approved_by IS NOT NULL AND approved_at IS NOT NULL)),   -- nothing is public until an admin approves
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE INDEX reviews_on_profile ON reviews (partner_id, created_at DESC) WHERE status = 'published';

CREATE TABLE review_photos (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id           bigint NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    file_url            text NOT NULL,
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE testimonials (                                   -- quotes chosen for the website and app
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    audience            text NOT NULL CHECK (audience IN ('customer','partner')),   -- which side is speaking
    review_id           bigint REFERENCES reviews(id),        -- set when it was picked from a real review
    customer_id         bigint REFERENCES customers(id),
    partner_id          bigint REFERENCES partners(id),
    author_name         text NOT NULL,                        -- as it will be shown: "Farah, Sector 18"
    quote               text NOT NULL CHECK (length(trim(quote)) > 0),
    stars               smallint CHECK (stars BETWEEN 1 AND 5),
    photo_url           text,
    show_on             text[] NOT NULL DEFAULT '{website}',  -- website, customer_app, partner_app
    sort_order          smallint NOT NULL DEFAULT 100,
    consent_given_at    timestamptz,                          -- when the person agreed to be quoted
    status              text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','published','rejected','retired')),
    approved_by         bigint REFERENCES admin_users(id),    -- the admin who approved it
    approved_at         timestamptz,
    rejected_reason     text,
    -- a testimonial is always from a real, named person who agreed to it before it goes live
    CHECK ((audience = 'customer' AND customer_id IS NOT NULL AND partner_id IS NULL)
        OR (audience = 'partner'  AND partner_id  IS NOT NULL AND customer_id IS NULL)),
    CHECK (status <> 'published' OR (consent_given_at IS NOT NULL AND approved_by IS NOT NULL AND approved_at IS NOT NULL)),
    CHECK (status <> 'rejected' OR rejected_reason IS NOT NULL),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE INDEX testimonials_live ON testimonials (sort_order) WHERE status = 'published';

-- The apps and the website read ONLY these two views, never the tables, so an unapproved review or testimonial
-- cannot reach a user by mistake. A row appears here only after an admin has approved it.
CREATE VIEW public_reviews AS
    SELECT r.id, r.partner_id, r.on_time_stars, r.quality_stars, r.behaviour_stars, r.body, r.reply, r.created_at,
           CASE WHEN r.show_first_name THEN split_part(c.name, ' ', 1) ELSE 'A customer' END AS shown_name
    FROM reviews r JOIN customers c ON c.id = r.customer_id
    WHERE r.status = 'published' AND r.is_active;

CREATE VIEW public_testimonials AS
    SELECT id, audience, author_name, quote, stars, photo_url, show_on, sort_order
    FROM testimonials
    WHERE status = 'published' AND is_active;

-- ---------------------------------------------------------------- 7. Who changed what

CREATE TABLE audit_log (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    admin_user_id       bigint NOT NULL REFERENCES admin_users(id),
    action              text NOT NULL,                        -- "suspended partner", "refunded 79"
    entity              text NOT NULL,                        -- table name
    entity_id           bigint,
    detail              jsonb NOT NULL DEFAULT '{}',
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

-- ---------------------------------------------------------------- 8. Version 2: plans, wallet, offers, referrals

CREATE TABLE plans (                                          -- monthly plan: same helper on set days
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id         bigint NOT NULL REFERENCES customers(id),
    address_id          bigint NOT NULL REFERENCES addresses(id),
    service_id          bigint NOT NULL REFERENCES services(id),
    partner_id          bigint REFERENCES partners(id),       -- the regular helper
    weekdays            smallint[] NOT NULL,                  -- 0 = Monday
    starts_at           time NOT NULL,
    minutes             smallint NOT NULL CHECK (minutes BETWEEN 30 AND 180 AND minutes % 30 = 0),
    discount_pct        numeric(5,2) NOT NULL DEFAULT 0,
    status              text NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused','ended')),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
ALTER TABLE bookings ADD COLUMN plan_id bigint REFERENCES plans(id);   -- set on visits a plan created

CREATE TABLE wallet_transactions (                            -- balance = sum(amount) for the customer
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id         bigint NOT NULL REFERENCES customers(id),
    amount              numeric(10,2) NOT NULL CHECK (amount <> 0),   -- plus = money in, minus = spent
    kind                text NOT NULL CHECK (kind IN ('top_up','refund','referral','payment','adjustment')),
    booking_id          bigint REFERENCES bookings(id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE INDEX wallet_customer ON wallet_transactions (customer_id);

CREATE TABLE coupons (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code                text NOT NULL UNIQUE,                 -- FIRST50
    amount_off          numeric(10,2),
    percent_off         numeric(5,2),
    first_visit_only    boolean NOT NULL DEFAULT false,
    valid_until         date,
    is_live             boolean NOT NULL DEFAULT true,
    CHECK ((amount_off IS NULL) <> (percent_off IS NULL)),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE coupon_uses (
    coupon_id           bigint NOT NULL REFERENCES coupons(id),
    booking_id          bigint NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,   -- one coupon per booking
    discount            numeric(10,2) NOT NULL CHECK (discount > 0),
    PRIMARY KEY (coupon_id, booking_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE referrals (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    referrer_id         bigint NOT NULL REFERENCES customers(id),
    referred_id         bigint NOT NULL UNIQUE REFERENCES customers(id),   -- a person can be referred once
    rewarded_at         timestamptz,                          -- set after the friend's first visit
    CHECK (referrer_id <> referred_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

-- ---------------------------------------------------------------- 8b. Other features drawn in the Version 1 and 2 screens
-- Tables for screens that had none: emergency button, chat, alerts, booking for family, two helpers, supplies,
-- points, gifts, societies, time off, training, badges and bonus schemes.

ALTER TABLE bookings ADD COLUMN contact_name   text;                       -- booking for someone else: who opens the door
ALTER TABLE bookings ADD COLUMN contact_mobile varchar(10) CHECK (contact_mobile ~ '^[6-9][0-9]{9}$');
ALTER TABLE bookings ADD COLUMN helpers_count  smallint NOT NULL DEFAULT 1 CHECK (helpers_count IN (1, 2));   -- deep clean with two helpers
-- ponytail: bookings.partner_id still holds one partner; a second helper needs a booking_partners table when that ships.

CREATE TABLE safety_alerts (                                  -- the Emergency / "I do not feel safe" button (Version 1)
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    booking_id          bigint REFERENCES bookings(id),
    customer_id         bigint REFERENCES customers(id),      -- exactly one of customer or partner raised it
    partner_id          bigint REFERENCES partners(id),
    lat                 numeric(9,6),
    lng                 numeric(9,6),
    status              text NOT NULL DEFAULT 'open' CHECK (status IN ('open','handling','closed')),
    handled_by          bigint REFERENCES admin_users(id),
    note                text NOT NULL DEFAULT '',
    CHECK ((customer_id IS NULL) <> (partner_id IS NULL)),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE INDEX safety_open ON safety_alerts (created_at) WHERE status <> 'closed';

CREATE TABLE booking_messages (                               -- chat between customer and helper; numbers stay private
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    booking_id          bigint NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    sender              text NOT NULL CHECK (sender IN ('customer','partner')),
    body                text NOT NULL CHECK (length(trim(body)) > 0),
    read_at             timestamptz,
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE INDEX booking_messages_thread ON booking_messages (booking_id, id);

CREATE TABLE notifications (                                  -- the Alerts screen, for customers and partners
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id         bigint REFERENCES customers(id) ON DELETE CASCADE,
    partner_id          bigint REFERENCES partners(id) ON DELETE CASCADE,
    kind                text NOT NULL,                        -- arrival, refund, plan_reminder, rate_visit, offer, job, payout ...
    title               text NOT NULL,
    body                text NOT NULL DEFAULT '',
    booking_id          bigint REFERENCES bookings(id),
    read_at             timestamptz,
    CHECK ((customer_id IS NULL) <> (partner_id IS NULL)),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE products (                                       -- cleaning supplies a helper can bring
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name                text NOT NULL UNIQUE,
    price               numeric(10,2) NOT NULL CHECK (price > 0),
    is_live             boolean NOT NULL DEFAULT true,
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE booking_items (                                  -- supplies added to a visit; price copied so later changes do not alter the bill
    booking_id          bigint NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    product_id          bigint NOT NULL REFERENCES products(id),
    quantity            smallint NOT NULL CHECK (quantity BETWEEN 1 AND 20),
    unit_price          numeric(10,2) NOT NULL,
    PRIMARY KEY (booking_id, product_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE points_transactions (                            -- rewards; a customer's points = sum(points)
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id         bigint NOT NULL REFERENCES customers(id),
    points              integer NOT NULL CHECK (points <> 0),  -- plus = earned, minus = used
    reason              text NOT NULL CHECK (reason IN ('visit','rating','photo_review','referral','testimonial','redeemed','adjustment')),
    booking_id          bigint REFERENCES bookings(id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
CREATE INDEX points_customer ON points_transactions (customer_id);

CREATE TABLE gift_vouchers (                                  -- "Gift a visit"
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code                text NOT NULL UNIQUE,
    bought_by           bigint NOT NULL REFERENCES customers(id),
    payment_id          bigint REFERENCES payments(id),
    recipient_name      text NOT NULL,
    recipient_mobile    varchar(10) NOT NULL CHECK (recipient_mobile ~ '^[6-9][0-9]{9}$'),
    message             text NOT NULL DEFAULT '',
    value               numeric(10,2) NOT NULL CHECK (value > 0),
    balance             numeric(10,2) NOT NULL CHECK (balance >= 0),
    redeemed_by         bigint REFERENCES customers(id),      -- set when the recipient signs in and claims it
    expires_at          date NOT NULL,
    CHECK (balance <= value),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE societies (                                      -- an apartment society with its own offer
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    zone_id             bigint NOT NULL REFERENCES zones(id),
    name                text NOT NULL,
    discount_pct        numeric(5,2) NOT NULL DEFAULT 0 CHECK (discount_pct BETWEEN 0 AND 100),
    offer_until         date,
    UNIQUE (zone_id, name),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);
ALTER TABLE addresses ADD COLUMN society_id bigint REFERENCES societies(id);

CREATE TABLE partner_time_off (                               -- days a partner asks to be away
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    partner_id          bigint NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    from_date           date NOT NULL,
    to_date             date NOT NULL,
    reason              text NOT NULL CHECK (reason IN ('family','not_well','festival','weekly_off','other')),
    status              text NOT NULL DEFAULT 'requested' CHECK (status IN ('requested','approved','refused')),
    decided_by          bigint REFERENCES admin_users(id),
    CHECK (to_date >= from_date),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE training_lessons (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title               text NOT NULL UNIQUE,
    video_url           text,
    minutes             smallint NOT NULL CHECK (minutes > 0),
    sort_order          smallint NOT NULL DEFAULT 0,
    unlocks_service_id  bigint REFERENCES services(id),       -- finishing it lets the partner take this service
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE partner_lessons (                                -- each partner's progress
    partner_id          bigint NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    lesson_id           bigint NOT NULL REFERENCES training_lessons(id) ON DELETE CASCADE,
    watched_minutes     smallint NOT NULL DEFAULT 0 CHECK (watched_minutes >= 0),
    completed_at        timestamptz,
    PRIMARY KEY (partner_id, lesson_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE badges (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code                text NOT NULL UNIQUE,                 -- top_rated, visits_100, always_on_time ...
    name                text NOT NULL,
    rule                text NOT NULL DEFAULT '',             -- how it is earned, in words
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE partner_badges (
    partner_id          bigint NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    badge_id            bigint NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    earned_at           timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (partner_id, badge_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE bonus_schemes (                                  -- weekly target, busy-hour pay and similar; paid out as partner_earnings of kind 'bonus'
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name                text NOT NULL,
    kind                text NOT NULL CHECK (kind IN ('weekly_target','busy_hour','rating','referral')),
    zone_id             bigint REFERENCES zones(id),          -- null = all zones
    target              integer,                              -- jobs for weekly_target, rating x 10 for rating
    amount              numeric(10,2) NOT NULL CHECK (amount > 0),
    starts_on           date NOT NULL,
    ends_on             date,
    CHECK (ends_on IS NULL OR ends_on >= starts_on),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

-- ---------------------------------------------------------------- 8c. "Later" features: membership, cover, advances, savings, campaigns, shared homes, kit
-- Designed now so the screens have somewhere to store their data. Membership cover, advances and savings each need
-- a licensed insurer, lender or bank behind them; provider_ref columns hold that partner's own reference.

CREATE TABLE memberships (                                    -- Saathi Plus
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id         bigint NOT NULL REFERENCES customers(id),
    term                text NOT NULL CHECK (term IN ('monthly','yearly')),
    price               numeric(10,2) NOT NULL CHECK (price >= 0),
    starts_on           date NOT NULL,
    ends_on             date NOT NULL,
    status              text NOT NULL DEFAULT 'active' CHECK (status IN ('active','cancelled','expired')),
    payment_id          bigint REFERENCES payments(id),
    CHECK (ends_on > starts_on),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE protection_claims (                              -- "something was damaged"
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    booking_id          bigint NOT NULL REFERENCES bookings(id),
    customer_id         bigint NOT NULL REFERENCES customers(id),
    description         text NOT NULL,
    claimed_amount      numeric(10,2) NOT NULL CHECK (claimed_amount > 0),
    approved_amount     numeric(10,2) CHECK (approved_amount >= 0),
    photo_urls          text[] NOT NULL DEFAULT '{}',
    status              text NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted','approved','rejected','paid')),
    decided_by          bigint REFERENCES admin_users(id),
    provider_ref        text,                                 -- the insurer's claim number, if one is involved
    CHECK (approved_amount IS NULL OR approved_amount <= claimed_amount),
    CHECK (status IN ('submitted','rejected') OR approved_amount IS NOT NULL),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE partner_cover (                                  -- accident and health cover a partner holds
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    partner_id          bigint NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    kind                text NOT NULL CHECK (kind IN ('accident','health','family_health')),
    insurer             text NOT NULL,
    provider_ref        text NOT NULL,                        -- policy number
    cover_amount        numeric(12,2) NOT NULL CHECK (cover_amount > 0),
    valid_from          date NOT NULL,
    valid_until         date NOT NULL,
    CHECK (valid_until > valid_from),
    UNIQUE (partner_id, kind, valid_from),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE partner_advances (                               -- money ahead of payday, repaid from weekly payouts
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    partner_id          bigint NOT NULL REFERENCES partners(id),
    amount              numeric(10,2) NOT NULL CHECK (amount > 0),
    repay_weeks         smallint NOT NULL CHECK (repay_weeks BETWEEN 1 AND 52),
    outstanding         numeric(10,2) NOT NULL CHECK (outstanding >= 0),
    status              text NOT NULL DEFAULT 'requested' CHECK (status IN ('requested','active','repaid','refused')),
    approved_by         bigint REFERENCES admin_users(id),
    provider_ref        text,                                 -- the lender's reference
    CHECK (outstanding <= amount),
    CHECK ((status = 'repaid') = (outstanding = 0) OR status IN ('requested','refused')),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE UNIQUE INDEX one_open_advance ON partner_advances (partner_id) WHERE status IN ('requested','active');

CREATE TABLE savings_pots (                                   -- one savings goal per partner, held at a bank
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    partner_id          bigint NOT NULL UNIQUE REFERENCES partners(id) ON DELETE CASCADE,
    goal_name           text NOT NULL,
    goal_amount         numeric(10,2) NOT NULL CHECK (goal_amount > 0),
    per_payout          numeric(10,2) NOT NULL DEFAULT 0 CHECK (per_payout >= 0),   -- saved from every weekly payout
    save_tips           boolean NOT NULL DEFAULT false,
    provider_ref        text,                                 -- the bank's account reference
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE savings_transactions (                           -- balance = sum(amount) for the pot
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pot_id              bigint NOT NULL REFERENCES savings_pots(id) ON DELETE CASCADE,
    amount              numeric(10,2) NOT NULL CHECK (amount <> 0),   -- plus = saved, minus = taken out
    kind                text NOT NULL CHECK (kind IN ('payout','tips','withdrawal')),
    payout_id           bigint REFERENCES payouts(id),
    CHECK ((kind = 'withdrawal') = (amount < 0)),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE campaigns (                                      -- a message sent to a chosen group
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name                text NOT NULL,
    audience            text NOT NULL CHECK (audience IN ('customer','partner')),
    segment             text NOT NULL,                        -- "not booked in 30 days", "partners near Block D"
    channels            text[] NOT NULL CHECK (channels <@ ARRAY['app','whatsapp','sms'] AND cardinality(channels) > 0),
    message             text NOT NULL,
    coupon_id           bigint REFERENCES coupons(id),
    status              text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','scheduled','running','ended')),
    scheduled_for       timestamptz,
    created_by          bigint NOT NULL REFERENCES admin_users(id),
    CHECK (status <> 'scheduled' OR scheduled_for IS NOT NULL),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE campaign_deliveries (                            -- who received a campaign, and whether they then booked
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    campaign_id         bigint NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    customer_id         bigint REFERENCES customers(id),
    partner_id          bigint REFERENCES partners(id),
    channel             text NOT NULL CHECK (channel IN ('app','whatsapp','sms')),
    sent_at             timestamptz NOT NULL DEFAULT now(),
    booking_id          bigint REFERENCES bookings(id),       -- the booking it led to, if any
    CHECK ((customer_id IS NULL) <> (partner_id IS NULL)),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE households (                                     -- a shared home: flatmates who book and pay together
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    address_id          bigint NOT NULL UNIQUE REFERENCES addresses(id),
    name                text NOT NULL,
    split_equally       boolean NOT NULL DEFAULT true,
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE household_members (
    household_id        bigint NOT NULL REFERENCES households(id) ON DELETE CASCADE,
    customer_id         bigint NOT NULL REFERENCES customers(id),
    can_book            boolean NOT NULL DEFAULT true,        -- false = pays only
    share_pct           numeric(5,2) CHECK (share_pct BETWEEN 0 AND 100),   -- used when the bill is not split equally
    PRIMARY KEY (household_id, customer_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE kit_products (                                   -- uniform and tools sold to partners at cost
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name                text NOT NULL UNIQUE,
    price               numeric(10,2) NOT NULL CHECK (price >= 0),
    first_one_free      boolean NOT NULL DEFAULT false,
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE kit_orders (                                     -- paid for by deduction from earnings
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    partner_id          bigint NOT NULL REFERENCES partners(id),
    pickup_hub          text NOT NULL,
    total               numeric(10,2) NOT NULL CHECK (total >= 0),
    status              text NOT NULL DEFAULT 'ordered' CHECK (status IN ('ordered','ready','collected','cancelled')),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

CREATE TABLE kit_order_items (
    order_id            bigint NOT NULL REFERENCES kit_orders(id) ON DELETE CASCADE,
    product_id          bigint NOT NULL REFERENCES kit_products(id),
    quantity            smallint NOT NULL CHECK (quantity BETWEEN 1 AND 20),
    unit_price          numeric(10,2) NOT NULL CHECK (unit_price >= 0),
    PRIMARY KEY (order_id, product_id),
    created_at          timestamptz NOT NULL DEFAULT now(),
    last_modified       timestamptz NOT NULL DEFAULT now(),
    is_active           boolean NOT NULL DEFAULT true
);

-- ---------------------------------------------------------------- 9. last_modified is set automatically on every update

CREATE FUNCTION set_last_modified() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
    NEW.last_modified := now();
    RETURN NEW;
END $$;

DO $$
DECLARE t text;
BEGIN
    FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
        EXECUTE format('CREATE TRIGGER %I BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION set_last_modified()', t || '_last_modified', t);
    END LOOP;
END $$;

-- ---------------------------------------------------------------- 10. Rules that span rows or tables, enforced by triggers

-- A partner cannot hold two live bookings that overlap in time.
CREATE FUNCTION check_partner_free() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE starts timestamptz; ends timestamptz;
BEGIN
    IF NEW.partner_id IS NULL OR NEW.status NOT IN ('assigned','on_the_way','in_progress') THEN RETURN NEW; END IF;
    PERFORM pg_advisory_xact_lock(NEW.partner_id);   -- two assignments for one partner are checked one after the other
    starts := COALESCE(NEW.scheduled_for, NEW.created_at);
    ends   := starts + make_interval(mins => NEW.minutes);
    IF EXISTS (SELECT 1 FROM bookings b
               WHERE b.partner_id = NEW.partner_id AND b.id <> NEW.id AND b.status IN ('assigned','on_the_way','in_progress')
                 AND COALESCE(b.scheduled_for, b.created_at) < ends
                 AND COALESCE(b.scheduled_for, b.created_at) + make_interval(mins => b.minutes) > starts) THEN
        RAISE EXCEPTION 'Partner % already has a booking at that time', NEW.partner_id USING ERRCODE = 'exclusion_violation';
    END IF;
    RETURN NEW;
END $$;
CREATE TRIGGER bookings_partner_free BEFORE INSERT OR UPDATE OF partner_id, status, scheduled_for, minutes ON bookings
    FOR EACH ROW EXECUTE FUNCTION check_partner_free();

-- There is always at least one active Owner with access to all zones.
CREATE FUNCTION keep_one_owner() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM admin_user_roles ur JOIN roles r ON r.id = ur.role_id JOIN admin_users u ON u.id = ur.admin_user_id
                   WHERE r.code = 'owner' AND ur.is_active AND u.is_active AND ur.zone_id IS NULL
                     AND (ur.expires_at IS NULL OR ur.expires_at > now())) THEN
        RAISE EXCEPTION 'There must always be at least one Owner' USING ERRCODE = 'check_violation';
    END IF;
    RETURN NULL;
END $$;
CREATE TRIGGER owner_grant_kept AFTER UPDATE OR DELETE ON admin_user_roles
    FOR EACH ROW WHEN (OLD.is_active) EXECUTE FUNCTION keep_one_owner();
CREATE TRIGGER owner_person_kept AFTER UPDATE OF is_active ON admin_users
    FOR EACH ROW WHEN (OLD.is_active AND NOT NEW.is_active) EXECUTE FUNCTION keep_one_owner();
-- (These fire only once an Owner has been granted; before that there is nothing to protect. Removing a non-Owner
-- grant while an Owner exists passes the check.)

-- A partner cannot name their own number as a reference.
CREATE FUNCTION reference_not_self() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
    IF NEW.mobile = (SELECT mobile FROM partners WHERE id = NEW.partner_id) THEN
        RAISE EXCEPTION 'A reference must be a different person from the partner' USING ERRCODE = 'check_violation';
    END IF;
    RETURN NEW;
END $$;
CREATE TRIGGER reference_checked BEFORE INSERT OR UPDATE OF mobile ON partner_references
    FOR EACH ROW EXECUTE FUNCTION reference_not_self();

-- One payment can be captured once, whichever gateway it went through.
CREATE FUNCTION one_capture_per_payment() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE pay bigint;
BEGIN
    IF NEW.status NOT IN ('captured','refunded') THEN RETURN NEW; END IF;
    SELECT payment_id INTO pay FROM gateway_orders WHERE id = NEW.gateway_order_id;
    PERFORM pg_advisory_xact_lock(pay);
    IF EXISTS (SELECT 1 FROM gateway_transactions t JOIN gateway_orders o ON o.id = t.gateway_order_id
               WHERE o.payment_id = pay AND t.id <> NEW.id AND t.status IN ('captured','refunded')) THEN
        RAISE EXCEPTION 'Payment % has already been captured', pay USING ERRCODE = 'unique_violation';
    END IF;
    RETURN NEW;
END $$;
CREATE TRIGGER capture_once BEFORE INSERT OR UPDATE OF status ON gateway_transactions
    FOR EACH ROW EXECUTE FUNCTION one_capture_per_payment();

-- A partner's specializations and skills must belong to the profession they hold, and the profession cannot be
-- changed while old ones are still active (the team removes them first, so one profession at a time stays true).
CREATE FUNCTION check_partner_profession() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE want bigint; got bigint;
BEGIN
    IF TG_TABLE_NAME = 'partners' THEN
        IF EXISTS (SELECT 1 FROM partner_specializations ps JOIN specializations x ON x.id = ps.specialization_id
                   WHERE ps.partner_id = NEW.id AND ps.is_active AND x.profession_id IS DISTINCT FROM NEW.profession_id)
        OR EXISTS (SELECT 1 FROM partner_skills ps JOIN skills x ON x.id = ps.skill_id
                   WHERE ps.partner_id = NEW.id AND ps.is_active AND x.profession_id IS DISTINCT FROM NEW.profession_id) THEN
            RAISE EXCEPTION 'Remove the old specializations and skills before changing profession' USING ERRCODE = 'check_violation';
        END IF;
        RETURN NEW;
    END IF;
    SELECT profession_id INTO want FROM partners WHERE id = NEW.partner_id;
    IF TG_TABLE_NAME = 'partner_specializations' THEN
        SELECT profession_id INTO got FROM specializations WHERE id = NEW.specialization_id;
    ELSE
        SELECT profession_id INTO got FROM skills WHERE id = NEW.skill_id;
    END IF;
    IF want IS DISTINCT FROM got THEN
        RAISE EXCEPTION 'That is not part of the partner''s profession' USING ERRCODE = 'check_violation';
    END IF;
    RETURN NEW;
END $$;
CREATE TRIGGER profession_kept BEFORE UPDATE OF profession_id ON partners
    FOR EACH ROW EXECUTE FUNCTION check_partner_profession();
CREATE TRIGGER specialization_in_profession BEFORE INSERT OR UPDATE ON partner_specializations
    FOR EACH ROW EXECUTE FUNCTION check_partner_profession();
CREATE TRIGGER skill_in_profession BEFORE INSERT OR UPDATE ON partner_skills
    FOR EACH ROW EXECUTE FUNCTION check_partner_profession();

-- ---------------------------------------------------------------- 11. Documents each partner must upload

-- Everyone's documents, plus those for the partner's profession, plus those for each specialization they hold.
-- The sign-up app lists these rows; uploaded is false until a partner_documents row exists that is not rejected.
CREATE VIEW partner_required_documents AS
SELECT p.id AS partner_id, d.id AS document_type_id, d.code, d.name, bool_or(r.is_mandatory) AS is_mandatory,
       EXISTS (SELECT 1 FROM partner_documents pd WHERE pd.partner_id = p.id AND pd.document_type_id = d.id
               AND pd.is_active AND pd.status <> 'rejected') AS uploaded
FROM partners p
JOIN document_requirements r ON r.is_active AND (
       (r.profession_id IS NULL AND r.specialization_id IS NULL)
    OR r.profession_id = p.profession_id
    OR r.specialization_id IN (SELECT specialization_id FROM partner_specializations WHERE partner_id = p.id AND is_active))
JOIN document_types d ON d.id = r.document_type_id AND d.is_active
GROUP BY p.id, d.id;
