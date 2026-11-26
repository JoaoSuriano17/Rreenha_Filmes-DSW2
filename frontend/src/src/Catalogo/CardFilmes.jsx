import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function CardFilmes(props) {
    return (
        <>
            <Link to={"/filme/" + props.filme.id} className="link">
                <div className="card cardcatalogo">
                    <img src={props.filme.cartaz != null ? `http://localhost:3000/arquivo/${props.filme.cartaz}`: "Imagens/imagemFilme.jpg"} onError={(e) => {e.currentTarget.style.display = 'none';}} alt="Image" className='imagem_catalogo_pessoa' />
                    <div className="card-body">
                        <h5 className="card-title">{props.filme.titulo}</h5>
                    </div>
                </div>
            </Link>
        </>
    )}

export default CardFilmes