# 🍅 Rreenha Filmes 🍅

O projeto Rreenha Filmes, que possui um nome exótico e carismático, tem o objetivo de gerenciar as opiniões dos usuários para cada filme e/ou série, essas opiniões são expressas por meio de resenhas com avaliações.

O sistema permite a criação de usuários; e, se o usuário for administrador, permite adicionar, excluir e alterar filmes, atores, diretores, séries, episódios e suas relações intrínsecas.

---

**Segue abaixo um aprofundamento:**

###Usuário 👤

Há três tipos de usuários:

- Usuário comum: acessa as informações de filmes, séries, atores, diretores, episódios; além disso, pode publicar, alterar e excluir suas próprias resenhas.
- Crítico: possui as mesmas funcionalidades de um usuário comum, mas suas resenhas são identificadas como resenhas críticas, permitindo diferenciá-las das resenhas comuns, que como padrão tende a ser mais simples.
- Administrador: possui permissões de gerenciamento de todo o sistema.

###Filmes 🎥

Os filmes apresentam as informações a seguir: título, diretor, sinopse, faixa etária, duração e quantidade de prêmios.
Somente administradores podem cadastrar ou alterar filmes, alterar seus diretores, associar ou remover atores e excluir filmes.

###Atores e diretores 🎭🎬

O sistema mantém informações sobre os atores e diretores, como nome, data de nascimento, biografia, nacionalidade (no caso dos atores) e quantidade de prêmios.
O administrador é responsável pelo cadastro, alteração e exclusão dessas pessoas. Também é possível consultar suas participações e os filmes dirigidos ou nos quais os atores participam.

###Resenhas e avaliações 📝⭐

Os usuários podem publicar uma resenha associada a um filme e uma série (o mesmo não se aplica a episódios), contendo um texto e uma avaliação de 0 a 100.
Cada usuário pode alterar ou excluir apenas suas próprias resenhas. As resenhas são classificadas de acordo com o tipo de usuário.

###Séries e episódios 🎞️📺

As séries são listas de episódios. Cada episódio apresenta as informações a seguir: título, sinopse, duração e temporada. As séries, por sua vez, apresentam: título, diretor, sinopse, faixa etária e quantidade de prêmios.

Cada episódio tem relação com uma série. Somente administradores podem cadastrar, alterar e excluir séries e episódios.
 
---

###Documentação
Todos os endpoints serão apresentados em uma documentação visual após a elaboração definitiva do backend.