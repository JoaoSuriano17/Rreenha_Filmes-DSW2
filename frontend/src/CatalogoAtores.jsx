import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function CatalogoAtores(props){

    const [search, setSearch]=useState("")

    const [atores, setAtores]=useState({atores:[]})

    useEffect(()=>{
        async function catalogo(){
            try{
                const r=await props.catalogo()
                console.log(r)
                setAtores(r)
            }catch(erro){
                console.log(erro)
            }
        }

        catalogo()
    }, [])

    return(
        <>
            <h1 className='procurados'>Catálogo de atores</h1>

            <div className="grid-filme">
                <form className="pegar_filme" role="search">
                    <span>Quantidade de atores: {atores.atores.length}</span>
                    <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                </form>
                <div className="catalogo">
                    {atores.atores?.filter((ator) => ator.nome.toLowerCase().includes(search)).map((ator, index) =>(
                        <Link to={"/ator/"+ator.id} className="link" key={ator.id ?? index}>
                            <div className="card cardcatalogo">
                                    <img src={`http://localhost:3000/arquivo/${ator.fotografia}`} alt="Image" className='imagem_catalogo_pessoa'/>
                                <div className="card-body">
                                    <h5 className="card-title">{ator.nome}</h5>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CatalogoAtores