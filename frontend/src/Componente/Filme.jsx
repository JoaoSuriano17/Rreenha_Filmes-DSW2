import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import FormResenha from "../Forms/FormResenha";
import FormEditarFilme from "../Forms/FormEditarFilme"
import Resenha from "./Resenha";
import "./Filme.css"

function Filme(props) {
    const { id } = useParams();
    const [escreverResenha, setEscreverResenha] = useState(false);
    const [editarFilme, setEditarFilme] = useState(false);

    const filme = props.filmes.find(f => f.id == id);
    if (!filme) {
        return <h1>Carregando ...</h1>;
    }

    const diretor = props.diretores.find(d => d.id == filme.diretor);
    const atoresFilme = props.filmes_atores.find(a => a.id_filme == id || null);
    if (!diretor) {
        return <h1>Carregando ...</h1>
    }

    let cardAtores = [];
    if (atoresFilme) {
        for (let a of atoresFilme.atores) {
            cardAtores.push(
                <Link to={"/ator/" + a.id} className="link" key={a.id}>
                    <div className="card cardcatalogo">
                        <img src={a.fotografia != null ? `http://localhost:3000/arquivo/${a.fotografia}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlpiGLqA9GhqWx1nWZgjwmfm8IcuDv6gNcvdamF50Hg&s=10"} onError={(e) => { e.currentTarget.style.display = 'none'; }} alt="Image" className='imagem_catalogo_pessoa' />
                        <div className="card-body">
                            <h5 className="card-title">{a.nome}</h5>
                        </div>
                    </div>
                </Link>
            )
        }
    }

    let cardResenhas = [];
    let y = 0
    for (let a of props.filmes_resenha) {
        if (a.id_filme == id) {
            for (let r of a.resenhas) {
                cardResenhas.push(
                    <Resenha resenha={r} id={id} key={y} deletar={props.deletarResenha} edit={props.alterarResenha}/>
                );
                y++
            }
        }
    }

    let formEditFilme
    let botaoDelete;
    if (JSON.parse(localStorage.getItem("usuario")).administrador) {
        botaoDelete = <button className="btn-azul" onClick={(e) => { e.preventDefault(); props.deletar(id) }}>Deletar filme</button>
        if (editarFilme){
            formEditFilme = <FormEditarFilme id={id} edit={props.editarFilme} filme={filme} diretores={props.diretores}/>
        }

    }
    let formResenha;
    if (escreverResenha) {
        formResenha = <FormResenha id={id} adicionarResenha={props.adicionarResenha} />
    }
    return (
        <>
            <p className="categoria">Filme</p>
            <Link className="link voltar categoria text-dark " to={"/filmes"}><BsArrowLeft /> Voltar</Link>
            <div className="grid-filme">
                <h1 className="titulo">{filme.titulo}</h1>
                {botaoDelete}
                
                <button className="btn-azul" onClick={() => setEditarFilme(!editarFilme)}>
                    {editarFilme ? "Cancelar edição" : "Editar filme"}
                </button>

                {editarFilme ? formEditFilme : <></>}

                <div className="combo">
                    <img src={`http://localhost:3000/arquivo/${filme.cartaz}`} alt="Image" className="cartaz" />
                    <h5>
                        Sinopse: <br />
                        <span className="sinopse">{filme.sinopse}</span>
                    </h5>
                </div>

                <div>
                    <hr></hr>
                    <p><b>Duração:</b> {filme.duracao} minutos</p>
                    <hr></hr>
                    <p><b>Faixa etária:</b> {filme.faixa_etaria} anos</p>
                    <hr></hr>
                    <p><b>Quantidade de prêmios:</b> {filme.qtde_premios}</p>
                    <hr></hr>
                    <p>
                        <b>Diretor:</b>{" "}
                        {diretor && (<Link className="link" to={`/diretor/${diretor.id}`}> {diretor.nome} </Link>)}
                    </p>
                </div>
            </div>

            <div className="grid-atores">
                <h2><span className="blue">|</span> Elenco Principal</h2>
                {cardAtores}
            </div>

            <div className="lista-resenhas">
                <h2><span className="blue">|</span> Resenhas</h2>

                <button className="btn-azul" onClick={() => setEscreverResenha(!escreverResenha)}>{escreverResenha ? "Cancelar" : "Adicionar resenha"}</button> <br />
                {formResenha}
                {cardResenhas.length > 0 ? cardResenhas : <p className="sem-resenhas">Este filme ainda não possui resenhas.</p>}
            </div>
        </>
    )
}

export default Filme;