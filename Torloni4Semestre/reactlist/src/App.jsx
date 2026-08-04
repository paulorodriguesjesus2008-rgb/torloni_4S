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

  //representa a lista de tarefas em arrauy objetos
  const [tasklist, setTasklist] = useState([]);

  // representa o dado digitado no input
  const [taskValue, setTaskValue] = useState("")

  // mode de edição true / false
  const [editMode, seteditMode] = useState(false)

  // id da tarefa  ase editado
  const [idtoEdit, setIdToEdit] = useState(0)

  // funções e effects
  // CRUD

  // Read (Get)
  const getTasks = async () => {
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
  const createTask = async (e) => {
    e.preventDefault();

    if (taskValue.trim().length == 0) {
      alert("Digite uma tarefa!");
      return false;
    }

    try {
      await axios.post("http://localhost:3000/taskpoin", {
        descricao: taskValue,
      });

      setTaskValue(""); // limpa o input
      getTasks(); // atualiza a lista
    } catch (error) {
      console.log(error);
      alert("Erro ao cadastrar a tarefa!");
    }
  };

  // Update (Put/Patch)
  const putTask = (taskItem) => {
    setTaskValue(taskItem.descricao);
    seteditMode(true);
    setIdToEdit(taskItem.id)
  }
  const confirmPutTask = async (e) => {
   e.preventDefault()
    if (taskValue.trim().length == 0) {
      alert("Preencha a tarefa correntamente")
      return false
    }
  
  try {
    axios.put(`http://localhost:3000/taskpoin/${idtoEdit}`, {
      descricao: taskValue,
    })
    alert ("A tarefa foi editada")
    getTasks()

    seteditMode(false)
    setIdToEdit(0)
    setTaskValue("")

  
} catch (error) {
    alert ("erro ao editar")
    console.log(error)
  } 
};



  // Delete (Delete)
  const deleteTask = async (taskItem) => {
    const querApagar = confirm(`Quer realmente apagar ${taskItem.descricao}`)

    if (!querApagar) return false

    try {
      await axios.delete(`http://localhost:3000/taskpoin/${taskItem.id}`);
      alert("Tarefa apagada com sucesso!")
      getTasks();

    } catch (error) {
      console.log(error);
      alert("Erro ao deletar a tarefa")
    }
  }

  // roda na montagem do componente - ciclo de vida dos componentes React
  useEffect(() => {
    getTasks()
  }, [])

  return (
    <>
      <header className="header-section">
        <h1 className="header-section__title">React List</h1>
      </header>

      <main className="body-section">
        <form className="cad-task" onSubmit={editMode ? confirmPutTask : createTask}>
          <input
            type="text"
            className="cad-task__entry"
            placeholder="Adicione uma tarefa"
            value={taskValue}
            onChange={(e) => {
              setTaskValue(e.target.value)
            }}
          />
          <p>State: {taskValue}</p>
          <p>Id para Editar: {idtoEdit} </p>
          <button className="cad-task__btn-confirm">Adicionar

          </button>
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
                      onClick={() => {
                        putTask(task)
                      }}
                    />
                  </div>
                  <div className="cardlist__icon">
                    <img
                      src={trashIcon}
                      alt="Imagem de uma lixeira - ação excluir tarefa"
                      onClick={() => {
                        deleteTask(task)
                      }}
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

