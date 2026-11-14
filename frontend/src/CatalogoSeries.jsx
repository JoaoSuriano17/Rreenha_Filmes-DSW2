import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function CatalogoSeries(props){

    const [search, setSearch]=useState("")

    const [series, setSeries]=useState({series:[]})

    useEffect(()=>{
        async function catalogo(){
            try{
                const r=await props.catalogo()
                console.log(r)
                setSeries(r)
            }catch(erro){
                console.log(erro)
            }
        }

        catalogo()
    }, [])

    return(
        <>
            <h1 className='procurados'>Catálogo de séries</h1>

            <div className="grid-filme">
                <form className="pegar_filme" role="search">
                    <span>Quantidade de séries: {series.series.length}</span>
                    <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                </form>
                <div className="catalogo">
                    {series.series?.filter((serie) => serie.titulo.toLowerCase().includes(search)).map((serie, index) =>(
                        <Link to={"/serie/"+serie.id} className="link" key={serie.id ?? index}>
                            <div className="card cardcatalogo">
                                    <img src={`http://localhost:3000/arquivo/${serie.cartaz}`} alt="Image" className='imagem_catalogo'/>
                                <div className="card-body">
                                    <h5 className="card-title">{serie    .titulo}</h5>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CatalogoSeries