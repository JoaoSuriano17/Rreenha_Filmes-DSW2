import { Link, replace, Route, Routes, useNavigate } from "react-router-dom"
import "./App.css"

import Arquivo from "./Arquivo";
import Home from "./Home";
import Filme from "./Componente/Filme";
import Ator from "./Componente/Ator";
import Diretor from "./Componente/Diretor";
import Serie from "./Componente/Serie";
import Usuario from "./Componente/Usuario";
import Erro from "./Erro";
import Cadastro from "./Cadastro";
import Login from "./Login";
import { useState, useEffect } from "react";
import { BsSearch, BsTiktok, BsInstagram, BsYoutube, BsTwitterX, BsDoorClosed } from "react-icons/bs";
import ListaCardsAtores from "./Lista/ListaCardsAtores"
import ListaCardsFilmes from "./Lista/ListaCardsFilmes";
import ListaCardsDiretores from "./Lista/ListaCardsDiretores";
import ListaCardsSeries from "./Lista/ListaCardsSeries";
import ListaEpisodios from "./Lista/ListaEpisodios";
import HomeAdm from "./Administrador/HomeAdm";

function App() {
  const nav = useNavigate()
  const [login, setLogin] = useState(() => {
    const valorSalvo = localStorage.getItem('id');
    return valorSalvo ? JSON.parse(valorSalvo) : '';
  });
  const [conta, setConta] = useState({});

  //Diversos elementos!
  const [filmes, setFilmes] = useState([])
  const [filmesPremiados, setFilmesPremiados] = useState([])
  const [atores, setAtores] = useState([])
  const [series, setSeries] = useState([])
  const [diretores, setDiretores] = useState([])
  const [episodios, setEpisodios] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [atoresFilmes, setAtoresFilmes] = useState([])
  const [atoresSeries, setAtoresSeries] = useState([])
  const [resenhasFilmes, setResenhasFilmes] = useState([])
  const [resenhasSeries, setResenhasSeries] = useState([])

  useEffect(() => {
    SelecionarFilmes();
    SelecionarFilmesPremiados();
    SelecionarAtores();
    SelecionarSeries();
    SelecionarDiretores();
    SelecionarEpisodios();
    SelecionarUsuarios();
    CriarConta();
  }, [])

  useEffect(() => {
    if (filmes.length > 0) {
      SelecionarAtoresFilme();
      SelecionarResenhasFilme();
    }
  }, [filmes])

  useEffect(() => {
    if (series.length > 0) {
      SelecionarAtoresSerie();
      SelecionarResenhasSerie();
    }
  }, [series])


  async function SelecionarFilmes() {
    try {
      const r = await fetch("http://localhost:3000/filme")

      if (!r.ok) {
        return null;
      }

      const r2 = await r.json()
      setFilmes(r2.filmes)

    } catch (erro) {
      console.log("Erro: " + erro)
    }
  }

  async function SelecionarUsuarios() {
    try {
      const r = await fetch("http://localhost:3000/usuario")

      if (!r.ok) {
        return null;
      }

      const r2 = await r.json()
      setUsuarios(r2.usuarios)

    } catch (erro) {
      console.log("Erro: " + erro)
    }
  }

  async function SelecionarFilmesPremiados() {
    try {
      const r = await fetch("http://localhost:3000/filme/premiado")

      if (!r.ok) {
        return null;
      }

      const r2 = await r.json()
      setFilmesPremiados(r2.filmes)

    } catch (erro) {
      console.log("Erro: " + erro)
    }
  }

  async function SelecionarAtores() {
    try {
      const r = await fetch("http://localhost:3000/ator")

      if (!r.ok) {
        return null;
      }

      const r2 = await r.json()
      setAtores(r2.atores)

    } catch (erro) {
      console.log("Erro: " + erro)
    }
  }

  async function SelecionarDiretores() {
    try {
      const r = await fetch("http://localhost:3000/diretor")

      if (!r.ok) {
        return null;
      }

      const r2 = await r.json()
      setDiretores(r2.diretores)

    } catch (erro) {
      console.log("Erro: " + erro)
    }
  }

  async function SelecionarSeries() {
    try {
      const r = await fetch("http://localhost:3000/serie")

      if (!r.ok) {
        return null;
      }

      const r2 = await r.json()
      setSeries(r2.series)

    } catch (erro) {
      console.log("Erro: " + erro)
    }
  }

  async function SelecionarEpisodios() {
    try {
      const r = await fetch("http://localhost:3000/episodio")

      if (!r.ok) {
        return null;
      }

      const r2 = await r.json()
      setEpisodios(r2.episodios)

    } catch (erro) {
      console.log("Erro: " + erro)
    }
  }

  async function SelecionarAtoresFilme() {
    let atores_filmes = []
    for (let a of filmes) {
      const r = await fetch(`http://localhost:3000/filme/${a.id}/atores`)
      if (!r.ok) {
        continue;
      }
      const r2 = await r.json()
      atores_filmes.push({ id_filme: a.id, atores: r2.atores })
    }
    setAtoresFilmes(atores_filmes)
  }

  async function SelecionarAtoresSerie() {
    try {
      let atores_series = []
      for (let a of series) {
        const r = await fetch(`http://localhost:3000/serie/${a.id}/atores`)
        if (!r.ok) {
          continue;
        }
        const r2 = await r.json()
        atores_series.push({ id_serie: a.id, atores: r2.atores })
      }
      setAtoresSeries(atores_series)
    } catch (erro) {
      console.log("Erro: " + erro)
    }
  }

  async function SelecionarResenhasFilme() {
    let resenhas_filmes = [];

    for (let a of filmes) {
        try {
            const r = await fetch(`http://localhost:3000/resenha/filme/${a.id}`);
            if (!r.ok) {
                resenhas_filmes.push({
                    id_filme: a.id,
                    resenhas: []
                });
                continue;
            }

            const r2 = await r.json();
            let resenhas = [];
            if (Array.isArray(r2.resenhas)) {
                resenhas = r2.resenhas;
            } else if (r2.resenhas) {
                resenhas = [r2.resenhas];
            }
            resenhas_filmes.push({
                id_filme: a.id,
                resenhas: resenhas
            });
        } catch (erro) {
            console.log(`Erro ao buscar resenhas do filme ${a.id}:`, erro);
            resenhas_filmes.push({
                id_filme: a.id,
                resenhas: []
            });
        }
    }

    setResenhasFilmes(resenhas_filmes);
  }

  async function SelecionarResenhasSerie() {
    let resenhas_series = [];
    for (let a of series) {
        try {
            const r = await fetch(`http://localhost:3000/resenha/serie/${a.id}`);
            if (!r.ok) {
              resenhas_series.push({
                  id_serie: a.id,
                  resenhas: []
              });
              continue;
            }

            const r2 = await r.json();
            let resenhas = [];
            if (Array.isArray(r2.resenhas)) {
                resenhas = r2.resenhas;
            } else if (r2.resenhas) {
                resenhas = [r2.resenhas];
            }
            resenhas_series.push({
                id_serie: a.id,
                resenhas: resenhas
            });

        } catch (erro) {
            console.log(`Erro ao buscar resenhas do filme ${a.id}:`, erro);
            resenhas_series.push({
                id_serie: a.id,
                resenhas: []
            });
        }
    }

    setResenhasSeries(resenhas_series);
}




  async function CriarConta() {
    const r2 = await fetch(`http://localhost:3000/usuario/${localStorage.getItem("id")}`)

    if (!r2.ok) {
      const json2 = await r2.json()
      alert(`${json2.msg}`)
    }

    const json2 = await r2.json()
    setConta(json2.usuario)
  }

  async function Logar(email, senha) {
    try {
      const r = await fetch(`http://localhost:3000/usuario/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          senha: senha
        })
      });

      if (!r.ok) {
        const json = await r.json();
        alert(`${json.msg}`);
      }

      const json = await r.json();
      setLogin(json.id)
      localStorage.setItem("id", json.id)
      setConta(CriarConta())

      localStorage.setItem("token", json.token)
      let info = { id: json.id, email: email, administrador: json.administrador }
      localStorage.setItem("usuario", JSON.stringify(info));

      alert("Login realizado com sucesso!")
      nav("/")
    } catch (erro) {
      console.log("Erro: " + erro)
    }
  }

  async function Cadastrar(user) {
    try {
      //Refazer ou repensar novamente
      const r = await fetch(`http://localhost:3000/usuario`, { method: "POST", body: user });
      const json = await r.json();
      if (!r.ok) {
        alert(`Erro: ${json.msg}`);
      } else {
        console.log(`${json.msg}!`)
        alert("Usuário cadastrado com sucesso")

        Logar(user.get("email"), user.get("senha"))
      }


    } catch (erro) {
      console.log("Erro: " + erro)
    }
  }

  async function AdicionarResenhaFilme(id_filme, resenha, avaliacao) {
    console.log("AAA")
    const token = localStorage.getItem("token");
    const r = await fetch("http://localhost:3000/resenha/filme", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        filme_id: id_filme,
        resenha: resenha,
        avaliacao: Number(avaliacao)
      })
    });

    if (!r.ok) {
      console.error("Resposta de erro:", r);
      const raw = await r.text();
      let msg = raw;
      try {
        const data = JSON.parse(raw);
        msg = data.msg || raw;
      } catch (_) {}
      window.alert(`Erro: ${msg}`);
      return;
    }

    window.alert("Resenha adicionada com sucesso!");
    await SelecionarResenhasFilme();
}
async function AdicionarResenhaSerie(id_serie, resenha, avaliacao) {
  console.log("AAA")
  const token = localStorage.getItem("token");
  const r = await fetch("http://localhost:3000/resenha/serie", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      serie_id: id_serie,
      resenha: resenha,
      avaliacao: Number(avaliacao)
    })
  });

  if (!r.ok) {
    console.error("Resposta de erro:", r);
    const raw = await r.text();
    let msg = raw;
    try {
      const data = JSON.parse(raw);
      msg = data.msg || raw;
    } catch (_) {}
    window.alert(`Erro: ${msg}`);
    return;
  }

  window.alert("Resenha adicionada com sucesso!");
  await SelecionarResenhasSerie();
  }

  //Busca: 
  async function filme_titulo(titulo) {
    try {
      const r = await fetch("http://localhost:3000/filme/titulo/" + titulo)

      if (!r.ok) {
        return null;
      }

      const r2 = await r.json()

      return r2.filme.id
    } catch (erro) {
      console.log("Erro: " + erro)
    }
  }

  async function ator_nome(nome) {
    try {
      const r = await fetch("http://localhost:3000/ator/nome/" + nome)

      if (!r.ok) {
        return null;
      }

      const r2 = await r.json()

      return r2.ator.id
    } catch (erro) {
      console.log("Erro: " + erro)
    }
  }

  async function diretor_nome(nome) {
    try {
      const r = await fetch("http://localhost:3000/diretor/nome/" + nome)

      if (!r.ok) {
        return null;
      }

      const r2 = await r.json()

      return r2.diretor.id
    } catch (erro) {
      console.log("Erro: " + erro)
    }
  }

  async function serie_titulo(titulo) {
    try {
      const r = await fetch("http://localhost:3000/serie/titulo/" + titulo)

      if (!r.ok) {
        return null;
      }

      const r2 = await r.json()

      return r2.serie.id
    } catch (erro) {
      console.log("Erro: " + erro)
    }
  }




  async function AlterarUsuario(user) {
    try {
      console.log("AAA")
      //fotografia A FAZER
      let edicao = await fetch("http://localhost:3000/usuario/", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
          //"Content-type" : "application/json"
        },
        //body: JSON.stringify(user)
        body: user
      });

      if (!edicao.ok) {
        console.log(edicao + " Não ok.");
      }
      //LoginUsuario({email: user.get("email"), senha: user.get("senha")})
    } catch (erro) {
      console.log("Erro:" + erro);//window.alert?
    }
  }


  async function AltararUsuarioParaAdm(id, adm) {
    try {
      const r = await fetch(`http://localhost:3000/usuario/${id}/administrador`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({
          administrador: adm
        })
      });

      if (!r.ok) {
        const json = await r.json()
        alert(`${json.msg}`)
        return false;
      }

      alert("O usuário agora á administrador")

    } catch (erro) {
      console.log("Erro: " + erro)
    }
  }

  async function CadastrarFilme(form) {
    let res = await fetch(`http://localhost:3000/filme`, { method: "POST", headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }, body: form });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    alert("Filme adicionado com sucesso!!!")
  }

  async function CadastrarSerie(form) {
    let res = await fetch(`http://localhost:3000/serie`, { method: "POST", headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }, body: form });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    alert("Série adicionada com sucesso!!!")
  }

  async function CadastrarAtor(form) {
    let res = await fetch(`http://localhost:3000/ator`, { method: "POST", headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }, body: form });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    alert("Ator adicionado com sucesso!!!")
  }

  async function CadastrarDiretor(form) {
    let res = await fetch(`http://localhost:3000/diretor`, { method: "POST", headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }, body: form });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    alert("Diretor adicionado com sucesso!!!")
  }

  async function CadastrarEpisodios(titulo, sinopse, duracao, temporada, serie_id) {
    let res = await fetch(`http://localhost:3000/episodio`, { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` }, body: JSON.stringify({ titulo: titulo, sinopse: sinopse, duracao: duracao, temporada: temporada, serie_id: serie_id }) });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    alert("Episódio adicionado com sucesso!!!")
  }

  async function CadastrarAtorSerie(id_serie, id_ator) {
    let res = await fetch(`http://localhost:3000/serie/${id_serie}/atores`, { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` }, body: JSON.stringify({ id_ator: id_ator }) });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    alert("Associação entre série e ator adicionada com sucesso!!!")
  }

  async function CadastrarAtorFilme(id_filme, id_ator) {
    let res = await fetch(`http://localhost:3000/filme/${id_filme}/atores`, { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` }, body: JSON.stringify({ id_ator: id_ator }) });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    alert("Associação entre série e ator adicionada com sucesso!!!")
  }

  async function editarSerie(form, id) {
    let res = await fetch(`http://localhost:3000/serie/${id}`, { method: "PUT", headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }, body: form });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    alert("Série alterada com sucesso!!!")
    await SelecionarSeries();
  }

  async function editarEpisodio(titulo, sinopse, duracao, temporada, id) {
    let res = await fetch(`http://localhost:3000/episodio/${id}`, { method: "PUT", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` }, body: JSON.stringify({ titulo: titulo, sinopse: sinopse, duracao: duracao, temporada: temporada }) });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    alert("Série alterada com sucesso!!!")
  }

  async function deletarFilme(id) {
    let res = await fetch(`http://localhost:3000/filme/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (!res.ok) {
      window.alert("Não é permitido deletar filmes com resenhas.");
      //Imagino que seja esse o único erro plausível
      /*
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      */
      return;
    }
    alert("Filme deletado com sucesso!");
  }
  async function deletarSerie(id) {
    let res = await fetch(`http://localhost:3000/serie/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (!res.ok) {
      window.alert("Não é permitido deletar séries com resenhas.");
      //Imagino que seja esse o único erro plausível
      /*
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      */
      return;
    }
    alert("Série deletada com sucesso!");
  }

  async function deletarUsuario() {
    let res = await fetch(`http://localhost:3000/usuario`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!res.ok) {
      window.alert("Erro ao deletar usuário.");
      //Imagino que seja esse o único erro plausível
      /*
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      */
      return;
    }
    alert("Usuário deletado com sucesso!");
  }


  async function deletarEpisodio(id) {
    let res = await fetch(`http://localhost:3000/episodio/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    alert("Série deletada com sucesso!");
  }

  async function editarFilme(user, id) {
    let res = await fetch(`http://localhost:3000/filme/${id}`, {method: "PUT", 
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }, 
      body: user});
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      
      alert("Filme atualizado com sucesso!");
      await SelecionarFilmes();
    }
  }

  async function editarResenhaFilme(resenha, id) {
    let res = await fetch(`http://localhost:3000/resenha/filme/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(resenha)
    });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    alert("Resenha alterada com sucesso com sucesso!");
    await SelecionarResenhasFilme();
  }

  async function editarResenhaSerie(resenha, id) {
    let res = await fetch(`http://localhost:3000/resenha/serie/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(resenha)
    });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    alert("Resenha alterada com sucesso!");
    await SelecionarResenhasSerie();
  }

    
  async function editarAtor(ator, id) {
      try {
        const res = await fetch(`http://localhost:3000/ator/${id}`, {method: "PUT",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: ator});
        const json = await res.json();
        if (!res.ok) {
            alert(`Erro: ${json.msg}`);
            return;
        }

        alert("Ator atualizado com sucesso!");
        await SelecionarAtores();
      } catch (erro) {
          console.log("Erro: " + erro);
      }
  }

  async function editarDiretor(diretor, id) {
      try {
        const res = await fetch(`http://localhost:3000/diretor/${id}`, {method: "PUT",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: diretor});

        const json = await res.json();
        if (!res.ok) {
            alert(`Erro: ${json.msg}`);
            return;
        }

        alert("Diretor atualizado com sucesso!");
        await SelecionarDiretores();
      } catch (erro) {
          console.log("Erro: " + erro);
      }
  }

  async function deletarResenhaFilme(id) {
    let res = await fetch(`http://localhost:3000/resenha/filme/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      
      await SelecionarResenhasFilme();
    }
    alert("Resenha deletada com sucesso!");
  }

  async function deletarResenhaSerie(id) {
    let res = await fetch(`http://localhost:3000/resenha/serie/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      
      await SelecionarResenhasSerie();
    }
    alert("Resenha deletada com sucesso!");
  }





  async function arquivos() {
    try {
      const r = await fetch("http://localhost:3000/arquivo")

      if (!r.ok) {
        return null;
      }

      const r2 = await r.json()

      return r2
    } catch (erro) {
      console.log("Erro: " + erro)
    }
  }




  const [search, setSearch] = useState("")
  async function pesquisar(e) {
    e.preventDefault();

    try {
      const titulo = await filme_titulo(search);
      if (titulo != null) {
        window.location.href = "/filme/" + titulo;
        return;
      }

      const serie = await serie_titulo(search);
      if (serie != null) {
        window.location.href = "/serie/" + serie;
        return;
      }

      const ator = await ator_nome(search);
      if (ator != null) {
        window.location.href = "/ator/" + ator;
        return;
      }

      const diretor = await diretor_nome(search);
      if (diretor != null) {
        window.location.href = "/diretor/" + diretor;
        return;
      }

      alert("Não há nada cadastrado com esse nome");
    } catch (erro) {
      console.log("Erro na pesquisa:", erro);
      alert("Ocorreu um erro ao realizar a pesquisa");
    }
  }





  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-rreenha">
        <div className="container-fluid px-4">

          {/* Marca */}
          <Link to="/" className="navbar-brand marca-rreenha">
            Rreenha<span>Filmes</span>
          </Link>

          {/* Botão mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarConteudo"
            aria-controls="navbarConteudo"
            aria-expanded="false"
            aria-label="Abrir navegação"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarConteudo">

            {/* Pesquisa e usuário */}
            <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 area-usuario">

              <form className="pesquisa-rreenha" role="search" onSubmit={pesquisar}>
                <input
                  type="search"
                  placeholder="Pesquisar filmes..."
                  aria-label="Pesquisar"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <button type="submit" aria-label="Pesquisar">
                  <BsSearch />
                </button>
              </form>

              {conta && conta.nome ? (
                <div className="usuario-nav">

                  <Link to="/user" className="perfil-rreenha">
                    <img
                      src={
                        conta.fotografia != null
                          ? `http://localhost:3000/arquivo/${conta.fotografia}`
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStQJRqcbOxHfZFgfKrU4ppQ_J-z0zpJBV4gaplb4OOXQ&s=10"
                      }
                      onError={(e) => {
                        e.currentTarget.src = "/imagem-padrao.png";
                      }}
                      alt="Foto do usuário"
                    />

                    <span>{conta.nome}</span>
                  </Link>

                  <BsDoorClosed
                    className="deslogar"
                    title="Sair da conta"
                    onClick={() => {
                      const confirmar = window.confirm(
                        "Você tem certeza que deseja deslogar?"
                      );

                      if (confirmar) {
                        setConta(null);
                        setLogin("");
                        localStorage.removeItem("token");
                        localStorage.removeItem("usuario");
                        localStorage.removeItem("id");
                        nav("/");
                      }
                    }}
                  />
                </div>
              ) : (
                <Link to="/login" className="botao-login">
                  Entrar
                </Link>
              )}

            </div>
          </div>
        </div>
      </nav>


      {/*
      <nav className="navbar bg-black fg-2">
        <div className="container-fluid">
          <Link to={"/"} className="link Rreenha">Rreenha Filmes</Link>
          {conta ? (
            <div className="text-white usuario-nav">
              <img src={conta.fotografia != null ? `http://localhost:3000/arquivo/${conta.fotografia}` : 'a'} onError={(e) => { e.currentTarget.style.display = 'none'; }}></img>
              <span><Link to={"/user"} className="link text-white">{conta.nome}</Link></span>
              <BsDoorClosed onClick={() => { const r = window.confirm("Você tem certeza que deseja deslogar?"); if (r) { setConta(null); setLogin(""); localStorage.removeItem("token"); localStorage.removeItem("usuario"); nav("/") } }} className="deslogar" />
            </div>
          ) : (
            <>
              <Link to={"/login"} className="link text-white">Faça login</Link>
            </>
          )}
          <form className="d-flex" role="search" onSubmit={pesquisar}>
            <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
            <button className="search" type="submit"><BsSearch></BsSearch></button>
          </form>
        </div>
      </nav>*/}




      {/* Se logado, algumas rotas não deveriam ser adentradas👌*/}
      <Routes>
        <Route path="/" element={
          <Home filmes={filmes} logado={login} arquivos={arquivos} filmes_premiados={filmesPremiados} atores={atores} series={series}></Home>
        }></Route>

        <Route path="/arquivo" element={
          <Arquivo></Arquivo>}
        ></Route>

        <Route path="/filme/:id" element={
          <Filme filmes={filmes} diretores={diretores} atores={atores} filmes_atores={atoresFilmes} filmes_resenha={resenhasFilmes} 
          deletar={deletarFilme} adicionarResenha={AdicionarResenhaFilme} editarFilme={editarFilme} deletarResenha={deletarResenhaFilme} alterarResenha={editarResenhaFilme}></Filme>
        }></Route>

        <Route path="/serie/:id" element={
          <Serie series={series} diretores={diretores} atores={atores} series_atores={atoresSeries} series_resenha={resenhasSeries} 
          deletar={deletarSerie} adicionarResenha={AdicionarResenhaSerie} deletarResenha={deletarResenhaSerie} alterarResenha={editarResenhaSerie} editarSerie={editarSerie}></Serie>
        }></Route>

        <Route path="/ator/:id" element={
          <Ator atores={atores} 
          editarAtor={editarAtor}></Ator>
        }></Route>

        <Route path="/diretor/:id" element={
          <Diretor diretores={diretores}
          editarDiretor={editarDiretor}></Diretor>
        }></Route>

        <Route path="/filmes" element={
          <ListaCardsFilmes filmes={filmes} pesquisar={filme_titulo}></ListaCardsFilmes>
        }></Route>

        <Route path="/atores" element={
          <ListaCardsAtores atores={atores} pesquisar={ator_nome}></ListaCardsAtores>
        }></Route>

        <Route path="/diretores" element={
          <ListaCardsDiretores diretores={diretores} pesquisar={diretor_nome}></ListaCardsDiretores>
        }></Route>

        <Route path="/series" element={
          <ListaCardsSeries series={series}></ListaCardsSeries>
        }></Route>

        <Route path="/serie/:id/episodios" element={
          <ListaEpisodios series={series} episodios={episodios} deletar={deletarEpisodio}></ListaEpisodios>
        }></Route>

        <Route path="/cadastro" element={
          <Cadastro cadastro={Cadastrar}></Cadastro>
        }></Route>

        <Route path="/login" element={
          <Login login={Logar}></Login>
        }></Route>

        <Route path="/adm" element={
          <HomeAdm usuarios={usuarios} series={series} diretores={diretores} episodios={episodios} filmes={filmes} atores={atores}
            adm={AltararUsuarioParaAdm}
            addFilme={CadastrarFilme} addSerie={CadastrarSerie} addAtor={CadastrarAtor} addDiretor={CadastrarDiretor} addEpisodio={CadastrarEpisodios} addAtorSerie={CadastrarAtorSerie} addAtorFilme={CadastrarAtorFilme}
          ></HomeAdm>
        }></Route>

        <Route path="/user" element={
          <Usuario usuarios={usuarios} filmes_resenha={resenhasFilmes} series_resenha={resenhasSeries}
            edit={AlterarUsuario} deletar={deletarUsuario}></Usuario>
        }></Route>

        <Route path="/:sla" element={<Erro></Erro>}></Route>
      </Routes>


      {/* Footer */}
      <footer className="footer-rreenha">
        <div className="container">
          <div className="row gy-4 footer-conteudo">
            {/* Identidade */}
            <div className="col-lg-5 col-md-6">
              <Link to="/" className="footer-marca">
                Rreenha<span>Filmes</span>
              </Link>
            </div>

            {/* Redes sociais */}
            <div className="col-lg-4 col-md-12">
              <h5>Redes sociais</h5>
              <p className="footer-descricao">Acompanhe nossas atualizações.</p>
              <div className="redes-icones">
                <a href="https://www.youtube.com/@LOUDBrawlStars"
                  target="_blank" rel="noreferrer" aria-label="YouTube">
                  <BsYoutube />
                </a>

                <a href="https://www.tiktok.com/@loud.brawlstars"
                  target="_blank" rel="noreferrer" aria-label="TikTok">
                  <BsTiktok />
                </a>

                <a href="https://www.instagram.com/teamhmble/"
                  target="_blank" rel="noreferrer" aria-label="Instagram">
                  <BsInstagram />
                </a>

                <a href="https://x.com/TeamHmble"
                  target="_blank" rel="noreferrer" aria-label="X">
                  <BsTwitterX />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-final">
            <span>© 2026 Rreenha Filmes. Todos os direitos reservados.</span>
          </div>

        </div>

      </footer>
    </>
  )
}

export default App;