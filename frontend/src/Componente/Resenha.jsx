import './Resenha.css';
import { useState } from 'react';

function Resenha(props) {
    let botaoDelete
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario && usuario.email == props.resenha.email) {
        botaoDelete = (
            <button className="btn-azul" onClick={() => props.deletar(props.id)}> Deletar resenha</button>
        );
    }
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
            {botaoDelete}
        </div>
    );
}

export default Resenha;