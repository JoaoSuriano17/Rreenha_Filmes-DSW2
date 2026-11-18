import { useState } from "react";
import {Route, Routes} from "react-router-dom"

function Login(props) {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  
  return(
    <div>
        <h1>Login</h1>
        <form action="">
            <label> E-mail <br /> <input type="text" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/></label> <br />
            <label> Senha <br /> <input type="password" required value={senha} onChange={(e)=>{setSenha(e.target.value)}}/></label><br />
            <button onClick={(e)=>{e.preventDefault(); props.login({email: email, senha: senha})}}>Adicionar</button>
        </form>
    </div>
  )
}

export default Login;