import { useEffect, useState } from "react"
import { BsYoutube, BsTiktok, BsInstagram, BsTwitterX, BsSearch } from "react-icons/bs"
import { Link } from "react-router-dom"

function CatalogoFilmes(props){

    const [search, setSearch]=useState("")

    const [filmes, setFilmes]=useState({filmes:[]})

    const [search2, setSearch2]=useState("")

    async function pesquisar(e) {
        e.preventDefault();

        try {
            const titulo = await props.titulo(search2);
            if (titulo != null) {
                window.location.href = "/filme/"+titulo;
                return;
            }

            const serie = await props.titulos(search2);
            if (serie != null) {
                window.location.href = "/serie/"+serie;
                return;
            }

            const ator = await props.nomea(search2);
            if (ator != null) {
                window.location.href = "/ator/"+ator;
                return;
            }

            const diretor = await props.nomed(search2);
            if (diretor != null) {
                window.location.href = "/diretor/"+diretor;
                return;
            }

            alert("Não há nada cadastrado com esse nome");
        } catch (erro) {
            console.log("Erro na pesquisa:", erro);
            alert("Ocorreu um erro ao realizar a pesquisa");
        }
    }

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
            <nav className="navbar bg-black fg-2">
                <div className="container-fluid">
                <Link to={"/"} className="link Rreenha">Rreenha Filmes</Link>
                <form className="d-flex" role="search" onSubmit={pesquisar}>
                    <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" value={search2} onChange={(e)=>{setSearch2(e.target.value)}}/>
                    <button className="search" type="submit"><BsSearch></BsSearch></button>
                </form>
                </div>
            </nav>

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

            <footer>
                <div className='redes-footer'>
                    <span>Nos siga nas nossas redes sociais</span>
                    <div className='redes-icones'>
                        <a href='https://www.youtube.com/@LOUDBrawlStars'><BsYoutube></BsYoutube></a>
                        <a href='https://www.tiktok.com/@loud.brawlstars'><BsTiktok></BsTiktok></a>
                        <a href='https://www.instagram.com/teamhmble/'><BsInstagram></BsInstagram></a>
                        <a href='https://x.com/TeamHmble'><BsTwitterX></BsTwitterX></a>
                    </div>
                </div>

                <span className='cop'>©2026. Rreenha_Filmes. Todos os direitos reservados.</span>
            </footer>
        </>
    )
}

export default CatalogoFilmes