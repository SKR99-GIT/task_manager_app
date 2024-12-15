import React, { useEffect, useState } from 'react'
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import axios from 'axios';

const Home = () => {
    // State management for tabs, tasks, and editing
    const [tab, setTab] = useState(1);
    const [task, setTask] = useState('');
    const [desc, setDesc] = useState('');
    const [todos, setTodos] = useState([]); 
    const [edit, setEdit] = useState(false); 

    // Switch between task list tabs
    const handleTabs = (tab) => {
        setTab(tab);
    };

    // Add or update task via API
    const handleAddTask = (e) => {
        e.preventDefault();
    
        // Update existing task or create new task
        if (edit) {
            axios.put(`http://localhost:5000/update/${edit}`, { task, desc })
                .then(res => {
                    setTodos(res.data.tasks);
                    setTask('');
                    setDesc('');
                    setEdit(false);
                })
                .catch(err => console.error("Error updating task:", err));
        } else {
            axios.post('http://localhost:5000/add', { task, desc })
                .then(res => {
                    setTodos(res.data.tasks);
                    setTask('');
                    setDesc('');
                })
                .catch(err => console.error("Error adding task:", err));
        }
    };    

    // Delete task via API
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/delete/${id}`)
            .then(res => {
                setTodos(res.data.tasks);
            })
            .catch(err => console.error("Error deleting task:", err));
    };
    
    // Fetch tasks on component mount
    useEffect(() => {
        axios.get('http://localhost:5000/show')
            .then(res => {
                if (Array.isArray(res.data)) {
                    setTodos(res.data);
                }
            })
            .catch(err => console.error("Error fetching tasks:", err));
    }, []);

    // Prepare task for editing
    const handleEdit = (id, task_name, description) => {
        setEdit(id);
        setTask(task_name);
        setDesc(description);
    };

    // Mark task as complete via API
    const handleComplete = (id) => {
        axios.put(`http://localhost:5000/update-status/${id}`)
            .then(res => {
                setTodos(res.data.tasks);
            })
            .catch(err => console.error("Error updating task status:", err));
    };
    
    // Render task manager UI with input form and task lists
    return (
        <div className="text-gray-700 h-screen p-4">
            {/* Task input and tab navigation */}
            <div className='flex flex-col items-center'>
                {/* App header */}
                <div className="w-full max-w-4xl mb-4 text-center">
                    <h1 className="text-4xl font-bold text-purple-800">Task Manager</h1>
                </div>

                {/* Task input form */}
                <div className="w-full max-w-4xl bg-purple-900 p-6 rounded-lg grid grid-cols-4 gap-4">
                    {/* Task name and description inputs */}
                    <div className="col-span-4">
                        <input
                            value={task}
                            onChange={e => setTask(e.target.value)}
                            type="text"
                            placeholder="Task name"
                            name="title"
                            className="px-4 py-2 rounded-lg w-full bg-gray-200 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    <div className="col-span-4">
                        <textarea
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                            placeholder="Enter your description"
                            name="desc"
                            className="px-4 py-2 rounded-lg w-full h-24 bg-gray-200 text-gray-800 border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
                        ></textarea>
                    </div>
                    <div className="col-span-4 flex justify-end">
                    <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-lg rounded-lg shadow-md transition-all" onClick={handleAddTask}>
                    {edit ? 'Update' : 'Add'}
                    </button>
                    </div>
                </div>

                {/* Task list tabs */}
                <div className='flex text-base font-extrabold mt-5 gap-52 justify-evenly'>
                    <p className={`${tab === 1 ? 'text-yellow-600' : 'text-gray-800'} cursor-pointer`} onClick={() => handleTabs(1)}>All Tasks</p>
                    <p className={`${tab === 2 ? 'text-yellow-600' : 'text-gray-800'} cursor-pointer`} onClick={() => handleTabs(2)}>Not Completed Tasks</p>
                    <p className={`${tab === 3 ? 'text-yellow-600' : 'text-gray-800'} cursor-pointer`} onClick={() => handleTabs(3)}>Completed Tasks</p>
                </div>
            </div>

            {/* Tasks display section with conditional rendering based on selected tab */}
            <div className='grid grid-cols-3 gap-4 p-4'>
                {/* All Tasks Tab */}
                {tab == 1 && todos?.map((todo, index) => (
                    <div key={index} className='flex flex-col justify-between bg-gray-300 rounded-md p-4 hover:rounded-2xl transition-all duration-300 hover:bg-purple-300 border-4 border-purple-500'>
                        {/* Task details and action buttons */}
                        <div>
                            <h3 className='text-xl text-purple-700 font-semibold'>{todo?.task_name}</h3>
                            <p className='text-gray-600 my-2'>{todo?.description}</p>
                            <p  className={`text-lg font-semibold ${todo?.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}`}> {todo?.status }</p>
                        </div>
                        <div className='mt-4 w-full flex items-center'>
                            <div className='text-purple-700 p-2 w-3/6 text-2xl font-semibold flex justify-around ml-52'>
                                <button className='hover:scale-125 transition-all duration-300' onClick={() => handleEdit(todo.id, todo.task_name, todo.description)}><BiEdit /></button>
                                <button className='hover:scale-125 transition-all duration-300' onClick={() => handleDelete(todo.id)}><MdDeleteOutline /></button>
                                <button className='hover:scale-125 transition-all duration-300' onClick={() => handleComplete(todo.id)}><FaRegCheckCircle /></button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Not Completed Tasks Tab */}
                {tab == 2 && todos?.filter(todo => todo.status == "Not Completed").map((todo, index) => (
                    // Similar structure to All Tasks, but filtered
                    <div key={index} className='flex flex-col justify-between bg-gray-300 rounded-md p-4 hover:rounded-2xl transition-all duration-300 hover:bg-purple-300 border-4 border-purple-500'>
                        {/* Task details and action buttons */}
                        <div>
                            <h3 className='text-xl text-purple-700 font-semibold'>{todo?.task_name}</h3>
                            <p className='text-gray-600 my-2'>{todo?.description}</p>
                            <p  className={`text-lg font-semibold ${todo?.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}`}> {todo?.status }</p>
                        </div>
                        <div className='mt-4 w-full flex items-center'>
                            <div className='text-purple-700 p-2 w-3/6 text-2xl font-semibold flex justify-around ml-52'>
                                <button className='hover:scale-125 transition-all duration-300' onClick={() => handleEdit(todo.id, todo.task_name, todo.description)}><BiEdit /></button>
                                <button className='hover:scale-125 transition-all duration-300' onClick={() => handleDelete(todo.id)}><MdDeleteOutline /></button>
                                <button className='hover:scale-125 transition-all duration-300' onClick={() => handleComplete(todo.id)}><FaRegCheckCircle /></button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Completed Tasks Tab */}
                {tab == 3 && todos?.filter(todo => todo.status == "Completed").map((todo, index) => (
                    // Similar structure, but only shows delete button
                    <div key={index} className='flex flex-col justify-between bg-gray-300 rounded-md p-4 hover:rounded-2xl transition-all duration-300 hover:bg-purple-300 border-4 border-purple-500'>
                        {/* Task details and delete action button */}
                        <div>
                            <h3 className='text-xl text-purple-700 font-semibold'>{todo?.task_name}</h3>
                            <p className='text-gray-600 my-2'>{todo?.description}</p>
                            <p  className={`text-lg font-semibold ${todo?.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}`}> {todo?.status }</p>
                        </div>
                        <div className='mt-4 w-full flex items-center'>
                            <div className='text-purple-700 p-2 w-3/6 text-2xl font-semibold flex justify-around ml-52'>
                                <button className='hover:scale-125 transition-all duration-300' onClick={() => handleDelete(todo.id)}><MdDeleteOutline /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;