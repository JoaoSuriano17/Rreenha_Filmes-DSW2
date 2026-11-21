import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useParams, Link } from "react-router-dom";

function Diretor(props){
    const { id } = useParams()
    
    return(
        <>
            <p className="categoria">Diretor(a)</p>
            <Link className="link voltar categoria text-dark " to={"/diretores"}><BsArrowLeft /> Voltar</Link>
            <div className="grid-filme">
                <h1 className="titulo">{props.diretores[id].nome}</h1>
                <div className="combo">
                    <img src={props.diretores[id].fotografia != null ? `http://localhost:3000/arquivo/${props.diretores[id].fotografia}`: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlpiGLqA9GhqWx1nWZgjwmfm8IcuDv6gNcvdamF50Hg&s=10"} onError={(e) => {e.currentTarget.style.display = 'none';}} alt="Image" className='imagem_catalogo_pessoa' />
                    <h5>Biografia: <br/> <span className="sinopse">{props.diretores[id].biografia}</span></h5>
                </div>
                <div className="">
                    <hr></hr>
                    <p><b>Nacionalidae:</b> {props.diretores[id].nacionalidade}</p>
                    <hr></hr>
                    <p><b>Data de nascimento: </b> {new Date(props.diretores[id].data_nascimento).toLocaleDateString("pt-BR", {timeZone: "UTC"})}</p>
                    <hr></hr>
                    <p><b>Quantidade de prêmios: </b> {props.diretores[id].qtde_premios} prêmios</p>
                </div>
            </div>
        </>
    )
}

export default Diretor;