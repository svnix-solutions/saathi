-- Checks that the schema refuses bad data. Run by test_schema.sh against a throwaway database (never a real one).
INSERT INTO zones(name,city) VALUES ('Block C','Test'),('Block D','Test');
-- services come from seed_pricing.sql; id 1 is General cleaning
INSERT INTO customers(mobile,name) VALUES ('9876543210','Nitin'),('9876500000','Meera');
INSERT INTO addresses(customer_id,zone_id,line1,area,lat,lng) VALUES (1,1,'Flat 204','Block C',28.5,77.3);
INSERT INTO partners(mobile,name,status) VALUES ('9811120034','Sunita','active'),('9811100000','Rekha','active');
INSERT INTO admin_users(email,name) VALUES ('owner@example.com','Owner'),('second@example.com','Second');
INSERT INTO admin_user_roles(admin_user_id,role_id) SELECT 1, id FROM roles WHERE code='owner';
INSERT INTO admin_user_roles(admin_user_id,role_id) SELECT 2, id FROM roles WHERE code='support';
INSERT INTO bookings(customer_id,address_id,zone_id,service_id,partner_id,minutes,scheduled_for,start_code,finish_ok_code,finish_issue_code,rate_per_30_min,amount,status)
  VALUES (1,1,1,1,1,60,'2030-01-01 10:00+05:30','4821','3907','6154',79,158,'assigned'), (1,1,1,1,NULL,60,'2030-01-01 10:30+05:30','4821','3907','6154',79,158,'searching');
INSERT INTO payments(booking_id,method,amount) VALUES (1,'online',158);
INSERT INTO payment_gateways(code,name) VALUES ('payu','PayU');
INSERT INTO gateway_orders(payment_id,gateway_id,provider_order_id,amount_paise,receipt) VALUES (1,1,'o1',15800,'r1'),(1,2,'o2',15800,'r2');
INSERT INTO gateway_transactions(gateway_order_id,gateway_id,provider_payment_id,status,amount_paise) VALUES (1,1,'p1','captured',15800);
INSERT INTO partner_references(partner_id,position,name,mobile,relation) VALUES (1,1,'Kamla','9822014567','neighbour');
INSERT INTO products(name,price) VALUES ('Floor cleaner',89);
INSERT INTO badges(code,name) VALUES ('top_rated','Top rated');
INSERT INTO training_lessons(title,minutes) VALUES ('Floors',6);
INSERT INTO societies(zone_id,name) VALUES (1,'Green Park');
INSERT INTO savings_pots(partner_id,goal_name,goal_amount) VALUES (1,'School fees',10000);
INSERT INTO partner_advances(partner_id,amount,repay_weeks,outstanding,status) VALUES (1,2000,4,2000,'active');
INSERT INTO kit_products(name,price) VALUES ('Gloves',60);
INSERT INTO kit_orders(partner_id,pickup_hub,total) VALUES (1,'Block C hub',60);
INSERT INTO households(address_id,name) VALUES (1,'Flat 204');
INSERT INTO campaigns(name,audience,segment,channels,message,created_by) VALUES ('Come back','customer','not booked in 30 days','{whatsapp}','Hello',1);
-- things that must be allowed
UPDATE partners SET profession_id=(SELECT id FROM professions WHERE code='barber') WHERE id=1;   -- Sunita: barber, kids
INSERT INTO partner_specializations(partner_id,specialization_id) SELECT 1,id FROM specializations WHERE code IN ('kids','men');
INSERT INTO partner_skills(partner_id,skill_id) SELECT 1,id FROM skills WHERE code IN ('hair_cut','beard_trim','shave');
INSERT INTO partner_documents(partner_id,document_type_id) SELECT 1,id FROM document_types WHERE code='aadhaar';
DO $$ BEGIN   -- documents asked of a barber with kids: Aadhaar, PAN, barber certificate (optional), child safety
  IF (SELECT string_agg(code||':'||is_mandatory||':'||uploaded, ',' ORDER BY code) FROM partner_required_documents WHERE partner_id=1)
     <> 'aadhaar:true:true,barber_certificate:false:false,child_safety:true:false,pan:true:false' THEN
    RAISE EXCEPTION 'wrong documents: %', (SELECT string_agg(code, ',') FROM partner_required_documents WHERE partner_id=1);
  END IF;
  IF (SELECT count(*) FROM partner_required_documents WHERE partner_id=2) <> 2 THEN RAISE EXCEPTION 'no profession should mean Aadhaar and PAN only'; END IF;
