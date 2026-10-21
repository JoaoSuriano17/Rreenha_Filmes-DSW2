CREATE TABLE IF NOT EXISTS diretor(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    nacionalidade VARCHAR(70) NOT NULL,
    data_nascimento DATE,
    biografia TEXT,
    qtde_premios INT DEFAULT 0,

    CONSTRAINT nascimento_CK CHECK (data_nascimento BETWEEN '1895-12-28T00:00:00Z' AND '2026-10-19T00:00:00Z'),
    CONSTRAINT premios_CK CHECK (qtde_premios>=0)/*Sem limite superior; não queremos limitar os excepcionais.*/
);

CREATE TABLE IF NOT EXISTS ator(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    nacionalidade VARCHAR(70),
    data_nascimento DATE,
    biografia TEXT,
    qtde_premios INT DEFAULT 0,

    CONSTRAINT nascimento_CK CHECK (data_nascimento BETWEEN '1895-12-28T00:00:00Z' AND '2026-10-19T00:00:00Z'),
    CONSTRAINT premios_CK CHECK (qtde_premios>=0)/*Idem*/
);

CREATE TABLE IF NOT EXISTS usuario(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(85) UNIQUE NOT NULL,
    critico BOOLEAN,
    administrador BOOLEAN,
    senha CHAR(60) NOT NULL
    /*Parece não precisar de constraints*/
);

CREATE TABLE IF NOT EXISTS filme(
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    diretor INT NOT NULL,
    sinopse TEXT,
    faixa_etaria INT,
    duracao INT,
    qtde_premios INT DEFAULT 0,

    CONSTRAINT diretor_FK FOREIGN KEY (diretor) REFERENCES diretor(id),
    CONSTRAINT faixa_etaria_CK CHECK (faixa_etaria>=0 AND faixa_etaria<=18),
    CONSTRAINT duracao_CK CHECK (duracao>0),/*Pode-se conceber um curtíssima-metragem de 29 segundos?*/
    CONSTRAINT premios_CK CHECK (qtde_premios>=0)/*Idem*/
);

CREATE TABLE IF NOT EXISTS serie(
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    diretor INT NOT NULL,
    sinopse TEXT,
    faixa_etaria INT,
    qtde_premios INT DEFAULT 0,

    CONSTRAINT diretor_FK FOREIGN KEY (diretor) REFERENCES diretor(id),
    CONSTRAINT faixa_etaria_CK CHECK (faixa_etaria>=0 AND faixa_etaria<=18),
    CONSTRAINT premios_CK CHECK (qtde_premios>=0)/*Idem*/
);

CREATE TABLE IF NOT EXISTS episodio(
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(85) NOT NULL,
    sinopse TEXT,
    duracao INT,
    temporada INT DEFAULT 1,
    serie_id INT NOT NULL,

    CONSTRAINT serie_id_FK FOREIGN KEY (serie_id) REFERENCES serie(id) ON DELETE CASCADE,

    CONSTRAINT duracao_CK CHECK (duracao>0),
    CONSTRAINT temporada_CK CHECK (temporada>=1)
);

CREATE TABLE IF NOT EXISTS resenha_filme(
    id SERIAL PRIMARY KEY,
    usuario_id INT,
    filme_id INT,
    resenha TEXT,
    avaliacao INT,

    CONSTRAINT usuario_FK FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    CONSTRAINT filme_FK FOREIGN KEY (filme_id) REFERENCES filme(id),
    CONSTRAINT avaliacao_CK CHECK (avaliacao>=0 AND avaliacao<=100)
);

CREATE TABLE IF NOT EXISTS resenha_serie(
    /*Ninguém faz resenhas sobre episódios individuais de séries.*/
    id SERIAL PRIMARY KEY,
    usuario_id INT,
    serie_id INT,
    resenha TEXT,
    avaliacao INT,

    CONSTRAINT usuario_FK FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    CONSTRAINT serie_FK FOREIGN KEY (serie_id) REFERENCES serie(id),
    CONSTRAINT avaliacao_CK CHECK (avaliacao>=0 AND avaliacao<=100)
);

