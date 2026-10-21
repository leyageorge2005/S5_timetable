-- ==============================================================================
-- SJCET S5 ER - Timetable Database Schema & Seed Data
-- Database Engine: PostgreSQL (Compatible with Supabase, Neon, Railway, Docker)
-- Created For: SJCET S5 ER Timetable
-- Team: Leya George, Apsara Rajesh, Neha Rajan, Serin Maria Siby
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. CLEANUP PREVIOUS TABLES & VIEWS
-- ------------------------------------------------------------------------------
DROP VIEW IF EXISTS v_full_timetable CASCADE;
DROP TABLE IF EXISTS timetable_entries CASCADE;
DROP TABLE IF EXISTS subject_teachers CASCADE;
DROP TABLE IF EXISTS period_slots CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS team_credits CASCADE;

-- ------------------------------------------------------------------------------
-- 2. CREATE TABLES (DDL)
-- ------------------------------------------------------------------------------

-- Teachers Directory
CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    whatsapp VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Subjects / Courses
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    short_code VARCHAR(20) NOT NULL UNIQUE,          -- e.g. MCI, DSP, TOC, DBMS, SNA/CC, PLA
    name VARCHAR(150) NOT NULL,                      -- e.g. Microcontrollers, Digital Signal Processing
    course_code VARCHAR(50),                         -- e.g. 24SJPBCST504, 24SJPCCST601
    subject_type VARCHAR(100) DEFAULT 'Theory',      -- Theory, Practical, Program Elective, etc.
    color_tone VARCHAR(20) DEFAULT 'sage',           -- butter, coral, lilac, sage
    emoji VARCHAR(10) DEFAULT '📚'
);

-- Subject-to-Teacher Mapping (Many-to-Many Relationship)
CREATE TABLE subject_teachers (
    subject_id INT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id INT NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    PRIMARY KEY (subject_id, teacher_id)
);

-- Daily Bell Schedule / Period Slots
CREATE TABLE period_slots (
    id SERIAL PRIMARY KEY,
    slot_label VARCHAR(20) NOT NULL,                 -- P1, P2, Break, Lunch, P3, etc.
    kind VARCHAR(20) NOT NULL,                       -- 'class', 'break', 'lunch'
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    sort_order INT NOT NULL UNIQUE
);

-- Timetable Schedule Entries
CREATE TABLE timetable_entries (
    id SERIAL PRIMARY KEY,
    day_of_week VARCHAR(15) NOT NULL,                -- 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
    slot_id INT NOT NULL REFERENCES period_slots(id) ON DELETE CASCADE,
    subject_id INT REFERENCES subjects(id) ON DELETE SET NULL,
    is_merged BOOLEAN DEFAULT FALSE,                 -- True for consecutive multi-period lab sessions
    notes TEXT,
    CONSTRAINT uq_day_slot UNIQUE (day_of_week, slot_id)
);

-- Creators / Team Credits
CREATE TABLE team_credits (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL DEFAULT 'Developer',
    class_name VARCHAR(50) NOT NULL DEFAULT 'SJCET S5 ER'
);

-- ------------------------------------------------------------------------------
-- 3. SEED DATA INSERTION
-- ------------------------------------------------------------------------------

-- Insert Teachers
INSERT INTO teachers (name, phone, whatsapp) VALUES
('Ms. Sreelakshmi K.R', '+918281030360', '918281030360'),
('Dr. Giby Jose', '+919446273933', '919446273933'),
('Ms. Ashitha Jose', '+919744106685', '919744106685'),
('Ms. Ancy Mathew', '+917909162145', '917909162145'),
('Ms. Shilpa Lizbeth George', '+918547637271', '918547637271'),
('Ms. Christy Joy', '+919188328493', '9188328493'),
('Pinky Ms', '+918138985642', '918138985642'),
('Anu V Kottath', NULL, NULL),
('Sarju S', NULL, NULL);

