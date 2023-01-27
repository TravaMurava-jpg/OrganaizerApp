import React, {useState, useCallback, useContext} from 'react'
import './SharedTasks.scss'
import axios from 'axios'
import { useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'

const SharedTasks = () => {

    const [groups, setGroups] = useState([])
    
    const [sharedTasks, setSharedTasks] = useState([])
    const [currentGroup, setCurrentGroup] = useState('')
    const [text, setText] = useState('')
    const {userId} = useContext(AuthContext)
    const [groupId, setGroupId] = useState('')
    const [isChoosed, setIsChoosed] = useState(false)
    
    
    const onOptionChangeHandler = (event) => {
        setCurrentGroup(event.target.value)
        setIsChoosed(true)
        console.log(event.target.value)
        groups.map((group) => {
            if(group.groupName === currentGroup){
                setGroupId(group._id)
            }
        })
    }

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
                params: {groupId}
            })
            .then((response) => setSharedTasks(response.data))
        } catch (error) {
            console.log(error)
        }
    }, [groupId])


    const createTodo = useCallback(async () => {
        if(!text) return null
        try {
            await axios.post('api/sharedtodo/add', {text : text, userId: groupId}, {
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
    }, [text, groupId, sharedTasks, getTodo])

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
        getTodo()
    }, [getTodo, getGroup])

    return(
        <div className='container'>
            <div className='main-page'>
    
            <h3>Select a group</h3>
            
                <div className="todos">
                <form>
            <select className="browser-default"
                    onChange={onOptionChangeHandler}
                    >
                        <option value=''>Select one...</option>                      
            { groups.map((groups, index) => {
            return(<option key={index+1} value={groups.groupName}>{groups.groupName}</option>)}) }
            </select>
            </form>

            
            </div>
            {isChoosed ? (<div><h3>Group tasks</h3>
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
             </div>
            </div>):("")}
               </div>
               </div>

)}

export default SharedTasks