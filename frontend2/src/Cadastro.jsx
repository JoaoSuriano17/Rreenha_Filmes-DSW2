import { useState } from "react";
import {Route, Routes} from "react-router-dom"

function Cadastro(props) {
  const [email, setEmail] = useState("")
  const [nome, setNome] = useState("")
  const [senha, setSenha] = useState("")
  const [critico, setCritico] = useState("")

  // Usado para guardar o arquivo a ser enviado.
  const [arquivo, setArquivo] = useState(null);
  const [inp, setInput] = useState("");
  
  function resetForm(e) {
    if (e) {
      e.preventDefault();
    }
    setInput("");
    setArquivo(null);
  }

  async function cadastrar(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("arquivo", arquivo);

    let res = await fetch(`${url}`, { method: "POST", body: formData });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    alert("Cadastrado com sucesso!");
    resetForm();
    carregarDados();
  }

  function changeFile(e) {
    if (e.target.files.length > 0) {
      // Guarda os dados do arquivo.
      setArquivo(e.target.files[0]);
      // Guarda o nome do arquivo.
      setInput(e.target.files[0].name);
    }
  }  
  return(
    <div>
        <h1>Cadastro</h1>
        <form action="">
            <label> Nome <br /> <input type="text" value={nome} onChange={(e)=>{setNome(e.target.value)}}/></label> <br />
            <label> E-mail <br /> <input type="text" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/></label> <br />
            <label> Senha <br /> <input type="password" required value={senha} onChange={(e)=>{setSenha(e.target.value)}}/></label><br />
            <label><input type="checkbox" required value={critico} onChange={(e)=>{setSenha(e.target.value)}}/> Crítico</label> <br /> <br />
            <label><input type="file" accept="image/*" required value={arquivo} onChange={(e)=>{setSenha(e.target.value)}}/> Foto perfil</label> <br /> <br />
            <button onClick={(e)=>{
                e.preventDefault()
                const formData = new FormData()
                formData.append("arquivo", arquivo)
                props.cadastro({nome: nome, email: email, senha: senha, critico: critico?critico:false})}}>Adicionar</button>
        </form>
    </div>
  )
}

export default Cadastro;