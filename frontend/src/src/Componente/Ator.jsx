import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import FormEditarAtor from "../Forms/FormEditarAtor";

function Ator(props){
    const { id } = useParams()
    const [editarAtor, setEditarAtor] = useState(null)

    const ator = props.atores.find(a => a.id == id);
    if (!ator) {
        return <h1>Carregando ...</h1>;
    }

    let formEditAtor
    let botaoDelete;
    let botaoEdit;
    if (localStorage.getItem("usuario")&&JSON.parse(localStorage.getItem("usuario")).administrador) {
        botaoDelete = <button className="btn-azul" onClick={(e) => { e.preventDefault(); props.deletar(id) }}>Deletar ator</button>
        botaoEdit=<button className="btn-azul" onClick={() => setEditarAtor(!editarAtor)}>{editarAtor ? "Cancelar edição" : "Editar ator"}</button>
        if (editarAtor){
            formEditAtor = <FormEditarAtor id={id} edit={props.editarAtor} ator={ator} alterarExibir={()=>{setEditarAtor(!editarAtor)}}/>
        }

    }

    return(
        <>
            <p className="categoria">Ator(a)</p>
            <Link className="link voltar categoria text-dark " to={"/atores"}><BsArrowLeft /> Voltar</Link>
            <div className="grid-filme">
                <h1 className="titulo">{ator.nome}</h1>
                {botaoDelete}

                {botaoEdit}

                {editarAtor ? formEditAtor : <></>}

                <div className="combo">
                    <img src={ator.fotografia != null ? `http://localhost:3000/arquivo/${ator.fotografia}`: "../Imagens/imagemAtor.jpg"} onError={(e) => {e.currentTarget.style.display = 'none';}} alt="Image" className='imagem_catalogo_pessoa' />
                    <h5>Biografia: <br/> <span className="sinopse">{ator.biografia}</span></h5>
                </div>
                <div className="">
                    <hr></hr>
                    <p><b>Nacionalidae:</b> {ator.nacionalidade}</p>
                    <hr></hr>
                    <p><b>Data de nascimento: </b> {new Date(ator.data_nascimento).toLocaleDateString("pt-BR", {timeZone: "UTC"})}</p>
                    <hr></hr>
                    <p><b>Quantidade de prêmios: </b> {ator.qtde_premios} prêmios</p>
                </div>
            </div>
        </>
    )
}

export default Ator;