/*
var gpio = require('rpi-gpio');
 
gpio.setup(7, gpio.DIR_IN, readInput);
 
function readInput() {
    gpio.read(7, function(err, value) {
        console.log('The value is ' + value);
    });
}

var rcswitch = require('rcswitch');
rcswitch.enableReceive(0);  // Receiver on inerrupt 0 => that is pin #2

setInterval(function(){
	var rcswitch = rcswitch.getReceivedValue();
	console.log(rcswitch);
},100);
*/
var rpi433    = require('rpi-433'),
    rfSniffer = rpi433.sniffer({
      pin: 2,                     //Snif on GPIO 2 (or Physical PIN 13)
      debounceDelay: 500          //Wait 500ms before reading another code
    }),
    rfEmitter = rpi433.emitter({
      pin: 0,                     //Send through GPIO 0 (or Physical PIN 11)
      pulseLength: 350            //Send the code with a 350 pulse length
    });
 
// Receive (data is like {code: xxx, pulseLength: xxx})
rfSniffer.on('data', function (data) {
  console.log('Code received: '+data.code+' pulse length : '+data.pulseLength);
});
 
// Send
rfEmitter.sendCode(1234, function(error, stdout) {   //Send 1234
  if(!error) console.log(stdout); //Should display 1234
});
 
/* Or :
 
rfEmitter.sendCode(code);
rfEmitter.sendCode(code, {  //You can overwrite defaults options previously set (only for this sent)
  pin: 2,
  pulseLength: 350
});
rfEmitter.sendCode(code, callback);
rfEmitter.sendCode(code, {
  pin: 2,
  pulseLength: 350
}, callback);
*/
 
//rpi-433 uses the kriskowal's implementation of Promises so,
//if you prefer Promises, you can also use this syntax :
rfEmitter.sendCode(1234, {pin: 0})
  .then(function(stdout) {
    console.log('Code sent: ', stdout);
  }, function(error) {
    console.log('Code was not sent, reason: ', error);
  });