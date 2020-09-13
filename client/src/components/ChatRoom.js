import React, { useState, useEffect, useContext } from 'react'
import io from 'socket.io-client'
import './ChatRoom.css'
import { ChatContext } from '../ChatContext'
import ScrollToBottom from 'react-scroll-to-bottom'


const ChatRoom = ({ location }) => {
    const { firstName, setFirstName } = useContext(ChatContext)
    const { lastName, setLastName } = useContext(ChatContext)
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState([])
    const ENDPOINT = 'https://henrys-live-chat-app.herokuapp.com/'
    // const ENDPOINT = 'localhost:5000'
    const socket = io.connect(ENDPOINT)
    
    useEffect(() => {
       
        socket.emit('chatroom-join', {firstName, lastName})
        setFirstName(firstName)
        setLastName(lastName)
        
    }, [])

    useEffect(() => {
        socket.on('message', ({firstName, message}) => {
            setChats(chats => [...chats, {firstName, message}])
        })
    },[])

    useEffect(() => {
        socket.on('close-message', ({firstName, message}) => {
            setChats(chats => [...chats, {firstName, message}])
            socket.close()
        })
    }, [])


    const handleMessage = (e) => {
        var newMessage = e.currentTarget.value
        setMessage(newMessage)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage('')
        socket.emit('send-message', {firstName, message})
    }

    const renderChat = () => {
        return chats.map(({firstName, message}, index) => {
            return <div key={index}>
            <p>{firstName} : {message}</p>
            </div>
        })
    }

    return (
        <>  
            <div className="top-container">
                <div className="top-container-left">
                    <h2 className="room-code">Welcome {lastName}</h2>
                </div>
                <div className="top-container-right">
                    <button className="close-button"><a href="/">Close</a></button>
                </div>
            </div>
            <div>
            <ScrollToBottom className="chat-container">
                {renderChat()}
            </ScrollToBottom>
            </div>
            <form className="form-inline" onSubmit={handleSubmit}>
                <input type="text" className="message-input" onChange={handleMessage} value={message} placeholder="Type a message..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <button className="message-button" type="submit">Send</button>
            </form>
        </>
        
    )
}


export default ChatRoom;