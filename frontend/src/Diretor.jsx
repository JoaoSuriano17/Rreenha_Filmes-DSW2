import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Diretor(props){
    const { id } = useParams()
    const [ab, setAb] = useState(null);

    useEffect(() => {
        async function a() {
            const r = await props.diretor(id);
            setAb(r);
        }

        a();
    }, [id]);

    return(
        <>
            <p className="categoria">Diretor(a)</p>
            <div className="grid-filme">
                <h1 className="titulo">{ab.nome}</h1>
                <div className="combo">
                    <img src={ab.fotografia != null ? `http://localhost:3000/arquivo/${ab.fotografia}`: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlpiGLqA9GhqWx1nWZgjwmfm8IcuDv6gNcvdamF50Hg&s=10"} onError={(e) => {e.currentTarget.style.display = 'none';}} alt="Image" className='imagem_catalogo_pessoa' />
                    <h5>Biografia: <br/> <span className="sinopse">{ab.biografia}</span></h5>
                </div>
                <div className="">
                    <hr></hr>
                    <p><b>Nacionalidae:</b> {ab.nacionalidade}</p>
                    <hr></hr>
                    <p><b>Data de nascimento: </b> {new Date(ab.data_nascimento).toLocaleDateString("pt-BR", {timeZone: "UTC"})}</p>
                    <hr></hr>
                    <p><b>Quantidade de prêmios: </b> {ab.qtde_premios} prêmios</p>
                </div>
            </div>
        </>
    )
}

export default Diretor;