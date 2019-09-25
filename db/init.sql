DROP TABLE IF EXISTS snippet;


DROP TABLE IF EXISTS author;


CREATE TABLE author (name TEXT PRIMARY KEY,
                                       password TEXT);


CREATE TABLE snippet (id SERIAL PRIMARY KEY,
                                        code TEXT, title TEXT, description TEXT, favorites INT DEFAULT 0,
                                                                                                       author TEXT REFERENCES author, -- establishes snippet-author relationship
 language TEXT);

--Seed data

INSERT INTO author (name, password)
VALUES ('Dandy',
        'dean123'), ('Scott',
                     'password'); -- Seed snippets with data


INSERT INTO snippet (code, title, description, language, author)
VALUES ('const america = 1776',
        'freedom',
        'I declared a const',
        'JavaScript',
        'Dandy'), ('4 + 4',
                   'addition',
                   'This is how you add',
                   'Algebra',
                   'Scott');


SELECT *
FROM author;