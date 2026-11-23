import {Route, Routes, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";

function FormResenha(props){
  const [resenha, setResenha]=useState("");
  const [avaliacao, setAvaliacao]=useState(0);
    return(
        <form onSubmit={(e)=>{e.preventDefault();console.log(props.id+" "+resenha+" "+avaliacao);props.adicionarResenha(props.id, resenha, avaliacao)}}>
            <p>Resenha: </p>
            <input type="text" required value={resenha} onChange={(e)=>{let novo=e.target.value; setResenha(novo)}}/><br />
            <p>Avaliação: </p>
            <input type="number" required value={avaliacao} onChange={(e)=>{let novo=e.target.value; setAvaliacao(novo)}}/><br />
            <button>Enviar</button>
        </form>
    )
}

export default FormResenha;