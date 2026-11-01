import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {BsInstagram, BsTiktok, BsTwitterX, BsYoutube} from "react-icons/bs"

function Diretor(props){

    const {id}=useParams()

    const [diretor, setDiretor]=useState([])

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
                <a className="navbar-brand text-light">Navbar</a>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="search" type="submit">Search</button>
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