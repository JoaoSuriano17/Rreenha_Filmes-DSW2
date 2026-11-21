import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CatalogoCardsSeries from "./CatalogoCardsSeries";

function ListaCardsSeries(props){
    const [search, setSearch]=useState("")
    const nav = useNavigate();

    function enviar() {
        console.log("Função enviar não está funcionando")
    }

    let cardSeries = []
    for (let a of props.series){
        cardSeries.push(<CatalogoCardsSeries serie={a} key={a.id}></CatalogoCardsSeries>)
    }

    return(
        <>
            <h1 className='procurados'>Catálogo de Séries</h1>

            <div className="grid-filme">
                <form className="pegar_filme" role="search" onSubmit={enviar}>
                    <span>Quantidade de filmes: {props.series.length}</span>
                    <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                </form>
                <div className="catalogo">
                    {cardSeries}
                </div>
            </div>

        </>
    )
}

export default ListaCardsSeries;