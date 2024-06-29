import React, { useEffect, useState } from "react";

const Todolist = () => {
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");
    const [tareaEditando, setTareaEditando] = useState(null);

    // Crear usuario
    async function crearUsuario() {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/usuarioprueba", {
                method: "POST"
            });
            if (!response.ok) {
                throw new Error("Error creando el usuario");
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    // Traer tareas
    async function traerTareas() {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/usuarioprueba", {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error("Error al traer las tareas");
            }
            const data = await response.json();
            setTareas(data.todos);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    // Crear tareas
    async function crearTareas() {
        const todo = { label: nuevaTarea, is_done: false };
        try {
            const response = await fetch("https://playground.4geeks.com/todo/todos/usuarioprueba", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(todo)
            });
            if (!response.ok) {
                throw new Error("Error al crear la tarea");
            }
            traerTareas();
            setNuevaTarea("");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    // Borrar tareas
    async function borrarTareas(item) {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("Error al borrar la tarea");
            }
            traerTareas();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    // Actualizar tareas
    async function actualizarTareas(item) {
        const updateTodo = { ...item, label: nuevaTarea };
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(updateTodo)
            });
            if (!response.ok) {
                throw new Error("Error al actualizar la tarea");
            }
            traerTareas();
            setNuevaTarea("");
            setTareaEditando(null);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    // Editar tarea
    function editarTarea(item) {
        setTareaEditando(item);
        setNuevaTarea(item.label);
    };

    useEffect(() => {
        crearUsuario();
        traerTareas();
    }, []);

    return (
        <div>
            <div id="todolist-container">
                <h1>TodoList de usuarioprueba</h1>
                <input
                    type="text"
                    placeholder="Escribe tu tarea aquí"
                    onChange={(e) => setNuevaTarea(e.target.value)}
                    value={nuevaTarea}
                />
                <button onClick={() => tareaEditando ? actualizarTareas(tareaEditando) : crearTareas()}>
                    {tareaEditando ? "Actualizar tarea" : "Crear tarea"}
                </button>
                {tareas.map((item) => (
                    <div key={item.id}>
                        <h4>{item.label}</h4>
                        <button onClick={() => borrarTareas(item)}>Eliminar</button>
                        <button onClick={() => editarTarea(item)}>Editar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Todolist;