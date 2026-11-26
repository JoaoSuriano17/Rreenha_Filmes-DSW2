import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function CardAtores(props){
    //console.log(props.ator)
    return(
        <Link to={"/ator/"+ props.ator.id} className="link">
            <div className="card cardcatalogo">
                {/*<img src={`http://localhost:3000/arquivo/${props.a.fotografia}`} alt="Image" className='imagem_catalogo_pessoa'/>*/}
                <img src={props.ator.fotografia != null ? `http://localhost:3000/arquivo/${props.ator.fotografia}`: "../Imagens/imagemAtor.jpg"} onError={(e) => {e.currentTarget.style.display = 'none';}} alt="Image" className='imagem_catalogo_pessoa' />
                <div className="card-body">
                    <h5 className="card-title">{props.ator.nome}</h5>
                </div>  
            </div>
        </Link>
    )
}

export default CardAtores;