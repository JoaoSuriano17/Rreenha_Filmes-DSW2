import { useState } from "react";

function FormAddAtorEmSerie(props){

    const [id_ator, setIdAtor] = useState(0)
    const [id_serie, setIdSerie] = useState(0)

    function add(e){
        e.preventDefault()
        props.add(id_serie, id_ator)
    }
     
    let optionsSelect = [<option value={0} key={-1}></option>]
    for (let a of props.series){
        optionsSelect.push(<option value={a.id} key={a.id}>{a.titulo}</option>)
    }

    let optionsSelect2 = [<option value={0} key={-1}></option>]
    for (let a of props.atores){
        optionsSelect2.push(<option value={a.id} key={a.id}>{a.nome}</option>)
    }
    
    return(
        <>
            <form onSubmit={add}>
                <h3>Adicionar ator ou atriz numa série</h3>
                {/* Caixa de seleção */}
                <label>Escolha uma série:</label>
                <select id="serie_id" name="serie_id" value={id_serie} onChange={(e) => setIdSerie(e.target.value)}>
                    {optionsSelect}
                </select>

                <label>Escolha um ator ou uma atriz:</label>
                <select id="ator_id" name="ator_id" value={id_ator} onChange={(e) => setIdAtor(e.target.value)}>
                    {optionsSelect2}
                </select><br></br>

              <button type="submit">Enviar</button>
            </form>
        </>
    )
}

export default FormAddAtorEmSerie;