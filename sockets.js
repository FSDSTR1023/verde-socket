import { Socket } from 'socket.io';

let watchers = [];

export class Sockets {

    constructor(io) {

        this.io = io;
        this.socketEvents();

    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {

            socket.on('gallery_data', (data) => {

                watchers.push({
                    socketId: socket.id,
                    galleryId: data.galleryId,
                })

                this.io.emit('is_watching', {
                    watchers
                });

                console.log('gallery_data', watchers)
                // watchers.push(data.galleryId);
                // // const watching = watchers.filter(w => data.galleryId = w).length

                // this.io.emit('gallery_data', {
                //     socketId: socket.id,
                //     galleryId: data.galleryId,
                // })
            });

            socket.on('is_watching', () => {

                this.io.emit('is_watching', {
                    watchers
                });

                console.log('is_watching', watchers)
            })

            // socket.on('watching', (data) => {
            //     console.log('alguien viendo:', data);
            // })

            // socket.on('no_watching', (s) => {
            //     console.log("no->", s.id)
            // })

            socket.on('disconnect', () => {


                watchers = watchers.filter(w => w.socketId !== socket.id);

                console.log('Client disconnected', new Date().getSeconds());
                // console.log("SOCKET:", socket)
                this.io.emit('is_watching', {
                    watchers
                });
                console.log(watchers)
            })

        });
    }


}
