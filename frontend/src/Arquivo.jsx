import { useEffect, useState } from "react";

function Arquivo() {
  const [data, setData] = useState([]);

  // Usado para guardar o arquivo a ser enviado.
  const [arquivo, setArquivo] = useState(null);
  const [inp, setInput] = useState("");

  const [nome, setNome] = useState("")
  const [nacionalidade, setNacionalidade] = useState("")
  const [data_nasc, setData_nasc] = useState(Date)
  const [biografia, setBiografia] = useState("")
  const [qtde_premios, setQtde_premios] = useState(0)
  const [arquivoa, setArquivoa] = useState(null);
  const [inpa, setInputa] = useState("");

  const [nomed, setNomed] = useState("")
  const [nacionalidaded, setNacionalidaded] = useState("")
  const [data_nascd, setData_nascd] = useState(Date)
  const [biografiad, setBiografiad] = useState("")
  const [qtde_premiosd, setQtde_premiosd] = useState(0)
  const [arquivod, setArquivod] = useState(null);
  const [inpd, setInputd] = useState("");

  const [titulo, setTitulo] = useState("")
  const [diretor, setDiretor] = useState(0)
  const [sinopse, setSinopse] = useState("")
  const [faixa_etaria, setFaixa_etaria] = useState(0)
  const [duracao, setDuracao] = useState(0)
  const [qtde_premiosf, setQtde_premiosf] = useState(0)
  const [arquivof, setArquivof] = useState(null);
  const [inpf, setInputf] = useState("");

  async function carregarDados() {
    const res = await fetch(`http://localhost:3000/arquivo`);
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function resetForm(e) {
    if (e) {
      e.preventDefault();
    }
    setInput("");
    setArquivo(null);
  }

  async function cadastrar(e) {
    e.preventDefault();

    const formData = new FormData();
    console.log(arquivo)
    formData.append("arquivo", arquivo);

    let res = await fetch(`http://localhost:3000/arquivo`, { method: "POST", body: formData });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    alert("Cadastrado com sucesso!");
    resetForm();
    carregarDados();
  }

  async function cadastrar_ator(e){
    e.preventDefault()

    const formData = new FormData();

    formData.append("nome", nome);
    formData.append("nacionalidade", nacionalidade);
    formData.append("data_nascimento", data_nasc);
    formData.append("biografia", biografia);
    formData.append("qtde_premios", qtde_premios);
    formData.append("arquivo", arquivoa);

    let res = await fetch(`http://localhost:3000/ator`, { method: "POST", body: formData });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    resetForm();
    carregarDados();
  }

  async function cadastrar_diretor(e){
    e.preventDefault()

    const formData = new FormData();

    formData.append("nome", nomed);
    formData.append("nacionalidade", nacionalidaded);
    formData.append("data_nascimento", data_nascd);
    formData.append("biografia", biografiad);
    formData.append("qtde_premios", qtde_premiosd);
    formData.append("arquivo", arquivod);

    let res = await fetch(`http://localhost:3000/diretor`, { method: "POST", body: formData });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    resetForm();
    carregarDados();
  }

  async function cadastrar_filme(e){
    e.preventDefault()

    const formData = new FormData();

    formData.append("titulo", titulo);
    formData.append("diretor", diretor);
    formData.append("sinopse", sinopse);
    formData.append("faixa_etaria", faixa_etaria);
    formData.append("duracao", duracao);
    formData.append("qtde_premios", qtde_premiosf);
    formData.append("arquivo", arquivof);

    let res = await fetch(`http://localhost:3000/filme`, { method: "POST", body: formData });
    if (!res.ok) {
      const json = await res.json();
      alert(`Erro: ${json.msg}`);
      return;
    }
    resetForm();
    carregarDados();
  }



  function changeFile(e) {
    if (e.target.files.length > 0) {
      // Guarda os dados do arquivo.
      setArquivo(e.target.files[0]);
      // Guarda o nome do arquivo.
      setInput(e.target.files[0].name);
    }
  }

  function changeFilea(e) {
    if (e.target.files.length > 0) {
      setArquivoa(e.target.files[0]);
      setInputa(e.target.files[0].name);
    }
  }

  function changeFiled(e) {
    if (e.target.files.length > 0) {
      setArquivod(e.target.files[0]);
      setInputd(e.target.files[0].name);
    }
  }

  function changeFilef(e) {
    if (e.target.files.length > 0) {
      setArquivof(e.target.files[0]);
      setInputf(e.target.files[0].name);
    }
  }




  let fotos = [];
  if (data.length > 0) {
    for (let arquivo of data) {
      let item = (
        <div className="box my-5" data-id={arquivo.id} key={arquivo.id}>
          <article className="media">
            <div className="media-left">
              <figure className="image is-300x200">
                <img src={`http://localhost:3000/arquivo/${arquivo.id}`} alt="Image" />
              </figure>
            </div>
          </article>
        </div>
      );
      fotos.push(item);
    }
  }

  return (
    <>
      <main>
        <section className="columns">
          <div className="column is-1"></div>
          <div className="column my-5">

            <h1>Adicionar ator</h1>
            <form onSubmit={cadastrar_ator}>
              <input type="text" value={nome} onChange={(e)=>{setNome(e.target.value)}}/>
              <input type="text" value={nacionalidade} onChange={(e)=>{setNacionalidade(e.target.value)}}/>
              <input type="date" value={data_nasc} onChange={(e)=>{setData_nasc(e.target.value)}}/>
              <input type="text" value={biografia} onChange={(e)=>{setBiografia(e.target.value)}}/>
              <input type="number" value={qtde_premios} onChange={(e)=>{setQtde_premios(e.target.value)}}/>
              <input className="file-input" type="file" name="foto" accept="image/*" onChange={changeFilea}/>
              <span className="file-name">{inpa}</span>

              <button type="submit">Enviar</button>
            </form>

            <h1>Adicionar diretor</h1>
            <form onSubmit={cadastrar_diretor}>
              <input type="text" value={nomed} onChange={(e)=>{setNomed(e.target.value)}}/>
              <input type="text" value={nacionalidaded} onChange={(e)=>{setNacionalidaded(e.target.value)}}/>
              <input type="date" value={data_nascd} onChange={(e)=>{setData_nascd(e.target.value)}}/>
              <input type="text" value={biografiad} onChange={(e)=>{setBiografiad(e.target.value)}}/>
              <input type="number" value={qtde_premiosd} onChange={(e)=>{setQtde_premiosd(e.target.value)}}/>
              <input className="file-input" type="file" name="foto" accept="image/*" onChange={changeFiled}/>
              <span className="file-name">{inpd}</span>

              <button type="submit">Enviar</button>
            </form>

            <h1>Adicionar filme</h1>
            <form onSubmit={cadastrar_filme}>
              <input type="text" value={titulo} onChange={(e)=>{setTitulo(e.target.value)}}/>
              <input type="number" value={diretor} onChange={(e)=>{setDiretor(e.target.value)}}/>
              <input type="text" value={sinopse} onChange={(e)=>{setSinopse(e.target.value)}}/>
              <input type="number" value={faixa_etaria} onChange={(e)=>{setFaixa_etaria(e.target.value)}}/>
              <input type="number" value={duracao} onChange={(e)=>{setDuracao(e.target.value)}}/>
              <input type="number" value={qtde_premiosf} onChange={(e)=>{setQtde_premiosf(e.target.value)}}/>
              <input className="file-input" type="file" name="foto" accept="image/*" onChange={changeFilef}/>
              <span className="file-name">{inpf}</span>

              <button type="submit">Enviar</button>
            </form>

            <h1>Adiconar imagem no servidor</h1>
            <form onSubmit={cadastrar}>
              <div className="field">
                <label className="label">Envie sua imagem</label>
                <div className="file has-name is-fullwidth">
                  <label className="file-label">
                    <input className="file-input" type="file" name="foto" accept="image/*" onChange={changeFile}/>
                    <span className="file-label">Escolha uma foto</span>
                    <span className="file-name">{inp}</span>
                  </label>
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link" disabled={arquivo === null}>Enviar</button>
                </div>
                <div className="control">
                  <button className="button is-link is-light" onClick={resetForm}>Limpar</button>
                </div>
              </div>
            </form>
            
            <h2 className="subtitle has-text-centered">Imagens cadastradas</h2>
            {fotos}
          </div>
          <div className="column is-1"></div>
        </section>
      </main>
    </>
  );
}

export default Arquivo;
