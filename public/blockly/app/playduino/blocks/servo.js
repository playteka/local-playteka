// the servo device block
Blockly.Blocks['servo_device'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendValueInput("pin")
    .setCheck("Number")
    .appendField("Servo: name")
    .appendField(new Blockly.FieldTextInput("servo"), "servo_var")
    .appendField("pin");
    this.appendValueInput("min")
    .setCheck("Number")
    .appendField("range: min");
    this.appendValueInput("max")
    .setCheck("Number")
    .appendField("max");
    this.appendDummyInput()
    .appendField("type")
    .appendField(new Blockly.FieldDropdown([["standard", "standard"], ["continuous", "continuous"]]), "type");
    this.setInputsInline(true);
    this.setOutput(true, "device_type");
    this.setTooltip('');
}
};

Blockly.JavaScript['servo_device'] = function(block) {
    var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
    var text_servo_var = block.getFieldValue('servo_var');
    var value_min = Blockly.JavaScript.valueToCode(block, 'min', Blockly.JavaScript.ORDER_ATOMIC);
    var value_max = Blockly.JavaScript.valueToCode(block, 'max', Blockly.JavaScript.ORDER_ATOMIC);
    var value_type = block.getFieldValue('type');
    
    //push the servo variable into the arrays for the dropdown menu
    all_devices.servo.push(text_servo_var);
    var inside_name = all_devices.create_inside_name(text_servo_var);
    all_devices.servo_dropdown.push([text_servo_var,inside_name]);
    
    //push the servo variable into the object list for REPL
    all_devices.objects.push(inside_name + " : " + inside_name);
    
    //Assemble code like : var servo = new five.Servo({pin: 10, range:[min,max], type: "continuous"});
    var code = "var " + text_servo_var + " = new five.Servo({pin: " + value_pin + ", range:[" +value_min + " ," + value_max + "], type: '" + value_type + "'});";
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};




// Set angle of the servo to the specified value  to (0-180)
Blockly.Blocks['servo_to_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Servo:")
    .appendField(new Blockly.FieldDropdown(all_devices.servo_dropdown), "var");
    this.appendValueInput("angle")
    .appendField("set angle to");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['servo_to_method'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code like : servo.to(90);
    var code = dropdown_var + ".to(" + value_angle + "); \n" ;
    return code;
};


// Set angle of the servo to the minimun value
Blockly.Blocks['servo_min_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Servo:")
    .appendField(new Blockly.FieldDropdown(all_devices.servo_dropdown), "var");
    this.appendDummyInput()
    .appendField("min");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['servo_min_method'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    
    // TODO: Assemble JavaScript into code like : servo.min();
    var code = dropdown_var + ".min(); \n" ;
    return code;
};


// Set angle of the servo to the minimun value
Blockly.Blocks['servo_max_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Servo:")
    .appendField(new Blockly.FieldDropdown(all_devices.servo_dropdown), "var");
    this.appendDummyInput()
    .appendField("max");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['servo_max_method'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    
    // TODO: Assemble JavaScript into code like : servo.max();
    var code = dropdown_var + ".max(); \n" ;
    return code;
};


// Set angle of the servo to the minimun value 0
Blockly.Blocks['servo_center_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Servo:")
    .appendField(new Blockly.FieldDropdown(all_devices.servo_dropdown), "var");
    this.appendDummyInput()
    .appendField("center");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['servo_center_method'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    
    // TODO: Assemble JavaScript into code like : servo.center();
    var code = dropdown_var + ".center(); \n" ;
    return code;
};



// sweep servo between min and max
Blockly.Blocks['servo_sweep_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Servo:")
    .appendField(new Blockly.FieldDropdown(all_devices.servo_dropdown), "var");
    this.appendValueInput("between")
    .appendField("sweep between");
    this.appendValueInput("and")
    .appendField("and");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['servo_sweep_method'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var value_between = Blockly.JavaScript.valueToCode(block, 'between', Blockly.JavaScript.ORDER_ATOMIC);
    var value_and = Blockly.JavaScript.valueToCode(block, 'and', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code like : servo.sweep([0,180]);
    var code = dropdown_var + ".sweep([" + value_between  + "," + value_and + "]); \n" ;
    return code;
};


// stop the servo
Blockly.Blocks['servo_stop_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Servo:")
    .appendField(new Blockly.FieldDropdown(all_devices.servo_dropdown), "var");
    this.appendDummyInput()
    .appendField("stop");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['servo_stop_method'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    
    // TODO: Assemble JavaScript into code like : servo.stop();
    var code = dropdown_var + ".stop(); \n" ;
    return code;
};


// (Continuous only) Move a continuous servo clockwise at speed, 0-1
Blockly.Blocks['servo_cw_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Servo:")
    .appendField(new Blockly.FieldDropdown(all_devices.servo_dropdown), "var");
    this.appendValueInput("speed")
    .appendField("clockwise at speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['servo_cw_method'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code like : servo.to(90);
    var code = dropdown_var + ".cw(" + value_speed + "); \n" ;
    return code;
};

//  (Continuous only) Move a continuous servo counter clockwise at speed, 0-1
Blockly.Blocks['servo_ccw_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Servo:")
    .appendField(new Blockly.FieldDropdown(all_devices.servo_dropdown), "var");
    this.appendValueInput("speed")
    .appendField("counter clockwise at speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['servo_ccw_method'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code like : servo.to(90);
    var code = dropdown_var + ".ccw(" + value_speed + "); \n" ;
    return code;
};

/*
 
 // Returns the current angle of the servo
 Blockly.Blocks['servo_currentAngle_method'] = {
 init: function() {
 this.setHelpUrl('http://www.example.com/');
 this.setColour(230);
 this.appendDummyInput()
 .appendField("Servo:")
 .appendField(new Blockly.FieldDropdown(all_devices.servo_dropdown), "var")
 .appendField("current angle");
 this.setOutput(true, "Number");
 this.setTooltip('');
 }
 };
 
 Blockly.JavaScript['servo_currentAngle_method'] = function(block) {
 var variable_servo_var = block.getFieldValue('var');
 // TODO: Assemble JavaScript into code variable.
 var code = "my." + variable_servo_var + ".currentAngle()" ;
 return [code, Blockly.JavaScript.ORDER_ATOMIC];
 };
 
 
// Given a servo angle, determines if it's safe or not, and returns a safe value
Blockly.Blocks['servo_safeAngle_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Servo:")
    .appendField(new Blockly.FieldDropdown(all_devices.servo_dropdown), "var");
    this.appendValueInput("angle")
    .appendField("get safe angle");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('');
}
};

Blockly.JavaScript['servo_safeAngle_method'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = "my." + dropdown_var + ".safeAngle(" + value_angle + ")" ;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
*/