-- Insert Subjects
INSERT INTO subjects (short_code, name, course_code, subject_type, color_tone, emoji) VALUES
('MCI', 'Microcontrollers', '24SJPBCST504', 'Theory', 'butter', '⚡'),
('DSP', 'Digital Signal Processing', '24SJPCCST601', 'Theory', 'coral', '📡'),
('TOC', 'Theory of Computation', '24SJPCCST602', 'Theory', 'lilac', '🧩'),
('DBMS', 'Database Management Systems', '24SJPCCST603', 'Theory', 'sage', '🗄️'),
('SNA/CC', 'Social Network Analysis / Cloud Computing', '24SJPECST621', 'Program Elective', 'lilac', '☁️'),
('LAB', 'DSP Lab / DBMS Lab', '24SJPCCSL607 / 608', 'Practical', 'coral', '🧪'),
('PLA', 'In-House Placement Training', '24SJPLS6', 'No University Exam and No Internal Exam (Theory)', 'sage', '💼'),
('LIB', 'Library', '24SJLIB', 'Reading & Study', 'butter', '📖'),
('ACT', 'Activity / Association', '24SJACT', 'No University Exam and No Internal Exam (Theory)', 'sage', '🎉');

-- Map Subjects to Teachers
INSERT INTO subject_teachers (subject_id, teacher_id) VALUES
-- MCI -> Ms. Sreelakshmi K.R
((SELECT id FROM subjects WHERE short_code = 'MCI'), (SELECT id FROM teachers WHERE name = 'Ms. Sreelakshmi K.R')),
-- DSP -> Dr. Giby Jose
((SELECT id FROM subjects WHERE short_code = 'DSP'), (SELECT id FROM teachers WHERE name = 'Dr. Giby Jose')),
-- TOC -> Ms. Ashitha Jose
((SELECT id FROM subjects WHERE short_code = 'TOC'), (SELECT id FROM teachers WHERE name = 'Ms. Ashitha Jose')),
-- DBMS -> Ms. Ancy Mathew
((SELECT id FROM subjects WHERE short_code = 'DBMS'), (SELECT id FROM teachers WHERE name = 'Ms. Ancy Mathew')),
-- SNA/CC -> Ms. Shilpa Lizbeth George & Ms. Christy Joy
((SELECT id FROM subjects WHERE short_code = 'SNA/CC'), (SELECT id FROM teachers WHERE name = 'Ms. Shilpa Lizbeth George')),
((SELECT id FROM subjects WHERE short_code = 'SNA/CC'), (SELECT id FROM teachers WHERE name = 'Ms. Christy Joy')),
-- PLA -> Pinky Ms
((SELECT id FROM subjects WHERE short_code = 'PLA'), (SELECT id FROM teachers WHERE name = 'Pinky Ms')),
-- ACT -> Anu V Kottath & Sarju S
((SELECT id FROM subjects WHERE short_code = 'ACT'), (SELECT id FROM teachers WHERE name = 'Anu V Kottath')),
((SELECT id FROM subjects WHERE short_code = 'ACT'), (SELECT id FROM teachers WHERE name = 'Sarju S'));

-- Insert College Bell Schedule (Period Slots)
INSERT INTO period_slots (slot_label, kind, start_time, end_time, sort_order) VALUES
('P1', 'class', '09:00:00', '09:55:00', 1),
('P2', 'class', '09:55:00', '10:50:00', 2),
('Break', 'break', '10:50:00', '11:05:00', 3),
('P3', 'class', '11:05:00', '11:55:00', 4),
('P4', 'class', '11:55:00', '12:45:00', 5),
('Lunch Break', 'lunch', '12:45:00', '13:35:00', 6),
('P5', 'class', '13:35:00', '14:30:00', 7),
('P6', 'class', '14:30:00', '15:25:00', 8),
('Break', 'break', '15:25:00', '15:40:00', 9),
('P7', 'class', '15:40:00', '16:30:00', 10);

-- Insert Timetable Schedule Entries (Mon-Fri)

-- MONDAY: MCI, DSP, DSP, LIB, TOC, MCI, DBMS
INSERT INTO timetable_entries (day_of_week, slot_id, subject_id, is_merged) VALUES
('Monday', (SELECT id FROM period_slots WHERE sort_order = 1), (SELECT id FROM subjects WHERE short_code = 'MCI'), FALSE),
('Monday', (SELECT id FROM period_slots WHERE sort_order = 2), (SELECT id FROM subjects WHERE short_code = 'DSP'), TRUE),
('Monday', (SELECT id FROM period_slots WHERE sort_order = 4), (SELECT id FROM subjects WHERE short_code = 'DSP'), TRUE),
('Monday', (SELECT id FROM period_slots WHERE sort_order = 5), (SELECT id FROM subjects WHERE short_code = 'LIB'), FALSE),
('Monday', (SELECT id FROM period_slots WHERE sort_order = 7), (SELECT id FROM subjects WHERE short_code = 'TOC'), FALSE),
('Monday', (SELECT id FROM period_slots WHERE sort_order = 8), (SELECT id FROM subjects WHERE short_code = 'MCI'), FALSE),
('Monday', (SELECT id FROM period_slots WHERE sort_order = 10), (SELECT id FROM subjects WHERE short_code = 'DBMS'), FALSE);

