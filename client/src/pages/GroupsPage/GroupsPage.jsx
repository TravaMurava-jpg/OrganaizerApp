import React, {useState, useContext, useCallback} from 'react'
import './GroupsPage.scss'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { useEffect } from 'react'

const GroupsPage = () => {
    const [groupName, setGroupName] = useState('')
    const {userId} = useContext(AuthContext)
    const [groups, setGroups] = useState([])

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

    const createGroup = useCallback(async () => {
        if(!groupName) return null
        try {
            await axios.post('api/group/add', {groupName : groupName, userId: userId}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => { setGroups([...groups], response.data)
                setGroupName('')
                getGroup()
            })
        } catch (error) {
            console.log(error)
        }
    }, [groupName, userId, getGroup, groups])


    const removeGroups = useCallback(async (id) =>{
        try {
            console.log(id)
            await axios.delete(`/api/group/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                data:{
                    id: id,
                    userId: userId
                }
            })
            .then(() => getGroup())
        } catch (error) {
            console.log(error)
        }
    }, [getGroup])



    useEffect(() => {
        getGroup()
    }, [getGroup])

    return(
        <div className='container'>
            <div className='main-page'>

            <h3>My groups</h3>
                <div className="todos">
                    {
                        groups.map((groups, index) => {
                            return(
                            <div className="row flex todos-item" key={index}>
                                <div className="col todos-num">{index+1}</div>
                                <div className="col todos-text">{groups.groupName}</div>
                                <div className="col todos-buttons"></div>
                                <i className="material-icons red-text" onClick={() => removeGroups(groups._id)}>delete</i>
                    </div>
                        )}
                        )}
                </div>
                <h4>Create a group</h4>
                <form className='form form-login' onSubmit={e => e.preventDefault()}>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input type='text'
                                   id='text'
                                   name='input'
                                   className='validate'
                                   value={groupName}
                                   onChange={e => setGroupName(e.target.value)}
                                   />
                                   <label htmlFor='input'>Group name</label>
                        </div>
                    </div>
                    <div className="row">
                        <button
                                className='waves-effect waves-light btn blue'
                                onClick={createGroup}
                                >Create</button>
                    </div>
                </form>

                
            </div>
            
        </div>
    )

}

export default GroupsPage