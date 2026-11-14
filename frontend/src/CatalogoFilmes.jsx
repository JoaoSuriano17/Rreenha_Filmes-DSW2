import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function CatalogoFilmes(props){

    const [search, setSearch]=useState("")

    const [filmes, setFilmes]=useState({filmes:[]})

    useEffect(()=>{
        async function catalogo(){
            try{
                const r=await props.catalogo()
                console.log(r)
                setFilmes(r)
            }catch(erro){
                console.log(erro)
            }
        }

        catalogo()
    }, [])

    return(
        <>
            <h1 className='procurados'>Catálogo de filmes</h1>

            <div className="grid-filme">
                <form className="pegar_filme" role="search">
                    <span>Quantidade de filmes: {filmes.filmes.length}</span>
                    <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                </form>
                <div className="catalogo">
                    {filmes.filmes?.filter((filme) => filme.titulo.toLowerCase().includes(search)).map((filme, index) =>(
                        <Link to={"/filme/"+filme.id} className="link" key={filme.id ?? index}>
                            <div className="card cardcatalogo">
                                    <img src={`http://localhost:3000/arquivo/${filme.cartaz}`} alt="Image" className='imagem_catalogo'/>
                                <div className="card-body">
                                    <h5 className="card-title">{filme.titulo}</h5>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CatalogoFilmes