import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Filme(props){

    const {id}=useParams()

    const [filme, setFilme]=useState([])
    const [diretor, setDiretor]=useState([])

    useEffect(()=>{
        async function pegar_filme(){
            try{
                const r=await props.filme(id)
                if (r==null){
                    alert("Não existe filme com esse id")
                    return false;
                }
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
            <p className="categoria">Filme</p>
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

            <div className="grid-atores">
                <h2><span className="blue">|</span> Elenco Principal</h2>

            </div>
        </>
    )
}

export default Filme;