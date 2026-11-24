import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function CardAtores(props){
    console.log(props.ator)
    return(
        <Link to={"/ator/"+ props.ator} className="link">
            <div className="card cardcatalogo">
                {/*<img src={`http://localhost:3000/arquivo/${props.a.fotografia}`} alt="Image" className='imagem_catalogo_pessoa'/>*/}
                <img src={props.ator.fotografia != null ? `http://localhost:3000/arquivo/${props.ator.fotografia}`: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlpiGLqA9GhqWx1nWZgjwmfm8IcuDv6gNcvdamF50Hg&s=10"} onError={(e) => {e.currentTarget.style.display = 'none';}} alt="Image" className='imagem_catalogo_pessoa' />
                <div className="card-body">
                    <h5 className="card-title">{props.ator.nome}</h5>
                </div>  
            </div>
        </Link>
    )
}

export default CardAtores;