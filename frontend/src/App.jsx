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

function App() {
  const nav = useNavigate()
  const [login, setLogin] = useState(() => {
    const valorSalvo = localStorage.getItem('id');
    return valorSalvo ? JSON.parse(valorSalvo) : '';
  });
  
  //let token = localStorage.setItem("token", null);
  const [conta, setConta]=useState(null)

  //Diversos elementos!
  const [filmes, setFilmes] = useState([])
  const [filmesPremiados, setFilmesPremiados] = useState([])
  const [atores, setAtores] = useState([])
  const [series, setSeries] = useState([])
  const [diretores, setDiretores] = useState([])
  const [episodios, setEpisodios] = useState([])

  /*useEffect(() => {
    localStorage.setItem('id', JSON.stringify(login));
    SelecionarFilmes();
    SelecionarFilmesPremiados();
    SelecionarAtores();
    SelecionarSeries();
    async function usuario(){
      try{
        const r=await fetch("http://localhost:3000/usuario/"+login)
        if(!r.ok){
          return null;
        }
        
        const r2=await r.json()
        setConta(r2.usuario)

        return r2
      }catch(erro){
        console.log("Erro: "+erro)
      }
    }

    usuario();
  }, [login]);*/

  useEffect(() => {
    SelecionarFilmes();
    SelecionarFilmesPremiados();
    SelecionarAtores();
    SelecionarSeries();
    SelecionarDiretores();
    SelecionarEpisodios();
  }, [])

  //Funções que possuem relação com usuário:
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

  //Funções relacionadas a filmes:
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

  async function filme(id) {
    try{
      const r=await fetch("http://localhost:3000/filme/"+id)
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  //Funções relacionadas a atores:
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

  async function ator(id) {
    try{
      const r=await fetch("http://localhost:3000/ator/"+id)
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  //Funções relacionadas a diretores: 
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

  async function diretor(id) {
    try{
      const r=await fetch("http://localhost:3000/diretor/"+id)
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()
      return r2.diretor
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  //Funções relacionadas a séries: 
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

  async function serie(id) {
    try{
      const r=await fetch("http://localhost:3000/serie/"+id)
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function SelecionarEpisodios(id) {
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

  async function episodios1(id) {
    try{
      const r=await fetch("http://localhost:3000/episodio/serie/"+id)
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  /*sync function episodios(id) {
    try{
      const r=await fetch("http://localhost:3000/episodio/serie/"+id)
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }*/

  //Função arquivo
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
        <Route path="/arquivo" element={<Arquivo></Arquivo>}></Route>
        {/*  👌  */} <Route path="/filme/:id" element={<Filme filmes={filmes} diretores={diretores}></Filme>}></Route> 
        {/*  👌  */} <Route path="/ator/:id" element={<Ator atores={atores}></Ator>}></Route>
        {/*  👌  */} <Route path="/diretor/:id" element={<Diretor diretores={diretores}></Diretor>}></Route>
        {/*  👌  */} <Route path="/filmes" element={<ListaCardsFilmes filmes={filmes} pesquisar={filme_titulo}></ListaCardsFilmes>}></Route>
        {/*  👌  */} <Route path="/atores" element={<ListaCardsAtores atores={atores} pesquisar={ator_nome}></ListaCardsAtores>}></Route>
        {/*  👌  */} <Route path="/diretores" element={<ListaCardsDiretores diretores={diretores} pesquisar={diretor_nome}></ListaCardsDiretores>}></Route>
        {/*  👌  */} <Route path="/series" element={<ListaCardsSeries series={series}></ListaCardsSeries>}></Route>
        {/*  👌  */} <Route path="/serie/:id" element={<Serie series={series} diretores={diretores}></Serie>}></Route>
        <Route path="/serie/:id/episodios" element={<ListaEpisodios series={series} episodios={episodios}></ListaEpisodios>}></Route>
        {/*  👌  */} <Route path="/cadastro" element={<Cadastro cadastro={Cadastrar}></Cadastro>}></Route> 
        {/*  👌  */} <Route path="/login" element={<Login login={Logar}></Login>}></Route> 

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