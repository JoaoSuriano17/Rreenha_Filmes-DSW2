import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ListaUsuarios from './ListaUsuarios';
import FormAddFilme from './Forms/FormAddFilme';
import FormAddSerie from './Forms/FormAddSerie';
import FormAddAtor from './Forms/FormAddAtor';
import "./HomeAdm.css"
import FormAddDiretor from './Forms/FormAddDiretor';
import FormAddEpisodios from './Forms/FormAddEpisodio';
import FormAddAtorEmSerie from './Forms/FormAddAtorEmSerie';
import FormAddAtorEmFilme from './Forms/FormAddAtorEmFilme';
import FormAltSerie from './Forms/FormAltSerie';
import FormAltEpisodios from './Forms/FormAltEpisodio';
import { useState } from 'react';

function HomeAdm(props) {
    const [escolha1, setEscolha1] = useState("")

   const bzin = localStorage.getItem("usuario");
    const b = bzin ? JSON.parse(bzin) : null;
    let form = null;
    let listaUsuarios = null;

    if (b?.administrador === true) {

        if (escolha1 === "ator") {
            form = <FormAddAtor add={props.addAtor}/>
        } else if (escolha1 === "diretor") {
            form = <FormAddDiretor add={props.addDiretor}/>
        } else if (escolha1 === "serie") {
            form = <FormAddSerie add={props.addSerie} diretores={props.diretores}/>
        } else if (escolha1 === "filme") {
            form = <FormAddFilme add={props.addFilme} diretores={props.diretores}/>
        } else if (escolha1 === "episodio") {
            form = <FormAddEpisodios add={props.addEpisodio} series={props.series}/>
        } else if (escolha1 === "ator_serie") {
            form = <FormAddAtorEmSerie add={props.addAtorSerie} series={props.series} atores={props.atores}/>
        } else if (escolha1 === "ator_filme") {
            form = <FormAddAtorEmFilme add={props.addAtorFilme} filmes={props.filmes} atores={props.atores} />
        }

        listaUsuarios = <ListaUsuarios usuarios={props.usuarios} adm={props.adm}></ListaUsuarios>
    } else {
        return <h1>Página exclusiva para administradores, coisa que você não é</h1>
        /*a=<h1>Página exclusiva para administradores, coisa que você não é</h1>*/
    }

    return (
        <>
            <div>
                <div className='caixasEscolha'>
                    <label>Escolha qual componente você quer alterar:</label> <br />
                    <select value={escolha1} onChange={(e) => { setEscolha1(e.target.value) }}>
                        <option value={""}></option>
                        <option value={"ator"}>Ator</option>
                        <option value={"diretor"}>Diretor</option>
                        <option value={"serie"}>Série</option>
                        <option value={"filme"}>Filme</option>
                        <option value={"episodio"}>Episódio</option>
                        <option value={"ator_serie"}>Ator - Série</option>
                        <option value={"ator_filme"}>Ator - Filme</option>
                    </select> <br />

                    {form}

                </div>

                <div className='listaUsuarios'>
                    {listaUsuarios}
                </div>
            </div>
        </>
    )
}

export default HomeAdm;