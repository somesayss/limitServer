"use strict";

const EventEmitter = require('events');


let E = new EventEmitter();

let main = () => {
	console.log('call click 1');
};

E.on('click', main);
E.on('click', main);
E.on('click', main);
E.on('click', main);
E.on('click', main);
E.on('click', main);
E.on('click', main);
E.on('click', main);

E.on('click', () => {
	console.log('call click 2');
});

E.on('move', () => {
	console.log('call move 1');
});

E.on('move', () => {
	console.log('call move 1');
});

E.on('move', () => {
	console.log('call move 1');
});

E.on('click', () => {
	console.log('call click 2');
});
E.on('click', () => {
	console.log('call click 2');
});
E.on('click', () => {
	console.log('call click 2');
});


// E.removeListener('click', main);

// E.removeAllListeners(['click', 'move'])

// E.emit('click');
// E.emit('move');


// console.log(EventEmitter.listenerCount(E, 'click'));


