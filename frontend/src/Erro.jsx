import { useState } from "react";
import { BsSearch, BsYoutube, BsTiktok, BsInstagram, BsTwitterX } from "react-icons/bs"
import { Link, useNavigate, useParams } from "react-router-dom"

function Erro(props){

    const {sla}=useParams()

    const [search, setSearch]=useState("")

    const navigate = useNavigate();

    async function pesquisar(e) {
        e.preventDefault();

        try {
            const titulo = await props.titulo(search);
            if (titulo != null) {
                navigate("/filme/" + titulo);
                return;
            }

            const ator = await props.nomea(search);
            if (ator != null) {
                navigate("/ator/" + ator);
                return;
            }

            const diretor = await props.nomed(search);
            if (diretor != null) {
                navigate("/diretor/" + diretor);
                return;
            }

            alert("Não há nada cadastrado com esse nome");
        } catch (erro) {
            console.log("Erro na pesquisa:", erro);
            alert("Ocorreu um erro ao realizar a pesquisa");
        }
    }

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

            <p>Erro 404</p>
            <p>{sla} não é um caminho válido</p>

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

export default Erro