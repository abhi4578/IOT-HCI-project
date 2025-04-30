client = new Paho.MQTT.Client("m24.cloudmqtt.com", 34769,"web_" + parseInt(Math.random() * 100, 10));

  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
    useSSL: true,
    userName: "ttkkxibw",
    password: "_wzJy6b9mPZ5",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);

 client1 = new Paho.MQTT.Client("m16.cloudmqtt.com", 34049,"web_" + parseInt(Math.random() * 100, 10));

  client1.onConnectionLost = onConnectionLost;
  client1.onMessageArrived = onMessageArrived;
  var options = {
    useSSL: true,
    userName: "hwseostk",
    password: "idHZl2Tj-Djy",
    onSuccess:onConnect1,
    onFailure:doFail
  }

  // connect the client
  client1.connect(options); 

  // called when the client connects
  function onConnect() {

    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    //console.log( {{ obj }} );
    client.subscribe("0");
    client.subscribe("1");
    client.subscribe("2");
    client.subscribe("3");
    client.subscribe("p3");
  console.log(client);
    message = new Paho.MQTT.Message("Hello CloudMQTT");
    message.destinationName = "p2";
    client.send(message);
  }

  function onConnect1() {

    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    //console.log( {{ obj }} );
    client1.subscribe("0");
    client1.subscribe("1");
    client1.subscribe("2");
    client1.subscribe("3");
    client1.subscribe("p3");
  console.log(client1);
    message = new Paho.MQTT.Message("Hello CloudMQTT");
    message.destinationName = "p2";
    client1.send(message);
  }
  function doFail(e){
    console.log(e);
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    //console.log(message.destinationName);
    var reader = message.destinationName;
    //console.log("onMessageArrived:"+message.payloadString);
    try{
    var id = message.payloadString.slice(0,5);
    }
    catch(err){
      id='0';
    }
    console.log(reader);
    var obj =  document.querySelector("#o"+reader);
    console.log("Id");
    console.log(id);
    if (id=='0'){
      console.log("Inside if");
      //objId = pos[reader];
      obj.setAttribute('width',0.001);
      obj.setAttribute('height',0.001);
    }
  
    else{
    //console.log(objects[id]);
    //console.log(objects[id][2]);

    console.log(objects[id]);
    try{
    obj.setAttribute('src',objects[id][2]);
        obj.setAttribute('width',1);
    obj.setAttribute('height',1);
    }
    catch(err){
      console.log("Error");
    }
    if (reader.length == 1){ 
    pos[reader] = id;
    }
    }

  }