import { Link, useParams } from "react-router-dom";

function Filme(props){
    const { id } = useParams()
    console.log(props.filmes)
    console.log(props.diretores)
    return(
        <>
            <p className="categoria">Filme</p>
            <div className="grid-filme">
                <h1 className="titulo">{props.filmes[id].titulo}</h1>
                <div className="combo">
                    <img src={`http://localhost:3000/arquivo/${props.filmes[id].cartaz}`} alt="Image" className="cartaz" />
                    <h5>Sinopse: <br/> <span className="sinopse">{props.filmes[id].sinopse}</span></h5>
                </div>
                <div className="">
                    <hr></hr>
                    <p><b>Duração:</b> {props.filmes[id].duracao} minutos</p>
                    <hr></hr>
                    <p><b>Faixa etária:</b> {props.filmes[id].faixa_etaria} anos</p>
                    <hr></hr>
                    <p><b>Quantidade de prêmios:</b> {props.filmes[id].qtde_premios}</p>
                    <hr></hr>
                    <p><b>Diretor:</b> <Link className="link" to={"/diretor/"+ props.diretores[props.filmes[id].diretor]}> {props.diretores.nome}</Link></p>
                </div>
            </div>

            <div className="grid-atores">
                <h2><span className="blue">|</span> Elenco Principal</h2>

            </div>
        </>
    )
}

export default Filme;