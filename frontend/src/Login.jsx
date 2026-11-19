import { useState } from "react";
import { Link } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function enviar(e){
        e.preventDefault();
        props.login(email, senha)
    };

    return (
        <>
            <div className="hero-especial">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="false">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src="Imagens/naruto-hero.jpg" alt="Banner do Naruto"/>
                    </div>
                    <div className="carousel-item">
                    <img src="Imagens/Minecraft-hero.webp" alt="Banner do filme do Minecraft"/>
                    </div>
                    <div className="carousel-item">
                    <img src="Imagens/homem_aranha-hero.jpeg" alt="Banner do Homem Aranha Um Novo Dia"/>
                    </div>
                </div>

                <div className="hero-content-especial">
                    <div className="tudo">
                        <div className="tamanho">
                            <h2 className="text-center">Faça login</h2>
                        </div>

                        <div className="tamanho">
                            <form onSubmit={enviar} className="formulario">
                                <div className="inputs">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" className="input_usuario"/>

                                    <label htmlFor="password">Senha</label>
                                    <input id="password" type="password" name="password" value={senha} onChange={(e) => setSenha(e.target.value)} required autoComplete="new-password" className="input_usuario"/>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn_enviar">Fazer login</button>
                                </div>

                                <p className="text-center">
                                    Ainda não possui uma conta?
                                    <Link to={"/cadastro"}>Cadastrar</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active bg-gray" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2" className="bg-gray"></button>
                    <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2" aria-label="Slide 3" className="bg-gray"></button>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default Login;
