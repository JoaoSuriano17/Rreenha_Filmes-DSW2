import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {BsInstagram, BsSearch, BsTiktok, BsTwitterX, BsYoutube} from "react-icons/bs"

function Diretor(props){

    const {id}=useParams()

    const [diretor, setDiretor]=useState([])

    const [search, setSearch]=useState("")

    const navigate = useNavigate();

    async function pesquisar(e) {
    e.preventDefault();

    try {
        const titulo = await props.titulo(search);
        if (titulo != null) {
            navigate("/filme/" + titulo);
            return;
        }

        const ator = await props.nomea(search);
        if (ator != null) {
            navigate("/ator/" + ator);
            return;
        }

        const diretor = await props.nomed(search);
        if (diretor != null) {
            navigate("/diretor/" + diretor);
            return;
        }

        alert("Não há nada cadastrado com esse nome");
    } catch (erro) {
        console.log("Erro na pesquisa:", erro);
        alert("Ocorreu um erro ao realizar a pesquisa");
    }
}

    useEffect(()=>{
        async function pegar_diretor(){
            try{
                const r=await props.diretor(id)
                console.log(r)
                setDiretor(r.diretor)
            }catch(erro){
                console.log("Erro"+erro)
            }
        }
    
        if (isNaN(id)){
            console.log("O id deve ser um número inteiro")
        }else{
            pegar_diretor()
        }

    }, [])

    return(
        <>
           <nav className="navbar bg-black fg-2">
                <div className="container-fluid">
                <Link to={"/"} className="link Rreenha">Rreenha Filmes</Link>
                <form className="d-flex" role="search" onSubmit={pesquisar}>
                    <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                    <button className="search" type="submit"><BsSearch></BsSearch></button>
                </form>
                </div>
            </nav>

            <div className="grid-filme">
                <h1 className="titulo">{diretor.nome}</h1>
                <div className="combo">
                    <img src={`http://localhost:3000/arquivo/${diretor.fotografia}`} alt="Image" className="cartaz" />
                    <h5>Biografia: <br/> <span className="sinopse">{diretor.biografia}</span></h5>
                </div>
                <div className="">
                    <hr></hr>
                    <p><b>Nacionalidae:</b> {diretor.nacionalidade}</p>
                    <hr></hr>
                    <p><b>Data de nascimento: </b> {new Date(diretor.data_nascimento).toLocaleDateString("pt-BR", {timeZone: "UTC"})}</p>
                    <hr></hr>
                    <p><b>Quantidade de prêmios: </b> {diretor.qtde_premios} prêmios</p>
                </div>
            </div>

            <footer>
                <div className='redes-footer'>
                    <span>Nos siga nas nossas redes sociais</span>
                    <div className='redes-icones'>
                        <BsYoutube></BsYoutube>
                        <BsTiktok></BsTiktok>
                        <BsInstagram></BsInstagram>
                        <BsTwitterX></BsTwitterX>
                    </div>
                </div>

                <span className='cop'>©2026. Rreenha_Filmes. Todos os direitos reservados.</span>
            </footer>
        </>
    )
}

export default Diretor;