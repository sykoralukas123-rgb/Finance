-- SorareModel seed data (dummy values for local development and previews).
-- Run after supabase/migrations/001_init.sql. Safe to re-run: it clears the data tables first.
-- Players are fictional; club names are used only to make the data look realistic.

begin;

truncate public.backtests, public.stacks, public.projections, public.articles, public.players, public.gameweeks, public.competitions;

insert into public.competitions (id, name, league, rarity, mode, status, sort_order) values
  ('e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 'Contender Limited Pro', 'Contender (multi-league)', 'limited', 'pro', 'live', 1),
  ('80bc44d6-4791-54b4-aac7-43705d5e9384', 'Jupiler Pro League Limited Pro', 'Jupiler Pro League', 'limited', 'pro', 'live', 2),
  ('c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 'SPFL Limited Pro', 'Scottish Premiership', 'limited', 'pro', 'live', 3),
  ('ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', 'Premier League Rare Pro', 'Premier League', 'rare', 'pro', 'validation', 4),
  ('13810d4d-3b84-56ac-8d7b-8d92fab6adad', 'Champion Europe Arena', 'Champion Europe', 'limited', 'arena', 'validation', 5);

insert into public.gameweeks (id, number, season, start_date, end_date, is_current) values
  ('ac00e74f-a108-5c4a-a32d-bd9affa73c18', 1, '2026-27', '2026-08-21', '2026-08-24', false),
  ('186c2bb2-8c0e-5ebe-a337-2cba89dc0909', 2, '2026-27', '2026-08-28', '2026-08-31', false),
  ('51366472-a551-53c3-8f4e-a9ef195d48ec', 3, '2026-27', '2026-09-04', '2026-09-07', false),
  ('767b4b6c-037f-5780-8250-3addd0921033', 4, '2026-27', '2026-09-11', '2026-09-14', false),
  ('86cb57d5-6aed-5e6e-8136-5b0d9e6063cf', 5, '2026-27', '2026-09-18', '2026-09-21', false),
  ('908b45b0-46f8-5ca1-b263-454270d18424', 6, '2026-27', '2026-09-25', '2026-09-28', false),
  ('0bf92c1e-52fe-5b63-9423-61ac0d4e3934', 7, '2026-27', '2026-10-02', '2026-10-05', false),
  ('d204b246-5f8f-5bde-909d-7f0fea95824a', 8, '2026-27', '2026-10-09', '2026-10-12', false),
  ('ebb15846-866a-547c-b5ad-484a32ff8b21', 9, '2026-27', '2026-10-16', '2026-10-19', true);

insert into public.players (id, sorare_slug, name, club, position) values
  ('f317d18a-c2ef-5fb8-b0e6-671a1f4c79a4', 'simon-verhaegen', 'Simon Verhaegen', 'Club Brugge', 'Goalkeeper'),
  ('382e714c-d1f6-522a-810c-abf61dcde299', 'jonas-de-clercq', 'Jonas De Clercq', 'Club Brugge', 'Defender'),
  ('773f79bf-66e0-59cc-96b2-c357402cde43', 'mateo-lindqvist', 'Mateo Lindqvist', 'Club Brugge', 'Defender'),
  ('69c27775-4633-5535-8fba-59d41dfdfe6c', 'arne-vandenbroucke', 'Arne Vandenbroucke', 'Club Brugge', 'Midfielder'),
  ('20015f11-c31d-587b-8c3e-6037354c2245', 'kofi-mensah-adjei', 'Kofi Mensah-Adjei', 'Club Brugge', 'Midfielder'),
  ('780b4a6f-8432-5e2b-9368-3327aac66ae3', 'thibault-moreau', 'Thibault Moreau', 'Club Brugge', 'Forward'),
  ('38a7a108-184b-5a52-9245-0ced3fd7aa0b', 'ilias-benali', 'Ilias Benali', 'Club Brugge', 'Forward'),
  ('cd7f4478-70a1-5a84-95dc-85561f6e4bec', 'pieter-janssens', 'Pieter Janssens', 'Anderlecht', 'Goalkeeper'),
  ('ed143af1-4c72-5705-981b-046934f209dd', 'nathan-dewulf', 'Nathan Dewulf', 'Anderlecht', 'Defender'),
  ('39746dcd-3ab2-51bd-9cf7-eb47176d0334', 'yanis-haddouchi', 'Yanis Haddouchi', 'Anderlecht', 'Defender'),
  ('9d7e604a-42d9-5ee3-a3a2-1200a3ef9faa', 'ruben-claessens', 'Ruben Claessens', 'Anderlecht', 'Midfielder'),
  ('e0842a78-79a3-5f21-8e6c-4f424e35d9b9', 'emil-sorvik', 'Emil Sorvik', 'Anderlecht', 'Midfielder'),
  ('e7bfc2a5-e9f0-5ff6-bee5-6e0570a71ed7', 'dario-okonkwo', 'Dario Okonkwo', 'Anderlecht', 'Forward'),
  ('6b3c7bc0-0e64-5b0e-8a1a-480be5acca29', 'stef-peeters', 'Stef Peeters', 'Anderlecht', 'Forward'),
  ('f3b8aac5-e5e9-599f-bf2b-79db840b9d9d', 'mats-lemmens', 'Mats Lemmens', 'Union SG', 'Goalkeeper'),
  ('7219b58b-0ebb-5168-997b-e7067ed7fb07', 'louis-van-hecke', 'Louis Van Hecke', 'Union SG', 'Defender'),
  ('4f61b325-1d2f-583f-994c-a2dcd1d5871d', 'oskar-brandt', 'Oskar Brandt', 'Union SG', 'Defender'),
  ('c3251412-a179-541c-990d-00251981cfc6', 'noah-verstraete', 'Noah Verstraete', 'Union SG', 'Midfielder'),
  ('586cc92c-7a22-5768-a6a1-b8e155d3350a', 'kenji-hayashi', 'Kenji Hayashi', 'Union SG', 'Midfielder'),
  ('72862936-b259-55ab-94f4-62050f3304da', 'gustav-holm', 'Gustav Holm', 'Union SG', 'Forward'),
  ('79d759c7-f2fe-5c4b-a828-855b68ac3bf8', 'ibrahima-sarr', 'Ibrahima Sarr', 'Union SG', 'Forward'),
  ('fecdf37e-5f56-5e56-8a19-e75f0e87d799', 'callum-reid', 'Callum Reid', 'Celtic', 'Goalkeeper'),
  ('4ab099d7-80d7-57e9-9a7d-440cce83c785', 'ewan-mcallister', 'Ewan McAllister', 'Celtic', 'Defender'),
  ('e44138a6-dc48-5269-936e-28771533f55e', 'jae-won-park', 'Jae-won Park', 'Celtic', 'Defender'),
  ('24d76bee-3d02-5024-b22f-c94b425373ce', 'liam-docherty', 'Liam Docherty', 'Celtic', 'Midfielder'),
  ('11f87828-91c3-5eec-afe9-c2b61643423a', 'ryo-takeda', 'Ryo Takeda', 'Celtic', 'Midfielder'),
  ('3982bcba-5333-5c45-87cd-a5d39bc3bbe2', 'sean-gallagher', 'Sean Gallagher', 'Celtic', 'Forward'),
  ('cb628bce-c1e8-50cb-bfdc-a4eca9c64c90', 'mikkel-rasmussen', 'Mikkel Rasmussen', 'Celtic', 'Forward'),
  ('9d13c71e-c9d1-57e2-9371-b0b0ae8bb500', 'fraser-lindsay', 'Fraser Lindsay', 'Rangers', 'Goalkeeper'),
  ('059ca624-98a7-58c3-a4c2-1bf67d356e56', 'connor-baird', 'Connor Baird', 'Rangers', 'Defender'),
  ('20366651-dc37-540f-bda5-abea22c18753', 'tomas-ribeiro', 'Tomas Ribeiro', 'Rangers', 'Defender'),
  ('561b21a7-9a3e-50eb-855f-688464f1eefd', 'jamie-fleming', 'Jamie Fleming', 'Rangers', 'Midfielder'),
  ('5411c62d-c15c-51bf-9159-d961718f5cfe', 'andrius-kazlauskas', 'Andrius Kazlauskas', 'Rangers', 'Midfielder'),
  ('9946672d-1bd7-5350-bc37-4fbac030ad13', 'ross-mckinnon', 'Ross McKinnon', 'Rangers', 'Forward'),
  ('fc797c43-6e8d-545f-b9c9-222894e38360', 'bamidele-ade', 'Bamidele Ade', 'Rangers', 'Forward'),
  ('f1190b7a-3699-59e9-a932-559d2e517133', 'lewis-shaw', 'Lewis Shaw', 'Hearts', 'Goalkeeper'),
  ('3cbb8d1a-f217-5393-897b-f4bcbb3e6cf3', 'kyle-paterson', 'Kyle Paterson', 'Hearts', 'Defender'),
  ('66e7fe68-b57b-5dfc-9b6f-a247c530258a', 'arran-murray', 'Arran Murray', 'Hearts', 'Defender'),
  ('792cd895-8046-5308-b853-4b4941addee4', 'craig-wallace', 'Craig Wallace', 'Hearts', 'Midfielder'),
  ('4c888106-3116-5fee-96b3-98897f3d3bd8', 'finn-duffy', 'Finn Duffy', 'Hearts', 'Midfielder'),
  ('eaf5b528-f4af-5258-b45b-36952826b8b5', 'euan-sinclair', 'Euan Sinclair', 'Hearts', 'Forward'),
  ('7b90fff2-0109-546f-8a8d-6459dd77c894', 'marco-ferreira', 'Marco Ferreira', 'Hearts', 'Forward');

insert into public.projections (id, player_id, gameweek_id, competition_id, median, p90, start_prob, rank, updated_at) values
  ('53d08b1b-4d2d-5c22-bd73-a872be6ec313', 'fecdf37e-5f56-5e56-8a19-e75f0e87d799', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 80, 92.5, 0.87, 1, '2026-10-14 06:12:00+00'),
  ('9e7475ab-09ae-50f0-824e-5d369500c0e6', 'e0842a78-79a3-5f21-8e6c-4f424e35d9b9', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 80, 94.6, 0.7, 2, '2026-10-14 06:12:00+00'),
  ('1e6a1d2c-dd5d-52cf-a6a0-abfb34704a3a', '5411c62d-c15c-51bf-9159-d961718f5cfe', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 79.3, 96.7, 0.94, 3, '2026-10-14 06:12:00+00'),
  ('31b104a5-a74a-548c-8720-c55a23a07980', '69c27775-4633-5535-8fba-59d41dfdfe6c', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 79.0, 95.2, 0.82, 4, '2026-10-14 06:12:00+00'),
  ('36a89901-7936-5876-8b2c-787385680dcb', '20366651-dc37-540f-bda5-abea22c18753', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 78.5, 95.0, 0.63, 5, '2026-10-14 06:12:00+00'),
  ('794d309e-2725-55d5-aec4-57b93c378841', '780b4a6f-8432-5e2b-9368-3327aac66ae3', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 76.0, 96.8, 0.73, 6, '2026-10-14 06:12:00+00'),
  ('cb55825d-a795-5fdb-8f2d-1fdd7b9c003e', '4c888106-3116-5fee-96b3-98897f3d3bd8', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 75.9, 92.2, 0.86, 7, '2026-10-14 06:12:00+00'),
  ('141d78f5-0f02-599a-a3ad-776631275388', '6b3c7bc0-0e64-5b0e-8a1a-480be5acca29', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 75.7, 95.4, 0.85, 8, '2026-10-14 06:12:00+00'),
  ('e1c1e60a-cd3a-5a7f-a803-010955af13e2', '24d76bee-3d02-5024-b22f-c94b425373ce', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 73.3, 89.0, 0.73, 9, '2026-10-14 06:12:00+00'),
  ('d8fae88f-8cc0-5564-bbd9-5bf19c7a019c', '11f87828-91c3-5eec-afe9-c2b61643423a', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 73.1, 90.8, 0.77, 10, '2026-10-14 06:12:00+00'),
  ('798c70a3-e9ea-58a5-b23b-abbb9d8bd012', '9d7e604a-42d9-5ee3-a3a2-1200a3ef9faa', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 72.6, 93.1, 0.88, 11, '2026-10-14 06:12:00+00'),
  ('e116a8a3-5c53-5832-9d0c-d3550ec869ef', 'cb628bce-c1e8-50cb-bfdc-a4eca9c64c90', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 72.5, 89.7, 0.88, 12, '2026-10-14 06:12:00+00'),
  ('ddf7bd8d-e405-5029-8090-34fdbfca43c5', '3982bcba-5333-5c45-87cd-a5d39bc3bbe2', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 72.0, 91.5, 0.92, 13, '2026-10-14 06:12:00+00'),
  ('e4729f23-dab5-5d6c-ac5d-2ada0fae584d', '586cc92c-7a22-5768-a6a1-b8e155d3350a', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 71.6, 86.3, 0.75, 14, '2026-10-14 06:12:00+00'),
  ('d155eb0a-88ff-5018-a1c2-7e0a3880ce7a', '382e714c-d1f6-522a-810c-abf61dcde299', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 70.5, 83.8, 0.73, 15, '2026-10-14 06:12:00+00'),
  ('ff562a39-3ce5-5e58-a632-37069a9e1e3d', 'c3251412-a179-541c-990d-00251981cfc6', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 70.3, 88.1, 0.9, 16, '2026-10-14 06:12:00+00'),
  ('1701f54a-9c5f-550b-83aa-0b995911afe2', 'f317d18a-c2ef-5fb8-b0e6-671a1f4c79a4', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 69.4, 85.8, 0.8, 17, '2026-10-14 06:12:00+00'),
  ('59c1b807-82ca-5587-b60c-cd460f3c73cc', 'e7bfc2a5-e9f0-5ff6-bee5-6e0570a71ed7', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 69.2, 88.9, 0.84, 18, '2026-10-14 06:12:00+00'),
  ('978c4ea0-3a6c-5b3d-9378-81aa4146ee62', '7b90fff2-0109-546f-8a8d-6459dd77c894', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 69.1, 85.8, 0.92, 19, '2026-10-14 06:12:00+00'),
  ('0bf98af0-5cf4-5984-866d-3eaa2d77462a', '792cd895-8046-5308-b853-4b4941addee4', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 69.0, 85.7, 0.98, 20, '2026-10-14 06:12:00+00'),
  ('29fb99b3-c3ed-546f-a3d2-2121a8761557', '561b21a7-9a3e-50eb-855f-688464f1eefd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 68.9, 88.5, 0.98, 21, '2026-10-14 06:12:00+00'),
  ('2dc61a4f-0330-53a8-b74b-e01de6479b4b', '20015f11-c31d-587b-8c3e-6037354c2245', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 68.7, 83.1, 0.89, 22, '2026-10-14 06:12:00+00'),
  ('beb01259-2669-5cbc-bc09-88b664f4d800', '7219b58b-0ebb-5168-997b-e7067ed7fb07', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 68.1, 85.7, 0.91, 23, '2026-10-14 06:12:00+00'),
  ('06f91f5f-24fc-5cf4-a9ef-d9a57021c2eb', 'e44138a6-dc48-5269-936e-28771533f55e', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 68.0, 79.7, 0.93, 24, '2026-10-14 06:12:00+00'),
  ('f135163c-447d-5f54-9c06-2518f7a45ce7', '4ab099d7-80d7-57e9-9a7d-440cce83c785', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 67.2, 85.1, 0.93, 25, '2026-10-14 06:12:00+00'),
  ('d06454cf-3219-5c8d-9412-eeac490cb950', '72862936-b259-55ab-94f4-62050f3304da', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 65.5, 80.3, 0.92, 26, '2026-10-14 06:12:00+00'),
  ('bd1b3433-9ac3-5541-b805-2a59b6bd9b9f', '39746dcd-3ab2-51bd-9cf7-eb47176d0334', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 65.1, 82.1, 0.89, 27, '2026-10-14 06:12:00+00'),
  ('7731790d-3361-5d86-9d63-2660268fe6eb', '4f61b325-1d2f-583f-994c-a2dcd1d5871d', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 64.8, 82.8, 0.86, 28, '2026-10-14 06:12:00+00'),
  ('e7896c2f-ec43-5080-bd73-e3d2b7a01754', 'f3b8aac5-e5e9-599f-bf2b-79db840b9d9d', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 63.7, 79.5, 0.93, 29, '2026-10-14 06:12:00+00'),
  ('7dabdf28-77a4-5071-93de-30878f0a1676', 'ed143af1-4c72-5705-981b-046934f209dd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 63.7, 77.0, 0.9, 30, '2026-10-14 06:12:00+00'),
  ('0d17e6d6-2f9b-5ec5-8caa-169658f6956b', 'fc797c43-6e8d-545f-b9c9-222894e38360', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 63.6, 81.0, 0.9, 31, '2026-10-14 06:12:00+00'),
  ('6292a62f-881c-54e5-a378-e02310cd2ecb', '773f79bf-66e0-59cc-96b2-c357402cde43', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 63.1, 79.7, 0.96, 32, '2026-10-14 06:12:00+00'),
  ('b156c489-52e4-5437-b0ba-f435bc3c8f1c', 'cd7f4478-70a1-5a84-95dc-85561f6e4bec', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 63.1, 77.1, 0.93, 33, '2026-10-14 06:12:00+00'),
  ('da3b9bd2-1d00-5a27-aea4-4666f32ed407', '38a7a108-184b-5a52-9245-0ced3fd7aa0b', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 62.6, 81.0, 0.86, 34, '2026-10-14 06:12:00+00'),
  ('c08b6645-b057-555b-9a48-4874f9dd19b8', '9946672d-1bd7-5350-bc37-4fbac030ad13', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 62.4, 83.3, 0.96, 35, '2026-10-14 06:12:00+00'),
  ('40a76d97-7e5b-5739-9693-d594ac6fba46', 'eaf5b528-f4af-5258-b45b-36952826b8b5', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 61.5, 78.5, 0.93, 36, '2026-10-14 06:12:00+00'),
  ('da6c8df8-d66a-5262-ba2f-6a726efc57f5', '9d13c71e-c9d1-57e2-9371-b0b0ae8bb500', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 61.1, 76.4, 0.8, 37, '2026-10-14 06:12:00+00'),
  ('b722032b-9f3c-5910-a829-cd48641bc5e2', '66e7fe68-b57b-5dfc-9b6f-a247c530258a', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 60.8, 77.6, 0.98, 38, '2026-10-14 06:12:00+00'),
  ('08e76c3e-8788-5a8c-8d5c-54da238c2ebe', '059ca624-98a7-58c3-a4c2-1bf67d356e56', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 60.1, 71.2, 0.73, 39, '2026-10-14 06:12:00+00'),
  ('03714fa5-dd5d-552c-854d-3d3e65bb0097', 'f1190b7a-3699-59e9-a932-559d2e517133', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 57.8, 75.6, 0.9, 40, '2026-10-14 06:12:00+00'),
  ('448bcf64-06ed-5844-b124-6d81f343b448', '3cbb8d1a-f217-5393-897b-f4bcbb3e6cf3', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 57.2, 68.9, 0.95, 41, '2026-10-14 06:12:00+00'),
  ('9df23df4-e636-558a-b0af-573a500279d2', '79d759c7-f2fe-5c4b-a828-855b68ac3bf8', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 55.3, 69.4, 0.75, 42, '2026-10-14 06:12:00+00'),
  ('699b7c1c-68ab-55b5-a1c2-2af1253dac5d', 'e0842a78-79a3-5f21-8e6c-4f424e35d9b9', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 80, 94.6, 0.7, 1, '2026-10-14 06:12:00+00'),
  ('be0872c1-b592-5556-a4e6-b2ea6ff75283', '69c27775-4633-5535-8fba-59d41dfdfe6c', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 79.0, 95.2, 0.82, 2, '2026-10-14 06:12:00+00'),
  ('73a1c39b-81d9-5e8c-8de8-6a824e1b6490', '780b4a6f-8432-5e2b-9368-3327aac66ae3', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 76.0, 96.8, 0.73, 3, '2026-10-14 06:12:00+00'),
  ('b6771619-d82b-5164-b74b-5d692b08441c', '6b3c7bc0-0e64-5b0e-8a1a-480be5acca29', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 75.7, 95.4, 0.85, 4, '2026-10-14 06:12:00+00'),
  ('28cd4725-2178-5f37-918b-8375374be05d', '9d7e604a-42d9-5ee3-a3a2-1200a3ef9faa', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 72.6, 93.1, 0.88, 5, '2026-10-14 06:12:00+00'),
  ('81386b73-4d5e-5493-93c7-5519d25a4419', '586cc92c-7a22-5768-a6a1-b8e155d3350a', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 71.6, 86.3, 0.75, 6, '2026-10-14 06:12:00+00'),
  ('fc1c1972-eca8-51d3-b836-c124920a8f58', '382e714c-d1f6-522a-810c-abf61dcde299', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 70.5, 83.8, 0.73, 7, '2026-10-14 06:12:00+00'),
  ('73e29ae0-8bee-5814-b0c2-82f170652c9b', 'c3251412-a179-541c-990d-00251981cfc6', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 70.3, 88.1, 0.9, 8, '2026-10-14 06:12:00+00'),
  ('833f7e64-b3aa-57bf-b666-044e73d6ce8d', 'f317d18a-c2ef-5fb8-b0e6-671a1f4c79a4', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 69.4, 85.8, 0.8, 9, '2026-10-14 06:12:00+00'),
  ('5f6ee681-60dd-58b0-90a3-1d20e18c81f7', 'e7bfc2a5-e9f0-5ff6-bee5-6e0570a71ed7', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 69.2, 88.9, 0.84, 10, '2026-10-14 06:12:00+00'),
  ('dabde315-8a47-5a15-aa30-a86029755eed', '20015f11-c31d-587b-8c3e-6037354c2245', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 68.7, 83.1, 0.89, 11, '2026-10-14 06:12:00+00'),
  ('fabde79d-ab5a-5399-92ed-d0df0963d364', '7219b58b-0ebb-5168-997b-e7067ed7fb07', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 68.1, 85.7, 0.91, 12, '2026-10-14 06:12:00+00'),
  ('2c5f1ee7-7fb8-50dd-a118-32c9e256b8ef', '72862936-b259-55ab-94f4-62050f3304da', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 65.5, 80.3, 0.92, 13, '2026-10-14 06:12:00+00'),
  ('ceea301a-763e-5d7e-9ad8-f8bdc611b84c', '39746dcd-3ab2-51bd-9cf7-eb47176d0334', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 65.1, 82.1, 0.89, 14, '2026-10-14 06:12:00+00'),
  ('e5b3727f-a915-5c4e-869d-342f357e243f', '4f61b325-1d2f-583f-994c-a2dcd1d5871d', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 64.8, 82.8, 0.86, 15, '2026-10-14 06:12:00+00'),
  ('518de8e0-4ff8-5e0e-9dc9-9234c1a41452', 'f3b8aac5-e5e9-599f-bf2b-79db840b9d9d', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 63.7, 79.5, 0.93, 16, '2026-10-14 06:12:00+00'),
  ('70cef79a-67b7-57a8-9a35-bf1f636fa1fd', 'ed143af1-4c72-5705-981b-046934f209dd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 63.7, 77.0, 0.9, 17, '2026-10-14 06:12:00+00'),
  ('5d73655e-f07a-5991-9aa5-0c8a9ae58304', '773f79bf-66e0-59cc-96b2-c357402cde43', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 63.1, 79.7, 0.96, 18, '2026-10-14 06:12:00+00'),
  ('5eeddf53-9dad-59ad-91f4-90e150fb9c8c', 'cd7f4478-70a1-5a84-95dc-85561f6e4bec', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 63.1, 77.1, 0.93, 19, '2026-10-14 06:12:00+00'),
  ('7d4d03a7-744c-53e4-bc04-cb7a52970792', '38a7a108-184b-5a52-9245-0ced3fd7aa0b', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 62.6, 81.0, 0.86, 20, '2026-10-14 06:12:00+00'),
  ('fa7fe5d7-d35c-518b-b172-94fbd49a2d3b', '79d759c7-f2fe-5c4b-a828-855b68ac3bf8', 'ebb15846-866a-547c-b5ad-484a32ff8b21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 55.3, 69.4, 0.75, 21, '2026-10-14 06:12:00+00'),
  ('3393e38e-c799-555a-a5a3-463c134b212c', 'fecdf37e-5f56-5e56-8a19-e75f0e87d799', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 80, 92.5, 0.87, 1, '2026-10-14 06:12:00+00'),
  ('6d3a49ba-9a5a-5540-8390-348eb4357f59', '5411c62d-c15c-51bf-9159-d961718f5cfe', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 79.3, 96.7, 0.94, 2, '2026-10-14 06:12:00+00'),
  ('129a7fac-d393-51b9-abbf-0ea57fc94abc', '20366651-dc37-540f-bda5-abea22c18753', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 78.5, 95.0, 0.63, 3, '2026-10-14 06:12:00+00'),
  ('dab6edce-e122-53ca-a5b0-393ddb80b9c3', '4c888106-3116-5fee-96b3-98897f3d3bd8', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 75.9, 92.2, 0.86, 4, '2026-10-14 06:12:00+00'),
  ('3dfec87b-4a69-5678-9ae1-7f6cdb1704b9', '24d76bee-3d02-5024-b22f-c94b425373ce', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 73.3, 89.0, 0.73, 5, '2026-10-14 06:12:00+00'),
  ('d6093252-8f4a-515b-b7b8-8bdb18ed2d57', '11f87828-91c3-5eec-afe9-c2b61643423a', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 73.1, 90.8, 0.77, 6, '2026-10-14 06:12:00+00'),
  ('8777ac22-5b99-57a8-b89b-dcb857950657', 'cb628bce-c1e8-50cb-bfdc-a4eca9c64c90', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 72.5, 89.7, 0.88, 7, '2026-10-14 06:12:00+00'),
  ('06c02a8b-5e1f-50c2-b886-79d6151be925', '3982bcba-5333-5c45-87cd-a5d39bc3bbe2', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 72.0, 91.5, 0.92, 8, '2026-10-14 06:12:00+00'),
  ('72904ae9-b4ba-5fb9-89f5-5a7f96bbc6fb', '7b90fff2-0109-546f-8a8d-6459dd77c894', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 69.1, 85.8, 0.92, 9, '2026-10-14 06:12:00+00'),
  ('8e85ee65-5dc4-5d7a-8e17-8ce192e3dee2', '792cd895-8046-5308-b853-4b4941addee4', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 69.0, 85.7, 0.98, 10, '2026-10-14 06:12:00+00'),
  ('d0b3a907-a735-545a-a936-8518d55e30dc', '561b21a7-9a3e-50eb-855f-688464f1eefd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 68.9, 88.5, 0.98, 11, '2026-10-14 06:12:00+00'),
  ('9d264a70-f198-5214-8c9a-a042af9ce7b9', 'e44138a6-dc48-5269-936e-28771533f55e', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 68.0, 79.7, 0.93, 12, '2026-10-14 06:12:00+00'),
  ('b0e768fe-3b2f-5826-b434-bd5577ba86a7', '4ab099d7-80d7-57e9-9a7d-440cce83c785', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 67.2, 85.1, 0.93, 13, '2026-10-14 06:12:00+00'),
  ('3083937d-6ac7-5806-9723-f5f265b52243', 'fc797c43-6e8d-545f-b9c9-222894e38360', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 63.6, 81.0, 0.9, 14, '2026-10-14 06:12:00+00'),
  ('bda53401-6444-5ffc-9944-856bc03a8b64', '9946672d-1bd7-5350-bc37-4fbac030ad13', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 62.4, 83.3, 0.96, 15, '2026-10-14 06:12:00+00'),
  ('bf6dbb28-3e48-5898-852c-6868fb13c980', 'eaf5b528-f4af-5258-b45b-36952826b8b5', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 61.5, 78.5, 0.93, 16, '2026-10-14 06:12:00+00'),
  ('82a1c310-b7c0-5dd1-bd17-81728893d7d9', '9d13c71e-c9d1-57e2-9371-b0b0ae8bb500', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 61.1, 76.4, 0.8, 17, '2026-10-14 06:12:00+00'),
  ('fc6a6473-46c6-5080-a793-10738201a373', '66e7fe68-b57b-5dfc-9b6f-a247c530258a', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 60.8, 77.6, 0.98, 18, '2026-10-14 06:12:00+00'),
  ('4233ab91-dd6d-537a-9c8f-b6cbb33a13c6', '059ca624-98a7-58c3-a4c2-1bf67d356e56', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 60.1, 71.2, 0.73, 19, '2026-10-14 06:12:00+00'),
  ('18977723-d747-5520-bb91-d8f3a35e4908', 'f1190b7a-3699-59e9-a932-559d2e517133', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 57.8, 75.6, 0.9, 20, '2026-10-14 06:12:00+00'),
  ('7e324693-8e7d-579b-9add-6c91a58b5502', '3cbb8d1a-f217-5393-897b-f4bcbb3e6cf3', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 57.2, 68.9, 0.95, 21, '2026-10-14 06:12:00+00');

insert into public.stacks (id, competition_id, gameweek_id, club, player_ids, projected_score, step_probs, rank) values
  ('c33b6bc1-77ac-5c93-a013-607b6099d6bb', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Celtic', '{fecdf37e-5f56-5e56-8a19-e75f0e87d799,e44138a6-dc48-5269-936e-28771533f55e,11f87828-91c3-5eec-afe9-c2b61643423a,3982bcba-5333-5c45-87cd-a5d39bc3bbe2,cb628bce-c1e8-50cb-bfdc-a4eca9c64c90}'::uuid[], 335.2, '[{"step": 1, "threshold": 280, "prob": 0.955}, {"step": 2, "threshold": 320, "prob": 0.68}, {"step": 3, "threshold": 360, "prob": 0.222}, {"step": 4, "threshold": 400, "prob": 0.023}, {"step": 5, "threshold": 440, "prob": 0.001}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 1),
  ('4de0aa26-cea9-5880-8c25-4cd8bd72ae4b', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Celtic', '{fecdf37e-5f56-5e56-8a19-e75f0e87d799,4ab099d7-80d7-57e9-9a7d-440cce83c785,11f87828-91c3-5eec-afe9-c2b61643423a,3982bcba-5333-5c45-87cd-a5d39bc3bbe2,cb628bce-c1e8-50cb-bfdc-a4eca9c64c90}'::uuid[], 334.4, '[{"step": 1, "threshold": 280, "prob": 0.942}, {"step": 2, "threshold": 320, "prob": 0.661}, {"step": 3, "threshold": 360, "prob": 0.231}, {"step": 4, "threshold": 400, "prob": 0.029}, {"step": 5, "threshold": 440, "prob": 0.001}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 2),
  ('742ff925-f85f-578c-a058-846b182f58f5', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Celtic', '{fecdf37e-5f56-5e56-8a19-e75f0e87d799,4ab099d7-80d7-57e9-9a7d-440cce83c785,11f87828-91c3-5eec-afe9-c2b61643423a,3982bcba-5333-5c45-87cd-a5d39bc3bbe2,e44138a6-dc48-5269-936e-28771533f55e}'::uuid[], 333.9, '[{"step": 1, "threshold": 280, "prob": 0.95}, {"step": 2, "threshold": 320, "prob": 0.664}, {"step": 3, "threshold": 360, "prob": 0.213}, {"step": 4, "threshold": 400, "prob": 0.022}, {"step": 5, "threshold": 440, "prob": 0.001}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 3),
  ('cf8e9287-6203-5cbc-b92d-4f6063fb8cac', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Hearts', '{f1190b7a-3699-59e9-a932-559d2e517133,66e7fe68-b57b-5dfc-9b6f-a247c530258a,792cd895-8046-5308-b853-4b4941addee4,7b90fff2-0109-546f-8a8d-6459dd77c894,4c888106-3116-5fee-96b3-98897f3d3bd8}'::uuid[], 323.2, '[{"step": 1, "threshold": 280, "prob": 0.897}, {"step": 2, "threshold": 320, "prob": 0.538}, {"step": 3, "threshold": 360, "prob": 0.141}, {"step": 4, "threshold": 400, "prob": 0.012}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 4),
  ('cd9fd61c-271a-5a48-b5a6-78c52d44fd36', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Anderlecht', '{cd7f4478-70a1-5a84-95dc-85561f6e4bec,39746dcd-3ab2-51bd-9cf7-eb47176d0334,9d7e604a-42d9-5ee3-a3a2-1200a3ef9faa,e7bfc2a5-e9f0-5ff6-bee5-6e0570a71ed7,6b3c7bc0-0e64-5b0e-8a1a-480be5acca29}'::uuid[], 318.1, '[{"step": 1, "threshold": 280, "prob": 0.847}, {"step": 2, "threshold": 320, "prob": 0.48}, {"step": 3, "threshold": 360, "prob": 0.13}, {"step": 4, "threshold": 400, "prob": 0.014}, {"step": 5, "threshold": 440, "prob": 0.001}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 5),
  ('a5729960-fa09-55f9-9d3c-b380aa566d39', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Hearts', '{f1190b7a-3699-59e9-a932-559d2e517133,3cbb8d1a-f217-5393-897b-f4bcbb3e6cf3,792cd895-8046-5308-b853-4b4941addee4,7b90fff2-0109-546f-8a8d-6459dd77c894,4c888106-3116-5fee-96b3-98897f3d3bd8}'::uuid[], 318.0, '[{"step": 1, "threshold": 280, "prob": 0.88}, {"step": 2, "threshold": 320, "prob": 0.475}, {"step": 3, "threshold": 360, "prob": 0.097}, {"step": 4, "threshold": 400, "prob": 0.006}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 6),
  ('9aaaa4fc-4755-58a3-a50b-a2c332005060', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Anderlecht', '{cd7f4478-70a1-5a84-95dc-85561f6e4bec,ed143af1-4c72-5705-981b-046934f209dd,9d7e604a-42d9-5ee3-a3a2-1200a3ef9faa,e7bfc2a5-e9f0-5ff6-bee5-6e0570a71ed7,6b3c7bc0-0e64-5b0e-8a1a-480be5acca29}'::uuid[], 317.5, '[{"step": 1, "threshold": 280, "prob": 0.852}, {"step": 2, "threshold": 320, "prob": 0.472}, {"step": 3, "threshold": 360, "prob": 0.118}, {"step": 4, "threshold": 400, "prob": 0.011}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 7),
  ('226d94c0-2e4a-555d-a2d4-0619fdc2f384', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Anderlecht', '{cd7f4478-70a1-5a84-95dc-85561f6e4bec,ed143af1-4c72-5705-981b-046934f209dd,9d7e604a-42d9-5ee3-a3a2-1200a3ef9faa,6b3c7bc0-0e64-5b0e-8a1a-480be5acca29,39746dcd-3ab2-51bd-9cf7-eb47176d0334}'::uuid[], 317.3, '[{"step": 1, "threshold": 280, "prob": 0.859}, {"step": 2, "threshold": 320, "prob": 0.469}, {"step": 3, "threshold": 360, "prob": 0.11}, {"step": 4, "threshold": 400, "prob": 0.009}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 8),
  ('1ee5475d-b746-5d8f-965e-2e5cc5086ec6', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Hearts', '{f1190b7a-3699-59e9-a932-559d2e517133,66e7fe68-b57b-5dfc-9b6f-a247c530258a,792cd895-8046-5308-b853-4b4941addee4,eaf5b528-f4af-5258-b45b-36952826b8b5,4c888106-3116-5fee-96b3-98897f3d3bd8}'::uuid[], 316.9, '[{"step": 1, "threshold": 280, "prob": 0.859}, {"step": 2, "threshold": 320, "prob": 0.464}, {"step": 3, "threshold": 360, "prob": 0.104}, {"step": 4, "threshold": 400, "prob": 0.008}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 9),
  ('53bb3543-5b99-5b62-913d-a979b5ec5c90', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Rangers', '{9d13c71e-c9d1-57e2-9371-b0b0ae8bb500,20366651-dc37-540f-bda5-abea22c18753,561b21a7-9a3e-50eb-855f-688464f1eefd,9946672d-1bd7-5350-bc37-4fbac030ad13,5411c62d-c15c-51bf-9159-d961718f5cfe}'::uuid[], 316.2, '[{"step": 1, "threshold": 280, "prob": 0.838}, {"step": 2, "threshold": 320, "prob": 0.458}, {"step": 3, "threshold": 360, "prob": 0.116}, {"step": 4, "threshold": 400, "prob": 0.011}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 10),
  ('6bb5f9c1-5a92-5f9e-9710-f658af8e10d6', '80bc44d6-4791-54b4-aac7-43705d5e9384', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Anderlecht', '{cd7f4478-70a1-5a84-95dc-85561f6e4bec,39746dcd-3ab2-51bd-9cf7-eb47176d0334,9d7e604a-42d9-5ee3-a3a2-1200a3ef9faa,e7bfc2a5-e9f0-5ff6-bee5-6e0570a71ed7,6b3c7bc0-0e64-5b0e-8a1a-480be5acca29}'::uuid[], 318.1, '[{"step": 1, "threshold": 280, "prob": 0.847}, {"step": 2, "threshold": 320, "prob": 0.48}, {"step": 3, "threshold": 360, "prob": 0.13}, {"step": 4, "threshold": 400, "prob": 0.014}, {"step": 5, "threshold": 440, "prob": 0.001}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 1),
  ('928790bf-9785-5997-9a31-3d6bfa01141e', '80bc44d6-4791-54b4-aac7-43705d5e9384', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Anderlecht', '{cd7f4478-70a1-5a84-95dc-85561f6e4bec,ed143af1-4c72-5705-981b-046934f209dd,9d7e604a-42d9-5ee3-a3a2-1200a3ef9faa,e7bfc2a5-e9f0-5ff6-bee5-6e0570a71ed7,6b3c7bc0-0e64-5b0e-8a1a-480be5acca29}'::uuid[], 317.5, '[{"step": 1, "threshold": 280, "prob": 0.852}, {"step": 2, "threshold": 320, "prob": 0.472}, {"step": 3, "threshold": 360, "prob": 0.118}, {"step": 4, "threshold": 400, "prob": 0.011}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 2),
  ('df783206-ceea-5c9d-a975-49ff0e88e10f', '80bc44d6-4791-54b4-aac7-43705d5e9384', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Anderlecht', '{cd7f4478-70a1-5a84-95dc-85561f6e4bec,ed143af1-4c72-5705-981b-046934f209dd,9d7e604a-42d9-5ee3-a3a2-1200a3ef9faa,6b3c7bc0-0e64-5b0e-8a1a-480be5acca29,39746dcd-3ab2-51bd-9cf7-eb47176d0334}'::uuid[], 317.3, '[{"step": 1, "threshold": 280, "prob": 0.859}, {"step": 2, "threshold": 320, "prob": 0.469}, {"step": 3, "threshold": 360, "prob": 0.11}, {"step": 4, "threshold": 400, "prob": 0.009}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 3),
  ('45655392-5bf6-51ed-9677-5e76b68afb12', '80bc44d6-4791-54b4-aac7-43705d5e9384', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Anderlecht', '{cd7f4478-70a1-5a84-95dc-85561f6e4bec,39746dcd-3ab2-51bd-9cf7-eb47176d0334,9d7e604a-42d9-5ee3-a3a2-1200a3ef9faa,6b3c7bc0-0e64-5b0e-8a1a-480be5acca29,e0842a78-79a3-5f21-8e6c-4f424e35d9b9}'::uuid[], 316.9, '[{"step": 1, "threshold": 280, "prob": 0.853}, {"step": 2, "threshold": 320, "prob": 0.464}, {"step": 3, "threshold": 360, "prob": 0.11}, {"step": 4, "threshold": 400, "prob": 0.009}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 4),
  ('f33f84b6-9e9b-59f6-932e-98e11cd9e0a6', '80bc44d6-4791-54b4-aac7-43705d5e9384', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Anderlecht', '{cd7f4478-70a1-5a84-95dc-85561f6e4bec,ed143af1-4c72-5705-981b-046934f209dd,9d7e604a-42d9-5ee3-a3a2-1200a3ef9faa,6b3c7bc0-0e64-5b0e-8a1a-480be5acca29,e0842a78-79a3-5f21-8e6c-4f424e35d9b9}'::uuid[], 316.2, '[{"step": 1, "threshold": 280, "prob": 0.858}, {"step": 2, "threshold": 320, "prob": 0.456}, {"step": 3, "threshold": 360, "prob": 0.098}, {"step": 4, "threshold": 400, "prob": 0.007}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 5),
  ('694945bb-6d43-5552-9b30-337ef061f0e1', '80bc44d6-4791-54b4-aac7-43705d5e9384', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Union SG', '{f3b8aac5-e5e9-599f-bf2b-79db840b9d9d,7219b58b-0ebb-5168-997b-e7067ed7fb07,c3251412-a179-541c-990d-00251981cfc6,72862936-b259-55ab-94f4-62050f3304da,4f61b325-1d2f-583f-994c-a2dcd1d5871d}'::uuid[], 314.5, '[{"step": 1, "threshold": 280, "prob": 0.844}, {"step": 2, "threshold": 320, "prob": 0.436}, {"step": 3, "threshold": 360, "prob": 0.092}, {"step": 4, "threshold": 400, "prob": 0.006}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 6),
  ('843c216d-d829-511d-af7b-2cb54be4c398', '80bc44d6-4791-54b4-aac7-43705d5e9384', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Club Brugge', '{f317d18a-c2ef-5fb8-b0e6-671a1f4c79a4,773f79bf-66e0-59cc-96b2-c357402cde43,69c27775-4633-5535-8fba-59d41dfdfe6c,780b4a6f-8432-5e2b-9368-3327aac66ae3,20015f11-c31d-587b-8c3e-6037354c2245}'::uuid[], 313.3, '[{"step": 1, "threshold": 280, "prob": 0.833}, {"step": 2, "threshold": 320, "prob": 0.423}, {"step": 3, "threshold": 360, "prob": 0.088}, {"step": 4, "threshold": 400, "prob": 0.006}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 7),
  ('8050042a-0c13-5c15-83bd-1e2917b20a21', '80bc44d6-4791-54b4-aac7-43705d5e9384', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Union SG', '{f3b8aac5-e5e9-599f-bf2b-79db840b9d9d,7219b58b-0ebb-5168-997b-e7067ed7fb07,c3251412-a179-541c-990d-00251981cfc6,72862936-b259-55ab-94f4-62050f3304da,586cc92c-7a22-5768-a6a1-b8e155d3350a}'::uuid[], 312.8, '[{"step": 1, "threshold": 280, "prob": 0.841}, {"step": 2, "threshold": 320, "prob": 0.413}, {"step": 3, "threshold": 360, "prob": 0.075}, {"step": 4, "threshold": 400, "prob": 0.004}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 8),
  ('f39aadd1-77df-55ec-afd0-524d7a313af7', '80bc44d6-4791-54b4-aac7-43705d5e9384', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Club Brugge', '{f317d18a-c2ef-5fb8-b0e6-671a1f4c79a4,773f79bf-66e0-59cc-96b2-c357402cde43,69c27775-4633-5535-8fba-59d41dfdfe6c,38a7a108-184b-5a52-9245-0ced3fd7aa0b,20015f11-c31d-587b-8c3e-6037354c2245}'::uuid[], 311.7, '[{"step": 1, "threshold": 280, "prob": 0.829}, {"step": 2, "threshold": 320, "prob": 0.401}, {"step": 3, "threshold": 360, "prob": 0.074}, {"step": 4, "threshold": 400, "prob": 0.004}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 9),
  ('4583aeb2-ba04-57f1-a382-5833ad3f2622', '80bc44d6-4791-54b4-aac7-43705d5e9384', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Union SG', '{f3b8aac5-e5e9-599f-bf2b-79db840b9d9d,4f61b325-1d2f-583f-994c-a2dcd1d5871d,c3251412-a179-541c-990d-00251981cfc6,72862936-b259-55ab-94f4-62050f3304da,586cc92c-7a22-5768-a6a1-b8e155d3350a}'::uuid[], 306.5, '[{"step": 1, "threshold": 280, "prob": 0.789}, {"step": 2, "threshold": 320, "prob": 0.341}, {"step": 3, "threshold": 360, "prob": 0.053}, {"step": 4, "threshold": 400, "prob": 0.002}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 10),
  ('21d996d8-a97c-5fe7-bde2-6e3455205ebd', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Celtic', '{fecdf37e-5f56-5e56-8a19-e75f0e87d799,e44138a6-dc48-5269-936e-28771533f55e,11f87828-91c3-5eec-afe9-c2b61643423a,3982bcba-5333-5c45-87cd-a5d39bc3bbe2,cb628bce-c1e8-50cb-bfdc-a4eca9c64c90}'::uuid[], 335.2, '[{"step": 1, "threshold": 280, "prob": 0.955}, {"step": 2, "threshold": 320, "prob": 0.68}, {"step": 3, "threshold": 360, "prob": 0.222}, {"step": 4, "threshold": 400, "prob": 0.023}, {"step": 5, "threshold": 440, "prob": 0.001}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 1),
  ('33ba5e02-da29-580a-95ca-a1642cfe6eac', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Celtic', '{fecdf37e-5f56-5e56-8a19-e75f0e87d799,4ab099d7-80d7-57e9-9a7d-440cce83c785,11f87828-91c3-5eec-afe9-c2b61643423a,3982bcba-5333-5c45-87cd-a5d39bc3bbe2,cb628bce-c1e8-50cb-bfdc-a4eca9c64c90}'::uuid[], 334.4, '[{"step": 1, "threshold": 280, "prob": 0.942}, {"step": 2, "threshold": 320, "prob": 0.661}, {"step": 3, "threshold": 360, "prob": 0.231}, {"step": 4, "threshold": 400, "prob": 0.029}, {"step": 5, "threshold": 440, "prob": 0.001}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 2),
  ('f611b069-acf8-538e-aac6-08447cfc1e9f', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Celtic', '{fecdf37e-5f56-5e56-8a19-e75f0e87d799,4ab099d7-80d7-57e9-9a7d-440cce83c785,11f87828-91c3-5eec-afe9-c2b61643423a,3982bcba-5333-5c45-87cd-a5d39bc3bbe2,e44138a6-dc48-5269-936e-28771533f55e}'::uuid[], 333.9, '[{"step": 1, "threshold": 280, "prob": 0.95}, {"step": 2, "threshold": 320, "prob": 0.664}, {"step": 3, "threshold": 360, "prob": 0.213}, {"step": 4, "threshold": 400, "prob": 0.022}, {"step": 5, "threshold": 440, "prob": 0.001}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 3),
  ('59fb1b1f-0731-5697-8909-b09c19fb53a7', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Celtic', '{fecdf37e-5f56-5e56-8a19-e75f0e87d799,e44138a6-dc48-5269-936e-28771533f55e,24d76bee-3d02-5024-b22f-c94b425373ce,3982bcba-5333-5c45-87cd-a5d39bc3bbe2,cb628bce-c1e8-50cb-bfdc-a4eca9c64c90}'::uuid[], 332.4, '[{"step": 1, "threshold": 280, "prob": 0.951}, {"step": 2, "threshold": 320, "prob": 0.652}, {"step": 3, "threshold": 360, "prob": 0.191}, {"step": 4, "threshold": 400, "prob": 0.016}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 4),
  ('ee9f4d98-e4d5-5efb-9045-e667956dc72a', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Celtic', '{fecdf37e-5f56-5e56-8a19-e75f0e87d799,4ab099d7-80d7-57e9-9a7d-440cce83c785,24d76bee-3d02-5024-b22f-c94b425373ce,3982bcba-5333-5c45-87cd-a5d39bc3bbe2,cb628bce-c1e8-50cb-bfdc-a4eca9c64c90}'::uuid[], 331.6, '[{"step": 1, "threshold": 280, "prob": 0.936}, {"step": 2, "threshold": 320, "prob": 0.634}, {"step": 3, "threshold": 360, "prob": 0.202}, {"step": 4, "threshold": 400, "prob": 0.022}, {"step": 5, "threshold": 440, "prob": 0.001}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 5),
  ('e1e8212e-5a39-5382-bff5-1a1469bbf50c', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Hearts', '{f1190b7a-3699-59e9-a932-559d2e517133,66e7fe68-b57b-5dfc-9b6f-a247c530258a,792cd895-8046-5308-b853-4b4941addee4,7b90fff2-0109-546f-8a8d-6459dd77c894,4c888106-3116-5fee-96b3-98897f3d3bd8}'::uuid[], 323.2, '[{"step": 1, "threshold": 280, "prob": 0.897}, {"step": 2, "threshold": 320, "prob": 0.538}, {"step": 3, "threshold": 360, "prob": 0.141}, {"step": 4, "threshold": 400, "prob": 0.012}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 6),
  ('a0404ec9-4f05-5093-adc7-85ed22a91e52', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Hearts', '{f1190b7a-3699-59e9-a932-559d2e517133,3cbb8d1a-f217-5393-897b-f4bcbb3e6cf3,792cd895-8046-5308-b853-4b4941addee4,7b90fff2-0109-546f-8a8d-6459dd77c894,4c888106-3116-5fee-96b3-98897f3d3bd8}'::uuid[], 318.0, '[{"step": 1, "threshold": 280, "prob": 0.88}, {"step": 2, "threshold": 320, "prob": 0.475}, {"step": 3, "threshold": 360, "prob": 0.097}, {"step": 4, "threshold": 400, "prob": 0.006}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 7),
  ('1f518b25-b5eb-53e3-aead-bba9a3a4d4f8', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Hearts', '{f1190b7a-3699-59e9-a932-559d2e517133,66e7fe68-b57b-5dfc-9b6f-a247c530258a,792cd895-8046-5308-b853-4b4941addee4,eaf5b528-f4af-5258-b45b-36952826b8b5,4c888106-3116-5fee-96b3-98897f3d3bd8}'::uuid[], 316.9, '[{"step": 1, "threshold": 280, "prob": 0.859}, {"step": 2, "threshold": 320, "prob": 0.464}, {"step": 3, "threshold": 360, "prob": 0.104}, {"step": 4, "threshold": 400, "prob": 0.008}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 8),
  ('c5374982-a35d-5ab6-8f79-874a4906277c', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Rangers', '{9d13c71e-c9d1-57e2-9371-b0b0ae8bb500,20366651-dc37-540f-bda5-abea22c18753,561b21a7-9a3e-50eb-855f-688464f1eefd,9946672d-1bd7-5350-bc37-4fbac030ad13,5411c62d-c15c-51bf-9159-d961718f5cfe}'::uuid[], 316.2, '[{"step": 1, "threshold": 280, "prob": 0.838}, {"step": 2, "threshold": 320, "prob": 0.458}, {"step": 3, "threshold": 360, "prob": 0.116}, {"step": 4, "threshold": 400, "prob": 0.011}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 9),
  ('32ae2089-dea0-597e-a563-726118799a76', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 'ebb15846-866a-547c-b5ad-484a32ff8b21', 'Hearts', '{f1190b7a-3699-59e9-a932-559d2e517133,66e7fe68-b57b-5dfc-9b6f-a247c530258a,792cd895-8046-5308-b853-4b4941addee4,eaf5b528-f4af-5258-b45b-36952826b8b5,7b90fff2-0109-546f-8a8d-6459dd77c894}'::uuid[], 313.8, '[{"step": 1, "threshold": 280, "prob": 0.837}, {"step": 2, "threshold": 320, "prob": 0.429}, {"step": 3, "threshold": 360, "prob": 0.09}, {"step": 4, "threshold": 400, "prob": 0.006}, {"step": 5, "threshold": 440, "prob": 0.0}, {"step": 6, "threshold": 480, "prob": 0.0}]'::jsonb, 10);

insert into public.backtests (id, competition_id, gameweek_id, metric_name, predicted, actual) values
  ('cdc139af-785c-5240-ad3c-9dee912d2946', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 'ac00e74f-a108-5c4a-a32d-bd9affa73c18', 'step1_hit_rate', 0.668, 0.7),
  ('72b55f20-2413-5275-821a-dcd74787a998', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 'ac00e74f-a108-5c4a-a32d-bd9affa73c18', 'avg_stack_score', 313.4, 305.0),
  ('0a945a81-89aa-553e-b6a0-3fd83d7d7365', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', '186c2bb2-8c0e-5ebe-a337-2cba89dc0909', 'step1_hit_rate', 0.804, 0.8),
  ('64edc5d0-9834-5332-abcf-9b44a05d7107', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', '186c2bb2-8c0e-5ebe-a337-2cba89dc0909', 'avg_stack_score', 310.3, 319.7),
  ('2dd23ec7-c612-5177-85a3-ebcff284d62b', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', '51366472-a551-53c3-8f4e-a9ef195d48ec', 'step1_hit_rate', 0.796, 0.8),
  ('d74a4d82-3327-50ed-b3af-9a94c44165a7', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', '51366472-a551-53c3-8f4e-a9ef195d48ec', 'avg_stack_score', 314.8, 321.0),
  ('6b77c3e6-c9a1-52b3-9844-25fd481e2ab3', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', '767b4b6c-037f-5780-8250-3addd0921033', 'step1_hit_rate', 0.69, 0.8),
  ('068ff7c5-4d74-514b-aba5-dd315b429d26', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', '767b4b6c-037f-5780-8250-3addd0921033', 'avg_stack_score', 306.3, 298.3),
  ('70a47c5d-159b-557e-80d0-c3266e4378d5', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', '86cb57d5-6aed-5e6e-8136-5b0d9e6063cf', 'step1_hit_rate', 0.678, 0.6),
  ('ea8ffd60-4b43-5f74-af95-8904aec80c04', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', '86cb57d5-6aed-5e6e-8136-5b0d9e6063cf', 'avg_stack_score', 326.8, 317.2),
  ('b327bb8d-f66c-52b7-a240-75422c213805', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', '908b45b0-46f8-5ca1-b263-454270d18424', 'step1_hit_rate', 0.767, 0.6),
  ('d2ac9668-b934-5ac1-a321-d631a1e91da7', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', '908b45b0-46f8-5ca1-b263-454270d18424', 'avg_stack_score', 323.7, 327.9),
  ('ec785380-ece2-527f-b39b-1719ba7ad71c', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', '0bf92c1e-52fe-5b63-9423-61ac0d4e3934', 'step1_hit_rate', 0.807, 0.9),
  ('b21928a1-67a5-59ba-9719-809d63c1a565', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', '0bf92c1e-52fe-5b63-9423-61ac0d4e3934', 'avg_stack_score', 318.0, 325.3),
  ('920e0238-b9d9-5f69-8ed1-ade3f64dd2e8', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 'd204b246-5f8f-5bde-909d-7f0fea95824a', 'step1_hit_rate', 0.688, 0.6),
  ('19e8fb33-41fd-5304-903c-4c345f188f16', 'e77e0c27-1225-5ecc-a7b6-6f0ab05890fd', 'd204b246-5f8f-5bde-909d-7f0fea95824a', 'avg_stack_score', 306.4, 324.2),
  ('8a086e36-8c1c-5fee-a651-14bf1e7d6614', '80bc44d6-4791-54b4-aac7-43705d5e9384', 'ac00e74f-a108-5c4a-a32d-bd9affa73c18', 'step1_hit_rate', 0.76, 0.8),
  ('d588c127-1e9a-5e05-883b-df652a357464', '80bc44d6-4791-54b4-aac7-43705d5e9384', 'ac00e74f-a108-5c4a-a32d-bd9affa73c18', 'avg_stack_score', 310.2, 315.6),
  ('87dde713-0238-592d-9ee6-6af609778421', '80bc44d6-4791-54b4-aac7-43705d5e9384', '186c2bb2-8c0e-5ebe-a337-2cba89dc0909', 'step1_hit_rate', 0.747, 0.8),
  ('9aacee78-0b91-528c-abe0-88d3eb2875fc', '80bc44d6-4791-54b4-aac7-43705d5e9384', '186c2bb2-8c0e-5ebe-a337-2cba89dc0909', 'avg_stack_score', 323.9, 330.9),
  ('a2337daa-5d4b-5088-b9f3-509ec4eb2a06', '80bc44d6-4791-54b4-aac7-43705d5e9384', '51366472-a551-53c3-8f4e-a9ef195d48ec', 'step1_hit_rate', 0.767, 0.8),
  ('d6bf7a6f-af05-512d-840e-b418298d0027', '80bc44d6-4791-54b4-aac7-43705d5e9384', '51366472-a551-53c3-8f4e-a9ef195d48ec', 'avg_stack_score', 301.3, 283.5),
  ('8133ce03-02ec-56af-8be3-bd720dca279a', '80bc44d6-4791-54b4-aac7-43705d5e9384', '767b4b6c-037f-5780-8250-3addd0921033', 'step1_hit_rate', 0.731, 0.6),
  ('27b11b8a-2f72-5a14-a4f7-7416c084ab95', '80bc44d6-4791-54b4-aac7-43705d5e9384', '767b4b6c-037f-5780-8250-3addd0921033', 'avg_stack_score', 331.7, 330.4),
  ('8ad1239b-08c2-53b6-8f4f-feb3b19615fd', '80bc44d6-4791-54b4-aac7-43705d5e9384', '86cb57d5-6aed-5e6e-8136-5b0d9e6063cf', 'step1_hit_rate', 0.762, 0.8),
  ('7cafd9b1-0143-5923-a753-2726eecb5299', '80bc44d6-4791-54b4-aac7-43705d5e9384', '86cb57d5-6aed-5e6e-8136-5b0d9e6063cf', 'avg_stack_score', 316.2, 333.9),
  ('a19c0edd-d246-54fa-a35f-ff8645e26b81', '80bc44d6-4791-54b4-aac7-43705d5e9384', '908b45b0-46f8-5ca1-b263-454270d18424', 'step1_hit_rate', 0.724, 0.7),
  ('8b83740f-eef7-552c-8d15-d255ff8925bf', '80bc44d6-4791-54b4-aac7-43705d5e9384', '908b45b0-46f8-5ca1-b263-454270d18424', 'avg_stack_score', 309.8, 299.6),
  ('cf0bf3d9-c085-5cd2-918e-3ae21722de68', '80bc44d6-4791-54b4-aac7-43705d5e9384', '0bf92c1e-52fe-5b63-9423-61ac0d4e3934', 'step1_hit_rate', 0.704, 0.8),
  ('bd9fd847-9d6d-55ef-8cb0-dfe74135c661', '80bc44d6-4791-54b4-aac7-43705d5e9384', '0bf92c1e-52fe-5b63-9423-61ac0d4e3934', 'avg_stack_score', 316.2, 331.2),
  ('55b1337a-0eb1-5aee-b78e-8e63ef1ff91e', '80bc44d6-4791-54b4-aac7-43705d5e9384', 'd204b246-5f8f-5bde-909d-7f0fea95824a', 'step1_hit_rate', 0.677, 0.8),
  ('83ef7eee-fa83-5880-b7fd-f20ea10025dc', '80bc44d6-4791-54b4-aac7-43705d5e9384', 'd204b246-5f8f-5bde-909d-7f0fea95824a', 'avg_stack_score', 319.8, 317.3),
  ('4245d1db-0980-5ad6-9d7b-23071854c055', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 'ac00e74f-a108-5c4a-a32d-bd9affa73c18', 'step1_hit_rate', 0.715, 0.8),
  ('d6220744-59ce-5bb1-9704-143d32e90cca', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 'ac00e74f-a108-5c4a-a32d-bd9affa73c18', 'avg_stack_score', 310.6, 303.9),
  ('9c7ace1b-2589-5247-a96b-f46a93b0e038', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', '186c2bb2-8c0e-5ebe-a337-2cba89dc0909', 'step1_hit_rate', 0.81, 0.7),
  ('4e175067-bcdf-5718-bedb-8cdd2cfa4c33', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', '186c2bb2-8c0e-5ebe-a337-2cba89dc0909', 'avg_stack_score', 330.5, 292.3),
  ('4fea0a6f-e3f0-5bdc-9b95-193575be4284', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', '51366472-a551-53c3-8f4e-a9ef195d48ec', 'step1_hit_rate', 0.661, 0.7),
  ('eee93647-0c8f-56cf-a5c2-b665a2ce8d08', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', '51366472-a551-53c3-8f4e-a9ef195d48ec', 'avg_stack_score', 326.5, 317.6),
  ('39540567-9f91-5aab-9a19-f609c3ded6c3', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', '767b4b6c-037f-5780-8250-3addd0921033', 'step1_hit_rate', 0.775, 0.7),
  ('326a0b56-14ee-5f92-b0c7-f978a89407de', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', '767b4b6c-037f-5780-8250-3addd0921033', 'avg_stack_score', 328.9, 311.2),
  ('4d793721-bfda-580a-a98e-82c4574f2711', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', '86cb57d5-6aed-5e6e-8136-5b0d9e6063cf', 'step1_hit_rate', 0.727, 0.5),
  ('c3b0a466-bc3a-5a87-9635-ebc0708985d8', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', '86cb57d5-6aed-5e6e-8136-5b0d9e6063cf', 'avg_stack_score', 329.6, 322.8),
  ('1a392604-322b-5adf-9b72-2fef137a24a1', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', '908b45b0-46f8-5ca1-b263-454270d18424', 'step1_hit_rate', 0.81, 0.9),
  ('cdd4ce14-b6a4-59cc-92c2-860ee78f5062', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', '908b45b0-46f8-5ca1-b263-454270d18424', 'avg_stack_score', 314.3, 317.9),
  ('3dbac3e8-5eed-562d-bdc2-7728d5d0600e', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', '0bf92c1e-52fe-5b63-9423-61ac0d4e3934', 'step1_hit_rate', 0.683, 0.6),
  ('0409efef-64e0-5bb8-ad5b-b533b3f9e15d', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', '0bf92c1e-52fe-5b63-9423-61ac0d4e3934', 'avg_stack_score', 304.0, 302.9),
  ('88f9055f-ce26-52cb-b1b3-a27c47f6a27a', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 'd204b246-5f8f-5bde-909d-7f0fea95824a', 'step1_hit_rate', 0.77, 0.7),
  ('c5ebe1c5-296a-5553-a51c-a88f52deab1e', 'c0c6d7a0-07e6-5ff2-b392-82af518a78bd', 'd204b246-5f8f-5bde-909d-7f0fea95824a', 'avg_stack_score', 328.2, 324.7),
  ('eefe23ff-9e72-5c2b-b500-9eed6ef790fa', 'ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', 'ac00e74f-a108-5c4a-a32d-bd9affa73c18', 'step1_hit_rate', 0.678, 0.6),
  ('863f2af9-7e11-5847-b5c1-ea8c83878f4a', 'ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', 'ac00e74f-a108-5c4a-a32d-bd9affa73c18', 'avg_stack_score', 305.7, 301.8),
  ('0574b3ed-209d-5394-ba76-f62bbc637bf5', 'ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', '186c2bb2-8c0e-5ebe-a337-2cba89dc0909', 'step1_hit_rate', 0.733, 1.0),
  ('f035067e-3250-590a-a7ec-5e34138dbea3', 'ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', '186c2bb2-8c0e-5ebe-a337-2cba89dc0909', 'avg_stack_score', 323.7, 345.8),
  ('baca2c23-239c-55a6-ad66-c358a46eabec', 'ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', '51366472-a551-53c3-8f4e-a9ef195d48ec', 'step1_hit_rate', 0.779, 0.5),
  ('b11f6896-2cc7-5b25-83a5-25eef5ba0f8b', 'ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', '51366472-a551-53c3-8f4e-a9ef195d48ec', 'avg_stack_score', 325.7, 366.3),
  ('412bb966-4492-5109-9f73-6b142a7a98fe', 'ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', '767b4b6c-037f-5780-8250-3addd0921033', 'step1_hit_rate', 0.739, 1.0),
  ('ec2afaeb-8b09-583e-9d87-356ed328a2ba', 'ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', '767b4b6c-037f-5780-8250-3addd0921033', 'avg_stack_score', 301.9, 327.9),
  ('270d152c-16ec-5c05-b5e7-f59e688da470', 'ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', '86cb57d5-6aed-5e6e-8136-5b0d9e6063cf', 'step1_hit_rate', 0.768, 0.7),
  ('188ce287-6174-54e8-a8c4-6d8bc207a460', 'ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', '86cb57d5-6aed-5e6e-8136-5b0d9e6063cf', 'avg_stack_score', 310.6, 325.6),
  ('7c92cd38-7f24-58ab-ace4-61c897d09179', 'ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', '908b45b0-46f8-5ca1-b263-454270d18424', 'step1_hit_rate', 0.751, 0.7),
  ('1711c99a-d5e4-5a01-b140-db8414d85b0c', 'ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', '908b45b0-46f8-5ca1-b263-454270d18424', 'avg_stack_score', 309.8, 311.5),
  ('0dfc8119-f119-5133-9cb1-9b475c502064', 'ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', '0bf92c1e-52fe-5b63-9423-61ac0d4e3934', 'step1_hit_rate', 0.768, 1.0),
  ('dda4c1d0-a01d-5b7b-bbce-8617b43564d9', 'ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', '0bf92c1e-52fe-5b63-9423-61ac0d4e3934', 'avg_stack_score', 310.7, 321.1),
  ('c69dd656-5d0b-5e72-937d-e30f8fd83d9b', 'ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', 'd204b246-5f8f-5bde-909d-7f0fea95824a', 'step1_hit_rate', 0.703, 0.9),
  ('f6b19a99-53a3-5f65-97d3-e26d295e9d6c', 'ce5f3c68-fd4a-5eb7-ba35-3411cf4c5b40', 'd204b246-5f8f-5bde-909d-7f0fea95824a', 'avg_stack_score', 327.4, 345.3),
  ('c89c3c1e-3eef-5937-93c7-ead60f855bd6', '13810d4d-3b84-56ac-8d7b-8d92fab6adad', 'ac00e74f-a108-5c4a-a32d-bd9affa73c18', 'step1_hit_rate', 0.804, 0.7),
  ('b469502d-7be6-5544-a6c4-74598fa993eb', '13810d4d-3b84-56ac-8d7b-8d92fab6adad', 'ac00e74f-a108-5c4a-a32d-bd9affa73c18', 'avg_stack_score', 300.6, 340.2),
  ('26c072c3-26df-5aa2-b486-a80268ee62c0', '13810d4d-3b84-56ac-8d7b-8d92fab6adad', '186c2bb2-8c0e-5ebe-a337-2cba89dc0909', 'step1_hit_rate', 0.76, 0.7),
  ('7df3715d-9c68-52a6-9501-5a36691af441', '13810d4d-3b84-56ac-8d7b-8d92fab6adad', '186c2bb2-8c0e-5ebe-a337-2cba89dc0909', 'avg_stack_score', 322.6, 329.8),
  ('9bfe35ac-7cf6-5a51-82d1-587b024edb8d', '13810d4d-3b84-56ac-8d7b-8d92fab6adad', '51366472-a551-53c3-8f4e-a9ef195d48ec', 'step1_hit_rate', 0.753, 1.0),
  ('da46b870-1a78-553a-998a-5f31df1ab0b5', '13810d4d-3b84-56ac-8d7b-8d92fab6adad', '51366472-a551-53c3-8f4e-a9ef195d48ec', 'avg_stack_score', 301.2, 358.1),
  ('a6554647-0748-5e81-8901-5eb5ce44df6d', '13810d4d-3b84-56ac-8d7b-8d92fab6adad', '767b4b6c-037f-5780-8250-3addd0921033', 'step1_hit_rate', 0.663, 0.7),
  ('c0c5e219-6905-553b-a9cc-354a22e21062', '13810d4d-3b84-56ac-8d7b-8d92fab6adad', '767b4b6c-037f-5780-8250-3addd0921033', 'avg_stack_score', 309.3, 287.0),
  ('350ba015-a6a3-5d2a-bdff-39cd397bf783', '13810d4d-3b84-56ac-8d7b-8d92fab6adad', '86cb57d5-6aed-5e6e-8136-5b0d9e6063cf', 'step1_hit_rate', 0.671, 1.0),
  ('012a181e-08dd-5b89-8266-b44ce26166ed', '13810d4d-3b84-56ac-8d7b-8d92fab6adad', '86cb57d5-6aed-5e6e-8136-5b0d9e6063cf', 'avg_stack_score', 318.1, 323.4),
  ('a42ffe17-2d13-5fe9-8d7c-bb7bd77293c0', '13810d4d-3b84-56ac-8d7b-8d92fab6adad', '908b45b0-46f8-5ca1-b263-454270d18424', 'step1_hit_rate', 0.741, 1.0),
  ('d6cd33bc-3b5d-5034-a542-e56755e12b76', '13810d4d-3b84-56ac-8d7b-8d92fab6adad', '908b45b0-46f8-5ca1-b263-454270d18424', 'avg_stack_score', 302.4, 330.7),
  ('8b842d8d-749a-54c1-9e53-dc3faa8baa02', '13810d4d-3b84-56ac-8d7b-8d92fab6adad', '0bf92c1e-52fe-5b63-9423-61ac0d4e3934', 'step1_hit_rate', 0.812, 1.0),
  ('44d555ba-7c88-53d9-a019-63699edd36b6', '13810d4d-3b84-56ac-8d7b-8d92fab6adad', '0bf92c1e-52fe-5b63-9423-61ac0d4e3934', 'avg_stack_score', 327.4, 295.5),
  ('d5317ebe-694c-5d61-9893-a99af24c2e81', '13810d4d-3b84-56ac-8d7b-8d92fab6adad', 'd204b246-5f8f-5bde-909d-7f0fea95824a', 'step1_hit_rate', 0.723, 0.6),
  ('b5e2ceb9-b5bb-5018-b677-edc68b081be3', '13810d4d-3b84-56ac-8d7b-8d92fab6adad', 'd204b246-5f8f-5bde-909d-7f0fea95824a', 'avg_stack_score', 301.9, 334.6);

insert into public.articles (id, title, slug, excerpt, body_md, is_premium, published_at) values
  ('9c8699bb-5319-5ef0-8e17-42bad3b69e14', 'Methodology', 'methodology', 'How SorareModel projects player scores, builds club stacks and measures its own accuracy.', $md$SorareModel publishes two things each gameweek: a score distribution for every player in a supported competition, and a ranked list of club stacks with the probability of clearing each streak step. After the gameweek we compare both with what happened and publish the result on the Track Record page.

## 1. Player projections

For each player we estimate three numbers:

| Field | Meaning | Unit |
|---|---|---|
| `median` | 50th percentile of the Sorare score, given the player starts | points |
| `p90` | 90th percentile of the score, given the player starts | points |
| `start_prob` | Probability the player is in the starting XI | 0 to 1 |

The score model is a gradient-boosted quantile regression trained on past Sorare scores. Inputs include recent minutes, decisive and all-around actions per 90, opponent strength, home or away, and the bookmaker-implied team goal expectation.

The expected contribution of a player to a lineup is

$$
E[S_i] = p_i \cdot m_i
$$

where $p_i$ is `start_prob` and $m_i$ is the median. A player who does not start scores 0.

## 2. Stacks

A stack is a five-card lineup (goalkeeper, defender, midfielder, forward, extra) from a single club. Players from the same club are positively correlated: a clean sheet or a 4-0 win lifts all five scores at once. We model the stack total as approximately normal with

$$
\mu = \sum_{i=1}^{5} p_i m_i + 0.2 \cdot \max_i m_i
$$

$$
\sigma^2 = \rho \sum_{i=1}^{5} \left( \frac{q_{90,i} - m_i}{1.2816} \right)^2
$$

The second term in $\mu$ is the captain bonus. $\rho$ is the club correlation factor, fitted on past gameweeks (currently 1.35). The probability of reaching streak step $k$ with threshold $T_k$ is

$$
P(\text{step } k) = 1 - \Phi\left(\frac{T_k - \mu}{\sigma}\right)
$$

| Step | Threshold |
|---|---|
| 1 | 280 |
| 2 | 320 |
| 3 | 360 |
| 4 | 400 |
| 5 | 440 |
| 6 | 480 |

Stacks are ranked by $\mu$.

## 3. Validation

Every gameweek we record two metrics per competition:

| Metric | Predicted | Actual |
|---|---|---|
| `step1_hit_rate` | Mean step-1 probability of the top 10 stacks | Share of the top 10 stacks that reached step 1 |
| `avg_stack_score` | Mean $\mu$ of the top 10 stacks | Mean realised score of the same stacks |

A calibrated model has predicted and actual close together over many gameweeks. Single weeks are noisy: with 10 stacks, the realised hit rate moves in steps of 10 percentage points.

## 4. Live vs in validation

A competition goes **Live** after at least 8 gameweeks of backtests where the mean absolute error of `step1_hit_rate` is below 0.10 and there is no systematic bias in one direction. Until then it is listed as **In validation**: we run the model and publish the backtests, but not the projections.

## 5. Limits

- Lineup news after the pipeline run is not reflected. Check the "Last updated" timestamp.
- The model does not know about injuries that are not public.
- Probabilities are estimates. A 70% stack misses 3 times in 10.
$md$, false, '2026-08-01 09:00:00+00'),
  ('a53e24cd-24c1-521c-8e16-d085ba4aa3b4', 'Gameweek 8 calibration report', 'gw8-calibration-report', 'Predicted vs actual step-1 hit rate for all five competitions after gameweek 8.', $md$Gameweek 8 closed on Monday. This is the weekly comparison of forecast and result.

## Step-1 hit rate

| Competition | Predicted | Actual | Difference | Status |
|---|---|---|---|---|
| Contender Limited Pro | 68.8% | 60% | -8.8 pts | Live |
| Jupiler Pro League Limited Pro | 67.7% | 80% | +12.3 pts | Live |
| SPFL Limited Pro | 77.0% | 70% | -7.0 pts | Live |
| Premier League Rare Pro | 70.3% | 90% | +19.7 pts | In validation |
| Champion Europe Arena | 72.3% | 60% | -12.3 pts | In validation |

The full history is in the Track Record table. With 10 stacks per competition, the actual hit rate moves in steps of 10 points, so a single week tells you little. Look at the 8-week average.

## What we watch

1. **Bias.** If actual is below predicted for 4 or more weeks in a row, the model is overconfident and we recalibrate $\rho$.
2. **Spread.** A single week off by 20 points is normal with 10 stacks. A rolling 8-week error above 0.10 is not.

## Changes this week

None. The model version is unchanged since gameweek 1.
$md$, false, '2026-10-13 08:00:00+00'),
  ('ffea8c99-1c43-5da9-8f70-4ff350ae6272', 'Home stacks and score correlation', 'home-stacks-correlation', 'Why five players from one club produce a wider score distribution, and when that helps you clear higher streak steps.', $md$A five-player stack from one club has a wider score distribution than five players from five clubs with the same medians. This article quantifies the effect.

## Correlation in numbers

Across 8 gameweeks of backtests, the realised standard deviation of single-club stacks was about 16% higher than the independent-player estimate. That is why the model multiplies the variance by $\rho = 1.35$.

| Stack type | Mean score | Std. dev. | P(step 1) | P(step 4) |
|---|---|---|---|---|
| Single club, home | 318 | 41 | 0.82 | 0.03 |
| Single club, away | 301 | 43 | 0.69 | 0.02 |
| Mixed clubs | 318 | 35 | 0.86 | 0.01 |

## Reading the table

- For **step 1**, the mixed lineup is safer: lower variance, same mean.
- For **step 4 and above**, the single-club stack is better: you need the tail, and correlation fattens the tail.

## Practical rule

If your current streak target is step 1 or 2, prefer the stack with the highest step-1 probability. If you are chasing step 4+, sort by the higher steps instead. The Competition page shows all six step probabilities for every stack, so you can sort by the step you need.
$md$, true, '2026-10-09 08:00:00+00');

commit;
