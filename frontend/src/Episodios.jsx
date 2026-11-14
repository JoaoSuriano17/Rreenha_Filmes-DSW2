import { useEffect, useState } from "react"
import { BsArrowLeft } from "react-icons/bs"
import { Link, useParams } from "react-router-dom"

function Episodios(props){

    const {id}=useParams()

    const [serie, setSerie]=useState([])
    const [episodios, setEpisodios] = useState([])
    const [temporada, setTemporada] = useState(1);

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

        async function pegar_episodios(){
            try{
                const r=await props.episodios(id)
                if (r==null){
                    alert("A série não tem nenhum episódio")
                    return false;
                }
                console.log(r)
                setEpisodios(r.episodios)
            }catch(erro){
                console.log("Erro"+erro)
            }
        }
        
        if (isNaN(id)){
            console.log("O id deve ser um número inteiro")
        }else{
            pegar_serie()
            pegar_episodios()
        }
    }, [])

    return(
        <>
            <div className="grid-episodios">
                <div className="cabecalhoeps">
                    <Link className="link voltar" to={"/serie/"+serie.id}><BsArrowLeft /> Voltar</Link>
                    <div className="d-flex">
                        <img src={`http://localhost:3000/arquivo/${serie.cartaz}`} alt="Image"/>
                        <div>
                            <h4 className="tserie">{serie.titulo}</h4>
                            <h2>Lista de episódios</h2>
                        </div>
                    </div>
                </div>
                <div className="temporadas">
                    {[...new Set(episodios?.map(ep => ep.temporada))].map(numero => (
                        <button key={numero} className={temporada === numero ? "ativo" : ""} onClick={() => setTemporada(numero)}>{numero}</button>
                    ))}
                </div>
                <div className="episodios">
                    {episodios?.filter(episodio => episodio.temporada === temporada).map((episodio, index) => (
                        <div className="ep" key={episodio.id ?? index}>
                            <div className="card-body">
                                <h5 className="card-title">T{episodio.temporada}.E{index+1} - {episodio.titulo}</h5>
                                <p className="card-text">{episodio.duracao} minutos</p>
                                <p className="card-text">{episodio.sinopse}</p>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Episodios