/* Relações M:N com atores */
CREATE TABLE IF NOT EXISTS filme_ator(
    id_filme INT,
    id_ator INT,

    CONSTRAINT ator_FK FOREIGN KEY (id_ator) REFERENCES ator(id) ON DELETE CASCADE,
    CONSTRAINT filme_FK FOREIGN KEY (id_filme) REFERENCES filme(id) ON DELETE CASCADE,

    CONSTRAINT filme_ator_PK PRIMARY KEY (id_filme, id_ator)
);

CREATE TABLE IF NOT EXISTS serie_ator(
    id_serie INT,
    id_ator INT,

    CONSTRAINT ator_FK FOREIGN KEY (id_ator) REFERENCES ator(id) ON DELETE CASCADE,
    CONSTRAINT serie_FK FOREIGN KEY (id_serie) REFERENCES serie(id) ON DELETE CASCADE,

    CONSTRAINT serie_ator_PK PRIMARY KEY (id_serie, id_ator)
);

/* Inserções */
INSERT INTO diretor (nome, nacionalidade, data_nascimento, biografia, qtde_premios) VALUES ('Werner Herzog', 'Alemão', '1942-09-05T00:00:00Z', 'Alemão, ousado, impertinente', 11);
INSERT INTO diretor (nome, nacionalidade, data_nascimento, biografia, qtde_premios) VALUES ('Ingmar Bergman', 'Sueco', '1918-07-14T00:00:00Z', 'Maior diretor sueco, dirigiu 48 filmes, ganhou três óscares na categoria de Melhor Filme Internacional.', 64);
INSERT INTO diretor (nome, nacionalidade, data_nascimento, biografia, qtde_premios) VALUES ('Klebe (falso)', 'Prefere não dizer', '1999-12-30T00:00:00Z', 'Raramente vi tamanha capacidade inventiva misturada a tão pouco talento, diriam se não fosse o melhor.', 123);

INSERT INTO ator (nome, nacionalidade, data_nascimento, biografia, qtde_premios) VALUES ('Wagner Moura', 'Brasileiro', '1976-07-14T00:00:00Z', 'Grande sujeito, baiano.', 2);
INSERT INTO ator (nome, nacionalidade, data_nascimento, biografia, qtde_premios) VALUES ('Klaus Kinski', 'Alemão', '1926-07-14T00:00:00Z', 'Grande desregulado.', 0);

INSERT INTO usuario (nome, email, critico, administrador, senha) VALUES ('João Silva', 'joao@gmail.com', TRUE, TRUE, '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');
INSERT INTO usuario (nome, email, critico, administrador, senha) VALUES ('Maria Oliveira', 'maria@gmail.com', TRUE, FALSE, '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');
INSERT INTO usuario (nome, email, critico, administrador, senha) VALUES ('Pedro Santos', 'pedro@gmail.com', FALSE, FALSE, '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');

INSERT INTO filme (titulo, diretor, sinopse, faixa_etaria, duracao, qtde_premios) VALUES ('Aguirre, a Cólera dos Deuses', 1, 'Um explorador espanhol conduz uma expedição pela Amazônia em busca de riquezas, enquanto sua ambição o leva à obsessão.', 14, 95, 5);
INSERT INTO filme (titulo, diretor, sinopse, faixa_etaria, duracao, qtde_premios) VALUES ('O Enigma de Kaspar Hauser', 1, 'Um jovem criado em isolamento surge na sociedade e precisa compreender as convenções e relações humanas.', 12, 110, 3);
INSERT INTO filme (titulo, diretor, sinopse, faixa_etaria, duracao, qtde_premios) VALUES ('O Sétimo Selo', 2, 'Um cavaleiro medieval retorna das Cruzadas e joga uma partida de xadrez com a Morte.', 14, 96, 4);
INSERT INTO filme (titulo, diretor, sinopse, faixa_etaria, duracao, qtde_premios) VALUES ('Morangos Silvestres', 2, 'Um professor idoso revisita lembranças de sua vida durante uma viagem para receber uma homenagem acadêmica.', 10, 91, 2);
INSERT INTO filme (titulo, diretor, sinopse, faixa_etaria, duracao, qtde_premios) VALUES ('A Obra-Prima de Klebe', 3, 'Um cineasta fictício tenta realizar sua obra definitiva, enfrentando contratempos tão absurdos quanto sua própria ambição.', 12, 87, 123);

