import { useEffect, useState } from "react"
import { BsArrowLeft, BsInstagram, BsSearch, BsTiktok, BsTwitterX, BsYoutube } from "react-icons/bs"
import { Link, useParams } from "react-router-dom"

function Episodios(props){

    const {id}=useParams()

    const [serie, setSerie]=useState([])
    const [episodios, setEpisodios] = useState([])

    const [search, setSearch]=useState("")

    async function pesquisar(e) {
        e.preventDefault();

        try {
            const titulo = await props.titulo(search);
            if (titulo != null) {
                window.location.href = "/filme/"+titulo;
                return;
            }

            const serie = await props.titulos(search);
            if (serie != null) {
                window.location.href = "/serie/"+serie;
                return;
            }

            const ator = await props.nomea(search);
            if (ator != null) {
                window.location.href = "/ator/"+ator;
                return;
            }

            const diretor = await props.nomed(search);
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

    const [temporada, setTemporada] = useState(1);

    useEffect(()=>{
        async function pegar_serie(){
            try{
                const r=await props.serie(id)
                if (r==null){
                    alert("Não existe série com esse id")
                    return false;
                }
                console.log(r)
                setSerie(r.serie)
            }catch(erro){
                console.log("Erro"+erro)
            }
        }

        async function pegar_episodios(){
            try{
                const r=await props.episodios(id)
                if (r==null){
                    alert("A série não tem nenhum episódio")
                    return false;
                }
                console.log(r)
                setEpisodios(r.episodios)
            }catch(erro){
                console.log("Erro"+erro)
            }
        }
        
        if (isNaN(id)){
            console.log("O id deve ser um número inteiro")
        }else{
            pegar_serie()
            pegar_episodios()
        }
    }, [])

    return(
        <>
            <nav className="navbar bg-black fg-2">
                <div className="container-fluid">
                <Link to={"/"} className="link Rreenha">Rreenha Filmes</Link>
                <form className="d-flex" role="search" onSubmit={pesquisar}>
                    <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                    <button className="search" type="submit"><BsSearch></BsSearch></button>
                </form>
                </div>
            </nav>



            <div className="grid-episodios">
                <div className="cabecalhoeps">
                    <Link className="link voltar" to={"/serie/"+serie.id}><BsArrowLeft /> Voltar</Link>
                    <div className="d-flex">
                        <img src={`http://localhost:3000/arquivo/${serie.cartaz}`} alt="Image"/>
                        <div>
                            <h4 className="tserie">{serie.titulo}</h4>
                            <h2>Lista de episódios</h2>
                        </div>
                    </div>
                </div>
                <div className="temporadas">
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

export default Episodios