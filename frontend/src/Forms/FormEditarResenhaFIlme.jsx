
import { useState } from "react";
import "./FormResenha.css";

function FormEditarResenhaFilme(props) {
    const [resenha, setResenha] = useState(props.resenha.resenha);
    const [avaliacao, setAvaliacao] = useState(props.resenha.avaliacao);

    async function alterar(e) {
        e.preventDefault();

        await props.edit({
            resenha: resenha,
            avaliacao: Number(avaliacao)
        }, props.id);
        props.alterarExibir();
    }

    return (
        <form onSubmit={alterar}>
            <div className="campo-resenha">
                <label>Resenha</label>

                <input
                    id="resenha-resenha"
                    type="text"
                    value={resenha}
                    onChange={(e) => setResenha(e.target.value)}
                    required
                />
            </div>

            <div className="campo-resenha">
                <label>Avaliação (0 a 100)</label>

                <input
                    id="avaliacao-resenha"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={avaliacao}
                    onChange={(e) => setAvaliacao(e.target.value)}
                    required
                />
            </div>

            <div className="acoes-formulario">
                <button type="submit" className="btn-azul">
                    Alterar resenha
                </button>
            </div>
        </form>
    );
}

export default FormEditarResenhaFilme;
