import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ListaUsuarios from './ListaUsuarios';
import FormAddFilme from './FormAddFilme';
import FormAddSerie from './FormAddSerie';
import FormAddAtor from './FormAddAtor';
import "./HomeAdm.css"
import FormAddDiretor from './FormAddDiretor';
import FormAddEpisodios from './FormAddEpisodio';

function HomeAdm(props) {

    let a;
    let c;
    let div;
    const bzin = localStorage.getItem("usuario");
    const b=JSON.parse(bzin)

    if (b.administrador == true) {
        a = <h1>Home do adm - aqui ficarão todas as funções</h1>;
        c = <ListaUsuarios usuarios={props.usuarios} adm={props.adm}></ListaUsuarios>
        div = <div className='d-flex cadastros'>
            <FormAddFilme add={props.addFilme} diretores={props.diretores}></FormAddFilme>
            <FormAddSerie add={props.addSerie} diretores={props.diretores}></FormAddSerie>
            <FormAddAtor add={props.addAtor}></FormAddAtor>
            <FormAddDiretor add={props.addDiretor}></FormAddDiretor>
            <FormAddEpisodios add={props.addEpisodio} series={props.series}></FormAddEpisodios>
        </div>
    }else{
        a=<h1>Página exclusiva para administradores, coisa que você não é</h1>
    }

    return (
        <>
            {a}
            {div}
            {c}
        </>
    )
}

export default HomeAdm;