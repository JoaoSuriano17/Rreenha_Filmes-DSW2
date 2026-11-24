import { useState } from "react";
import "./FormEditarFilme.css";

function FormEditarFilme(props) {
    const [arquivo, setArquivo] = useState(null);
    const [titulo, setTitulo] = useState(props.filme.titulo);
    const [diretor, setDiretor] = useState(props.filme.diretor);
    const [sinopse, setSinopse] = useState(props.filme.sinopse);
    const [faixa_etaria, setFaixa_etaria] = useState(props.filme.faixa_etaria);
    const [duracao, setDuracao] = useState(props.filme.duracao);
    const [qtde_premios, setQtde_premios] = useState(props.filme.qtde_premios);

    function changeFile(e) {
        if (e.target.files.length > 0) {
            setArquivo(e.target.files[0]);
        }
    }

    function add(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append("titulo", titulo);
        formData.append("diretor", diretor);
        formData.append("sinopse", sinopse);
        formData.append("faixa_etaria", faixa_etaria);
        formData.append("duracao", duracao);
        formData.append("qtde_premios", qtde_premios);

        if (arquivo) {
            formData.append("arquivo", arquivo);
        }

        props.edit(formData, props.id);
    }

    let optionsSelect = [];

    for (let a of props.diretores) {
        optionsSelect.push(
            <option value={a.id} key={a.id}>{a.nome}</option>
        );
    }

    return (
        <form className="form-editar-filme" onSubmit={add}>
            <h3>Editar filme</h3>

            <div className="campo-editar-filme">
                <label>Título</label>
                <input type="text" required value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
            </div>

            <div className="campo-editar-filme">
                <label>Diretor</label>
                <select value={diretor} onChange={(e) => setDiretor(e.target.value)} required >
                    {optionsSelect}
                </select>
            </div>

            <div className="campo-editar-filme">
                <label>Sinopse</label>
                <input required value={sinopse} onChange={(e) => setSinopse(e.target.value)}/>
            </div>

            <div className="campos-numericos-filme">
                <div className="campo-editar-filme">
                    <label>Faixa etária</label>
                    <input type="number" min="1" max="18" required value={faixa_etaria} onChange={(e) => setFaixa_etaria(e.target.value)}/>
                </div>

                <div className="campo-editar-filme">
                    <label>Duração (minutos)</label>
                    <input type="number" min="1" required value={duracao} onChange={(e) => setDuracao(e.target.value)}/>
                </div>

                <div className="campo-editar-filme">
                    <label>Quantidade de prêmios</label>
                    <input type="number" min="0" required value={qtde_premios} onChange={(e) => setQtde_premios(e.target.value)}/>
                </div>
            </div>

            <div className="campo-editar-filme">
                <label>Novo cartaz</label>
                <input className="arquivo-editar-filme" type="file" accept="image/*" onChange={changeFile}/>
            </div>

            <button type="submit" className="btn-azul"> Salvar alterações</button>
        </form>
    );
}

export default FormEditarFilme;