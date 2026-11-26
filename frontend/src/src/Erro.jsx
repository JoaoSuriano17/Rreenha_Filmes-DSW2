import { useParams } from "react-router-dom"

function Erro(props){

    const {sla}=useParams()

    return(
        <>
            <p>Erro 404</p>
            <p>{sla} não é um caminho válido</p>
        </>
    )
}

export default Erro