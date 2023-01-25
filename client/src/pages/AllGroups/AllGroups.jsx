import React, {useState} from 'react'
import './AllGroups.scss'
import axios from 'axios'
import { useEffect } from 'react'

const AllGroups = () => {

    const [groups, setGroups] = useState([])

const getGroups = async () =>{
    try {
        await axios.get('api/groups', {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => setGroups(response.data))
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    getGroups()
}, [getGroups])


return(
    <div className='container'>
        <div className='main-page'>

        <h3>All groups</h3>
            <div className="todos">
                {
                    groups.map((groups, index) => {
                        return(
                        <div className="row flex todos-item" key={index}>
                            <div className="col todos-num">{index+1}</div>
                            <div className="col todos-text">{groups.groupName}</div>
                            <div className="col todos-buttons"></div>
                </div>
                    )}
                    )}
            </div>
            
        </div>
        
    </div>
)

}

export default AllGroups
