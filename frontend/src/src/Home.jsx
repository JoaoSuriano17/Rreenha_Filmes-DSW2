import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';

function Home(props) {
    const navigate = useNavigate()
    for (let f of props.filmes_premiados) {
        console.log(f)
    }

    return (
        <>
            <div className="hero">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="false">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="Imagens\shawshank-redemption-20th-anniversary-01.webp" className="w-50" alt="Banner do Naruto" />
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
                    <button className="btncatalogos" onClick={() => { navigate("/filmes") }}>Filmes</button>
                    <button className="btncatalogos" onClick={() => { navigate("/atores") }}>Atores</button>
                    <button className="btncatalogos" onClick={() => { navigate("/diretores") }}>Diretores</button>
                    <button className="btncatalogos" onClick={() => { navigate("/series") }}>Séries</button>
                    {/* <Link to={"/filmes"} className='btncatalogos'><button className="btncatalogos">Filmes</button></Link> */}
                    {/* <Link to={"/atores"} className='btncatalogos'><button className="btncatalogos">Atores</button></Link> */}
                    {/* <Link to={"/diretores"} className='btncatalogos'><button className="btncatalogos">Diretores</button></Link> */}
                    {/* <Link to={"/series"} className='btncatalogos'><button className="btncatalogos">Séries</button></Link> */}
                </div>
            </div>

            <h1 className='procurados'>Veja os filmes mais procurados no nosso site</h1>
            <div className="filmes_classicos">
                {props.filmes?.filter(filme => filme.id < 5).map((filme, index) => (
                    <Link to={"/filme/" + filme.id} key={filme.id ?? index} className='link'>
                        <div className="card cardhome">
                            <img src={filme.cartaz!=null?`http://localhost:3000/arquivo/${filme.cartaz}`:"../Imagens/imagemFilme.jpg"} alt="Image" className='imagem_classicos' />
                            <div className="card-body">
                                <h5 className="card-title">{filme.titulo}</h5>
                                <p className="card-text">{filme.duracao} minutos</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='d-flex justify-content-center'>
                {/* <Link to={"/filmes"} className='btncatalogos'><button className="btncatalogos">Filmes</button></Link> */}
                <button className="btncatalogo" onClick={() => { navigate("/filmes") }}>Explorar catálogo completo</button>
            </div>

            <h1 className='procurados'>Veja os filmes mais premiados</h1>
            <div className="filmes_classicos">
                {props.filmes_premiados?.slice(0, 4).map((filme, index) => (
                    <Link to={"/filme/" + filme.id} key={filme.id ?? index} className='link'>
                        <div className="card cardhome">
                            <img src={filme.cartaz!=null?`http://localhost:3000/arquivo/${filme.cartaz}`:"../Imagens/imagemFilme.jpg"} alt="Image" className='imagem_classicos' />
                            <div className="card-body">
                                <h5 className="card-title">{filme.titulo}</h5>
                                <p className="card-text">{filme.duracao} minutos</p>
                                <p className="card-text">{filme.qtde_premios} prêmios recebidos</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='d-flex justify-content-center'>
                <button className="btncatalogo" onClick={() => { navigate("/filmes") }}>Explorar catálogo completo</button>
            </div>

            <h1 className='procurados'>Veja os atores mais procurados no nosso site</h1>
            <div className="filmes_classicos">
                {props.atores?.filter(ator => ator.id < 5).map((ator, index) => (
                    <Link to={"/ator/" + ator.id} key={ator.id ?? index} className='link'>
                        <div className="card cardhome">
                            <img src={ator.fotografia!=null?`http://localhost:3000/arquivo/${ator.fotografia}`:"../Imagens/imagemAtor.jpg"} alt="Image" className='ator' />
                            <div className="card-body">
                                <h5 className="card-title">{ator.nome}</h5>
                                <p className="card-text">{ator.nacionalidade}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='d-flex justify-content-center'>
                {/* <Link to={"/atores"} className='btncatalogos'><button className="btncatalogos">Atores</button></Link> */}
                <button className="btncatalogo" onClick={() => { navigate("/atores") }}>Ver todos os nossos atores</button>
            </div>

            <h1 className='procurados'>Veja as séries mais procuradas no nosso site</h1>
            <div className="filmes_classicos">
                {props.series?.filter(serie => serie.id < 5).map((serie, index) => (
                    <Link to={"/serie/" + serie.id} key={serie.id ?? index} className='link'>
                        <div className="card cardhome">
                            <img src={serie.cartaz!=null?`http://localhost:3000/arquivo/${serie.cartaz}`:"../Imagens/imagemSerie.webp"} alt="Image" className='imagem_classicos' />
                            <div className="card-body">
                                <h5 className="card-title">{serie.titulo}</h5>
                                <p className="card-text">{serie.qtde_premios} prêmios recebidos</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='d-flex justify-content-center'>
                {/* <Link to={"/series"} className='btncatalogos'><button className="btncatalogos">Séries</button></Link> */}
                <button className="btncatalogo" onClick={() => { navigate("/series") }}>Explorar catálogo completo</button>
            </div>
        </>
    )
}

export default Home;