
// the led block
Blockly.Blocks['led_device'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendValueInput("pin")
    .setCheck("Number")
    .appendField("Led: name")
    .appendField(new Blockly.FieldTextInput("led"), "led_var")
    .appendField("pin");
    this.setInputsInline(true);
    this.setOutput(true, "device_type");
    this.setTooltip('');
}
};

Blockly.JavaScript['led_device'] = function(block) {
    var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
    var text_led_var = block.getFieldValue('led_var');
    
    //push the led variable into the led_var_set for the dropdown menu o
    all_devices.led.push(text_led_var);
    var inside_name = all_devices.create_inside_name(text_led_var);
    all_devices.led_dropdown.push([text_led_var,inside_name]);
    
    //push the servo variable into the object list for REPL
    all_devices.objects.push(inside_name + " : " + inside_name);
    
    //Assemble code
    var code = "var " + inside_name + " = new five.Led(" + value_pin +");"
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



// led turn On method
Blockly.Blocks['led_on_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Led:")
    .appendField(new Blockly.FieldDropdown(all_devices.led_dropdown), "led_var")
    .appendField("turn on");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};


Blockly.JavaScript['led_on_method'] = function(block) {
    var variable_led_var = block.getFieldValue('led_var');
    // TODO: Assemble JavaScript into code variable.
    var code = variable_led_var + ".on(); \n" ;
    return code;      // do not return [code, Blockly.JavaScript.ORDER_ATOMIC]
};


// led turn Off method
Blockly.Blocks['led_off_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Led:")
    .appendField(new Blockly.FieldDropdown(all_devices.led_dropdown), "led_var")
    .appendField("turn off");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};


Blockly.JavaScript['led_off_method'] = function(block) {
    var variable_led_var = block.getFieldValue('led_var');
    // TODO: Assemble JavaScript into code variable.
    var code = variable_led_var + ".off(); \n" ;
    return code;      // do not return [code, Blockly.JavaScript.ORDER_ATOMIC]
};





// led toggle method
Blockly.Blocks['led_toggle_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Led:")
    .appendField(new Blockly.FieldDropdown(all_devices.led_dropdown), "led_var")
    .appendField("toggle");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};


Blockly.JavaScript['led_toggle_method'] = function(block) {
    var variable_led_var = block.getFieldValue('led_var');
    // TODO: Assemble JavaScript into code variable.
    var code = variable_led_var + ".toggle();\n" ;
    return code;  // do not return [code, Blockly.JavaScript.ORDER_ATOMIC]
};

// Led blink
Blockly.Blocks['led_blink_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Led:")
    .appendField(new Blockly.FieldDropdown(all_devices.led_dropdown), "var");
    this.appendValueInput("interval")
    .appendField("blink")
    .setCheck("Number");
    this.appendDummyInput()
    .appendField("ms")
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['led_blink_method'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var value_interval = Blockly.JavaScript.valueToCode(block, 'interval', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_var + ".blink(" + value_interval + "); \n" ;
    return code;
};


// Sets brightness of the LED to the specified value  to (0-255) using PWM
Blockly.Blocks['led_brightness_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Led:")
    .appendField(new Blockly.FieldDropdown(all_devices.led_dropdown), "var");
    this.appendValueInput("brightness")
    .appendField("set brightness");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['led_brightness_method'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var value_brightness = Blockly.JavaScript.valueToCode(block, 'brightness', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_var + ".brightness(" + value_brightness + "); \n" ;
    return code;
};