-- TUESDAY: SNA/CC, DBMS, MCI, TOC, LAB (P5, P6, P7)
INSERT INTO timetable_entries (day_of_week, slot_id, subject_id, is_merged) VALUES
('Tuesday', (SELECT id FROM period_slots WHERE sort_order = 1), (SELECT id FROM subjects WHERE short_code = 'SNA/CC'), FALSE),
('Tuesday', (SELECT id FROM period_slots WHERE sort_order = 2), (SELECT id FROM subjects WHERE short_code = 'DBMS'), FALSE),
('Tuesday', (SELECT id FROM period_slots WHERE sort_order = 4), (SELECT id FROM subjects WHERE short_code = 'MCI'), FALSE),
('Tuesday', (SELECT id FROM period_slots WHERE sort_order = 5), (SELECT id FROM subjects WHERE short_code = 'TOC'), FALSE),
('Tuesday', (SELECT id FROM period_slots WHERE sort_order = 7), (SELECT id FROM subjects WHERE short_code = 'LAB'), TRUE),
('Tuesday', (SELECT id FROM period_slots WHERE sort_order = 8), (SELECT id FROM subjects WHERE short_code = 'LAB'), TRUE),
('Tuesday', (SELECT id FROM period_slots WHERE sort_order = 10), (SELECT id FROM subjects WHERE short_code = 'LAB'), TRUE);

-- WEDNESDAY: SNA/CC, DBMS, TOC, DBMS, PLA, TOC, ACT
INSERT INTO timetable_entries (day_of_week, slot_id, subject_id, is_merged) VALUES
('Wednesday', (SELECT id FROM period_slots WHERE sort_order = 1), (SELECT id FROM subjects WHERE short_code = 'SNA/CC'), FALSE),
('Wednesday', (SELECT id FROM period_slots WHERE sort_order = 2), (SELECT id FROM subjects WHERE short_code = 'DBMS'), FALSE),
('Wednesday', (SELECT id FROM period_slots WHERE sort_order = 4), (SELECT id FROM subjects WHERE short_code = 'TOC'), FALSE),
('Wednesday', (SELECT id FROM period_slots WHERE sort_order = 5), (SELECT id FROM subjects WHERE short_code = 'DBMS'), FALSE),
('Wednesday', (SELECT id FROM period_slots WHERE sort_order = 7), (SELECT id FROM subjects WHERE short_code = 'PLA'), FALSE),
('Wednesday', (SELECT id FROM period_slots WHERE sort_order = 8), (SELECT id FROM subjects WHERE short_code = 'TOC'), FALSE),
('Wednesday', (SELECT id FROM period_slots WHERE sort_order = 10), (SELECT id FROM subjects WHERE short_code = 'ACT'), FALSE);

-- THURSDAY: DSP, SNA/CC, MCI, SNA/CC, LAB (P5, P6, P7)
INSERT INTO timetable_entries (day_of_week, slot_id, subject_id, is_merged) VALUES
('Thursday', (SELECT id FROM period_slots WHERE sort_order = 1), (SELECT id FROM subjects WHERE short_code = 'DSP'), FALSE),
('Thursday', (SELECT id FROM period_slots WHERE sort_order = 2), (SELECT id FROM subjects WHERE short_code = 'SNA/CC'), FALSE),
('Thursday', (SELECT id FROM period_slots WHERE sort_order = 4), (SELECT id FROM subjects WHERE short_code = 'MCI'), FALSE),
('Thursday', (SELECT id FROM period_slots WHERE sort_order = 5), (SELECT id FROM subjects WHERE short_code = 'SNA/CC'), FALSE),
('Thursday', (SELECT id FROM period_slots WHERE sort_order = 7), (SELECT id FROM subjects WHERE short_code = 'LAB'), TRUE),
('Thursday', (SELECT id FROM period_slots WHERE sort_order = 8), (SELECT id FROM subjects WHERE short_code = 'LAB'), TRUE),
('Thursday', (SELECT id FROM period_slots WHERE sort_order = 10), (SELECT id FROM subjects WHERE short_code = 'LAB'), TRUE);

