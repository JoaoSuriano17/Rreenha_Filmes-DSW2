import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

function Home(props){
    
    return(
        <>
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
                    {/*Pode ser um button com um link dentro???*/}
                    <button className="btncatalogos" onClick={()=>{navigate("/filmes")}}>Filmes</button>
                    <button className="btncatalogos" onClick={()=>{navigate("/atores")}}>Atores</button>
                    <button className="btncatalogos" onClick={()=>{navigate("/diretores")}}>Diretores</button>
                    <button className="btncatalogos" onClick={()=>{navigate("/series")}}>Séries</button>
                </div>
            </div>

            <h1 className='procurados'>Veja os filmes mais procurados no nosso site</h1>
            <div className="filmes_classicos">
                {props.filmes?.filter(filme => filme.id<5).map((filme, index) => (
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
                {props.filmes_premiados?.slice(0, 4).map((filme, index) => (
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
            <div className='d-flex justify-content-center'>
                <button className="btncatalogo" onClick={()=>{navigate("/filmes")}}>Explorar catálogo completo</button>
            </div>

            <h1 className='procurados'>Veja os atores mais procurados no nosso site</h1>
            <div className="filmes_classicos">
                {props.atores?.filter(ator => ator.id<5).map((ator, index) => (
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

            <h1 className='procurados'>Veja as séries mais procuradas no nosso site</h1>
            <div className="filmes_classicos">
                {props.series?.filter(serie => serie.id<5).map((serie, index) => (
                    <div className="card cardhome" key={serie.id ?? index}>
                        <Link to={"/serie/"+serie.id}>
                            <img src={`http://localhost:3000/arquivo/${serie.cartaz}`} alt="Image" className='imagem_classicos'/>
                        </Link>
                        <div className="card-body">
                            <h5 className="card-title">{serie.titulo}</h5>
                            <p className="card-text">{serie.qtde_premios} prêmios recebidos</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='d-flex justify-content-center'>
                <button className="btncatalogo" onClick={()=>{navigate("/series")}}>Explorar catálogo completo</button>
            </div>
        </>
    )
}

export default Home;