/* eslint-disable prettier/prettier */
import { Server, Socket } from 'socket.io';
import { UserSockets, MessageSocket, messages } from './socketMDTO';
import cookieParser from 'cookie';
import { validateSocketToken } from '@/utils/validateSocketToken';
import { MessageService } from '@/features/messages/messageRepository';
import { Message } from '@/features/messages/messageEntity';

const userSockets: UserSockets = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initializeMSocketIO = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        }
    });

    io.on("connection", (socket: Socket) => {

        socket.on("registerUser", async (receiverId) => {
            console.log("Un cliente se ha conectado:", socket.id);
            
            const cookies = cookieParser.parse(socket.handshake.headers.cookie || '');
            console.log('Cookies:', cookies);
            const token = cookies.token ? cookies.token.replace('Bearer ', '').trim() : null;
        
            if (!token) {
                console.error("No se encontró el token en las cookies");
                socket.emit("error", { message: "Token no encontrado. Por favor, asegúrate de estar autenticado." });
                return;
            }
        
            const { authId } = await validateSocketToken(token);
            const messages:Message[] = await MessageService.getMessagesBetweenUsers(authId, receiverId);
            console.log('MENSAJES ANTERIORES ', messages);
            
            console.log('authId del usuario registrado : ', authId);
        
            userSockets[authId] = socket.id;
            io.emit("userList", Object.keys(userSockets));

            socket.emit("initialMessages", messages.map((mss) => {
                const message:MessageSocket = {
                    content:mss.content,
                    receiverId:mss.receiver.authId,
                    timestamp:mss.createdAt
                } 
                return message;
            }));
        });
        

        socket.on("chatMessage", async (message: MessageSocket) => {
            console.log("Un cliente se ha conectado:", socket.id);
            
            const cookies = cookieParser.parse(socket.handshake.headers.cookie || '');
            console.log('Cookies:', cookies);
            const token = cookies.token.replace('Bearer ', '').trim();
            const { authId } = await validateSocketToken(token);
            
            userSockets[authId] = socket.id;
            console.log('authId del usuario registrado : ', authId);
            console.log("Mensaje recibido:", message);
        
            messages.push(message);
            
            // Comprobar si el receptor está registrado
            let receiverSocketId = userSockets[message.receiverId];
        
            // Si el receptor no está registrado, añadirlo
            if (!receiverSocketId) {
                console.log(`El receptor con ID ${message.receiverId} no está registrado. Registrándolo...`);
                
                // Aquí puedes registrar el socket directamente
                userSockets[message.receiverId] = null;
                receiverSocketId = null;
            }
        
            console.log(userSockets[authId], userSockets[message.receiverId]);
            console.log('Estado de userSockets después de registro:', userSockets);
            
            if (receiverSocketId) {
                console.log("mandando mensaje al receptor", message);
                await MessageService.createMessage(authId, message.receiverId, message.content);
                io.to(receiverSocketId).emit("chatMessage", message);
            } else {
                console.log(`El receptor con ID ${message.receiverId} no está conectado. Mensaje guardado para enviar más tarde.`);
                // Aquí podrías manejar la lógica para guardar el mensaje en una base de datos o en memoria
                await MessageService.createMessage(authId, message.receiverId, message.content); // Guarda el mensaje aunque el receptor no esté conectado
            }
        });

        socket.on("disconnect", () => {
            console.log("Un cliente se ha desconectado:", socket.id);
            for (const [user, id] of Object.entries(userSockets)) {
                if (id === socket.id) {
                    delete userSockets[user];
                    io.emit("userList", Object.keys(userSockets));
                    break;
                }
            }
        });
    });

    return io;
};
