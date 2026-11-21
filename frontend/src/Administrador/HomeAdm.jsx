import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ListaUsuarios from './ListaUsuarios';

function HomeAdm(props) {

    let a;
    const b = JSON.parse(localStorage.getItem("usuario"));

    if (b?.administrador === true) {
        a = <h1>Home do adm - aqui ficarão todas as funções</h1>;
    }

    let c = <ListaUsuarios usuarios={props.usuarios}></ListaUsuarios>

    return (
        <>
            {a}
            {c}
        </>
    )
}

export default HomeAdm;