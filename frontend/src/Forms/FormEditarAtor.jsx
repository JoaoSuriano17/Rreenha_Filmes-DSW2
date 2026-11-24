import { useState } from "react";

function FormEditarAtor(props){

    const [arquivo, setArquivo] = useState(null);
    const [biografia, setBiografia] = useState(props.ator.biografia)
    const [qtde_premios, setQtde_premios] = useState(props.ator.qtde_premios)

    function changeFile(e) {
        if (e.target.files.length > 0) {
            setArquivo(e.target.files[0]);
        }
    }

    function add(e){
        e.preventDefault()

        const formData = new FormData();

        formData.append("biografia", biografia);
        formData.append("qtde_premios", qtde_premios);
        
        if (arquivo != null) {
            formData.append("arquivo", arquivo);
        }


        props.edit(formData, props.id)
    }
    
    
    return(
        <>
            <form onSubmit={add}>
                <h3>Alterar Ator ou Atriz</h3>
                <label>Biografia:</label> <input type="text" placeholder="Biografia" value={biografia} onChange={(e)=>{setBiografia(e.target.value)}}/>
                <label>Quantidade de prêmios:</label> <input type="number" placeholder="Quantidade de Prêmios" value={qtde_premios} onChange={(e)=>{setQtde_premios(e.target.value)}}/>
                <label>Fotografia:</label> <input className="file-input" type="file" name="foto" accept="image/*" onChange={changeFile}/><br />

              <button type="submit">Enviar</button>
            </form>
        </>
    )
}

export default FormEditarAtor;