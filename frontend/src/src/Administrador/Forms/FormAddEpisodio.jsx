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
     
    let optionsSelect = [<option value={0} key={-1}></option>]
    for (let a of props.series){
        optionsSelect.push(<option value={a.id} key={a.id}>{a.titulo}</option>)
    }
    
    return(
        <>
            <form onSubmit={add}>
                <h3>Adicionar episódios</h3>

                {/* Caixa de seleção */}
                <label>Escolha uma série:</label><br/>
                <select id="serie_id" name="serie_id" value={serie_id} onChange={(e) => setSerie_id(e.target.value)}>
                    {optionsSelect}
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

export default FormAddEpisodios;