import { useState } from "react";
import {Route, Routes} from "react-router-dom"

function Cadastro(props) {
  const [email, setEmail] = useState("")
  const [nome, setNome] = useState("")
  const [senha, setSenha] = useState("")
  const [critico, setCritico] = useState(false)

  // Usado para guardar o arquivo a ser enviado.
  const [arquivo, setArquivo] = useState(null);
  
  function resetForm() {
    formData.append("nome", "");
    formData.append("email", "");
    formData.append("senha", "");
    formData.append("critico", false);
    formData.append("arquivo", null);
  }

  return(
    <div>
        <h1>Cadastro</h1>
        <form action="">
            <label> Nome <br /> <input type="text" value={nome} onChange={(e)=>{setNome(e.target.value)}}/></label> <br />
            <label> E-mail <br /> <input type="text" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/></label> <br />
            <label> Senha <br /> <input type="password" required value={senha} onChange={(e)=>{setSenha(e.target.value)}}/></label><br />
            <label><input type="checkbox" checked={critico} onChange={(e)=>{setCritico(e.target.checked)}}/> Crítico</label> <br /> <br />
            <input type="file" accept="image/*" onChange={(e) => setArquivo(e.target.files[0])}/> <br /><br />
            <button onClick={(e)=>{
                e.preventDefault();
                const formData = new FormData();
                formData.append("nome", nome);
                formData.append("email", email);
                formData.append("senha", senha);
                formData.append("critico", critico);
                if (arquivo){
                  formData.append("arquivo", arquivo);
                }
                props.cadastro(formData)
            }}>Enviar</button>

            <button onClick={(e)=> {resetForm()}}>Resetar</button>
        </form>
    </div>
  )
}

export default Cadastro;