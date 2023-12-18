create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255)
);


create TABLE post( 
    id SERIAL PRIMARY KEY, //авто-id
    title VARCHAR(255), //string
    content VARCHAR(255), //string
    user_id INTEGER, //number
    FOREIGN KEY (user_id) REFERENCES person (id) //id-связанный с другой бд
);
