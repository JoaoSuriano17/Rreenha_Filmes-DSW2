import { useState } from "react";

function FormAltSerie(props){

    const [arquivo, setArquivo] = useState(null);
    const [titulo, setTitulo]=useState("")
    const [diretor, setDiretor] = useState(0)
    const [sinopse, setSinopse] = useState("")
    const [faixa_etaria, setFaixa_etaria] = useState(0)
    const [qtde_premios, setQtde_premios] = useState(0)

    const [id_serie, setIdSerie] = useState(0)

    function changeFile(e) {
        if (e.target.files.length > 0) {
            setArquivo(e.target.files[0]);
        }
    }

    function alt(e){
        e.preventDefault()

        const formData = new FormData();

        formData.append("titulo", titulo);
        formData.append("diretor", diretor);
        formData.append("sinopse", sinopse);
        formData.append("faixa_etaria", faixa_etaria);
        formData.append("qtde_premios", qtde_premios);
        formData.append("arquivo", arquivo);

        props.alt(formData, id_serie)
    }
     
    let optionsSelect = [<option value={0} key={-1}></option>]
    for (let a of props.diretores){
        optionsSelect.push(<option value={a.id} key={a.id}>{a.nome}</option>)
    }

    let optionsSelect2 = [<option value={0} key={-1}></option>]
    for (let a of props.series){
        optionsSelect2.push(<option value={a.id} key={a.id}>{a.titulo}</option>)
    }
    
    return(
        <>
            <form onSubmit={alt}>
                <h3>Alterar série</h3>
                <label>Escolha uma série:</label><br/>
                <select id="serie_id" name="serie_id" value={id_serie} onChange={(e) => setIdSerie(e.target.value)}>
                    {optionsSelect2}
                </select><br/>
                <label>Título:</label> <input type="text" placeholder="Título" value={titulo} onChange={(e)=>{setTitulo(e.target.value)}}/><br/>
                {/* Caixa de seleção */}
                <label>Escolha um diretor:</label><br></br>
                <select id="diretor" name="diretor" value={diretor} onChange={(e) => setDiretor(e.target.value)}>
                    {optionsSelect}
                </select><br></br>
                <label>Sinopse:</label> <input type="text"  placeholder="Sinopse" value={sinopse} onChange={(e)=>{setSinopse(e.target.value)}}/><br/>
                <label>Faixa Etária:</label> <input type="number" placeholder="Faixa Etária" value={faixa_etaria} onChange={(e)=>{setFaixa_etaria(e.target.value)}}/><br/>
                <label>Quantidade de prêmios:</label> <input type="number" placeholder="Quantidade de Prêmios" value={qtde_premios} onChange={(e)=>{setQtde_premios(e.target.value)}}/><br/>
                <label>Cartaz:</label> <input className="file-input" type="file" name="foto" accept="image/*" onChange={changeFile}/>

              <button type="submit">Enviar</button>
            </form>
        </>
    )
}

export default FormAltSerie;