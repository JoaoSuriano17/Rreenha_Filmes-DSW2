import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CardUsuario from './CardUsuario';

function ListaUsuarios(props) {
    let usuarios = []
    for (let a of props.usuarios){
        if (!a.administrador){
            usuarios.push(a)
        }
    }

    let cardsUsuarios = [];
    for (let a of usuarios){
        cardsUsuarios.push(<CardUsuario usuario={a} key={a.id}></CardUsuario>)
    }


    return (
        <>
            {cardsUsuarios}  
        </>
    )
}

export default ListaUsuarios;