import {Route, Routes} from "react-router-dom"
import Arquivo from "./arquivo";

import "./App.css"
import Home from "./Home";
import Filme from "./Filme";

function App() {

  async function filmes_classicos() {
    try{
      const r=await fetch("http://localhost:3000/filme")
      const r2=await r.json()

      return r2
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function arquivos() {
    try{
      const r=await fetch("http://localhost:3000/arquivo")
      const r2=await r.json()

      return r2
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function filme(id) {
    try{
      const r=await fetch("http://localhost:3000/filme/"+id)
      const r2=await r.json()

      return r2
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }

  async function diretor(id) {
    try{
      const r=await fetch("http://localhost:3000/diretor/"+id)
      const r2=await r.json()

      return r2
    }catch(erro){
      console.log("Erro: "+erro)
    }
  }
  
  return(
    <>
      <Routes>
        <Route path="/" element={<Home classico={filmes_classicos} arquivos={arquivos}></Home>}></Route>
        <Route path="/arquivo" element={<Arquivo></Arquivo>}></Route>
        <Route path="/filme/:id" element={<Filme filme={filme} diretor={diretor}></Filme>}></Route>
      </Routes>
    </>
  )
}

export default App;
