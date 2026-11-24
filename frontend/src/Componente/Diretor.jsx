import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useParams, Link } from "react-router-dom";
import FormEditarDiretor from "../Forms/FormEditarDiretor"

function Diretor(props){
    const { id } = useParams()
    const [editarDiretor, setEditarDiretor] = useState(false)

    const diretor = props.diretores.find(d => d.id == id);
    if (!diretor) {
        return <h1>Carregando...</h1>;
    }


    let formEditarDiretor
    if (JSON.parse(localStorage.getItem("usuario")).administrador) {
        //botaoDelete = <button className="btn-azul" onClick={(e) => { e.preventDefault(); props.deletar(id) }}>Deletar filme</button>
        if (editarDiretor){
            formEditarDiretor = <FormEditarDiretor id={id} edit={props.editarDiretor} diretor={diretor}/>
        }

    }
    return(
        <>
            <p className="categoria">Diretor(a)</p>
            <Link className="link voltar categoria text-dark " to={"/diretores"}><BsArrowLeft /> Voltar</Link>
            <div className="grid-filme">
                <h1 className="titulo">{diretor.nome}</h1>
                <button className="btn-azul" onClick={() => setEditarDiretor(!editarDiretor)}>
                    {editarDiretor ? "Cancelar edição" : "Editar filme"}
                </button>

                {editarDiretor ? formEditarDiretor : <></>}

                <div className="combo">
                    <img src={diretor.fotografia != null ? `http://localhost:3000/arquivo/${diretor.fotografia}`: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlpiGLqA9GhqWx1nWZgjwmfm8IcuDv6gNcvdamF50Hg&s=10"} onError={(e) => {e.currentTarget.style.display = 'none';}} alt="Image" className='imagem_catalogo_pessoa' />
                    <h5>Biografia: <br/> <span className="sinopse">{diretor.biografia}</span></h5>
                </div>
                <div className="">
                    <hr></hr>
                    <p><b>Nacionalidae:</b> {diretor.nacionalidade}</p>
                    <hr></hr>
                    <p><b>Data de nascimento: </b> {new Date(diretor.data_nascimento).toLocaleDateString("pt-BR", {timeZone: "UTC"})}</p>
                    <hr></hr>
                    <p><b>Quantidade de prêmios: </b> {diretor.qtde_premios} prêmios</p>
                </div>
            </div>
        </>
    )
}

export default Diretor;