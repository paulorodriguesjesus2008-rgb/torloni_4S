// imports
import editIcon from "./assets/edit-icon.svg";
import trashIcon from "./assets/trash-icon.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // states e variáveis

  // ------ ATIVIDADE -------
  // criar um state chamado
  // tasklist como iniciando com um array de
  // objetos [{id: 1, descricao: "zuuuz"}]
  // já preenchido com 4 tarefas

  // em seguida fazer um map e gerar os cards (article)
  // com todas as tarefas

  const [tasklist, setTasklist] = useState([]);

  // funções e effects
  // CRUD

  // Read (Get)
  const getTaks = async () => {
    try {
      // chamar a api
      const APIReturn = await axios.get("http://localhost:3000/taskpoin")
      const dataAPI = await APIReturn.data 
      console.log(dataAPI);
      
      // e armazenar os dados no state (tasklist)
      setTasklist(dataAPI)
    } catch (error) {
      alert("Erro ao carregar os dados")
      console.log(error);
    }
  }
  
  // Create (Post)
  const createTaks = () => {}
  
  // Update (Put/Patch)
  const putTask = () => {}
  
  // Delete (Delete)
  const deleteTask = () => {}

  // roda na montagem do componente - ciclo de vida dos componentes React
  useEffect(()=>{
    getTaks()
  }, [])

  return (
    <>
      <header className="header-section">
        <h1 className="header-section__title">React List</h1>
      </header>

      <main className="body-section">
        <form className="cad-task">
          <input
            type="text"
            className="cad-task__entry"
            placeholder="Adicione uma tarefa"
          />
          <button className="cad-task__btn-confirm">Adicionar</button>
        </form>

        <section className="cardlist">
          {tasklist.map((task) => {
            return (
              <article className="cardtask" key={task.id}>
                <p className="cardtask__task-text">
                  {task.descricao}
                </p>

                <div className="cardtask__icon-box">
                  <div className="cardlist__icon">
                    <img
                      src={editIcon}
                      alt="Imagem de uma caneta - ação editar tarefa"
                    />
                  </div>
                  <div className="cardlist__icon">
                    <img
                      src={trashIcon}
                      alt="Imagem de uma lixeira - ação excluir tarefa"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      <footer className="footer-section">
        <p className="footer-section__right-text">
          2026 React List - Todos os direitos reservados
        </p>
      </footer>
    </>
  );
}

export default App;
