CREATE TABLE users(
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    patronimyc VARCHAR(255),
    fio VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    company VARCHAR(255),
    post VARCHAR(255),
    city VARCHAR(255)
);

CREATE TABLE roles(
    id_role SERIAL PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL
);

CREATE TABLE accounts(
    id_account SERIAL PRIMARY KEY,
    login VARCHAR(255) NOT NULL,   
    password VARCHAR(255) NOT NULL,
    confirmed BOOLEAN,
    role_id INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (role_id) REFERENCES roles(id_role) ON DELETE CASCADE,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
    );

CREATE TABLE tokens(
    account_id SERIAL PRIMARY KEY,
    FOREIGN KEY (account_id) REFERENCES accounts(id_account) ON DELETE CASCADE,
    refresh_token TEXT NOT NULL
);

CREATE TABLE applications(
    id_application SERIAL PRIMARY KEY,
    account_id SERIAL PRIMARY KEY,
    FOREIGN KEY (account_id) REFERENCES accounts(id_account) ON DELETE CASCADE,
    status INTEGER NOT NULL,
    datetime DATE DEFAULT current_date,
);

CREATE TABLE brands(
    id_brand SERIAL PRIMARY KEY,
    brand_name VARCHAR(255) NOT NULL,
    brand_logo VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL
);

CREATE TABLE types(
    id_type SERIAL PRIMARY KEY,
    type_name VARCHAR(255) NOT NULL,
    parent INTEGER,
    img VARCHAR(255)
);

CREATE TABLE goods(
    id_good SERIAL PRIMARY KEY,
    good_name VARCHAR(255) NOT NULL,
    article VARCHAR(255) NOT NULL,
    type_id INTEGER NOT NULL,
    FOREIGN KEY (type_id) REFERENCES types(id_type) ON DELETE CASCADE,
    brand_id INTEGER NOT NULL,
    FOREIGN KEY (brand_id) REFERENCES brands(id_brand) ON DELETE CASCADE,
    price REAL,
    img VARCHAR(255),
    description TEXT,
    features VARCHAR(255),
    secret BOOLEAN NOT NULL DEFAULT FALSE,
    storage INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE good_info(
    id_good_info SERIAL PRIMARY KEY,
    good_id INTEGER NOT NULL,
    FOREIGN KEY (good_id) REFERENCES goods(id_good) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE cart_goods(
    id_cart_goods SERIAL PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 1,
    sum REAL NOT NULL,
    account_id INTEGER NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(id_account) ON DELETE CASCADE,
    good_id INTEGER NOT NULL,
    FOREIGN KEY (good_id) REFERENCES goods(id_good) ON DELETE CASCADE
);

CREATE TABLE orders(
    id_order SERIAL PRIMARY KEY,
    datetime DATE DEFAULT current_date,
    sum REAL NOT NULL,
    account_id INTEGER NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(id_account) ON DELETE CASCADE,
    delivery_type VARCHAR(255),
    adress VARCHAR(255)
);

CREATE TABLE order_goods(
    id_order_good SERIAL PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 1,
    sum REAL NOT NULL,
    order_id INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id_order) ON DELETE CASCADE,
    good_id INTEGER NOT NULL,
    FOREIGN KEY (good_id) REFERENCES goods(id_good) ON DELETE CASCADE
);

CREATE TABLE dealers(
    id_dealer SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    site VARCHAR(255),
    coordinates VARCHAR(255)
);

CREATE TABLE dealer_adresses(
    id_dealer_adress SERIAL PRIMARY KEY,
    adress VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    locale_email VARCHAR(255),
    dealer_id INTEGER NOT NULL,
    FOREIGN KEY (dealer_id) REFERENCES dealers(id_dealer) ON DELETE CASCADE
);

CREATE TABLE projects(
    id_project SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    img VARCHAR(255)
);

INSERT INTO roles(role_name) VALUES ('USER') RETURNING *;
INSERT INTO roles(role_name) VALUES ('ADMIN') RETURNING *;