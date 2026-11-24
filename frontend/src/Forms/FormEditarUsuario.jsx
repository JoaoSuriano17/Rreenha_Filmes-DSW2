import {Route, Routes, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";

function FormEditarUsuario(props){
  const [arquivo, setArquivo] = useState(null)
  const [nome, setNome] = useState(props.nome)
  const [senha, setSenha] = useState("")
  
  function changeFile(e) {
    if (e.target.files.length > 0) {
        setArquivo(e.target.files[0]);
    }
  }

  function edit(){
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("senha", senha);
    if (arquivo != null) {
        formData.append("arquivo", arquivo);
    }

    props.edit(formData)
}

  return(
    <form onSubmit={(e)=>{e.preventDefault(); edit()}}>{/*;console.log(userEdicao)*/}
      <label>Nome:</label> <br />
      <input type="text" name="nome" value={nome} onChange={(e) => {setNome(e.target.value)}}/><br />
      <label>Senha:</label> <br />
      <input type="text" name="senha" value={senha} onChange={(e)=>{setSenha(e.target.value)}}/><br />
      <label>Fotografia:</label> <br />
      <input className="file-input" type="file" name="foto" accept="image/*" onChange={changeFile}/><br />

      <button>Enviar</button>
    </form>
  )
}

export default FormEditarUsuario;