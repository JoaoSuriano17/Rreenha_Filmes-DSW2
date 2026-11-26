import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function CardSeries(props) {
    return (
        <>
            <Link to={"/serie/" + props.serie.id} className="link">
                <div className="card cardcatalogo">
                    <img src={props.serie.cartaz != null ? `http://localhost:3000/arquivo/${props.serie.cartaz}`: "../Imagens/imagemSerie.webp"} onError={(e) => {e.currentTarget.style.display = 'none';}} alt="Image" className='imagem_catalogo_pessoa' />
                    <div className="card-body">
                        <h5 className="card-title">{props.serie.titulo}</h5>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default CardSeries;