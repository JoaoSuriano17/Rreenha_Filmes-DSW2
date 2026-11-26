import { useState } from "react";
import "./FormResenha.css";

function FormResenha(props) {
    const [resenha, setResenha] = useState("");
    const [avaliacao, setAvaliacao] = useState("");

    function enviarResenha(e) {
        e.preventDefault();

        props.adicionarResenha(
            props.id,
            resenha,
            avaliacao
        );

        setResenha("");
        setAvaliacao("");
        props.alterarExibir();
    }

    return (
        <form className="form-resenha" onSubmit={enviarResenha}>
            <div className="campo-resenha">
                <label>Sua resenha</label>
                <input id="texto-resenha" required value={resenha} onChange={(e) => setResenha(e.target.value)} placeholder="Compartilhe sua opinião sobre o filme..." />
            </div>

            <div className="campo-resenha">
                <label>Avaliação (0 a 100)</label>
                <input id="avaliacao-resenha" type="number" min="0" max="100" step="1" required value={avaliacao} onChange={(e) => setAvaliacao(e.target.value)} placeholder="Ex.: 9" />
            </div>

            <div className="acoes-formulario">
                <button type="submit" className="btn-azul"> Enviar resenha</button>
            </div>
        </form>
    );
}

export default FormResenha;