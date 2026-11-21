import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './CardUsuario.css'

function CardUsuario(props) {
    return (
        <>
            <div className='usuarioPromover'>
                <h3>{props.usuario.email}</h3>    
                <hr />
                <p>{props.usuario.nome}</p>
                <hr />
                <button onClick={(e) => {e.preventDefault(); const r = window.confirm("Você tem certeza que deseja promover esse usuário?"); if (r) {props.adm(props.usuario.id, true)}}}>Promover</button>
            </div>
        </>
    )
}

export default CardUsuario;