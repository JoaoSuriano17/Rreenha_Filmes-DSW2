function Episodio(props) {
    let botaoDelete;
    if(JSON.parse(localStorage.getItem("usuario")).administrador){
        botaoDelete=<button onClick={(e)=>{e.preventDefault(); props.deletar(props.episodio.id)}}>Deletar episódio</button>
    }
    return (
        <>
            <div className="ep">
                <div className="card-body">
                    <h5 className="card-title">T{props.episodio.temporada} - {props.episodio.titulo}</h5>
                    <p className="card-text">{props.episodio.duracao} minutos</p>
                    <p className="card-text">{props.episodio.sinopse}</p>
                    {botaoDelete}
                </div>
                <hr />
            </div>
        </>
    )
}

export default Episodio;