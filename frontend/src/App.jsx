import {Link, Route, Routes} from "react-router-dom"
import Arquivo from "./Arquivo";

import "./App.css"
import Home from "./Home";
import Filme from "./Filme";
import Ator from "./Ator";
import Diretor from "./Diretor";
import CatalogoFilmes from "./CatalogoFilmes";
import CatalogoAtores from "./CatalogoAtores";
import CatalogoDiretores from "./CatalogoDiretores";
import Erro from "./Erro";
import Serie from "./Serie";
import Episodios from "./Episodios";
import CatalogoSeries from "./CatalogoSeries";
import Cadastro from "./Cadastro";
import { useState, useEffect } from "react";
import Login from "./Login";
import { BsSearch, BsTiktok, BsInstagram, BsYoutube, BsTwitterX, BsDoorOpen } from "react-icons/bs";

function App() {

  const [login, setLogin] = useState(() => {
    const valorSalvo = localStorage.getItem('id');
    return valorSalvo ? JSON.parse(valorSalvo) : '';
  });

  const [conta, setConta]=useState(null)

  useEffect(() => {
    localStorage.setItem('id', JSON.stringify(login));

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

    usuario()
  }, [login]);



  async function filmes_classicos() {
    try{
      const r=await fetch("http://localhost:3000/filme")
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function filmes_premiados() {
    try{
      const r=await fetch("http://localhost:3000/filme/premiado")
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function atores() {
    try{
      const r=await fetch("http://localhost:3000/ator")
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function diretores() {
    try{
      const r=await fetch("http://localhost:3000/diretor")
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function series() {
    try{
      const r=await fetch("http://localhost:3000/serie")
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function episodios(id) {
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

  async function diretor(id) {
    try{
      const r=await fetch("http://localhost:3000/diretor/"+id)
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2
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

  async function series() {
    try{
      const r=await fetch("http://localhost:3000/serie")
      
      if(!r.ok){
        return null;
      }
      
      const r2=await r.json()

      return r2
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function cadastrar(nome, email, senha, fotografia){
    try{
      const formData=new FormData()

      formData.append("nome", nome)
      formData.append("email", email)
      formData.append("senha", senha)
      formData.append("arquivo", fotografia)

      const r = await fetch(`http://localhost:3000/usuario`, { method: "POST", body: formData });

      if (!r.ok) {
        const json = await r.json();
        alert(`Erro: ${json.msg}`);
        return;
      }

      return true

    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function logando(email, senha){
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
        return;
      }

      const json = await r.json();
      setLogin(json.id)
      return true;

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
              <img src={`localhost:3000/arquivo/${conta.fotografia}`} onError={(e) => {e.currentTarget.style.display = 'none';}}></img>
              <span>{conta.nome}</span>
              <BsDoorOpen onClick={()=>{const r=window.confirm("Você tem certeza que deseja deslogar?"); if(r){setConta(null); setLogin("")}}} className="deslogar"></BsDoorOpen>
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

      <Routes>
        <Route path="/" element={<Home classico={filmes_classicos} logado={login} arquivos={arquivos} premios={filmes_premiados} atores={atores} series={series}></Home>}></Route>
        <Route path="/arquivo" element={<Arquivo></Arquivo>}></Route>
        <Route path="/filme/:id" element={<Filme filme={filme} diretor={diretor}></Filme>}></Route>
        <Route path="/ator/:id" element={<Ator ator={ator}></Ator>}></Route>
        <Route path="/diretor/:id" element={<Diretor diretor={diretor}></Diretor>}></Route>
        <Route path="/filmes" element={<CatalogoFilmes catalogo={filmes_classicos}></CatalogoFilmes>}></Route>
        <Route path="/atores" element={<CatalogoAtores catalogo={atores}></CatalogoAtores>}></Route>
        <Route path="/diretores" element={<CatalogoDiretores catalogo={diretores}></CatalogoDiretores>}></Route>
        <Route path="/serie/:id" element={<Serie serie={serie} diretor={diretor}></Serie>}></Route>
        <Route path="/serie/:id/episodios" element={<Episodios episodios={episodios} serie={serie}></Episodios>}></Route>
        <Route path="/series" element={<CatalogoSeries catalogo={series}></CatalogoSeries>}></Route>
        <Route path="/cadastro" element={<Cadastro cadastrar={cadastrar} login={logando}></Cadastro>}></Route>
        <Route path="/login" element={<Login login={logando}></Login>}></Route>

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