import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Ator(props){
    const { id } = useParams()
    const ator = props.atores.find(a => a.id == id);
    if (!ator) {
        return <h1>Carregando ...</h1>;
    }

    return(
        <>
            <p className="categoria">Ator(a)</p>
            <div className="grid-filme">
                <h1 className="titulo">{ator.nome}</h1>
                <div className="combo">
                    <img src={ator.fotografia != null ? `http://localhost:3000/arquivo/${ator.fotografia}`: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlpiGLqA9GhqWx1nWZgjwmfm8IcuDv6gNcvdamF50Hg&s=10"} onError={(e) => {e.currentTarget.style.display = 'none';}} alt="Image" className='imagem_catalogo_pessoa' />
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