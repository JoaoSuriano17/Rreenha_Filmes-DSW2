CREATE TABLE IF NOT EXISTS diretor{
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    nacionalidade VARCHAR(70) NOT NULL,
    data_nascimento DATE,
    biografia TEXT,
    qtde_premios INT DEFAULT 0,
    CONSTRAINT nascimento_CK CHECK (data_nascimento BETWEEN '1895-12-28T00:00:00Z' AND '2026-10-19T00:00:00Z'),
    CONSTRAINT premios_CK CHECK (qtde_premios>=0)/*Sem limite superior; não queremos limitar os excepcionais.*/
};

CREATE TABLE IF NOT EXISTS ator{
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    nacionalidade VARCHAR(70),
    data_nascimento DATE,
    biografia TEXT,
    qtde_premios INT DEFAULT 0,
    CONSTRAINT nascimento_CK CHECK (data_nascimento BETWEEN '1895-12-28T00:00:00Z' AND '2026-10-19T00:00:00Z'),
    CONSTRAINT premios_CK CHECK (qtde_premios>=0)/*Idem*/
};

CREATE TABLE IF NOT EXISTS usuario{
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(85) UNIQUE NOT NULL,
    critico BOOLEAN,
    administrador BOOLEAN,
    senha CHAR(60) NOT NULL
    /*Parece não precisar de constraints*/
};

CREATE TABLE IF NOT EXISTS filme{
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
};

CREATE TABLE IF NOT EXISTS serie{
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    diretor INT NOT NULL,
    sinopse TEXT,
    faixa_etaria INT,
    qtde_premios INT DEFAULT 0,
    CONSTRAINT diretor_FK FOREIGN KEY (diretor) REFERENCES diretor(id),
    CONSTRAINT faixa_etaria_CK CHECK (faixa_etaria>=0 AND faixa_etaria<=18),
    CONSTRAINT premios_CK CHECK (qtde_premios>=0)/*Idem*/
};

CREATE TABLE IF NOT EXISTS episodio{
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(85) NOT NULL,
    sinopse TEXT,
    duracao INT,
    temporada INT DEFAULT 1,
    CONSTRAINT duracao_CK CHECK (duracao>0),
    CONSTRAINT temporada_CK CHECK (temporada>=1)
};

CREATE TABLE IF NOT EXISTS resenha_filme{
    id SERIAL PRIMARY KEY,
    usuario_id INT,
    filme_id INT,
    resenha TEXT,
    avaliacao INT,
    CONSTRAINT usuario_FK FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    CONSTRAINT filme_FK FOREIGN KEY (filme_id) REFERENCES filme(id),
    CONSTRAINT avaliacao_CK CHECK (avaliacao>=0 AND avaliacao<=100)
};

CREATE TABLE IF NOT EXISTS resenha_serie{/*Ninguém faz resenhas sobre episódios individuais de séries.*/
    id SERIAL PRIMARY KEY,
    usuario_id INT,
    serie_id INT,
    resenha TEXT,
    avaliacao INT,
    CONSTRAINT usuario_FK FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    CONSTRAINT serie_FK FOREIGN KEY (serie_id) REFERENCES serie(id),
    CONSTRAINT avaliacao_CK CHECK (avaliacao>=0 AND avaliacao<=10)
};

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

INSERT INTO diretor (nome, nacionalidade, data_nascimento, biografia, qtde_premios) VALUES ("Werner Herzog", "Alemão", '1942-09-05T00:00:00Z', "Alemão, ousado, impertinente", 11);
INSERT INTO diretor (nome, nacionalidade, data_nascimento, biografia, qtde_premios) VALUES ("Ingmar Bergman", "Sueco", '1918-07-14T00:00:00Z', "Maior diretor sueco, dirigiu 48 filmes, ganhou três óscares na categoria de Melhor Filme Internacional.", 64);
INSERT INTO diretor (nome, nacionalidade, data_nascimento, biografia, qtde_premios) VALUES ("Klebe (falso)", "Prefere não dizer", '1999-12-30T00:00:00Z', "Raramente vi tamanha capacidade inventiva misturada a tão pouco talento, diriam se não fosse o melhor.", 123);


INSERT INTO ator (nome, nacionalidade, data_nascimento, biografia, qtde_premios) VALUES ("Wagner Moura", "Brasileiro", '1976-07-14T00:00:00Z', "Grande sujeito, baiano.", 2);
INSERT INTO ator (nome, nacionalidade, data_nascimento, biografia, qtde_premios) VALUES ("Klaus Kinski", "Alemão", '1926-07-14T00:00:00Z', "Grande desregulado.", 0);
