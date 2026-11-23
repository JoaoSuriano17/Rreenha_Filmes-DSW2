import { useState } from "react";

function FormAddAtorEmFilme(props){

    const [id_ator, setIdAtor] = useState(0)
    const [id_filme, setidFilme] = useState(0)

    function add(e){
        e.preventDefault()
        props.add(id_filme, id_ator)
    }
     
    let optionsSelect = [<option value={0} key={-1}></option>]
    for (let a of props.filmes){
        optionsSelect.push(<option value={a.id} key={a.id}>{a.titulo}</option>)
    }

    let optionsSelect2 = [<option value={0} key={-1}></option>]
    for (let a of props.atores){
        optionsSelect2.push(<option value={a.id} key={a.id}>{a.nome}</option>)
    }
    
    return(
        <>
            <form onSubmit={add}>
                <h3>Adicionar ator ou atriz num filme</h3>
                {/* Caixa de seleção */}
                <label>Escolha um filme:</label>
                <select id="filme_id" name="filme_id" value={id_filme} onChange={(e) => setidFilme(e.target.value)}>
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

export default FormAddAtorEmFilme;