import {Route, Routes} from "react-router-dom"
import Arquivo from "./arquivo";

import "./App.css"
import Home from "./Home";
import Filme from "./Filme";
import Ator from "./Ator";
import Diretor from "./Diretor";
import CatalogoFilmes from "./CatalogoFilmes";
import CatalogoAtores from "./CatalogoAtores";
import CatalogoDiretores from "./CatalogoDiretores";
import Erro from "./Erro";

function App() {
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
  
  return(
    <>
      <Routes>
        <Route path="/" element={<Home classico={filmes_classicos} arquivos={arquivos} premios={filmes_premiados} atores={atores} titulo={filme_titulo} nomea={ator_nome} nomed={diretor_nome}></Home>}></Route>
        <Route path="/arquivo" element={<Arquivo></Arquivo>}></Route>
        <Route path="/filme/:id" element={<Filme filme={filme} diretor={diretor} titulo={filme_titulo} nomea={ator_nome} nomed={diretor_nome}></Filme>}></Route>
        <Route path="/ator/:id" element={<Ator ator={ator} titulo={filme_titulo} nomea={ator_nome} nomed={diretor_nome}></Ator>}></Route>
        <Route path="/diretor/:id" element={<Diretor diretor={diretor} titulo={filme_titulo} nomea={ator_nome} nomed={diretor_nome}></Diretor>}></Route>
        <Route path="/filmes" element={<CatalogoFilmes catalogo={filmes_classicos} titulo={filme_titulo} nomea={ator_nome} nomed={diretor_nome}></CatalogoFilmes>}></Route>
        <Route path="/atores" element={<CatalogoAtores catalogo={atores} titulo={filme_titulo} nomea={ator_nome} nomed={diretor_nome}></CatalogoAtores>}></Route>
        <Route path="/diretores" element={<CatalogoDiretores catalogo={diretores} titulo={filme_titulo} nomea={ator_nome} nomed={diretor_nome}></CatalogoDiretores>}></Route>

        <Route path="/:sla" element={<Erro titulo={filme_titulo} nomea={ator_nome} nomed={diretor_nome}></Erro>}></Route>
      </Routes>
    </>
  )
}

export default App;
