import { useState } from "react";
import "./FormEditarEpisodio.css"

function FormEditarEpisodio(props){

    const [titulo, setTitulo] = useState(props.episodio.titulo)
    const [sinopse, setSinopse] = useState(props.episodio.sinopse)
    const [duracao, setDuracao] = useState(props.episodio.duracao)
    const [temporada, setTemporada] = useState(props.episodio.temporada)

    function alt(e){
        e.preventDefault()

        props.edit({titulo: titulo, sinopse: sinopse, duracao: duracao, temporada: temporada}, props.episodio.id)
        props.alterarExibir();
    }
    
    return(
        <>
            <form className="formEditarEpisodio" onSubmit={alt}>
                <label>Título:</label> <input type="text" placeholder="Título" value={titulo} onChange={(e)=>{setTitulo(e.target.value)}}/><br/>
                <label>Sinopse:</label> <input type="text"  placeholder="Sinopse" value={sinopse} onChange={(e)=>{setSinopse(e.target.value)}}/><br/>
                <label>Duração:</label> <input type="number" placeholder="Duração" value={duracao} onChange={(e)=>{setDuracao(e.target.value)}}/><br/>
                <label>Temporada:</label> <input type="number" placeholder="Temporada" value={temporada} onChange={(e)=>{setTemporada(e.target.value)}}/><br/>

              <button type="submit">Enviar</button>
            </form>
        </>
    )
}

export default FormEditarEpisodio;