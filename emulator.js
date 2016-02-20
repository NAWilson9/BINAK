/**
 * Created by Nick on 2/19/2016.
 */

(function(){
    var gamepads = {};

    function gamepadHandler(event, connecting) {
        var gamepad = event.gamepad;
        // Note:
        // gamepad === navigator.getGamepads()[gamepad.index]

        if (connecting) {
            gamepads[gamepad.index] = gamepad;
            alert('Gamepad connected!');
            console.log(gamepads);
        } else {
            delete gamepads[gamepad.index];
            alert('Gamepad disconnected!');
        }
    }

    window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
    window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);

    const interval = 100;//1e3/60;
    setInterval(pollGamepads, interval);
    function pollGamepads() {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
        for (var i = 0; i < gamepads.length; i++) {
            var pad = gamepads[i];
            if(!pad){
                continue;
            }
            //console.log(pad);
            if(pad.buttons[15].pressed){
                var event  =  new KeyboardEvent("keydown", {code:0x27, key:"VK_RIGHT"});
                console.error('fired');
                document.body.dispatchEvent(event);
            }
            /*for(var j = 0; j < pad.buttons.length; j++){
                var button = pad.buttons[j];
                if(button.pressed){
                    console.log('Button: ' + j + ' pressed. ' + button.value );
                }
            }*/
        }
    }
})();