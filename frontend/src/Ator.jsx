import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {BsInstagram, BsTiktok, BsTwitterX, BsYoutube} from "react-icons/bs"

function Ator(props){

    const {id}=useParams()

    const [ator, setAtor]=useState([])

    useEffect(()=>{
        async function pegar_ator(){
            try{
                const r=await props.ator(id)
                console.log(r)
                setAtor(r.ator)
            }catch(erro){
                console.log("Erro"+erro)
            }
        }
    
        if (isNaN(id)){
            console.log("O id deve ser um número inteiro")
        }else{
            pegar_ator()
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
                <h1 className="titulo">{ator.nome}</h1>
                <div className="combo">
                    <img src={`http://localhost:3000/arquivo/${ator.fotografia}`} alt="Image" className="cartaz" />
                    <h5>Biografia: <br/> <span className="sinopse">{ator.biografia}</span></h5>
                </div>
                <div className="">
                    <hr></hr>
                    <p><b>Nacionalidae:</b> {ator.nacionalidade}</p>
                    <hr></hr>
                    <p><b>Data de nascimento: </b> {new Date(ator.data_nascimento).toLocaleDateString("pt-BR", {timeZone: "UTC"})}</p>
                    <hr></hr>
                    <p><b>Quantidade de prêmios: </b> {ator.qtde_premios} prêmios</p>
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

export default Ator;