//import mqtt from 'mqtt';
const mqtt = require('mqtt');

const options = {
    protocol: 'mqtts',
    host: 'localhost',
    port: 1883,
  };


const client = mqtt.connect(options);

client.publish('cluster/messages/node7', 'Hello, HiveMQ!');

client.on('message', (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message}`);
  });