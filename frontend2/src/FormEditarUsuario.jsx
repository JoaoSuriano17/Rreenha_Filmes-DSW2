import {Route, Routes, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";

function FormEditarUsuario(props){
  const [userEdicao, setUserEdicao]=useState(
    {
      nome:"",
      senha:""
    }
  );
  
  function atualizar(e){
    let novo = { ...userEdicao, [e.target.name]: e.target.value };
    setUserEdicao(novo);
  }
  return(
    <form onSubmit={(e)=>{e.preventDefault();console.log(userEdicao);props.editar(userEdicao)}}>
      <p>Nome:</p>
      <input type="text" name="nome" value={userEdicao.nome} onChange={atualizar}/><br />
      <p>Senha:</p>
      <input type="text" name="senha" value={userEdicao.senha} onChange={atualizar}/><br />
      <button>Enviar</button>
    </form>
  )
}

export default FormEditarUsuario;