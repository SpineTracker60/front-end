
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL_SOCKET, API_BASE_URL_SOCKET2 } from "../../../constants";

export const roomJoin = (userId, socket) => {
  ///const userId = props.user.id;
      axios.get(API_BASE_URL_SOCKET + '/room?memberId=' + userId)
      .then(response => {
        const roomId = response.data.body.roomId;
        // console.log(roomId);
        socket.emit("room-join", {roomId});
      })
      .catch(function(error){
        if(error.message == "Request failed with status code 404"){
          axios.post(API_BASE_URL_SOCKET + '/room?memberId=' + userId)
          .then(response => {
            const roomId = response.data.body.roomId;
            // console.log(roomId);
            socket.emit("room-join", {roomId});
          })
        }
      })
} 


    


// const ChatBot = (props) => {
//     const [room, setRoom] = useState("");
//     const [chats, setChats] = useState([]);
    

//     useEffect(() =>{

//       if(props.user){
//       const userId = props.user.id;
//       axios.get(API_BASE_URL_SOCKET + '/room?memberId=' + userId)
//       .then(response => {
//         const roomId = response.data.body.roomId;
//         // console.log(roomId);
//         socket.emit("room-join", {roomId});
//       })
//       .catch(function(error){
//         if(error.message == "Request failed with status code 404"){
//           axios.post(API_BASE_URL_SOCKET + '/room?memberId=' + userId)
//           .then(response => {
//             const roomId = response.data.body.roomId;
//             // console.log(roomId);
//             socket.emit("room-join", {roomId});
//           })
//         }
//       })
//     }
//     }
//     ,
//     [])
    
    

//     useEffect(() => {
//     // 서버에서 message 이벤트가 올 경우에 대해서 `on`

//     }, [chats]);



//     // console.log(message, messages);
//     // console.log(users, "users");
// };

// export default ChatBot;