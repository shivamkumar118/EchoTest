
var webSocket = null;


// event handler for connect

function OnConnectClick() {
    var ws_location = document.getElementById("location").value;
    OpenWSConnection(ws_location);
}

// event handler for disconnect

function OnDisconnectClick() {
    webSocket.close();
}

function OpenWSConnection(location) {
    
    // The wss url for example you can give "wss://echo.websocket.org"
    var webSocketURL = null;
    
    webSocketURL = location;
    
    // connecting message 

    console.log("openWSConnection::Connecting to: " + webSocketURL);

     try {
         
        // creating a Websocket providing URL as parameter

        webSocket = new WebSocket(webSocketURL);

        webSocket.onopen = function(openEvent) {
            
            console.log("WebSocket OPEN: "+ JSON.stringify(openEvent,null,4));

            document.getElementById("SendButton").disabled = false;
            document.getElementById("ConnectButton").disabled = true;
            document.getElementById("DisconnectButton").disabled = false;
        };

        webSocket.onclose = function(closeEvent) {
            
            console.log("WebSocket CLOSE: "+ JSON.stringify(closeEvent,null,4));

            document.getElementById("SendButton").disabled = true;
            document.getElementById("ConnectButton").disabled = false;
            document.getElementById("DisconnectButton").disabled = true;
        };


        webSocket.onmessage = function(messageEvent) {
            var wsMssge = messageEvent.data;
            console.log("WebSocket MESSAGE: "+ wsMssge);

            if(wsMssge.indexOf("error") > 0)
            {
              document.getElementById("IncomingMsgOutput").value += "error: " + wsMssge.error + "\r\n" ;
            }
            else
            {
                // for counting words sent.

                count_words = 1;
                for (let i = 0; i<= wsMssge.length; i++) {
                  if(wsMssge[i]==' ' || wsMssge[i]=='\0')
                    count_words+=1;               
                }
                document.getElementById("IncomingMsgOutput").value += "message: " + wsMssge + "\r\n"+ " no of words " + count_words + "\r\n" ;
            }
        };
        
        // if any error appears

        webSocket.onerror = function (errorEvent) {
            
            console.log("WebSocket ERROR: " + JSON.stringify(errorEvent,null,4));
        };

     } catch (exception) {
         console.error(exception);
     }
}
// send message to websocket server

function OnSendClick() {
    
    if(webSocket.readyState != WebSocket.OPEN){
        console.error("webSocket is not open: " + webSocket.readyState);
        return;
    }

    var msg = document.getElementById("message").value;
    webSocket.send(msg);
}