import { useState } from "react";

function FormAddEpisodios(props){

    const [titulo, setTitulo] = useState("")
    const [sinopse, setSinopse] = useState("")
    const [duracao, setDuracao] = useState(0)
    const [temporada, setTemporada] = useState(0)
    const [serie_id, setSerie_id] = useState(0)

    function add(e){
        e.preventDefault()
        props.add(titulo, sinopse, duracao, temporada, serie_id)
    }
    
    
    return(
        <>
            <form onSubmit={add}>
                <h3>Adicionar episódios</h3>
                <label>Título:</label> <input type="text" placeholder="Título" value={titulo} onChange={(e)=>{setTitulo(e.target.value)}}/><br/>
                <label>Sinopse:</label> <input type="text"  placeholder="Sinopse" value={sinopse} onChange={(e)=>{setSinopse(e.target.value)}}/><br/>
                <label>Duração:</label> <input type="number" placeholder="Duração" value={duracao} onChange={(e)=>{setDuracao(e.target.value)}}/><br/>
                <label>Temporada:</label> <input type="number" placeholder="Temporada" value={temporada} onChange={(e)=>{setTemporada(e.target.value)}}/><br/>
                <label>Id da Série:</label> <input type="number" placeholder="Id da Série" value={serie_id} onChange={(e)=>{setSerie_id(e.target.value)}}/><br/>


              <button type="submit">Enviar</button>
            </form>
        </>
    )
}

export default FormAddEpisodios;