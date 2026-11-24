import { useState } from "react";

function FormEditarEpisodio(props){

    const [titulo, setTitulo] = useState("")
    const [sinopse, setSinopse] = useState("")
    const [duracao, setDuracao] = useState(0)
    const [temporada, setTemporada] = useState(0)

    function alt(e){
        e.preventDefault()
        props.alt(titulo, sinopse, duracao, temporada, id_episodio)
    }

    let optionsSelect2 = [<option value={0} key={-1}></option>]
    for (let a of props.episodios){
        optionsSelect2.push(<option value={a.id} key={a.id}>{a.titulo}</option>)
    }
    
    return(
        <>
            <form onSubmit={alt}>
                <h3>Adicionar episódios</h3>
                <label>Escolha um episodio:</label><br/>
                <select id="episodio_id" name="episodio_id" value={id_episodio} onChange={(e) => setIdSEpisodio(e.target.value)}>
                    {optionsSelect2}
                </select><br/>

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