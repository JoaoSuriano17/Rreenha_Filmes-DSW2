import {Route, Routes, useNavigate} from "react-router-dom"
import Login from "./Login";
import Cadastro from "./Cadastro";

function App() {
  let nav = useNavigate();

  async function CadastroUsuario(user) {
    const cadastro = await fetch("http://localhost:3000/usuario", {
      method: "POST",
      headers:{
        "Content-type" : "application/json"
      },
      body: JSON.stringify(usuarioTentativa)

    })

    LoginUsuario({email: user.email, senha: user.senha})
  }

  async function LoginUsuario(user) {
    console.log("LoginUsuario")
      
    nav("/")
  }
  
  return(
    <>
      <h1>Código</h1>
      <Routes>
        <Route path="/" element={<p>Está no "/"</p>}></Route>
        <Route path="/cadastro" element={<Cadastro cadastro={CadastroUsuario}/>}></Route>
        <Route path="/login" element={<Login login={LoginUsuario}/>}></Route>
      </Routes>
    </>
  )
}

export default App;