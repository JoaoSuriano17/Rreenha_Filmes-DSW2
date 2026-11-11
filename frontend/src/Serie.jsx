import { useEffect, useState } from "react"
import { BsSearch, BsYoutube, BsTwitterX, BsTiktok, BsInstagram } from "react-icons/bs"
import { Link, useNavigate, useParams } from "react-router-dom"

function Serie(props){

    const {id}=useParams()

    const [serie, setSerie]=useState([])
    const [diretor, setDiretor]=useState([])

    const navigate=useNavigate()

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

        async function pegar_diretor(){
            try{
                const r=await props.serie(id)
                const r2=await props.diretor(r.serie.diretor)
                console.log(r2)
                setDiretor(r2.diretor)
            }catch(erro){
                console.log("Erro"+erro)
            }
        }
    
        if (isNaN(id)){
            console.log("O id deve ser um número inteiro")
        }else{
            pegar_serie()
            pegar_diretor()
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

            <p className="categoria">Série</p>
            <div className="grid-filme">
                <h1 className="titulo">{serie.titulo}</h1>
                <div className="combo">
                    <img src={`http://localhost:3000/arquivo/${serie.cartaz}`} alt="Image" className="cartaz" />
                    <h5>Sinopse: <br/> <span className="sinopse">{serie.sinopse}</span></h5>
                </div>
                <div className="">
                    <button className="listaeps" onClick={()=>{navigate(`/serie/${serie.id}/episodios`)}}>Ver a lista de episódios</button>
                    <hr></hr>
                    <p><b>Faixa etária:</b> {serie.faixa_etaria} anos</p>
                    <hr></hr>
                    <p><b>Quantidade de prêmios:</b> {serie.qtde_premios}</p>
                    <hr></hr>
                    <p><b>Diretor:</b> <Link className="link" to={"/diretor/"+diretor.id}>{diretor.nome}</Link></p>
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

export default Serie