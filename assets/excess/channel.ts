﻿/// <reference path="excess.ts" />
module excess {
    /**
    * Wraps a WebRTC DataChannel
    */
    export class Channel {

        private dataChannel: RTCDataChannel;

        public onMessage: events.IEvent = new events.TypedEvent();
        public onClose: events.IEvent = new events.TypedEvent();
        public onError: events.IEvent = new events.TypedEvent();
        public onOpen: events.IEvent = new events.TypedEvent();
        
        constructor(rtcDataChannel: RTCDataChannel) {
            this.dataChannel = rtcDataChannel;
            this.attachCallbacks();
        }

        attachCallbacks() {
            this.dataChannel.onmessage = this._onMessage;
            this.dataChannel.onerror = this._onError;
            this.dataChannel.onclose = this._onClose;
            this.dataChannel.onopen = this._onOpen;
        }


        public send(message: any) {
            this.dataChannel.send(message);
        }

        /* Callbacks */

        private _onMessage = (message: RTCMessageEvent) => {
            excess.log("\nCHANNEL MESSAGE: ", message.data);
            this.onMessage.trigger(message);
        }

        private _onError = (event: any) => {
            excess.log("\nCHANNEL ERROR: ", event);
            this.onError.trigger(event);
        } 

        private _onClose = (event: any) => {
            excess.log("\nCHANNEL CLOSE: ", event);
            this.onClose.trigger(event);
        }

        private _onOpen = (event: any) => {
            excess.log("\nCHANNEL OPEN: ", event);
            this.onOpen.trigger(event);
        }








    }


}