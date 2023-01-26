import React, {useState} from 'react'
import './AllGroups.scss'
import axios from 'axios'
import { useEffect, useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'

const AllGroups = () => {

    const [groups, setGroups] = useState([])
    const {userId} = useContext(AuthContext)

const getGroups = async () =>{
    try {
        await axios.get('api/groups', {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {userId}
        })
        .then((response) => setGroups(response.data))
    } catch (error) {
        console.log(error)
    }
}

const applyGroup = async(id) => {
    try {
        await axios.put(`api/groups/groups/${id}`, {id, userId}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setGroups([...groups], response.data)
            getGroups()
        })
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    getGroups()
}, [])


return(
    <div className='container'>
        <div className='main-page'>

        <h3>All groups</h3>
            <div className="todos">
                {
                    groups.map((groups, index) => {
                        let cls = ["col todos-text"]
                        var isInGroup = false
                        groups.users.forEach(function(item){
                            if(item.userId == userId){
                                isInGroup = !isInGroup
                            }
                        })
                        console.log(groups.users)
                        if(isInGroup){
                            cls.push("green-text")

                            isInGroup = true
                        }
                        console.log(isInGroup)
                        return(
                            
                        <div className="row flex todos-item" key={index}>
                            <div className="col todos-num">{index+1}</div>
                            <div className={cls.join(' ')}>{groups.groupName}</div>
                           {isInGroup ? (<div className="col todos-buttons">You are already in this group</div>) : (<div className="col todos-buttons blue-text" onClick={() => applyGroup(groups._id)}>Apply to a group</div>)}
                            
                </div>
                    )}
                    )}
                    <div className='col todos-text'>Green groups are your current groups</div>
            </div>
            
        </div>
        
    </div>
)

}

export default AllGroups
