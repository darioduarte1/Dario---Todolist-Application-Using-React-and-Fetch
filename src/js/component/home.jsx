import React from "react";
import Todolist from "./Todolist.jsx";


//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<Todolist/>
		</div>
	);
};

export default Home;