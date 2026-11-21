import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

function Serie(props){
    const { id } = useParams()
    const navigate = useNavigate()

    return(
        <>
            <p className="categoria">Série</p>
            <div className="grid-filme">
                <h1 className="titulo">{props.series[id].titulo}</h1>
                <div className="combo">
                    <img src={props.series[id].fotografia != null ? `http://localhost:3000/arquivo/${props.series[id].fotografia}`: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlpiGLqA9GhqWx1nWZgjwmfm8IcuDv6gNcvdamF50Hg&s=10"} onError={(e) => {e.currentTarget.style.display = 'none';}} alt="Image" className='imagem_catalogo_pessoa' />
                    <h5>Sinopse: <br/> <span className="sinopse">{props.series[id].sinopse}</span></h5>
                </div>
                <div className="">
                    <button className="listaeps" onClick={()=>{navigate(`/serie/${id}/episodios`)}}>Ver a lista de episódios</button>
                    <hr></hr>
                    <p><b>Faixa etária:</b> {props.series[id].faixa_etaria} anos</p>
                    <hr></hr>
                    <p><b>Quantidade de prêmios:</b> {props.series[id].qtde_premios}</p>
                    <hr></hr>
                    <p><b>Diretor:</b> <Link className="link" to={"/diretor/"+ props.series[id].diretor}>{props.diretores[props.series[id].diretor].nome}</Link></p>
                </div>
            </div>
        </>
    )
}

export default Serie