import React, {useState, useCallback} from 'react'
import './SharedTasks.scss'
import axios from 'axios'
import { useEffect } from 'react'

const SharedTasks = () => {

    const [groups, setGroups] = useState([])
    
    const [sharedTasks, setSharedTasks] = useState([])
    const [currentGroup, setCurrentGroup] = useState('')
    const [text, setText] = useState('')
    const {userId} = 'something'
{/* const {userId} = currentGroup._id */ }
{/* this shoule be the case actually */}
    const onOptionChangeHandler = (event) => {
        setCurrentGroup(event.target.value)
    }

    {/* here we using the exact same logic for creating and modifying TODOS, but this time, our userId 
        with wich we will be using for searching, creating the todos is actually an a groupId*/}

    const getGroup = useCallback(async () =>{
        try {
            await axios.get('api/group', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId}
            })
            .then((response) => setGroups(response.data))
        } catch (error) {
            console.log(error)
        }
    }, [userId])

    const getTodo = useCallback(async () =>{
        try {
            await axios.get('api/sharedtodo', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId}
            })
            .then((response) => setSharedTasks(response.data))
        } catch (error) {
            console.log(error)
        }
    }, [userId])


    const createTodo = useCallback(async () => {
        if(!text) return null
        try {
            await axios.post('api/sharedtodo/add', {text : text, userId: userId}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                setSharedTasks([...sharedTasks], response.data)
                setText('')
                getTodo()
            })
        } catch (error) {
            console.log(error)
        }
    }, [text, userId, sharedTasks, getTodo])

    const removeTodos = useCallback(async (id) =>{
        try {
            await axios.delete(`api/sharedtodo/delete/${id}`, {id}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => getTodo())
        } catch (error) {
            console.log(error)
        }
    }, [getTodo])

    const completedTodo = useCallback(async (id) => {
        try {
            await axios.put(`api/sharedtodo/complete/${id}`, {id}, {
                headers: {
                    'Content-Type': 'application/json'
                } 
            })
            .then(response => {
                setSharedTasks([...sharedTasks], response.data)
                getTodo()
            })
        } catch (error) {
            console.log(error)
        }
    }, [getTodo, sharedTasks])

    const importantTodo = useCallback(async (id) => {
        try {
            await axios.put(`api/sharedtodo/important/${id}`, {id}, {
                headers: {
                    'Content-Type': 'application/json'
                } 
            })
            .then(response => {
                setSharedTasks([...sharedTasks], response.data)
                getTodo()
            })
        } catch (error) {
            console.log(error)
        }
    }, [getTodo, sharedTasks])

    useEffect(() => {
        getGroup()
    }, [getGroup])

    return(
        <div className='container'>
            <div className='main-page'>
    
            <h3>Select a group</h3>
            
                <div className="todos">
                <form>
            <select onChange={onOptionChangeHandler}
                    > 
                    {/* here we need to set the default value for the selecter, otherwise the current group would be undefined
                    userId declaration will try to destruct currentGroup._id, which is impossible due to its being undefined*/}   
                    {/* for whatever reason, selecter is still not rendering*/} 

                                                
            { groups.map((groups, index) => {
            return(<option key={index}>{groups.groupName}</option>)}) }
            </select>
            </form>

            {/* the above code should work only in case selecter is working !!!!!!!!!!!!!!!!!
            </div>
                <h3>Your tasks</h3>
                <div className="todos">
                    {
                        sharedTasks.map((todo, index) => {
                            let cls = ['row flex todos-item']
                                if(todo.completed) {
                                    cls.push('completed')
                                }
                                if(todo.important) {
                                    cls.push('important')
                                }

                            return(
                            <div className={cls.join(' ')} key={index}>
                                <div className="col todos-num">{index+1}</div>
                                <div className="col todos-text">{todo.text}</div>
                                <div className="col todos-buttons"></div>
                                <i className="material-icons blue-text" onClick={() => completedTodo(todo._id)}>check</i>
                                <i className="material-icons orange-text" onClick={() => importantTodo(todo._id)}>warning</i>
                                <i className="material-icons red-text" onClick={() => removeTodos(todo._id)}>delete</i>
                    </div>
                        )}
                        )}
                </div>
                <div className='container'>
            <div className='main-page'>
                <h4>Add task</h4>
                <form className='form form-login' onSubmit={e => e.preventDefault()}>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input type='text'
                                   id='text'
                                   name='input'
                                   className='validate'
                                   value={text}
                                   onChange={e => setText(e.target.value)}
                                   />
                                   <label htmlFor='input'>Task</label>
                        </div>
                    </div>
                    <div className="row">
                        <button
                                className='waves-effect waves-light btn blue'
                                onClick={createTodo}
                                >Add task</button>
                    </div>
                </form>
            </div>
                            */}
                            </div>
            </div>
            
        </div>
    )

}

export default SharedTasks