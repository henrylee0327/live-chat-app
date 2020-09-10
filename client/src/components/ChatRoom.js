import React, { useState, useEffect, useContext } from 'react'
import io from 'socket.io-client'
import './ChatRoom.css'
import { ChatContext } from '../ChatContext'
import ScrollToBottom from 'react-scroll-to-bottom'
import queryString from 'query-string'
import {useHistory} from 'react-router-dom'


const ChatRoom = ({ location }) => {
    const { userName, setUserName } = useContext(ChatContext)
    const { roomCode, setRoomCode } = useContext(ChatContext)
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState([])
    const ENDPOINT = 'localhost:5000'
    const socket = io(ENDPOINT)
    
    useEffect(() => {
        const { userName, roomCode } = queryString.parse(location.search)

        setUserName(userName)
        setRoomCode(roomCode)
        socket.emit('chatroom-join', {userName, roomCode})
    }, [location.search, ENDPOINT])

    useEffect(() => {
        socket.on('message', ({userName, message}) => {
            setChats(chats => [...chats, {userName, message}])
        })
    }, [])

    const handleMessage = (e) => {
        var newMessage = e.currentTarget.value
        setMessage(newMessage)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage('')
        socket.emit('send-message', {userName, message})
    }

    const renderChat = () => {
        return chats.map(({userName, message}, index) => {
            return <div key={index}>
            <p>{userName} : {message}</p>
            </div>
        })
    }

    const history = useHistory()
    const disconnect = () => {
        socket.emit('disconnect')
        socket.close()
        history.push('/')
    }

    return (
        <>
            <div className="top-container">
                <h2>{roomCode}</h2>
                <button className="close-button" onClick={() => disconnect()}>Close</button>
            </div>
            <div>
            <ScrollToBottom className="chat-container">
                {renderChat()}
            </ScrollToBottom>
            </div>
            <form className="form-inline" onSubmit={handleSubmit}>
                <input type="text" className="message-input" onChange={handleMessage} value={message} placeholder="Type message..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <button className="message-button" type="submit">Send</button>
            </form>
        </>
        
    )
}


export default ChatRoom;