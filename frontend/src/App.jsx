import {Link, Route, Routes, useNavigate} from "react-router-dom"
import "./App.css"

import Arquivo from "./Arquivo";
import Home from "./Home";
import Filme from "./Filme";
import Ator from "./Ator";
import Diretor from "./Diretor";
import ListaCardsAtores from "./ListaCardsAtores"
import Erro from "./Erro";
import Serie from "./Serie";
import Cadastro from "./Cadastro";
import Login from "./Login";
import { useState, useEffect } from "react";
import { BsSearch, BsTiktok, BsInstagram, BsYoutube, BsTwitterX, BsDoorOpen } from "react-icons/bs";
import ListaCardsFilmes from "./ListaCardsFilmes";
import ListaCardsDiretores from "./ListaCardsDiretores";
import ListaCardsSeries from "./ListaCardsSeries";
import ListaEpisodios from "./ListaEpisodios";
import HomeAdm from "./Administrador/HomeAdm";

function App() {
  const nav = useNavigate()
  const [login, setLogin] = useState(() => {
    const valorSalvo = localStorage.getItem('id');
    return valorSalvo ? JSON.parse(valorSalvo) : '';
  });
  const [conta, setConta]=useState(null)

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

  useEffect(() => {
    SelecionarFilmes();
    SelecionarFilmesPremiados();
    SelecionarAtores();
    SelecionarSeries();
    SelecionarDiretores();
    SelecionarEpisodios();
    SelecionarUsuarios();
  }, [])

  useEffect(() => {
    if (filmes.length > 0) {
        SelecionarAtoresFilme();
    }
  }, [filmes])

  useEffect(() => {
    if (filmes.length > 0) {
        SelecionarAtoresSerie();
    }
  }, [filmes])


  async function SelecionarFilmes () {
    try{
      const r=await fetch("http://localhost:3000/filme")
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()
      setFilmes(r2.filmes)
      
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function SelecionarUsuarios () {
    try{
      const r=await fetch("http://localhost:3000/usuario")
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()
      setUsuarios(r2.usuarios)
      
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function SelecionarFilmesPremiados() {
    try{
      const r=await fetch("http://localhost:3000/filme/premiado")
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()
      setFilmesPremiados(r2.filmes)
      
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function SelecionarAtores() {
    try{
      const r=await fetch("http://localhost:3000/ator")
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()
      setAtores(r2.atores)

    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function SelecionarDiretores() {
    try{
      const r=await fetch("http://localhost:3000/diretor")
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()
      setDiretores(r2.diretores)
      
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function SelecionarSeries() {
    try{
      const r=await fetch("http://localhost:3000/serie")
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()
      setSeries(r2.series)
      
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function SelecionarEpisodios() {
    try{
      const r=await fetch("http://localhost:3000/episodio")
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()
      setEpisodios(r2.episodios)

    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function SelecionarAtoresFilme() {
      let atores_filmes = []
      for (let a of filmes){
          const r=await fetch(`http://localhost:3000/filme/${a.id}/atores`)
          if(!r.ok){
            continue;
          }
          const r2=await r.json()
          atores_filmes.push({id_filme: a.id, atores: r2.atores})
      }
      setAtoresFilmes(atores_filmes)
  }

  async function SelecionarAtoresSerie() {
      let atores_series = []
      for (let a of series){
          const r=await fetch(`http://localhost:3000/serie/${a.id}/atores`)
          if(!r.ok){
            continue;
          }
          const r2=await r.json()
          atores_series.push({id_serie: a.id, atores: r2.atores})
      }
      setAtoresSeries(atores_series)
  }
  





  async function Logar(email, senha){
    try{
      const r = await fetch(`http://localhost:3000/usuario/login`, { 
        method: "POST", 
        headers:{"Content-Type": "application/json"}, 
        body:JSON.stringify({
          email:email,
          senha:senha
        }) 
      });
      
      if (!r.ok) {
        const json = await r.json();
        alert(`${json.msg}`);
      }

      const json = await r.json();
      setLogin(json.id)

      localStorage.setItem("token", json.token)
      let info = {id: json.id, email: email, administrador: json.administrador}
      localStorage.setItem("usuario", JSON.stringify(info));

      alert("Login realizado com sucesso!")
      nav("/")
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function Cadastrar(user){
    try{
      //Refazer ou repensar novamente
      const r = await fetch(`http://localhost:3000/usuario`, { method: "POST", body: user });
      const json = await r.json();
      if (!r.ok) {
        alert(`Erro: ${json.msg}`);
      }else{
        console.log(`${json.msg}!`)
        alert("Usuário cadastrado com sucesso")

        Logar(user.get("email"), user.get("senha"))
      }


    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  
  //Busca: 
  async function filme_titulo(titulo){
    try{
      const r=await fetch("http://localhost:3000/filme/titulo/"+titulo)
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2.filme.id
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }
  
  async function ator_nome(nome){
    try{
      const r=await fetch("http://localhost:3000/ator/nome/"+nome)

      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2.ator.id
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }
  
  async function diretor_nome(nome){
    try{
      const r=await fetch("http://localhost:3000/diretor/nome/"+nome)
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2.diretor.id
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function serie_titulo(titulo){
    try{
      const r=await fetch("http://localhost:3000/serie/titulo/"+titulo)
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2.serie.id
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }








  async function arquivos() {
    try{
      const r=await fetch("http://localhost:3000/arquivo")
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  
  

  const [search, setSearch]=useState("")
  async function pesquisar(e) {
    e.preventDefault();

    try {
        const titulo = await filme_titulo(search);
        if (titulo != null) {
            window.location.href = "/filme/"+titulo;
            return;
        }

        const serie = await serie_titulo(search);
        if (serie != null) {
            window.location.href = "/serie/"+serie;
            return;
        }

        const ator = await ator_nome(search);
        if (ator != null) {
            window.location.href = "/ator/"+ator;
            return;
        }

        const diretor = await diretor_nome(search);
        if (diretor != null) {
            window.location.href = "/diretor/"+diretor;
            return;
        }

        alert("Não há nada cadastrado com esse nome");
    } catch (erro) {
        console.log("Erro na pesquisa:", erro);
        alert("Ocorreu um erro ao realizar a pesquisa");
    }
  }
  




  return(
    <>
      <nav className="navbar bg-black fg-2">
          <div className="container-fluid">
          <Link to={"/"} className="link Rreenha">Rreenha Filmes</Link>
          {conta?(
            <div className="usuario-nav">
              <img src={conta.fotografia != null ? `http://localhost:3000/arquivo/${conta.fotografia}`: 'a'} onError={(e) => {e.currentTarget.style.display = 'none';}}></img>
              <span>{conta.nome}</span>
              <BsDoorOpen onClick={() => {const r = window.confirm("Você tem certeza que deseja deslogar?"); if (r) { setConta(null); setLogin(""); localStorage.removeItem("token"); localStorage.removeItem("id"); nav("/")}}} className="deslogar"/>            
            </div>
          ):(
            <>
              <Link to={"/login"} className="link text-white">Faça login</Link>
            </>
          )}
          <form className="d-flex" role="search" onSubmit={pesquisar}>
              <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
              <button className="search" type="submit"><BsSearch></BsSearch></button>
          </form>
          </div>
      </nav>




      {/* Se logado, algumas rotas não deveriam ser adentradas👌*/}

      <Routes>
        {/*  👌  */} <Route path="/" element={<Home filmes={filmes} logado={login} arquivos={arquivos} filmes_premiados={filmesPremiados} atores={atores} series={series}></Home>}></Route>
        {/*  👌  */} <Route path="/arquivo" element={<Arquivo></Arquivo>}></Route>
        {/*  👌  */} <Route path="/filme/:id" element={<Filme filmes={filmes} diretores={diretores} atores={atores} filmes_atores={atoresFilmes}></Filme>}></Route> 
        {/*  👌  */} <Route path="/serie/:id" element={<Serie series={series} diretores={diretores} atores={atores} series_atores={atoresSeries}></Serie>}></Route>
        {/*  👌  */} <Route path="/ator/:id" element={<Ator atores={atores}></Ator>}></Route>
        {/*  👌  */} <Route path="/diretor/:id" element={<Diretor diretores={diretores}></Diretor>}></Route>
        {/*  👌  */} <Route path="/filmes" element={<ListaCardsFilmes filmes={filmes} pesquisar={filme_titulo}></ListaCardsFilmes>}></Route>
        {/*  👌  */} <Route path="/atores" element={<ListaCardsAtores atores={atores} pesquisar={ator_nome}></ListaCardsAtores>}></Route>
        {/*  👌  */} <Route path="/diretores" element={<ListaCardsDiretores diretores={diretores} pesquisar={diretor_nome}></ListaCardsDiretores>}></Route>
        {/*  👌  */} <Route path="/series" element={<ListaCardsSeries series={series}></ListaCardsSeries>}></Route>
        {/*  👌  */} <Route path="/serie/:id/episodios" element={<ListaEpisodios series={series} episodios={episodios}></ListaEpisodios>}></Route>
        {/*  👌  */} <Route path="/cadastro" element={<Cadastro cadastro={Cadastrar}></Cadastro>}></Route> 
        {/*  👌  */} <Route path="/login" element={<Login login={Logar}></Login>}></Route> 
        <Route path="/adm" element={<HomeAdm usuarios={usuarios}></HomeAdm>}></Route>

        <Route path="/:sla" element={<Erro></Erro>}></Route>
      </Routes>
      



      <footer>
          <div className='redes-footer'>
              <span>Nos siga nas nossas redes sociais</span>
              <div className='redes-icones'>
                  <a href='https://www.youtube.com/@LOUDBrawlStars'><BsYoutube></BsYoutube></a>
                  <a href='https://www.tiktok.com/@loud.brawlstars'><BsTiktok></BsTiktok></a>
                  <a href='https://www.instagram.com/teamhmble/'><BsInstagram></BsInstagram></a>
                  <a href='https://x.com/TeamHmble'><BsTwitterX></BsTwitterX></a>
              </div>
          </div>

          <span className='cop'>©2026. Rreenha_Filmes. Todos os direitos reservados.</span>
      </footer>
    </>
  )
}

export default App;