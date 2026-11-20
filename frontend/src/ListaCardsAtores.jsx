import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CatalogoCardAtores from "./CatalogoCardAtores";

function ListaCardsAtores(props){
    const [search, setSearch]=useState("")
    const nav = useNavigate();

    function enviar() {
        console.log("Função enviar não está funcionando")
    }

    let cardsAtores = []
    for (let a of props.atores){
        cardsAtores.push(<CatalogoCardAtores ator={a} key={a.id}></CatalogoCardAtores>)
    }
    return(
        <>

            <div className="grid-filme">
                <form className="pegar_filme" role="search" onSubmit={enviar}>
                    <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                </form>
                <div className="catalogo">
                    {cardsAtores}
                </div>
            </div>
        </>
    )
}

export default ListaCardsAtores;