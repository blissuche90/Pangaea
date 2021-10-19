## How To Run
Follow the steps below to install locally.
- Ensure to have Node.js installed
- Navigate to the root directory
- Run  ```npm install``` to install dependencies
- Run: ```npm start```
- Go to any HTTP client/Postman and use ```http://localhost:8000/``` as the base URL.


## Endpoints and associated Payload
- Create a new Subscription: ```http://localhost:8000/subscribe/:topic```.
  - This creates a subscription for all events of topic and returns all events published to that topic/subscribing server
  - Endpoint: ```/subscribe/:topic```
  - HTTP Method to create a subscription ==> POST
  - Sample Payload for creating a subscription and expected data type: {
    "message": "topic1" ==> String
   }
- Publish an Event to a listening subscriber: ```http://localhost:8000/publish/:topic```
  - Endpoint publishes an event to a subscribing topic/server
  - Endpoint: ```/publish/:topic```
  - HTTP Method: POST
  - Sample Payload for publishing an event and expected data type: {
    "url": "http://localhost:8000/event" ==> String
   } 
  
- Event Logger: ```http://localhost:8000/event/```
  - Endpoint proxies the ```/publish/:topic``` endpoint and listens for incoming events. It also logs all the events created to the terminal whenever an event is published
  - It is for internal use and is triggered internally by the publisher.
  - Endpoint: ```/event```
  - HTTP Method: POST
- Index/Base: ```http://localhost:8000```
  - This endpoint returns all the events that have been created
  - Endpoint: ```/```
  - HTTP Method: GET
  