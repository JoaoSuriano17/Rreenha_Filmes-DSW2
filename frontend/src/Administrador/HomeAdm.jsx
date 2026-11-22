import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ListaUsuarios from './ListaUsuarios';
import FormAddFilme from './FormAddFilme';
import FormAddSerie from './FormAddSerie';
import FormAddAtor from './FormAddAtor';
import "./HomeAdm.css"
import FormAddDiretor from './FormAddDiretor';
import FormAddEpisodios from './FormAddEpisodio';
import FormAddAtorEmSerie from './FormAddAtorEmSerie';
import FormAddAtorEmFilme from './FormAddAtorEmFilme';
import FormAltSerie from './FormAltSerie';
import FormAltEpisodios from './FormAltEpisodio';

function HomeAdm(props) {

    let a;
    let c;
    let div1;
    let div2;
    const bzin = localStorage.getItem("usuario");
    const b=JSON.parse(bzin)

    if (b.administrador == true) {
        a = <h1>Home do adm - aqui ficarão todas as funções</h1>;
        c = <ListaUsuarios usuarios={props.usuarios} adm={props.adm}></ListaUsuarios>
        div1 = <div className='d-flex cadastros flex-nowrap overflow-x-auto gap-3 pb-3'>
            <div><FormAddAtor add={props.addAtor}></FormAddAtor></div>
            <FormAddDiretor add={props.addDiretor}></FormAddDiretor>
            <FormAddFilme add={props.addFilme} diretores={props.diretores}></FormAddFilme>
            <FormAddAtorEmFilme add={props.addAtorFilme} filmes={props.filmes} atores={props.atores}></FormAddAtorEmFilme>
            <FormAddSerie add={props.addSerie} diretores={props.diretores}></FormAddSerie>
            <FormAddAtorEmSerie add={props.addAtorSerie} series={props.series} atores={props.atores}></FormAddAtorEmSerie>
            <FormAddEpisodios add={props.addEpisodio} series={props.series}></FormAddEpisodios>
        </div>

        div2=<div className='d-flex cadastros'>
            <FormAltSerie alt={props.altSerie} diretores={props.diretores} series={props.series}></FormAltSerie>
            <FormAltEpisodios alt={props.altEpisodio} series={props.series} episodios={props.episodios}></FormAltEpisodios>
        </div>
    }else{
        a=<h1>Página exclusiva para administradores, coisa que você não é</h1>
    }

    return (
        <>
            {a}
            {div1}
            {div2}
            {c}
        </>
    )
}

export default HomeAdm;