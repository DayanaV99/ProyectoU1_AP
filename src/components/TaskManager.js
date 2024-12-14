import React, { useState, useEffect } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "../api/taskService";
import "./TaskManager.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateTask(currentTaskId, task);
      setEditing(false);
    } else {
      await addTask(task);
    }
    setTask({ title: "", description: "" });
    fetchTasks();
  };

  const handleEdit = (task) => {
    setTask(task);
    setEditing(true);
    setCurrentTaskId(task.id);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Proyecto Unidad 1</h1>
      <h6>Dayana Mishell Vergara Bravo</h6>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
        <input
          placeholder="Descripción"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          required
        ></input>
        <button type="submit" className="add-btn">
          {editing ? "Actualizar Tarea" : "Agregar Tarea"}
        </button>
      </form>

      {tasks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(task)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(task.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-tasks">No hay tareas disponibles.</p>
      )}
    </div>
  );
};

export default TaskManager;
