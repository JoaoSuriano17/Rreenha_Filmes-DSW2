import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
            <p className="categoria">Diretor(a)</p>
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
        </>
    )
}

export default Diretor;