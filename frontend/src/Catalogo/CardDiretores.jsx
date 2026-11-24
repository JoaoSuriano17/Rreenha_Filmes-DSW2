import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function CardDiretores(props) {
    return (
        <>
            <Link to={"/diretor/" + props.diretor.id} className="link">
                <div className="card cardcatalogo">
                    <img src={props.diretor.fotografia != null ? `http://localhost:3000/arquivo/${props.diretor.fotografia}`: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlpiGLqA9GhqWx1nWZgjwmfm8IcuDv6gNcvdamF50Hg&s=10"} onError={(e) => {e.currentTarget.style.display = 'none';}} alt="Image" className='imagem_catalogo_pessoa' />
                    <div className="card-body">
                        <h5 className="card-title">{props.diretor.nome}</h5>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default CardDiretores;