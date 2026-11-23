import {Route, Routes, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import FormEditarUsuario from "./FormEditarUsuario";

function Usuario(props){
  const [editar, setEditar]=useState(false);
  let formEditar;
  if(editar){
    formEditar=<FormEditarUsuario editar={props.editar}/>    
  }
  return(
    <>
      <h1>Usuário</h1>
      <p>Agora é só fazer, né; Pedro</p>
      <button onClick={()=>{setEditar(!editar)}}>{(editar?"Deixar de editar":"Editar")}</button>
      {formEditar}
    </>
  )
}

export default Usuario;