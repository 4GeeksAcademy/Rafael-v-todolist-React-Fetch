import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [lista, setLista] = useState([])
	const [tarea, setTarea] = useState("")

	const mostrarTarea = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/rafa")
			console.log(response)
			if (response.status == 404) {
				crearUsuario()
				return
			}
			const data = await response.json()
			console.log(data.todos)
			setLista(data.todos)
		} catch (error) {
			console.log(error)
		}
	}
	const crearUsuario = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/rafa",{
				method:"POST",
				headers:{"Content-Type":"application/json"}
			})
			console.log (response)
		} catch (error) {
			console.log(error)
		}
	}


	const agregarTarea = (e) => {
		e.preventDefault()
		// console.log(tarea)
		setLista([...lista, tarea])
		setTarea("")
	}

	const borrarTarea = (index) => {
		let newList = lista.filter((item, i) => i !== index);
		setLista(newList)
	}

	useEffect(() => {
		mostrarTarea()
	}, [])

	return (
		<div className="text-center container">
			<h2>to do list</h2>
			{/* grega tareas a nuestra lista */}
			<input className="form-control"
				value={tarea}
				onChange={(e) => setTarea(e.target.value)}
				onKeyDownCapture={(e) => e.key === "Enter" ? agregarTarea(e) : null}
			/>

			{/* muestra la lista de tareas */}
			<ul className="list-group mt-3">
				{lista.map((tarea, index) => ( //map recorre mi array uno x uno que recorra la lista
					<li className="list-group-item" key={index}>          {/* // colocamos key por el map  */}
						{tarea.label}
						{/* borrar tareas */}
						<button className="btn btn-outline-danger float-end icono" onClick={() => borrarTarea(index)}>X</button>
					</li>

				))}


			</ul>

			<p>tareas pendientes: {lista.length}</p>

		</div>
	);
};

export default Home;