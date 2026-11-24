import './Resenha.css';

function Resenha(props) {
    console.log(props.resenha)
    return (
        <div className="resenha">
            <div className="resenha-cabecalho">
                <div>
                    <h5 className="resenha-usuario">
                        {props.resenha.nome}
                    </h5>
                    <p className="resenha-email">
                        {props.resenha.email}
                    </p>
                </div>
                <span className="resenha-avaliacao">
                    {props.resenha.avaliacao}/100
                </span>
            </div>
            <p className="resenha-texto">
                {props.resenha.resenha}
            </p>
        </div>
    );
}

export default Resenha;