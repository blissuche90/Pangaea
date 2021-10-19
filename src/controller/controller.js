import axios from 'axios';
import { EventEmitter } from 'events';

import { BASE_URL } from '../../config/config.js';

const eventsData = [];
const emitter = new EventEmitter();

export async function publisherController(req, res) {
    const { topic } = req.params;
    const data = req.body;

    await axios({
        url: `${BASE_URL}/event`,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
            topic, data
        }
    })

    res.status(200).json({
        status: 'success',
        message: 'Event successfully Published',
        data: {
            topic, data
        }
    })
}

export function eventController(req, res) {
    const data = req.body;
    const topic = data.topic;
    
    eventsData.push(data);

    if(!data && !data.topic) {
        throw new Error('You must first create a subscription/topic before publishing an event')
    }

    emitter.on(topic, (data) => {
        console.log(data, `${topic} event received`);
    })

    res.status(200).json(data);
}

export function subscriberController(req, res) {
    const { topic } = req.params;
    const data = req.body;

    emitter.emit(topic, {
        topic, data
    });
    let resData = { 
        url: req.body, 
        topic: topic
    }; 
        
    const filteredEvents = eventsData.filter(event => event.topic === topic)

    if(filteredEvents.length === 0) {
        return res.status(200).json({
            status: 'success',
            message: `${topic} Subscription created. Topic ${topic} listening for incoming events`,
            data: resData
        });
    }

    return res.status(200).json({
        status: 'success',
        message: `Subscription Events successfully fetched for ${topic}`,
        data: filteredEvents
    });
}

export function indexController(req, res) {
    if(eventsData.length === 0) {
        return res.status(404).json({
            status: 'NotFoundError',
            message: 'Events must be published before it can be fetched',
            data: null
        })
    }

    return res.status(200).json({
        status: 'success',
        message: 'Events successfully fetched',
        data: eventsData
    })
}