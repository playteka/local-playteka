

//print block for doing console.log()
Blockly.Blocks['print_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendValueInput("text")
    //.setCheck("null")
    .appendField("print log");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['print_method'] = function(block) {
    var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'console.log('+value_text+');\n';
    return code;
};






// all devices defined in the workspace are managed here.
var all_devices = {
init: function(){
    //object list for REPL
    this.objects.length = 0;
    //analog
    this.board.length = 0;
    this.board_dropdown.length = 0;
    //analog
    this.analog.length = 0;
    this.analog_dropdown.length = 0;
    //digital
    this.digital.length = 0;
    this.digital_dropdown.length = 0;
    //button
    this.button.length = 0;
    this.button_dropdown.length = 0;
    //led
    this.led.length = 0;
    this.led_dropdown.length = 0;
    //pin
    this.pin.length = 0;
    this.pin_dropdown.length = 0;
    //RGBled
    this.RGBled.length = 0;
    this.RGBled_dropdown.length = 0;
    //servo
    this.servo.length = 0;
    this.servo_dropdown.length = 0;
},
append: function(){
    //board
    if (this.board.length == 0) { this.board.push('board'); }
    if (this.board_dropdown.length == 0) { this.board_dropdown.push(['board', 'board']); }
    //analog
    if (this.analog.length == 0) { this.analog.push('analog'); }
    if (this.analog_dropdown.length == 0) { this.analog_dropdown.push(['analog', 'analog']); }
    //digital
    if (this.digital.length == 0) { this.digital.push('digital'); }
    if (this.digital_dropdown.length == 0) { this.digital_dropdown.push(['digital', 'digital']); }
    //button
    if (this.button.length == 0) { this.button.push('button'); }
    if (this.button_dropdown.length == 0) { this.button_dropdown.push(['button','button']); }
    //led
    if (this.led.length == 0) { this.led.push('led'); }
    if (this.led_dropdown.length == 0) { this.led_dropdown.push(['led','led']); }
    //pin
    if (this.pin.length == 0) { this.pin.push('pin'); }
    if (this.pin_dropdown.length == 0) { this.pin_dropdown.push(['pin','pin']); }
    //RGBled
    if (this.RGBled.length == 0) { this.RGBled.push('RGBled'); }
    if (this.RGBled_dropdown.length == 0) { this.RGBled_dropdown.push(['RGBled','RGBled']); }
    //servo
    if (this.servo.length == 0) { this.servo.push('servo'); }
    if (this.servo_dropdown.length == 0) { this.servo_dropdown.push(['servo','servo']); }
},
create_inside_name: function(outside_name) {
    //return outside_name + "_inside"
    return Blockly.JavaScript.variableDB_.getName(outside_name, Blockly.Variables.NAME_TYPE);
}
};

//object list for REPL
all_devices.objects = new Array();

//board
all_devices.board = new Array('board');
all_devices.board_dropdown = new Array(['board', 'board']);
//analog
all_devices.analog = new Array('analog');
all_devices.analog_dropdown = new Array(['analog', 'analog']);
//digital
all_devices.digital = new Array('digital');
all_devices.digital_dropdown = new Array(['digital', 'digital']);
//button
all_devices.button = new Array('button');
all_devices.button_dropdown = new Array(['button','button']);
//led
all_devices.led = new Array('led');
all_devices.led_dropdown = new Array(['led','led']);
//pin
all_devices.pin = new Array('pin');
all_devices.pin_dropdown = new Array(['pin','pin']);
//RGBled
all_devices.RGBled = new Array('RGBled');
all_devices.RGBled_dropdown = new Array(['RGBled','RGBled']);
//servo
all_devices.servo = new Array('servo');
all_devices.servo_dropdown = new Array(['servo','servo']);



