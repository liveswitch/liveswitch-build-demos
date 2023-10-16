import ls from 'fm.liveswitch';
import config from '../liveswitch_config.json'

export interface DownstreamData {
    connection: ls.SfuDownstreamConnection, 
    remoteMedia: ls.RemoteMedia,
    index: number,
    displayName: string
}

export default {
    install: (app:any) => {

        const customLog = (message: string) => {
            console.log("Oliver says: " + message);
        };

        const startLocalMedia = async () => {
            const localMedia = new ls.LocalMedia(true, true)
            await localMedia.start()
            return localMedia;
        }

    const registerClient = async (displayName: string, channelId: string): Promise<ls.Client> => {
            // Create a client.
            const client = new ls.Client(config.gatewayUrl, config.applicationId);
            // set display name
            client.setUserAlias(displayName);

            // Generate a token (do this on the server to avoid exposing your shared secret).
            const token = ls.Token.generateClientRegisterToken(
                config.applicationId,
                client.getUserId(),
                client.getDeviceId(),
                client.getId(),
                [new ls.ChannelClaim(channelId)],
                config.sharedSecret
            );

            // Register client with token.
            await client
                .register(token)
                .fail((ex: any) => {
                    ls.Log.error("Failed to register with Gateway.");
                });
            return client;
        }

        const getChannel = (client: ls.Client) => {
            const channels: Array<ls.Channel> = client.getChannels();
            if (channels && channels.length > 0) {
                return channels[0];
            }
        }

        const openSfuUpstreamConnection = (localMedia: ls.LocalMedia, channel: ls.Channel) => {
            // Create audio and video streams from local media.
            const audioStream = new ls.AudioStream(localMedia);
            const videoStream = new ls.VideoStream(localMedia);
    
            //channel is required so exit if it is null
            if (!channel) {
                return;
            }
    
            // Create a SFU upstream connection with local audio and video.
            const connection = channel.createSfuUpstreamConnection(
                audioStream,
                videoStream
            );
    
            // add logging for remote state
            connection.addOnStateChange((conn) => {
                ls.Log.debug(
                    `Upstream connection is ${new ls.ConnectionStateWrapper(
                        conn.getState()
                    ).toString()}.`
                );
            });
    
            // open connection now that handlers have been added
            connection.open();
            return connection;
        };

        const createDownStreamOpenHandler = (channel: ls.Channel, callback: Function) => {
            channel.addOnRemoteUpstreamConnectionOpen((remoteConnectionInfo: any) => {
                let downstreamConnection, remoteMedia;
                [downstreamConnection, remoteMedia] = openSfuDownstreamConnection(remoteConnectionInfo, channel);
                if (callback) {
                    callback(downstreamConnection, remoteMedia);
                }
            });
        }

        // handle setting up the downstream connection
        const openSfuDownstreamConnection = (remoteConnectionInfo: ls.ConnectionInfo, channel: ls.Channel) => {
            // Create remote media.
            const remoteMedia = new ls.RemoteMedia();
            const audioStream = new ls.AudioStream(remoteMedia);
            const videoStream = new ls.VideoStream(remoteMedia);
            let remoteCounter = 1;
            
            if (channel) {
                // Create a SFU downstream connection with remote audio and video.
                const connection: ls.SfuDownstreamConnection = channel.createSfuDownstreamConnection(
                    remoteConnectionInfo,
                    audioStream,
                    videoStream
                );

                // open connection now that our handlers have been set
                connection.open();
                return [connection, remoteMedia];
            }
            return [];
        };

        const createDownStreamCloseHandler = (connection: ls.SfuDownstreamConnection, callback: Function) => {
            connection.addOnStateChange((conn) => {
                if (conn.getRemoteClosed()) {
                    if (callback) {
                        callback(conn);
                    }
                }
            });
        }

        const sendChat = (channel: ls.Channel, displayName: string, text: string) => {
            let dateObj = new Date();
            var message = {
                from: displayName, 
                timestamp: (new Date().getTime()), 
                timestampHourFormat: dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                timestampDateFormat: (dateObj.toLocaleString()),
                text: text
            }
            // if we have a channel, send the message
            if (channel) {
                channel.sendMessage(JSON.stringify(message))
            }
        }

        const addIncomingChatHandler = (channel: ls.Channel, callback: Function) => {
            channel.addOnMessage(function(sender: ls.ClientInfo, message: string){
                if (callback) {
                    callback(message)
                }
            })
        }
        
        const disconnectFromMeeting = async (downstreamConnections: [string : DownstreamData], client: ls.Client, localMedia: ls.LocalMedia) => {
            for (let key in downstreamConnections) {
                //pull of the connection object
                const dsConnection = downstreamConnections[key].connection;
                // if the connection is not closed or in a state of closing, close it
                if (dsConnection.getState() !== ls.ConnectionState.Closed.valueOf() || dsConnection.getState() !== ls.ConnectionState.Closing) {
                    dsConnection.close();
                }
                // remove the connection from out local list
                delete downstreamConnections[key];
            }
            // handle local connection
            if (client) {
                return client
                    .unregister()
                    .fail(() => ls.Log.error("Unregistration failed."));
            }
    
            localMedia.stop();
        }

        app.provide('liveSwitch', {customLog, startLocalMedia, registerClient, getChannel, openSfuUpstreamConnection, createDownStreamOpenHandler, createDownStreamCloseHandler, disconnectFromMeeting, sendChat, addIncomingChatHandler});
    }
}