INSERT INTO serie (titulo, diretor, sinopse, faixa_etaria, qtde_premios) VALUES ('A Jornada Humana', 3, 'Uma série fictícia sobre personagens que buscam compreender a si mesmos em meio a dilemas morais.', 12, 2);
INSERT INTO serie (titulo, diretor, sinopse, faixa_etaria, qtde_premios) VALUES ('Contos da Existência', 2, 'Histórias independentes sobre escolhas, conflitos e o sentido da vida.', 14, 3);

INSERT INTO episodio (titulo, sinopse, duracao, temporada, serie_id) VALUES ('O Primeiro Passo', 'O protagonista inicia uma jornada que altera sua visão de mundo.', 42, 1, 1);
INSERT INTO episodio (titulo, sinopse, duracao, temporada, serie_id) VALUES ('A Escolha', 'Uma decisão difícil coloca em risco a confiança entre os personagens.', 45, 1, 1);
INSERT INTO episodio (titulo, sinopse, duracao, temporada, serie_id) VALUES ('O Silêncio', 'Um encontro inesperado obriga uma personagem a confrontar o próprio passado.', 38, 1, 2);
INSERT INTO episodio (titulo, sinopse, duracao, temporada, serie_id) VALUES ('O Retorno', 'Uma antiga lembrança muda a interpretação dos acontecimentos anteriores.', 41, 1, 2);

INSERT INTO resenha_filme (usuario_id, filme_id, resenha, avaliacao) VALUES (1, 1, 'A atmosfera é hipnótica, e a obsessão do protagonista torna a narrativa perturbadora.', 95);
INSERT INTO resenha_filme (usuario_id, filme_id, resenha, avaliacao) VALUES (2, 1, 'Uma obra visualmente impressionante, embora seu ritmo possa afastar alguns espectadores.', 88);
INSERT INTO resenha_filme (usuario_id, filme_id, resenha, avaliacao) VALUES (2, 3, 'Uma reflexão poderosa sobre a fé, a morte e as incertezas da existência.', 97);
INSERT INTO resenha_filme (usuario_id, filme_id, resenha, avaliacao) VALUES (3, 4, 'Um filme delicado, que transforma a memória em matéria de reflexão.', 91);
INSERT INTO resenha_filme (usuario_id, filme_id, resenha, avaliacao) VALUES (1, 5, 'Uma obra incompreendida, talvez adiante de seu tempo; talvez apenas estranha.', 100);

INSERT INTO resenha_serie (usuario_id, serie_id, resenha, avaliacao) VALUES (1, 1, 'Uma premissa interessante, com conflitos que permitem refletir sobre as escolhas humanas.', 85);
INSERT INTO resenha_serie (usuario_id, serie_id, resenha, avaliacao) VALUES (2, 2, 'As histórias são contemplativas e estimulam boas discussões após cada episódio.', 92);
INSERT INTO resenha_serie (usuario_id, serie_id, resenha, avaliacao) VALUES (3, 1, 'Uma série promissora, embora alguns personagens merecessem mais desenvolvimento.', 78);

INSERT INTO filme_ator (id_filme, id_ator) VALUES (1, 2);
INSERT INTO filme_ator (id_filme, id_ator) VALUES (2, 2);
INSERT INTO filme_ator (id_filme, id_ator) VALUES (3, 1);
INSERT INTO filme_ator (id_filme, id_ator) VALUES (4, 1);
INSERT INTO filme_ator (id_filme, id_ator) VALUES (5, 1);
INSERT INTO filme_ator (id_filme, id_ator) VALUES (5, 2);

INSERT INTO serie_ator (id_serie, id_ator) VALUES (1, 1);
INSERT INTO serie_ator (id_serie, id_ator) VALUES (1, 2);
INSERT INTO serie_ator (id_serie, id_ator) VALUES (2, 1);
INSERT INTO serie_ator (id_serie, id_ator) VALUES (2, 2);

/* Cada usuário poderá fazer somente uma resenha em cada filme? */
/* Como fazer para inserir imagens? */
