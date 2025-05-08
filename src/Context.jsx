import { createContext, useContext, useState, useEffect } from "react";

const ChatBotStates = createContext();

const Context = ({ children }) => {
    const [nombreProyecto, setNombreProyecto] = useState("Chatbot");

    const [modoDarkLight, setModoDarkLight] = useState(
        JSON.parse(localStorage.getItem("modoDarkLight")) || false
    );

    useEffect(() => {
        localStorage.setItem("modoDarkLight", JSON.stringify(modoDarkLight));
        document.body.classList.toggle("dark-mode", modoDarkLight);
    }, [modoDarkLight]);

    return (
        <ChatBotStates.Provider
            value={{ nombreProyecto, setNombreProyecto, modoDarkLight, setModoDarkLight }}
        >
            {children}
        </ChatBotStates.Provider>
    );
};

export default Context;

export const useChatBotStates = () => useContext(ChatBotStates);
