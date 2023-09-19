import { io } from "socket.io-client";
import queryString from "query-string";



let socket;
const Chat = ({ location }) => {
    const [room, setRoom] = useState("");
    const [chat, setChat] = useState("");
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState("");

    const ENDPOINT = "localhost:3030";

    useEffect(() => {
    // name은 빼고 room id만 받아와도 됨
    const { room } = queryString.parse(location.search);

    socket = io(ENDPOINT); // 소켓 연결

    setRoom(room);

    console.log(room); 
    // 멤버 아이디를 주고 룸 아이디를 받는 api를 백에서 호출 (다른 라이프 사이클)
    socket.emit("join", { room }, (error) => {
      // console.log("error");
      // 에러 처리
    if (error) {
        alert(error);
    }
    });

  }, [ENDPOINT, location.search]); // room id로 대체

    useEffect(() => {
    // 서버에서 message 이벤트가 올 경우에 대해서 `on`
    socket.on("chat", (chat) => {
    setChats([...chats, chat]);
    });

    }, [chats]);



    console.log(message, messages);
    console.log(users, "users");
};

export default Chat;