import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from 'react';
import {BsInstagram, BsTiktok, BsTwitterX, BsYoutube} from "react-icons/bs"
import { Link } from 'react-router-dom';

function Home(props){

    const [classico, setClassico]=useState([])

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

        filmes_classicos()
    }, [])

    return(
        <>
            <nav className="navbar bg-black fg-2">
                <div className="container-fluid">
                <a className="navbar-brand text-light">Navbar</a>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="search" type="submit">Search</button>
                </form>
                </div>
            </nav>

            <div className="hero">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="false">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src="https://wallpapers.com/images/hd/naruto-shippuden-naruto-s-comrades-poster-rxxyiybobk8m0q7u.jpg" className="w-50" alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src="https://geekpopnews.com.br/wp-content/uploads/2024/09/Um-Filme-Minecraft-Banner-de-divulgacao.jpg" className="w-50" alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7C8EpW1x5AaBAx2YAl_Ekot7XBww8MRBne8ydLFD2o6n2jSvfcm9Qrd7l&s=10" className="w-50" alt="..."/>
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

            <h1 className='procurados'>Veja os filmes mais procurados no nosso site</h1>
            <div className="filmes_classicos">
                {classico.filmes?.filter(filme => filme.id>5).map((filme, index) => (
                    <div className="card" key={filme.id ?? index}>
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