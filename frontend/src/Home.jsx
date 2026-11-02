import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from 'react';
import {BsInstagram, BsSearch, BsTiktok, BsTwitterX, BsYoutube} from "react-icons/bs"
import { Link, useNavigate } from 'react-router-dom';

function Home(props){

    const [classico, setClassico]=useState([])
    const [premiados, setPremiados]=useState([])
    const [atores, setAtores]=useState([])

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

    useEffect(()=>{
        async function filmes_classicos(){
            try{
                const r=await props.classico()
                console.log(r)
                setClassico(r)
            }catch(erro){
                console.log(erro)
            }
        }

        async function filmes_premiados(){
            try{
                const r=await props.premios()
                console.log(r)
                setPremiados(r)
            }catch(erro){
                console.log(erro)
            }
        }

        async function atores(){
            try{
                const r=await props.atores()
                console.log(r)
                setAtores(r)
            }catch(erro){
                console.log(erro)
            }
        }

        filmes_classicos()
        filmes_premiados()
        atores()
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

            <div className="hero">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="false">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src="Imagens/naruto-hero.jpg" className="w-50" alt="Banner do Naruto"/>
                    </div>
                    <div className="carousel-item">
                    <img src="Imagens/Minecraft-hero.webp" className="w-50" alt="Banner do filme do Minecraft"/>
                    </div>
                    <div className="carousel-item">
                    <img src="Imagens/homem_aranha-hero.jpeg" className="w-50" alt="Banner do Homem Aranha Um Novo Dia"/>
                    </div>
                </div>

                <div className="hero-content">
                    <h1 className="texto1">RREENHA</h1>
                    <span className="texto2">O maior site do mundo</span><span> de filmes, <br></br>séries e suas resenhas</span>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active bg-gray" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2" className="bg-gray"></button>
                    <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2" aria-label="Slide 3" className="bg-gray"></button>
                    </div>
                </div>
                </div>
            </div>

            <div className='grid-filme grid-filme-menor'>
                <h4 className='text-center'>Explore nossos catálogos</h4>
                <div className='d-flex justify-content-center catalogos'>
                    <button className="btncatalogos" onClick={()=>{navigate("/filmes")}}>Filmes</button>
                    <button className="btncatalogos" onClick={()=>{navigate("/atores")}}>Atores</button>
                    <button className="btncatalogos" onClick={()=>{navigate("/diretores")}}>Diretores</button>
                    <button className="btncatalogos" onClick={()=>{navigate("/series")}}>Séries</button>
                </div>
            </div>

            <h1 className='procurados'>Veja os filmes mais procurados no nosso site</h1>
            <div className="filmes_classicos">
                {classico.filmes?.filter(filme => filme.id<5).map((filme, index) => (
                    <div className="card cardhome" key={filme.id ?? index}>
                        <Link to={"/filme/"+filme.id}>
                            <img src={`http://localhost:3000/arquivo/${filme.cartaz}`} alt="Image" className='imagem_classicos'/>
                        </Link>
                        <div className="card-body">
                            <h5 className="card-title">{filme.titulo}</h5>
                            <p className="card-text">{filme.duracao} minutos</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='d-flex justify-content-center'>
                <button className="btncatalogo" onClick={()=>{navigate("/filmes")}}>Explorar catálogo completo</button>
            </div>

            <h1 className='procurados'>Veja os filmes mais premiados</h1>
            <div className="filmes_classicos">
                {premiados.filmes?.slice(0, 4).map((filme, index) => (
                    <div className="card" key={filme.id ?? index}>
                        <Link to={"/filme/"+filme.id}>
                            <img src={`http://localhost:3000/arquivo/${filme.cartaz}`} alt="Image" className='imagem_classicos'/>
                        </Link>
                        <div className="card-body">
                            <h5 className="card-title">{filme.titulo}</h5>
                            <p className="card-text">{filme.duracao} minutos</p>
                            <p className="card-text">{filme.qtde_premios} prêmios recebidos</p>
                        </div>
                    </div>
                ))}
            </div>

            <h1 className='procurados'>Veja os atores mais procurados</h1>
            <div className="filmes_classicos">
                {atores.atores?.filter(ator => ator.id<5).map((ator, index) => (
                    <div className="card" key={ator.id ?? index}>
                        <Link to={"/ator/"+ator.id}>
                            <img src={`http://localhost:3000/arquivo/${ator.fotografia}`} alt="Image" className='ator'/>
                        </Link>
                        <div className="card-body">
                            <h5 className="card-title">{ator.nome}</h5>
                            <p className="card-text">{ator.nacionalidade}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='d-flex justify-content-center'>
                <button className="btncatalogo" onClick={()=>{navigate("/atores")}}>Ver todos os nossos atores</button>
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

export default Home;