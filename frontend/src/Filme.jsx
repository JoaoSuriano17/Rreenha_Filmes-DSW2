import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

function Filme(props) {
    const { id } = useParams();

    const filme = props.filmes.find(f => f.id == id);
    if (!filme) {
        return <h1>Carregando ...</h1>;
    }

    const diretor = props.diretores.find(d => d.id == filme.diretor);
    const atoresFilme = props.filmes_atores.find(a => a.id_filme == id || null);
    const resenhasFilme = props.filmes_resenha.find(rf => rf.id_filme == id);
    if (!diretor || !atoresFilme || !resenhasFilme){
        return <h1>Carregando ...</h1>
    }

    console.log(resenhasFilme)
    let cardAtores = [];
    if (atoresFilme) {
        for (let a of atoresFilme.atores) {
            cardAtores.push(
                <Link to={"/ator/" + a.id} className="link" key={a.id}>
                    <div className="card cardcatalogo">
                        <img src={a.fotografia != null ? `http://localhost:3000/arquivo/${a.fotografia}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlpiGLqA9GhqWx1nWZgjwmfm8IcuDv6gNcvdamF50Hg&s=10"} onError={(e) => { e.currentTarget.style.display = 'none'; }} alt="Image" className='imagem_catalogo_pessoa'/>
                        <div className="card-body">
                            <h5 className="card-title">{a.nome}</h5>
                        </div>
                    </div>
                </Link>
            )
        }}
    
    let cardResenhas = [];
    let y = 0
    if (resenhasFilme.resenhas[0]) {
        for (let a of resenhasFilme.resenhas) {
            cardResenhas.push(
                <div className="card cardcatalogo" key={y}>
                    <div className="card-body">
                        <h5 className="card-title">{a.nome}</h5>
                        <p>{a.email}</p>
                        <p>{a.resenha}</p>
                        <p>{a.avaliacao}</p>
                    </div>
                </div>
            )
        }}

    return (
        <>
            <p className="categoria">Filme</p>
            <Link className="link voltar categoria text-dark " to={"/filmes"}><BsArrowLeft /> Voltar</Link>
            <div className="grid-filme">
                <h1 className="titulo">{filme.titulo}</h1>
                <div className="combo">
                    <img src={`http://localhost:3000/arquivo/${filme.cartaz}`} alt="Image" className="cartaz" />
                    <h5>
                        Sinopse: <br />
                        <span className="sinopse">{filme.sinopse}</span>
                    </h5>
                </div>

                <div>
                    <hr></hr>
                    <p><b>Duração:</b> {filme.duracao} minutos</p>
                    <hr></hr>
                    <p><b>Faixa etária:</b> {filme.faixa_etaria} anos</p>
                    <hr></hr>
                    <p><b>Quantidade de prêmios:</b> {filme.qtde_premios}</p>
                    <hr></hr>
                    <p>
                        <b>Diretor:</b>{" "}
                        {diretor && (<Link className="link" to={`/diretor/${diretor.id}`}> {diretor.nome} </Link> )}
                    </p>
                </div>
            </div>

            <div className="grid-atores">
                <h2><span className="blue">|</span> Elenco Principal</h2>
                {cardAtores}
            </div>

            <div>
                {cardResenhas}
            </div>
        </>
    )
}

export default Filme;