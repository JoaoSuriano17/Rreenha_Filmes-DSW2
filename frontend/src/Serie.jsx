import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

function Serie(props){

    const {id}=useParams()

    const [serie, setSerie]=useState([])
    const [diretor, setDiretor]=useState([])

    const navigate=useNavigate()

    useEffect(()=>{
        async function pegar_serie(){
            try{
                const r=await props.serie(id)
                if (r==null){
                    alert("Não existe série com esse id")
                    return false;
                }
                console.log(r)
                setSerie(r.serie)
            }catch(erro){
                console.log("Erro"+erro)
            }
        }

        async function pegar_diretor(){
            try{
                const r=await props.serie(id)
                const r2=await props.diretor(r.serie.diretor)
                console.log(r2)
                setDiretor(r2.diretor)
            }catch(erro){
                console.log("Erro"+erro)
            }
        }
    
        if (isNaN(id)){
            console.log("O id deve ser um número inteiro")
        }else{
            pegar_serie()
            pegar_diretor()
        }
    }, [])

    return(
        <>
            <p className="categoria">Série</p>
            <div className="grid-filme">
                <h1 className="titulo">{serie.titulo}</h1>
                <div className="combo">
                    <img src={`http://localhost:3000/arquivo/${serie.cartaz}`} alt="Image" className="cartaz" />
                    <h5>Sinopse: <br/> <span className="sinopse">{serie.sinopse}</span></h5>
                </div>
                <div className="">
                    <button className="listaeps" onClick={()=>{navigate(`/serie/${serie.id}/episodios`)}}>Ver a lista de episódios</button>
                    <hr></hr>
                    <p><b>Faixa etária:</b> {serie.faixa_etaria} anos</p>
                    <hr></hr>
                    <p><b>Quantidade de prêmios:</b> {serie.qtde_premios}</p>
                    <hr></hr>
                    <p><b>Diretor:</b> <Link className="link" to={"/diretor/"+diretor.id}>{diretor.nome}</Link></p>
                </div>
            </div>
        </>
    )
}

export default Serie