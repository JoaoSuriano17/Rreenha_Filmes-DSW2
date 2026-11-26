import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Resenha from "./Resenha";
import FormResenha from "../Forms/FormResenha";
import FormEditarSerie from "../Forms/FormEditarSerie";

function Serie(props) {
    const { id } = useParams();
    const navigate = useNavigate()
    const [escreverResenha, setEscreverResenha] = useState(false);
    const [editarSerie, setEditarSerie] = useState(false);

    const serie = props.series.find(f => f.id == id);
    if (!serie) {
        return <h1>Carregando...</h1>;
    }

    const diretor = props.diretores.find(d => d.id == serie.diretor);
    const atoresSerie = props.series_atores.find(a => a.id_serie == id);
    if (!diretor) {
        return <h1>Carregando...</h1>;
    }

    let cardAtores = [];
    if (atoresSerie) {
        for (let a of atoresSerie.atores) {
            cardAtores.push(
                <Link to={"/ator/" + a.id} className="link" key={a.id}>
                    <div className="card cardcatalogo">
                        <img src={a.fotografia != null ? `http://localhost:3000/arquivo/${a.fotografia}` : "../Imagens/imagemAtor.jpg"} onError={(e) => { e.currentTarget.style.display = 'none'; }} alt="Image" className='imagem_catalogo_pessoa' />
                        <div className="card-body">
                            <h5 className="card-title">{a.nome}</h5>
                        </div>
                        {localStorage.getItem("usuario")&&JSON.parse(localStorage.getItem("usuario")).administrador?<button className="btn-azul" onClick={(e) => {e.preventDefault(); props.atorDel(a.id, id)}}>Desassociar</button>:<></>}
                    </div>
                </Link>
            )
        }
    }

    let cardResenhas = [];
    let y = 0;
    for (let a of props.series_resenha) {
        if (a.id_serie == id) {
            for (let r of a.resenhas) {
                console.log(r)
                cardResenhas.push(
                    <Resenha resenha={r} id={id} key={y} deletar={props.deletarResenha} edit={props.alterarResenha}/>
                );
                y++;
            }
        }
    }   


    let botaoDelete;
    let botaoEdit;
    let botaoResenha;
    if(localStorage.getItem("usuario")){
        botaoResenha=<button className="btn-azul" onClick={() => setEscreverResenha(!escreverResenha)}>{escreverResenha ? "Cancelar" : "Adicionar resenha"}</button>;
    }
    if(localStorage.getItem("usuario")&&JSON.parse(localStorage.getItem("usuario")).administrador){
        botaoDelete=<button className="btn-azul" onClick={(e)=>{e.preventDefault(); props.deletar(id)}}>Deletar série</button>
        botaoEdit=<button className="btn-azul" onClick={() => setEditarSerie(!editarSerie)}>{editarSerie ? "Cancelar" : "Alterar série"}</button>;
    }
    let formResenha;
    if (escreverResenha) {
        formResenha = <FormResenha id={id} adicionarResenha={props.adicionarResenha} alterarExibir={()=>{setEscreverResenha(!escreverResenha)}}/>
    }

    let formEditarSerie;
    if (editarSerie) {
        formEditarSerie = <FormEditarSerie id={id} edit={props.editarSerie} diretores={props.diretores} serie={serie} alterarExibir={() => setEditarSerie(!editarSerie)}/>
    }

    return (
        <>
            <p className="categoria">Série</p>
            <Link className="link voltar categoria text-dark " to={"/series"}><BsArrowLeft /> Voltar</Link>
            <div className="grid-filme">
                <h1 className="titulo">{serie.titulo}</h1>
                {botaoDelete}

                {botaoEdit} <br />
                {formEditarSerie}
                <div className="combo">
                    <img src={serie.cartaz != null ? `http://localhost:3000/arquivo/${serie.cartaz}` : "../Imagens/imagemSerie.webp"}/>
                    <h5>
                        Sinopse: <br />
                        <span className="sinopse">{serie.sinopse}</span>
                    </h5>
                </div>
                <div className="">
                    <Link to={`/serie/${id}/episodios`}><button className="btn-azul">Ver a lista de episódios</button></Link>
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

            <div className="lista-resenhas">
                <h2><span className="blue">|</span> Resenhas</h2>

                {botaoResenha} <br />
                {formResenha}
                {cardResenhas.length > 0 ? cardResenhas : <p className="sem-resenhas">Este filme ainda não possui resenhas.</p>}
            </div>
        </>
    )
}

export default Serie;