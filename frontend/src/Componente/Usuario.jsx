import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import FormEditarUsuario from "../Forms/FormEditarUsuario";

function Usuario(props) {
    const userInfo = JSON.parse(localStorage.getItem("usuario"));
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [editar, setEditar] = useState(false)

    if (!userInfo) {
        return (
            <><Link to={"/"}>Voltar</Link>
                <h5>Você precisa estar logado para acessar essa rota</h5></>
        )

    }

    if (props.usuarios.length == 0) {
        return (<h5>Carregando ...</h5>)
    }

    const user = props.usuarios.find(a => a.id == userInfo.id);
    if (!user) {
        return (<h5>Carregando ...</h5>)
    }

    let form;
    if(editar){
        form=<FormEditarUsuario edit={props.edit}/>
    }
    /*
    function criarForm() {
        form = 
        <form onSubmit={(e)=> {e.preventDefault(); alert("AAAA CONSEGUI"); form = <></>}}>
            <label htmlFor="email">Nome</label>
            <input id="email" type="text" name="email" value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="username" className="input_usuario" />

            <label htmlFor="password">Senha</label>
            <input id="password" type="password" name="password" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="new-password" className="input_usuario" />
        </form>
    }
    */


    return (
        <>
            <h1>{user.email}</h1>
            <img src={user.fotografia != null ? `http://localhost:3000/arquivo/${user.fotografia}` : "https://png.pngtree.com/png-vector/20250227/ourlarge/pngtree-user-profile-avatar-with-horns-vector-png-image_15605623.png"} onError={(e) => { e.currentTarget.style.display = 'none'; }} alt="Image" className='imagem_catalogo_pessoa' />
            <h5>Nome: {user.nome}</h5>
            <h5>Administrador: {user.administrador}</h5>
            <h5>Crítico: {user.critico}</h5>
            {/*Formulário para alterar - fazer algumas alterações*/}
            <button onClick={(e)=>{e.preventDefault(); setEditar(!editar)}}>Editar</button>
            {form}
        </>
    )
}

export default Usuario;