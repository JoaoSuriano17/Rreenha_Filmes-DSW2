import {Route, Routes} from "react-router-dom"
import Arquivo from "./arquivo";

import "./App.css"
import Home from "./Home";

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
  
  return(
    <>
      <Routes>
          <Route path="/arquivo" element={<Arquivo></Arquivo>}></Route>
          <Route path="/" element={<Home classico={filmes_classicos} arquivos={arquivos}></Home>}></Route>
      </Routes>
    </>
  )
}

export default App;
