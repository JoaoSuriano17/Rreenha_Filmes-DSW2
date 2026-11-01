import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {BsInstagram, BsSearch, BsTiktok, BsTwitterX, BsYoutube} from "react-icons/bs"

function Filme(props){

    const {id}=useParams()

    const [filme, setFilme]=useState([])
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
        async function pegar_filme(){
            try{
                const r=await props.filme(id)
                console.log(r)
                setFilme(r.filme)
            }catch(erro){
                console.log("Erro"+erro)
            }
        }

        async function pegar_diretor(){
            try{
                const r=await props.filme(id)
                const r2=await props.diretor(r.filme.diretor)
                console.log(r2)
                setDiretor(r2.diretor)
            }catch(erro){
                console.log("Erro"+erro)
            }
        }
    
        if (isNaN(id)){
            console.log("O id deve ser um número inteiro")
        }else{
            pegar_filme()
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
                <h1 className="titulo">{filme.titulo}</h1>
                <div className="combo">
                    <img src={`http://localhost:3000/arquivo/${filme.cartaz}`} alt="Image" className="cartaz" />
                    <h5>Sinopse: <br/> <span className="sinopse">{filme.sinopse}</span></h5>
                </div>
                <div className="">
                    <hr></hr>
                    <p><b>Duração:</b> {filme.duracao} minutos</p>
                    <hr></hr>
                    <p><b>Faixa etária:</b> {filme.faixa_etaria} anos</p>
                    <hr></hr>
                    <p><b>Quantidade de prêmios:</b> {filme.qtde_premios}</p>
                    <hr></hr>
                    <p><b>Diretor:</b> <Link className="link" to={"/diretor/"+diretor.id}>{diretor.nome}</Link></p>
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

export default Filme;