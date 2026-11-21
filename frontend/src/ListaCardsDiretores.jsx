import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CatalogoCardsDiretores from "./CatalogoCardsDiretores";
import { BsArrowLeft } from "react-icons/bs";

function ListaCardsDiretores(props){
    const [search, setSearch]=useState("")
    const nav = useNavigate();

    function enviar() {
        console.log("Função enviar não está funcionando")
    }
    console.log(props.diretores)
    let cardsDiretores = []
    for (let a of props.diretores || []){
        cardsDiretores.push(<CatalogoCardsDiretores diretor={a} key={a.id}></CatalogoCardsDiretores>)
    }
    return(
        <>
            <h1 className='procurados'>Catálogo de Diretores</h1>
            <Link className="link voltar categoria text-dark " to={"/"}><BsArrowLeft /> Voltar</Link>

            <div className="grid-filme">
                <form className="pegar_filme" role="search" onSubmit={enviar}>
                    <span>Quantidade de Diretores: {props.diretores.length}</span>
                    <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                </form>
                <div className="catalogo">
                    {cardsDiretores}
                </div>
            </div>

        </>
    )
}

export default ListaCardsDiretores;