-- FRIDAY: SNA/CC, DSP, MCI, DSP, DBMS, TOC, PLA
INSERT INTO timetable_entries (day_of_week, slot_id, subject_id, is_merged) VALUES
('Friday', (SELECT id FROM period_slots WHERE sort_order = 1), (SELECT id FROM subjects WHERE short_code = 'SNA/CC'), FALSE),
('Friday', (SELECT id FROM period_slots WHERE sort_order = 2), (SELECT id FROM subjects WHERE short_code = 'DSP'), FALSE),
('Friday', (SELECT id FROM period_slots WHERE sort_order = 4), (SELECT id FROM subjects WHERE short_code = 'MCI'), FALSE),
('Friday', (SELECT id FROM period_slots WHERE sort_order = 5), (SELECT id FROM subjects WHERE short_code = 'DSP'), FALSE),
('Friday', (SELECT id FROM period_slots WHERE sort_order = 7), (SELECT id FROM subjects WHERE short_code = 'DBMS'), FALSE),
('Friday', (SELECT id FROM period_slots WHERE sort_order = 8), (SELECT id FROM subjects WHERE short_code = 'TOC'), FALSE),
('Friday', (SELECT id FROM period_slots WHERE sort_order = 10), (SELECT id FROM subjects WHERE short_code = 'PLA'), FALSE);

-- Insert Team Credits
INSERT INTO team_credits (full_name, role, class_name) VALUES
('Leya George', 'Lead Developer', 'SJCET S5 ER'),
('Apsara Rajesh', 'Developer & UI Designer', 'SJCET S5 ER'),
('Neha Rajan', 'Developer & Content Manager', 'SJCET S5 ER'),
('Serin Maria Siby', 'Developer & QA', 'SJCET S5 ER');

-- ------------------------------------------------------------------------------
-- 4. VIEWS & API QUERIES
-- ------------------------------------------------------------------------------

-- Unified View for Mobile Apps & Web APIs
CREATE OR REPLACE VIEW v_full_timetable AS
SELECT 
    te.id AS entry_id,
    te.day_of_week,
    ps.slot_label,
    ps.kind AS period_kind,
    ps.start_time,
    ps.end_time,
    ps.sort_order,
    COALESCE(te.is_merged, FALSE) AS is_merged,
    s.short_code,
    COALESCE(s.name, ps.slot_label) AS display_title,
    s.course_code,
    s.subject_type,
    s.color_tone,
    s.emoji,
    COALESCE(STRING_AGG(t.name, ', '), 'N/A') AS teacher_names,
    COALESCE(STRING_AGG(t.phone, ', '), 'N/A') AS teacher_phones,
    COALESCE(STRING_AGG(t.whatsapp, ', '), 'N/A') AS teacher_whatsapps
FROM period_slots ps
LEFT JOIN timetable_entries te ON ps.id = te.slot_id
LEFT JOIN subjects s ON te.subject_id = s.id
LEFT JOIN subject_teachers st ON s.id = st.subject_id
LEFT JOIN teachers t ON st.teacher_id = t.id
GROUP BY 
    te.id, 
    te.day_of_week, 
    ps.slot_label, 
    ps.kind, 
    ps.start_time, 
    ps.end_time, 
    ps.sort_order, 
    te.is_merged,
    s.short_code, 
    s.name, 
    s.course_code, 
    s.subject_type, 
    s.color_tone, 
    s.emoji
ORDER BY 
    ps.sort_order;

-- ------------------------------------------------------------------------------
-- 5. USEFUL QUERY EXAMPLES FOR BACKEND INTEGRATION
-- ------------------------------------------------------------------------------

-- Example A: Fetch Today's Full Schedule (e.g. Monday)
-- SELECT * FROM v_full_timetable WHERE day_of_week = 'Monday' ORDER BY sort_order;

-- Example B: Fetch Currently Active Period
-- SELECT * FROM v_full_timetable 
-- WHERE day_of_week = TRIM(TO_CHAR(CURRENT_DATE, 'Day'))
--   AND CURRENT_TIME BETWEEN start_time AND end_time;

-- Example C: Fetch Full Weekly Timetable
-- SELECT 
--     day_of_week,
--     slot_label,
--     start_time,
--     end_time,
--     display_title,
--     teacher_names
-- FROM v_full_timetable
-- ORDER BY 
--     CASE day_of_week 
--         WHEN 'Monday' THEN 1 
--         WHEN 'Tuesday' THEN 2 
--         WHEN 'Wednesday' THEN 3 
--         WHEN 'Thursday' THEN 4 
--         WHEN 'Friday' THEN 5 
--     END, 
--     sort_order;
