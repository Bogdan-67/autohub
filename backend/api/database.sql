CREATE TABLE users(
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    patronimyc VARCHAR(255),
    fio VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    car VARCHAR(255)
);

CREATE TABLE roles(
    id_role SERIAL PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL
);

CREATE TABLE accounts(
    id_account SERIAL PRIMARY KEY,
    login VARCHAR(255) NOT NULL,   
    password VARCHAR(255) NOT NULL,
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

CREATE TABLE brands(
    id_brand SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE categories(
    id_category SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent INTEGER
);

CREATE TABLE goods(
    id_good SERIAL PRIMARY KEY,
    good_name VARCHAR(255) NOT NULL,
    article VARCHAR(255) NOT NULL,
    brand_id INTEGER,
    FOREIGN KEY (brand_id) REFERENCES brands(id_brand) ON DELETE CASCADE,
    price REAL,
    description TEXT,
    storage INTEGER NOT NULL DEFAULT 0,
    rating REAL DEFAULT 0
);

CREATE TABLE good_features(
    id_feature SERIAL PRIMARY KEY,
    good_id INTEGER NOT NULL,
    FOREIGN KEY (good_id) REFERENCES goods(id_good) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE good_categories(
    id_good_category SERIAL PRIMARY KEY,
    good_id INTEGER NOT NULL,
    FOREIGN KEY (good_id) REFERENCES goods(id_good) ON DELETE CASCADE,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id_category) ON DELETE CASCADE
);

CREATE TABLE good_images(
    id_image SERIAL PRIMARY KEY,
    filename VARCHAR(255),
    good_id INTEGER NOT NULL,
    FOREIGN KEY (good_id) REFERENCES goods(id_good) ON DELETE CASCADE
);

CREATE TABLE good_reviews(
    id_review SERIAL PRIMARY KEY,
    text TEXT,
    rate INTEGER NOT NULL,
    created_at DATE DEFAULT current_date,
    good_id INTEGER NOT NULL,
    FOREIGN KEY (good_id) REFERENCES goods(id_good) ON DELETE CASCADE,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id_user) ON DELETE CASCADE
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

CREATE TABLE projects(
    id_project SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    img VARCHAR(255)
);

CREATE TABLE main_slider(
    id SERIAL PRIMARY KEY,
    img VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    link VARCHAR(255),
    active BOOLEAN DEFAULT true
);

CREATE TABLE feedbacks(
    id_feedback SERIAL PRIMARY KEY,
    message TEXT,
    contacts TEXT,
    created_at DATE DEFAULT current_date,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id_user) ON DELETE CASCADE
)

INSERT INTO roles(role_name) VALUES ('USER') RETURNING *;
INSERT INTO roles(role_name) VALUES ('ADMIN') RETURNING *;