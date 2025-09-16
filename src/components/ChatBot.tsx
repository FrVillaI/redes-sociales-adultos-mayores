import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import botData from "../data/db.json";

export const ChatBot = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hola en que te puedo ayudar el dia de hoy',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Asistente',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((newMessages: IMessage[] = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, newMessages),
        );

        const userMessage = newMessages[0].text.toLowerCase();

        //Busqueda para determinar si la pregunta del usuario coincide con algunda de las preguntas prdefinidas que creamos 
        const found = botData.find((item) =>
            item.preguntas.some((q) => userMessage.includes(q.toLowerCase()))
        );

        //Si nos devuelve un true
        if (found) {
            // Primer mensaje con la guia que queremos y la aplicacion
            const botIntro: IMessage = {
                _id: Math.random().toString(),
                text: `Te mostraré cómo realizar "${found.intent}" en ${found.app}:`,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "Asistente",
                    avatar: "https://placeimg.com/140/140/any"
                }
            };

            setTimeout(() => {
                setMessages((prev) => GiftedChat.append(prev, [botIntro]));

                // Envio de cada paso
                found.pasos.forEach((paso, index) => {
                    setTimeout(() => {
                        const botStep: IMessage = {
                            _id: Math.random().toString(),
                            text: paso.texto,
                            createdAt: new Date(),
                            user: {
                                _id: 2,
                                name: "Asistente",
                                avatar: "https://placeimg.com/140/140/any"
                            },
                            image: paso.imagen
                        };
                        setMessages((prev) => GiftedChat.append(prev, [botStep]));
                    }, (index + 1) * 2500);
                });
            }, 5000);
        } else {
            // Si found nos entrega un false
            const botDefault: IMessage = {
                _id: Math.random().toString(),
                text: "Lo siento, no entendí tu mensaje. Intenta con otra pregunta.",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "Asistente",
                    avatar: "https://placeimg.com/140/140/any"
                }
            };
            setTimeout(() => {
                setMessages((prev) => GiftedChat.append(prev, [botDefault]));
            }, 500);
        }

    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{ _id: 1 }}
            placeholder="Escribe tu mensaje..."
            showUserAvatar
            alwaysShowSend
            keyboardShouldPersistTaps="handled"
            listViewProps={{
                keyboardDismissMode: "on-drag",
                keyboardShouldPersistTaps: "handled",
            }}
        />
    )
}
