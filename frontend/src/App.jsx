import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  // Usado para guardar o arquivo a ser enviado.
  const [arquivo, setArquivo] = useState(null);
  const [inp, setInput] = useState("");

  const [nome, setNome] = useState("")
  const [nacionalidade, setNacionalidade] = useState("")
  const [data_nasc, setData_nasc] = useState(Date)
  const [biografia, setBiografia] = useState("")
  const [qtde_premios, setQtde_premios] = useState(0)
  const [arquivo2, setArquivo2] = useState(null);
  const [inp2, setInput2] = useState("");

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
    formData.append("arquivo", arquivo2);

    let res = await fetch(`http://localhost:3000/ator`, { method: "POST", body: formData });
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

  function changeFile2(e) {
    if (e.target.files.length > 0) {
      setArquivo2(e.target.files[0]);
      setInput2(e.target.files[0].name);
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
      <header>
        <section className="hero is-success">
          <div className="hero-body">
            <p className="title">EXEMPLO</p>
            <p className="subtitle">Exemplo de upload de arquivo</p>
          </div>
        </section>
      </header>
      <main>
        <section className="columns">
          <div className="column is-1"></div>
          <div className="column my-5">

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

        <h1>Adicionar ator</h1>
        <form onSubmit={cadastrar_ator}>
          <input type="text" value={nome} onChange={(e)=>{setNome(e.target.value)}}/>
          <input type="text" value={nacionalidade} onChange={(e)=>{setNacionalidade(e.target.value)}}/>
          <input type="date" value={data_nasc} onChange={(e)=>{setData_nasc(e.target.value)}}/>
          <input type="text" value={biografia} onChange={(e)=>{setBiografia(e.target.value)}}/>
          <input type="number" value={qtde_premios} onChange={(e)=>{setQtde_premios(e.target.value)}}/>
          <input className="file-input" type="file" name="foto" accept="image/*" onChange={changeFile2}/>
          <span className="file-name">{inp2}</span>

          <button type="submit">Enviar</button>
        </form>
      </main>
    </>
  );
}

export default App;
