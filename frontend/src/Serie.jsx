import { Link, useParams } from "react-router-dom";

function Filme(props) {
    const { id } = useParams();

    const serie = props.series.find(f => f.id == id);
    if (!serie) {
        return <h1>Carregando serie...</h1>;
    }

    const diretor = props.diretores.find(d => d.id == serie.diretor);
    const atoresSerie = props.series_atores.find(a => a.id_serie == id);

    let cardAtores = [];
    if (atoresSerie) {
        for (let a of atoresSerie.atores) {
            cardAtores.push(
                <Link to={"/ator/" + a.id} className="link" key={a.id}>
                    <div className="card cardcatalogo">
                        <img src={a.fotografia != null ? `http://localhost:3000/arquivo/${a.fotografia}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlpiGLqA9GhqWx1nWZgjwmfm8IcuDv6gNcvdamF50Hg&s=10"} onError={(e) => { e.currentTarget.style.display = 'none'; }} alt="Image" className='imagem_catalogo_pessoa' />
                        <div className="card-body">
                            <h5 className="card-title">{a.nome}</h5>
                        </div>
                    </div>
                </Link>
            )
        }
    }

    return (
        <>
            <p className="categoria">Série</p>
            <div className="grid-filme">
                <h1 className="titulo">{serie.titulo}</h1>
                <div className="combo">
                    <img src={serie.fotografia != null ? `http://localhost:3000/arquivo/${serie.fotografia}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlpiGLqA9GhqWx1nWZgjwmfm8IcuDv6gNcvdamF50Hg&s=10"} onError={(e) => { e.currentTarget.style.display = 'none'; }} alt="Image" className='imagem_catalogo_pessoa' />
                    <h5>
                        Sinopse: <br />
                        <span className="sinopse">{serie.sinopse}</span>
                    </h5>
                </div>
                <div className="">
                    <button className="listaeps" onClick={() => { navigate(`/serie/${id}/episodios`) }}>Ver a lista de episódios</button>
                    <hr></hr>
                    <p><b>Faixa etária:</b> {serie.faixa_etaria} anos</p>
                    <hr></hr>
                    <p><b>Quantidade de prêmios:</b> {serie.qtde_premios}</p>
                    <hr></hr>
                    <p><b>Diretor:</b> <Link className="link" to={"/diretor/" + serie.diretor}>{diretor.nome}</Link></p>
                </div>
            </div>

            <div className="grid-atores">
                <h2><span className="blue">|</span> Elenco Principal</h2>
                {cardAtores}
            </div>
        </>
    )
}

export default Filme;
/*import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

function Serie(props){
    const { id } = useParams()
    const navigate = useNavigate()

    return(
        <>
            <p className="categoria">Série</p>
            <div className="grid-filme">
                <h1 className="titulo">{props.series[id].titulo}</h1>
                <div className="combo">
                    <img src={props.series[id].fotografia != null ? `http://localhost:3000/arquivo/${props.series[id].fotografia}`: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlpiGLqA9GhqWx1nWZgjwmfm8IcuDv6gNcvdamF50Hg&s=10"} onError={(e) => {e.currentTarget.style.display = 'none';}} alt="Image" className='imagem_catalogo_pessoa' />
                    <h5>Sinopse: <br/> <span className="sinopse">{props.series[id].sinopse}</span></h5>
                </div>
                <div className="">
                    <button className="listaeps" onClick={()=>{navigate(`/serie/${id}/episodios`)}}>Ver a lista de episódios</button>
                    <hr></hr>
                    <p><b>Faixa etária:</b> {props.series[id].faixa_etaria} anos</p>
                    <hr></hr>
                    <p><b>Quantidade de prêmios:</b> {props.series[id].qtde_premios}</p>
                    <hr></hr>
                    <p><b>Diretor:</b> <Link className="link" to={"/diretor/"+ props.series[id].diretor}>{props.diretores[props.series[id].diretor].nome}</Link></p>
                </div>
            </div>
        </>
    )
}

export default Serie*/