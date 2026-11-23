import {Route, Routes, useNavigate} from "react-router-dom"
import Login from "./Login";
import Cadastro from "./Cadastro";
import Home from "./Home";
import Usuario from "./Usuario";
import "./App.css"
import { useEffect, useState } from "react";

function App() {
  let nav = useNavigate();
  const [autenticado, setAutenticado] = useState(localStorage.getItem("token") == null? false : true);
  let token = localStorage;

  async function CadastroUsuario(user) {
    let cadastro = await fetch("http://localhost:3000/usuario", {
      method: "POST",
      /*headers:{
        "Content-type" : "application/json"
      },*/
      //body: JSON.stringify(user)
      body: user
    })

    cadastro = await cadastro.json()
    LoginUsuario({email: user.get("email"), senha: user.get("senha")})
  }

  async function LoginUsuario(user) {
    let login = await fetch("http://localhost:3000/usuario/login", {
      method: "POST",
      headers:{
        "Content-type" : "application/json"
      },
      body: JSON.stringify(user)
    })
    
    login = await login.json()
    localStorage.setItem("token", login.token);
    setAutenticado(true);
    nav("/");
    console.log(token.getItem("token"))
  }

  async function EditarUsuario(user){
    try{
      //fotografia A FAZER
      let edicao = await fetch("http://localhost:3000/usuario/", {
        method: "PUT",
        headers:{
          "Authorization":`Bearer ${token.getItem("token")}`
          //"Content-type" : "application/json"
        },
        //body: JSON.stringify(user)
        body: user
      });
      if(edicao.ok){
        console.log(edicao);
      }else{
        console.log("BIXOU...");
      }
      //LoginUsuario({email: user.get("email"), senha: user.get("senha")})
    }catch(erro){
      console.log(erro);//window.alert?
    }
  }

  async function SelecionaFilmes(params) {
    
  }

  let botoesLoginCadastro
  if(!autenticado){
    botoesLoginCadastro = <><li><a href="/login" className="logo">Login</a></li> <li><a href="/cadastro" className="logo">Cadastro</a></li></>
  }
  
  return(
    <>
      <header>
        <nav className="navbar">
          <a href="/" className="logo">Rreenha Filmes</a>
          {/*Links para navegação*/}
          <ul className="nav-links">
            {botoesLoginCadastro}
            <li><a href="/usuario" className="logo">Avaliações</a></li>
            <li><a href="/usuario" className="logo"><img src="https://png.pngtree.com/png-vector/20190927/ourlarge/pngtree-user-icon-symbol-design-user-icon-isolated-design-png-image_1746919.jpg"/></a></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/cadastro" element={<Cadastro cadastro={CadastroUsuario}/>}></Route>
        <Route path="/login" element={<Login login={LoginUsuario}/>}></Route>
        <Route path="/usuario" element={<Usuario editar={EditarUsuario}/>}></Route>
      </Routes>
    </>
  )
}

export default App;