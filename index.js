/*
var gpio = require('rpi-gpio');
 
gpio.setup(7, gpio.DIR_IN, readInput);
 
function readInput() {
    gpio.read(7, function(err, value) {
        console.log('The value is ' + value);
    });
}
*/
var rcswitch = require('rcswitch');
rcswitch.enableReceive(0);  // Receiver on inerrupt 0 => that is pin #2

setInterval(function(){
	var rcswitch = rcswitch.getReceivedValue();
	console.log(rcswitch);
},100);