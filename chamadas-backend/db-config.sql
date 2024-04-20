CREATE TYPE perfil AS ENUM ('aluno', 'professor');

CREATE TABLE disciplina (
 id SERIAL PRIMARY KEY,
 codigo char(8) NOT NULL,
 nome varchar(50) NOT NULL
 
);

INSERT INTO disciplina 
 (id, codigo, nome) 
VALUES 
 (1, 'TCC00293', 'Engenharia de Software II'), 
 (2, 'TCC00339', 'Gerência de Projetos e Manutenção de Software');

CREATE TABLE pessoa (
 id SERIAL PRIMARY KEY,
 tipo perfil,
 cpf char(11) NOT NULL,
 nome varchar(50) NOT NULL

);

ALTER TABLE ADD CONSTRAINT cpf_uni UNIQUE (cpf);

INSERT INTO pessoa 
 (id, tipo, cpf, nome)
VALUES 
 (1, 'professor', '12345678901', 'Leonardo Murta'), 
 (2, 'aluno', '12345678902', 'Maria Pereira'), 
 (3, 'aluno', '12345678903', 'José Santos'), 
 (4, 'aluno', '12345678904', 'Ana Souza'),
 (5, 'aluno', '12345678905', 'Carlos Oliveira');

CREATE TABLE turma (
 id SERIAL PRIMARY KEY,
 codigo char(2) NOT NULL,
 ano int NOT NULL,
 semester int NOT NULL,
 sala varchar(5) NOT NULL,
 id_professor int NOT NULL,
 id_disciplina int NOT NULL,
 CONSTRAINT fk_turma_professor FOREIGN KEY (id_professor) REFERENCES pessoa(id),
 CONSTRAINT fk_turma_disciplina FOREIGN KEY (id_disciplina) REFERENCES disciplina(id)
);

INSERT INTO turma 
 (id, codigo, ano, semester, sala, id_professor, id_disciplina)
VALUES 
 (1, 'A1', 2023, 2, '215', 1, 1),
 (2, 'A1', 2023, 2, '302', 1, 2);

CREATE TABLE inscricao (
 id SERIAL PRIMARY KEY,
 id_aluno int NOT NULL,
 id_turma int NOT NULL,
 CONSTRAINT fk_inscricao_aluno FOREIGN KEY (id_aluno) REFERENCES pessoa(id),
 CONSTRAINT fk_inscricao_turma FOREIGN KEY (id_turma) REFERENCES turma(id)
);

INSERT INTO inscricao 
 (id, id_aluno, id_turma)
VALUES
 (1, 2, 1),
 (2, 3, 1),
 (7, 4, 2),
 (8, 5, 2);
 
 CREATE TABLE presenca (
 id SERIAL PRIMARY KEY,
 id_inscricao int NOT NULL,
 data timestamp NOT NULL,
 CONSTRAINT fk_inscricao FOREIGN KEY (id_inscricao) REFERENCES inscricao(id)
 );

CREATE TABLE aula (
    id SERIAL PRIMARY KEY,
    id_turma int NOT NULL,
    data_ timestamp NOT NULL,
    status_code int NOT NULL,
    CONSTRAINT fk_turma FOREIGN KEY (id_turma) REFERENCES turma(id)
)

CREATE TABLE login_ (
    id SERIAL PRIMARY KEY,
    cpf char(11) NOT NULL,
    senha varchar,
    CONSTRAINT fk_cpf FOREIGN KEY (cpf) REFERENCES pessoa(cpf)
);

INSERT INTO login_ 
(cpf,senha) 
VALUES
('12345678901','prof'),
('12345678902', 'aluno'),
('12345678903', 'aluno'),
('12345678904', 'aluno'),
('12345678905', 'aluno');
