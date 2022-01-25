DROP TABLE IF EXISTS roles CASCADE;

CREATE TABLE roles
(
    id         BIGSERIAL PRIMARY KEY,
    name       VARCHAR(180) NOT NULL UNIQUE,
    image      VARCHAR(255) NULL,
    route      VARCHAR(255) NULL,
    created_at TIMESTAMP    NOT NULL,
    updated_at TIMESTAMP    NOT NULL
);

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users
(
    id            BIGSERIAL PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    name          VARCHAR(255) NOT NULL,
    lastname      VARCHAR(255) NOT NULL,
    phone         VARCHAR(30)  NOT NULL UNIQUE,
    image         VARCHAR(255) NULL,
    is_available  BOOLEAN      NULL,
    session_token VARCHAR(255) NULL,
    password      VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP(0) NOT NULL,
    updated_at    TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS user_has_roles CASCADE;

CREATE TABLE user_has_roles
(
    id_user    BIGSERIAL    NOT NULL,
    id_role    BIGSERIAL    NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_role) REFERENCES roles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (id_user, id_role)
);

INSERT INTO roles(name, route, image, created_at, updated_at)
VALUES ('CLIENTE',
        'client/home',
        'https://findicons.com/files/icons/573/must_have/256/user.png',
        '2022-01-24',
        '2022-01-24');

INSERT INTO roles(name, route, image, created_at, updated_at)
VALUES ('RESTAURANTE',
        'restaurant/home',
        'https://img.icons8.com/color/452/restaurant-.png',
        '2022-01-24',
        '2022-01-24');

INSERT INTO roles(name, route, image, created_at, updated_at)
VALUES ('REPARTIDOR',
        'delivery/home',
        'https://st2.depositphotos.com/1007566/12014/v/950/depositphotos_120143704-stock-illustration-motorcycle-delivery-food-isolated-icon.jpg',
        '2022-01-24',
        '2022-01-24');
