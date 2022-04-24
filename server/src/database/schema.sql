CREATE DATABASE dindin;

CREATE TABLE usuarios (
  id serial PRIMARY KEY,
  nome varchar(60) NOT NULL,
  email varchar(60) NOT NULL UNIQUE,
  senha text NOT NULL
);

CREATE TABLE categorias (
	id serial PRIMARY KEY,
	descricao varchar(30) NOT NULL
);

CREATE TABLE transacoes (
	id serial PRIMARY KEY,
  	descricao varchar(60) NOT NULL,
  	valor integer NOT NULL,
    data date NOT NULL,
    categoria_id integer REFERENCES categorias(id),
  	usuario_id integer REFERENCES usuarios(id),
  	tipo varchar(10) NOT NULL
);

INSERT INTO categorias (descricao, classe) VALUES
('Alimentação', 'saida'), ('Assinatura e serviço', 'saida'), ('Casa', 'saida'), ('Compras', 'saida'), 
('Contas', 'saida'), ('Cuidados Pessoais', 'saida'), ('Depósito', 'entrada'), ('Educação', 'saida'), 
('Família', 'saida'), ('Farmácia', 'saida'), ('Lazer', 'saida'), ('Mercado', 'saida'), ('Pets', 'saida'),
('Pix', 'entrada'), ('Presentes', 'saida'), ('Roupas', 'saida'), ('Salário', 'entrada'), ('Saúde', 'saida'), 
('Ted', 'entrada'), ('Transporte', 'saida'), ('Vendas', 'entrada'), ('Outras Receitas', 'entrada'), ('Outras Despesas', 'saida');
