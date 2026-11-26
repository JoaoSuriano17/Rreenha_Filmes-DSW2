import { useState } from "react";
import FormEditarEpisodio from "../Forms/FormEditarEpisodio";

function Episodio(props) {
    const [editarEp, setEditarEp] = useState(false);
   
    let form 
    let botaoDelete;
    let botaoEdit;
    if(localStorage.getItem("usuario")&&JSON.parse(localStorage.getItem("usuario")).administrador){
        botaoDelete=<button className="btn-azul"onClick={(e)=>{e.preventDefault(); props.deletar(props.episodio.id)}}>Deletar episódio</button>
        botaoEdit=<button className="btn-azul" onClick={() => setEditarEp(!editarEp)}>{editarEp ? "Cancelar" : "Alterar episódio"}</button>
        if (editarEp){
            form = <FormEditarEpisodio episodio={props.episodio} edit={props.edit} alterarExibir={()=>{setEditarEp(!editarEp)}}/>
        }
    }


    return (
        <>
            <div className="ep">
                <div className="card-body">
                    <h5 className="card-title">T{props.episodio.temporada} - {props.episodio.titulo}</h5>
                    <p className="card-text">{props.episodio.duracao} minutos</p>
                    <p className="card-text">{props.episodio.sinopse}</p>
                    {botaoDelete}
                    {botaoEdit} <br />
                    {form}
                </div>
                <hr />
            </div>
        </>
    )
}

export default Episodio;