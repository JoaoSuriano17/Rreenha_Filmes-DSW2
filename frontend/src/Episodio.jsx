function Episodio(props) {

    return (
        <>
            <div className="ep">
                <div className="card-body">
                    <h5 className="card-title">T{props.episodio.temporada} - {props.episodio.titulo}</h5>
                    <p className="card-text">{props.episodio.duracao} minutos</p>
                    <p className="card-text">{props.episodio.sinopse}</p>
                </div>
                <hr />
            </div>
        </>
    )
}

export default Episodio;