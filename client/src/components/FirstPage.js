import React, { useContext } from 'react'
import './FirstPage.css'
import { Link } from 'react-router-dom'
import { ChatContext } from '../ChatContext'

const FirstPage = () => {

    const {firstName, setFirstName} = useContext(ChatContext)
    const {lastName, setLastName} = useContext(ChatContext)

    const handleFirst = (evt) => {
        const firstname = evt.currentTarget.value
        setFirstName(firstname)
    }

    const handleLast = (evt) => {
        const lastname = evt.currentTarget.value
        setLastName(lastname)
    }

    return (
        <form>
            <div>
                <h1 className="top-header">Join the live chat!</h1>
            </div>
            <div className="form-group">
                <label>First name</label>
                <input type="email" onChange={handleFirst} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
            </div>
            <div className="form-group">
                <label>Last name</label>
                <input type="text" onChange={handleLast} className="form-control" id="exampleInputPassword1"></input>
            </div>
            <div className="button-container">
                <Link onClick={e => (!firstName || !lastName) ? e.preventDefault() : null} to={`/chat?firstName=${firstName}&lastName=${lastName}`}>
                <button type="submit" className="btn btn-primary">Submit</button>
                </Link>
            </div>
        </form>
    )
}





export default FirstPage;