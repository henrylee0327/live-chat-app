import React, { useContext } from 'react'
import './FirstPage.css'
import { Link } from 'react-router-dom'
import { ChatContext } from '../ChatContext'

const FirstPage = () => {

    const {userName, setUserName} = useContext(ChatContext)
    const {roomCode, setRoomCode} = useContext(ChatContext)

    const handleName = (e) => {
        setUserName(e.currentTarget.value)
    }

    const handleRoom = (e) => {
        setRoomCode(e.currentTarget.value)
    }

    return (
        <form>
            <div>
                <h1 className="top-header">Join the live chat!</h1>
            </div>
            <div className="form-group">
                <label>Your name</label>
                <input type="email" onChange={handleName} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
            </div>
            <div className="form-group">
                <label>Room code</label>
                <input type="text" onChange={handleRoom} className="form-control" id="exampleInputPassword1"></input>
            </div>
            <div className="button-container">
                <Link onClick={e => (!userName || !roomCode) ? e.preventDefault() : null} to={`/chatroom?userName=${userName}&roomCode=${roomCode}`}>
                <button type="submit" className="btn btn-primary">Submit</button>
                </Link>
            </div>
        </form>
    )
}





export default FirstPage;