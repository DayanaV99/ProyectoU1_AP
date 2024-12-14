const API_URL = "https://ngv7ibebva.execute-api.us-east-1.amazonaws.com";


export const getTasks = async () => {
    const response = await fetch(`${API_URL}/tasks`);
    const data = await response.json();
    return data.body && data.body.tasks ? data.body.tasks : []; // Devuelve un arreglo vacío si no hay tareas
  };
  
  export const addTask = async (task) => {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return await response.json();
  };
  
  export const updateTask = async (id, task) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return await response.json();
  };
  
  export const deleteTask = async (id) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  };
  