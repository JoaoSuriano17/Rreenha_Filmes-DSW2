import { useState } from "react";

function FormEditarSerie(props){

    const [arquivo, setArquivo] = useState(null);
    const [titulo, setTitulo]=useState(props.serie.titulo)
    const [diretor, setDiretor] = useState(props.serie.diretor)
    const [sinopse, setSinopse] = useState(props.serie.sinopse)
    const [faixa_etaria, setFaixa_etaria] = useState(props.serie.faixa_etaria)
    const [qtde_premios, setQtde_premios] = useState(props.serie.qtde_premios)

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
        if (arquivo){
            formData.append("arquivo", arquivo);
        }

        props.edit(formData, props.id)
        props.alterarExibir();
    }
     
    let optionsSelect = [<option value={0} key={-1}></option>]
    for (let a of props.diretores){
        optionsSelect.push(<option value={a.id} key={a.id}>{a.nome}</option>)
    }

    return(
        <>
            <form onSubmit={alt}>
                <h3>Alterar série</h3>
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

export default FormEditarSerie;