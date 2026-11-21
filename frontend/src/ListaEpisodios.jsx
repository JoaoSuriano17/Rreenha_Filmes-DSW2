import { useEffect, useState } from "react"
import { BsArrowLeft } from "react-icons/bs"
import { Link, useParams } from "react-router-dom"
import Episodio from "./Episodio"

function ListaEpisodios(props){
    const {id}=useParams()

    let episodiosSerie = []
    for (let a of props.episodios){
        if (a.serie_id == id){
            episodiosSerie.push(a)
        }
    }

    let cardEpisodios = []
    for (let a of episodiosSerie){
        cardEpisodios.push(<Episodio episodio={a} key={a.id}></Episodio>)
    }

    return(
        <>
            <div className="grid-episodios">
                <div className="cabecalhoeps">
                    <Link className="link voltar" to={"/serie/"+ id}><BsArrowLeft /> Voltar</Link>
                    <div className="d-flex">
                        <img src={props.series[id].cartaz != null ? `http://localhost:3000/arquivo/${props.series[id].cartaz}`: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlpiGLqA9GhqWx1nWZgjwmfm8IcuDv6gNcvdamF50Hg&s=10"} onError={(e) => {e.currentTarget.style.display = 'none';}} alt="Image" className='imagem_catalogo_pessoa' />
                        <div>
                            <h4 className="tserie">{props.series[id].titulo}</h4>
                            <h2>Lista de episódios</h2>
                        </div>
                    </div>
                </div>
                <div className="episodios">
                    {cardEpisodios}
                </div>
                {/*<div className="temporadas">
                    {[...new Set(episodios?.map(ep => ep.temporada))].map(numero => (
                        <button key={numero} className={temporada === numero ? "ativo" : ""} onClick={() => setTemporada(numero)}>{numero}</button>
                    ))}
                </div>
                <div className="episodios">
                    {episodios?.filter(episodio => episodio.temporada === temporada).map((episodio, index) => (
                        <div className="ep" key={episodio.id ?? index}>
                            <div className="card-body">
                                <h5 className="card-title">T{episodio.temporada}.E{index+1} - {episodio.titulo}</h5>
                                <p className="card-text">{episodio.duracao} minutos</p>
                                <p className="card-text">{episodio.sinopse}</p>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>*/}
            </div>
        </>
    )
}

export default ListaEpisodios;