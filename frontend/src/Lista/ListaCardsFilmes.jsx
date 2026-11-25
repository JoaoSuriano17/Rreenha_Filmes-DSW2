import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs";
import CardFilmes from "../Catalogo/CardFilmes";

function ListaCardsFilmes(props){
    const [search, setSearch]=useState("")
    const nav = useNavigate();

    function enviar() {
        console.log("Função enviar não está funcionando")
    }

    let cardsFilmes = []
    for (let a of props.filmes){
        cardsFilmes.push(<CardFilmes filme={a} key={a.id} />)
    }
    return(
        <>
            <h1 className='procurados'>Catálogo de filmes</h1>
            <Link className="link voltar categoria text-dark " to={"/"}><BsArrowLeft /> Voltar</Link>

            <div className="grid-filme">
                {/*<form className="pegar_filme" role="search" onSubmit={enviar}>
                    <span>Quantidade de filmes: {props.filmes.lenght}</span>
                    <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                </form>*/}
                <div className="catalogo">
                    {cardsFilmes}
                </div>
            </div>

        </>
    )
}

export default ListaCardsFilmes;