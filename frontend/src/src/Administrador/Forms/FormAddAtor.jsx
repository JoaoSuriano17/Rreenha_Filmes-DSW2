import { useState } from "react";

function FormAddFilme(props){

    const [arquivo, setArquivo] = useState(null);
    const [nome, setNome] = useState("")
    const [nacionalidade, setNacionalidade] = useState("")
    const [data_nasc, setData_nasc] = useState("")
    const [biografia, setBiografia] = useState("")
    const [qtde_premios, setQtde_premios] = useState(0)

    function changeFile(e) {
        if (e.target.files.length > 0) {
            setArquivo(e.target.files[0]);
        }
    }

    function add(e){
        e.preventDefault()

        const formData = new FormData();

        formData.append("nome", nome);
        formData.append("nacionalidade", nacionalidade);
        formData.append("data_nascimento", data_nasc);
        formData.append("biografia", biografia);
        formData.append("qtde_premios", qtde_premios);
        
        if (arquivo != null) {
            formData.append("arquivo", arquivo);
        }


        props.add(formData)
    }
    
    
    return(
        <>
            <form onSubmit={add}>
                <h3>Adicionar Ator ou Atriz</h3>
                <label>Nome:</label> <input type="text" placeholder="Nome" value={nome} onChange={(e)=>{setNome(e.target.value)}}/>
                <label>Nacionalidade:</label> <input type="text" placeholder="Nacionalidade" value={nacionalidade} onChange={(e)=>{setNacionalidade(e.target.value)}}/>
                <label>Data de Nascimento:</label> <input type="date" placeholder="Data de Nascimento" value={data_nasc} onChange={(e)=>{setData_nasc(e.target.value)}}/>
                <label>Biografia:</label> <input type="text" placeholder="Biografia" value={biografia} onChange={(e)=>{setBiografia(e.target.value)}}/>
                <label>Quantidade de prêmios:</label> <input type="number" placeholder="Quantidade de Prêmios" value={qtde_premios} onChange={(e)=>{setQtde_premios(e.target.value)}}/>
                <label>Fotografia:</label> <input className="file-input" type="file" name="foto" accept="image/*" onChange={changeFile}/><br />

              <button type="submit">Enviar</button>
            </form>
        </>
    )
}

export default FormAddFilme;