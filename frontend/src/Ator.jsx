import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
            <p className="categoria">Ator(a)</p>
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
        </>
    )
}

export default Ator;