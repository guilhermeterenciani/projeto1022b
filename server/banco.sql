DROP DATABASE IF EXISTS banco1022b;
CREATE DATABASE banco1022b;
USE banco1022b;
CREATE TABLE IF NOT EXISTS produtos(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    descricao VARCHAR(50),
    preco DECIMAL(10,2),
    imagem VARCHAR(300)
);
CREATE TABLE IF NOT EXISTS usuarios(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    idade INT,
    cpf VARCHAR(50),
    rg VARCHAR(50),
    endereco VARCHAR(100)
    estado_civil ENUM("solteiro,casado")
);
INSERT INTO produtos VALUES
(1,"Iphone","Celular RUIM",5000.50,"SEM IMAGEM");

INSERT INTO usuarios VALUES (1,"João",18,"036.547.382-10","002.874.325","Rua das flores, Bairro dos Planetas, Número 10, Naviraí - MS","casado");