END $$;
UPDATE bookings SET partner_id=2, status='assigned' WHERE id=2;                       -- a different partner at the same time
DELETE FROM admin_user_roles WHERE admin_user_id=2;                                    -- removing a non-Owner grant
INSERT INTO gateway_transactions(gateway_order_id,gateway_id,provider_payment_id,status,amount_paise,error_code) VALUES (2,2,'p2','failed',15800,'X');

DO $$
DECLARE bad text; refused int := 0; total int := 0;
BEGIN
  FOREACH bad IN ARRAY ARRAY[
    -- rules across rows (section 10)
    $q$UPDATE bookings SET partner_id=1 WHERE id=2$q$,                                                -- same partner, overlapping time
    $q$DELETE FROM admin_user_roles WHERE admin_user_id=1$q$,                                         -- the last Owner
    $q$UPDATE admin_users SET is_active=false WHERE id=1$q$,
    $q$UPDATE admin_user_roles SET is_active=false WHERE admin_user_id=1$q$,
    $q$INSERT INTO partner_references(partner_id,position,name,mobile,relation) VALUES (1,2,'Self','9811120034','other')$q$,
    $q$INSERT INTO gateway_transactions(gateway_order_id,gateway_id,provider_payment_id,status,amount_paise) VALUES (2,2,'p3','captured',15800)$q$,
    -- start and finish codes
    $q$UPDATE bookings SET finish_issue_code=finish_ok_code WHERE id=1$q$,
    $q$UPDATE bookings SET finish_ok_code=start_code WHERE id=1$q$,
    $q$INSERT INTO visits(booking_id,outcome) VALUES (1,'satisfied')$q$,
    $q$INSERT INTO visits(booking_id,finish_code_at,outcome) VALUES (1,now(),'satisfied')$q$,
    $q$INSERT INTO visits(booking_id,code_tries) VALUES (1,6)$q$,
    -- one profession at a time, specializations and skills only from it
    $q$INSERT INTO partner_specializations(partner_id,specialization_id) SELECT 1,id FROM specializations WHERE code='elderly'$q$,
    $q$INSERT INTO partner_skills(partner_id,skill_id) SELECT 1,id FROM skills WHERE code='injection'$q$,
    $q$INSERT INTO partner_skills(partner_id,skill_id) SELECT 2,id FROM skills WHERE code='hair_cut'$q$,               -- no profession yet
    $q$UPDATE partners SET profession_id=(SELECT id FROM professions WHERE code='nurse') WHERE id=1$q$,               -- still has barber skills
    $q$INSERT INTO partner_documents(partner_id,document_type_id) SELECT 1,id FROM document_types WHERE code='aadhaar'$q$,
    $q$INSERT INTO document_requirements(document_type_id,profession_id,specialization_id) SELECT d.id,p.id,s.id FROM document_types d, professions p, specializations s WHERE d.code='pan' AND p.code='nurse' AND s.code='elderly'$q$,
    $q$INSERT INTO document_requirements(document_type_id) SELECT id FROM document_types WHERE code='aadhaar'$q$,
    $q$INSERT INTO specializations(profession_id,code,name) SELECT id,'kids','Again' FROM professions WHERE code='barber'$q$,
    -- the 14 feature tables (section 8b)
    $q$INSERT INTO safety_alerts(booking_id) VALUES (1)$q$,
    $q$INSERT INTO safety_alerts(customer_id,partner_id) VALUES (1,1)$q$,
    $q$INSERT INTO booking_messages(booking_id,sender,body) VALUES (1,'admin','hi')$q$,
    $q$INSERT INTO booking_messages(booking_id,sender,body) VALUES (1,'customer','   ')$q$,
    $q$INSERT INTO notifications(kind,title) VALUES ('offer','No one to send to')$q$,
    $q$INSERT INTO products(name,price) VALUES ('Free thing',0)$q$,
    $q$INSERT INTO booking_items(booking_id,product_id,quantity,unit_price) VALUES (1,1,0,89)$q$,
    $q$INSERT INTO points_transactions(customer_id,points,reason) VALUES (1,0,'visit')$q$,
    $q$INSERT INTO points_transactions(customer_id,points,reason) VALUES (1,10,'because')$q$,
    $q$INSERT INTO gift_vouchers(code,bought_by,recipient_name,recipient_mobile,value,balance,expires_at) VALUES ('G1',1,'Asha','9822014567',600,700,'2030-01-01')$q$,
    $q$INSERT INTO gift_vouchers(code,bought_by,recipient_name,recipient_mobile,value,balance,expires_at) VALUES ('G2',1,'Asha','12345',600,600,'2030-01-01')$q$,
    $q$INSERT INTO societies(zone_id,name,discount_pct) VALUES (1,'Other',150)$q$,
    $q$INSERT INTO societies(zone_id,name) VALUES (1,'Green Park')$q$,
    $q$INSERT INTO partner_time_off(partner_id,from_date,to_date,reason) VALUES (1,'2030-01-05','2030-01-01','family')$q$,
    $q$INSERT INTO training_lessons(title,minutes) VALUES ('Zero',0)$q$,
    $q$INSERT INTO partner_lessons(partner_id,lesson_id,watched_minutes) VALUES (1,1,-1)$q$,
    $q$INSERT INTO badges(code,name) VALUES ('top_rated','Again')$q$,
    $q$INSERT INTO partner_badges(partner_id,badge_id) VALUES (1,1),(1,1)$q$,
    $q$INSERT INTO bonus_schemes(name,kind,amount,starts_on,ends_on) VALUES ('Back','weekly_target',300,'2030-02-01','2030-01-01')$q$,
    $q$INSERT INTO bonus_schemes(name,kind,amount,starts_on) VALUES ('Nothing','weekly_target',0,'2030-02-01')$q$,
    $q$UPDATE bookings SET helpers_count=3 WHERE id=1$q$,
    $q$UPDATE bookings SET contact_mobile='123' WHERE id=1$q$,
    -- the "Later" tables (section 8c)
    $q$INSERT INTO memberships(customer_id,term,price,starts_on,ends_on) VALUES (1,'yearly',990,'2030-01-01','2029-01-01')$q$,
    $q$INSERT INTO protection_claims(booking_id,customer_id,description,claimed_amount,approved_amount,status) VALUES (1,1,'Jar',450,900,'approved')$q$,
    $q$INSERT INTO protection_claims(booking_id,customer_id,description,claimed_amount,status) VALUES (1,1,'Jar',450,'paid')$q$,
    $q$INSERT INTO partner_cover(partner_id,kind,insurer,provider_ref,cover_amount,valid_from,valid_until) VALUES (1,'accident','X','P1',200000,'2030-01-01','2029-01-01')$q$,
    $q$INSERT INTO partner_advances(partner_id,amount,repay_weeks,outstanding) VALUES (1,1000,4,1000)$q$,           -- already has one open
    $q$INSERT INTO partner_advances(partner_id,amount,repay_weeks,outstanding) VALUES (2,1000,4,1500)$q$,
    $q$INSERT INTO savings_pots(partner_id,goal_name,goal_amount) VALUES (1,'Second pot',500)$q$,
    $q$INSERT INTO savings_transactions(pot_id,amount,kind) VALUES (1,200,'withdrawal')$q$,
    $q$INSERT INTO campaigns(name,audience,segment,channels,message,created_by) VALUES ('X','customer','all','{fax}','hi',1)$q$,
    $q$INSERT INTO campaigns(name,audience,segment,channels,message,status,created_by) VALUES ('X','customer','all','{sms}','hi','scheduled',1)$q$,
    $q$INSERT INTO campaign_deliveries(campaign_id,channel) VALUES (1,'sms')$q$,
    $q$INSERT INTO households(address_id,name) VALUES (1,'Again')$q$,
    $q$INSERT INTO household_members(household_id,customer_id,share_pct) VALUES (1,1,120)$q$,
    $q$INSERT INTO kit_products(name,price) VALUES ('Gloves',10)$q$,
    $q$INSERT INTO kit_order_items(order_id,product_id,quantity,unit_price) VALUES (1,1,0,60)$q$
  ] LOOP
    total := total + 1;
    BEGIN
      EXECUTE bad;
      RAISE WARNING 'ACCEPTED BAD DATA: %', bad;
    EXCEPTION WHEN check_violation OR unique_violation OR exclusion_violation OR not_null_violation OR foreign_key_violation THEN refused := refused + 1;
    END;
  END LOOP;
  IF refused <> total THEN RAISE EXCEPTION 'only % of % bad rows were refused', refused, total; END IF;
  RAISE NOTICE 'refused all % bad rows', total;
END $$;
SELECT count(*) AS tables FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';
