import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function CardDiretores(props) {
    return (
        <>
            <Link to={"/diretor/" + props.diretor.id} className="link">
                <div className="card cardcatalogo">
                    <img src={props.diretor.fotografia != null ? `http://localhost:3000/arquivo/${props.diretor.fotografia}`: "../Imagens/imagemDiretor.webp"} />
                    <div className="card-body">
                        <h5 className="card-title">{props.diretor.nome}</h5>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default CardDiretores;