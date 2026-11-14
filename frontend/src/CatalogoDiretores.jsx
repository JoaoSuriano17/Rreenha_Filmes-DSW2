import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function CatalogoDiretores(props){

    const [search, setSearch]=useState("")

    const [diretores, setDiretores]=useState({diretores:[]})

    useEffect(()=>{
        async function catalogo(){
            try{
                const r=await props.catalogo()
                console.log(r)
                setDiretores(r)
            }catch(erro){
                console.log(erro)
            }
        }

        catalogo()
    }, [])

    return(
        <>
            <h1 className='procurados'>Catálogo de diretores</h1>

            <div className="grid-filme">
                <form className="pegar_filme" role="search">
                    <span>Quantidade de diretores: {diretores.diretores.length}</span>
                    <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                </form>
                <div className="catalogo">
                    {diretores.diretores?.filter((diretor) => diretor.nome.toLowerCase().includes(search)).map((diretor, index) =>(
                        <Link to={"/diretor/"+diretor.id} className="link" key={diretor.id ?? index}>
                            <div className="card cardcatalogo">
                                    <img src={`http://localhost:3000/arquivo/${diretor.fotografia}`} alt="Image" className='imagem_catalogo_pessoa'/>
                                <div className="card-body">
                                    <h5 className="card-title">{diretor.nome}</h5>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CatalogoDiretores