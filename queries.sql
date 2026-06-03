--User upcoming events

SELECT u.user_id,
u.full_name,
u.city AS user_city,
e.event_id,
e.title AS event_title,
e.start_date,
e.city AS event_city
FROM  Users u
JOIN Registrations r ON u.user_id=r.user_id
JOIN Events e on r.event_id=e.event_id
WHERE 
e.status='upcoming'
ORDER BY
e.start_date ASC;

--Top rated events

SELECT e.title,
AVG(f.rating) AS avg_rating,
COUNT(f.feedback_id) AS feedback_count
FROM Events e
JOIN Feedback f
ON e.event_id = f.event_id
GROUP BY e.event_id, e.title
HAVING COUNT(f.feedback_id) >= 10
ORDER BY avg_rating DESC;

--Inactive users
SELECT u.full_name
FROM Users u
LEFT JOIN Registrations r
ON u.user_id = r.user_id
AND r.registration_date >= CURDATE() - INTERVAL 90 DAY
WHERE r.registration_id IS NULL;

--peak session hours
SELECT e.title,
COUNT(s.session_id) AS session_count
FROM Events e
JOIN Sessions s
ON e.event_id = s.event_id
WHERE TIME(s.start_time) BETWEEN '10:00:00' AND '12:00:00'
GROUP BY e.event_id, e.title;

--Most active cities

SELECT u.city,
COUNT(DISTINCT r.user_id) AS total_users
FROM Users u
JOIN Registrations r
ON u.user_id = r.user_id
GROUP BY u.city
ORDER BY total_users DESC
LIMIT 5;

--Event resuorce summary

SELECT e.title,
COUNT(r.resource_id) AS total_resources
FROM Events e
JOIN Resources r
ON e.event_id = r.event_id
GROUP BY e.event_id, e.title;

--Low feedback alerts

SELECT u.full_name,
f.comments,
e.title
FROM Users u
JOIN Feedback f
ON u.user_id = f.user_id
JOIN Events e
ON f.event_id = e.event_id
WHERE f.rating < 3;

--sessions for upcoming events

SELECT e.title,
COUNT(s.session_id) AS session_count
FROM Events e
JOIN Sessions s
ON e.event_id = s.event_id
WHERE e.status = 'upcoming'
GROUP BY e.event_id, e.title;

--organizer event summary

SELECT u.full_name,
e.status,
COUNT(e.event_id) AS total_events
FROM Users u
JOIN Events e
ON u.user_id = e.organizer_id
GROUP BY u.full_name, e.status;

--Feedback Gap

SELECT DISTINCT e.title
FROM Events e
JOIN Registrations r
ON e.event_id = r.event_id
LEFT JOIN Feedback f
ON e.event_id = f.event_id
WHERE f.feedback_id IS NULL;

--daily user count

SELECT registration_date,
COUNT(user_id) AS total_users
FROM Users
WHERE registration_date >= CURDATE() - INTERVAL 7 DAY
GROUP BY registration_date;

--Event with Maximum sessions

SELECT e.title,
COUNT(s.session_id) AS session_count
FROM Events e
JOIN Sessions s
ON e.event_id = s.event_id
GROUP BY e.event_id, e.title
ORDER BY session_count DESC
LIMIT 1;

--Avg rating per city

SELECT e.city,
AVG(f.rating) AS avg_rating
FROM Events e
JOIN Feedback f
ON e.event_id = f.event_id
GROUP BY e.city;

--Most registered events

SELECT e.title,
COUNT(r.registration_id) AS registration_count
FROM Events e
JOIN Registrations r
ON e.event_id = r.event_id
GROUP BY e.event_id, e.title
ORDER BY registration_count DESC
LIMIT 3;

--Event session time conflict

SELECT s1.title,
s2.title,
s1.event_id
FROM Sessions s1
JOIN Sessions s2
ON s1.event_id = s2.event_id
AND s1.session_id < s2.session_id
AND s1.start_time < s2.end_time
AND s1.end_time > s2.start_time;

--Unregistered active users

SELECT u.full_name
FROM Users u
LEFT JOIN Registrations r
ON u.user_id = r.user_id
WHERE u.registration_date >= CURDATE() - INTERVAL 30 DAY
AND r.registration_id IS NULL;

--Multi session speakers

SELECT speaker_name,
COUNT(session_id) AS total_sessions
FROM Sessions
GROUP BY speaker_name
HAVING COUNT(session_id) > 1;

--Resource availability check

SELECT e.title
FROM Events e
LEFT JOIN Resources r
ON e.event_id = r.event_id
WHERE r.resource_id IS NULL;

--completed events with feedback summary

SELECT e.title,
COUNT(DISTINCT r.registration_id) AS total_registrations,
AVG(f.rating) AS avg_rating
FROM Events e
LEFT JOIN Registrations r
ON e.event_id = r.event_id
LEFT JOIN Feedback f
ON e.event_id = f.event_id
WHERE e.status = 'completed'
GROUP BY e.event_id, e.title;

--User Engagement Index

SELECT u.full_name,
COUNT(DISTINCT r.event_id) AS events_attended,
COUNT(DISTINCT f.feedback_id) AS feedbacks_submitted
FROM Users u
LEFT JOIN Registrations r
ON u.user_id = r.user_id
LEFT JOIN Feedback f
ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name;

--Top feedback providers

SELECT u.full_name,
COUNT(f.feedback_id) AS total_feedbacks
FROM Users u
JOIN Feedback f
ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name
ORDER BY total_feedbacks DESC
LIMIT 5;

--Duplicate registartions check

SELECT user_id,
event_id,
COUNT(*) AS registration_count
FROM Registrations
GROUP BY user_id, event_id
HAVING COUNT(*) > 1;

--Restration trends

SELECT DATE_FORMAT(registration_date,'%Y-%m') AS month,
COUNT(*) AS registration_count
FROM Registrations
WHERE registration_date >= CURDATE() - INTERVAL 12 MONTH
GROUP BY DATE_FORMAT(registration_date,'%Y-%m')
ORDER BY month;

--Average session duration per event

SELECT e.title,
AVG(
TIMESTAMPDIFF(
MINUTE,
s.start_time,
s.end_time
)
) AS avg_duration
FROM Events e
JOIN Sessions s
ON e.event_id = s.event_id
GROUP BY e.event_id, e.title;

--Event without sessions

SELECT e.title
FROM Events e
LEFT JOIN Sessions s
ON e.event_id = s.event_id
WHERE s.session_id IS NULL;