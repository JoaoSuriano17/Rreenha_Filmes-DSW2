import { useNavigate } from 'react-router-dom';
import FormEditarResenhaFilme from '../Forms/FormEditarResenhaFIlme';
import './Resenha.css';
import { useState } from 'react';

function Resenha(props) {
    const [alterarResenha, setAlterarResenha] = useState(false);
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const podeAlterar = usuario && usuario.email === props.resenha.email;

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

            {podeAlterar && (
                <>
                    <button className="btn-azul" onClick={() => props.deletar(props.id)}> Deletar resenha </button>

                    <button className="btn-azul" onClick={() => setAlterarResenha(!alterarResenha)}>
                        {alterarResenha ? "Cancelar" : "Alterar resenha"}
                    </button>

                    {alterarResenha && (
                        <FormEditarResenhaFilme id={props.id} edit={props.edit} resenha={props.resenha} alterarExibir={()=>{setAlterarResenha(!alterarResenha)}}/>
                    )}
                </>
            )}
        </div>
    );
}

export default Resenha;
