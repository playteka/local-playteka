// the pin block
Blockly.Blocks['pin_device'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendValueInput("pin")
    .setCheck("Number")
    .appendField("pin: name")
    .appendField(new Blockly.FieldTextInput("pin"), "var")
    .appendField("pin");
    this.setInputsInline(true);
    this.setOutput(true, "device_type");
    this.setTooltip('');
}
};

Blockly.JavaScript['pin_device'] = function(block) {
    var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
    var text_pin_var = block.getFieldValue('var');
    
    //push the pin variable into the pin_var_set for the dropdown menu
    all_devices.pin.push(text_pin_var);
    var inside_name = all_devices.create_inside_name(text_pin_var);
    all_devices.pin_dropdown.push([text_pin_var,inside_name]);
    
    //push the servo variable into the object list for REPL
    all_devices.objects.push(inside_name + " : " + inside_name);
    
    //Assemble code like "var pin = new five.Pin(13);"
    var code = "var " + inside_name + " = new five.Pin(" + value_pin +");";
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


// pin digital write method
Blockly.Blocks['pin_write_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Pin:")
    .appendField(new Blockly.FieldDropdown(all_devices.pin_dropdown), "var");
    this.appendValueInput("value")
    .appendField("digital write value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['pin_write_method'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_var + ".write(" + value + "); \n" ;
    return code;
};


// pin digital high method
Blockly.Blocks['pin_high_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Pin:")
    .appendField(new Blockly.FieldDropdown(all_devices.pin_dropdown), "var");
    this.appendDummyInput()
    .appendField("high");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['pin_high_method'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_var + ".high(); \n" ;
    return code;
};



// pin digital low method
Blockly.Blocks['pin_low_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Pin:")
    .appendField(new Blockly.FieldDropdown(all_devices.pin_dropdown), "var");
    this.appendDummyInput()
    .appendField("low");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['pin_low_method'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_var + ".low(); \n" ;
    return code;
};

/*
 // pin analog write method
 Blockly.Blocks['pin_analogWrite_method'] = {
 init: function() {
 this.setHelpUrl('http://www.example.com/');
 this.setColour(230);
 this.appendDummyInput()
 .appendField("Pin:")
 .appendField(new Blockly.FieldDropdown(all_devices.pin_dropdown), "var");
 this.appendValueInput("value")
 .appendField("analog write value");
 this.setInputsInline(true);
 this.setPreviousStatement(true);
 this.setNextStatement(true);
 this.setTooltip('');
 }
 };
 
 Blockly.JavaScript['pin_analogWrite_method'] = function(block) {
 var dropdown_var = block.getFieldValue('var');
 var value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
 // TODO: Assemble JavaScript into code variable.
 var code = "my." + dropdown_var + ".analogWrite(" + value + "); \n" ;
 return code;
 };
 */

/* pin digital read block
 Blockly.Blocks['pin_digitalRead_method'] = {
 init: function() {
 this.setHelpUrl('http://www.example.com/');
 this.setColour(230);
 this.appendDummyInput()
 .appendField("Pin:")
 .appendField(new Blockly.FieldDropdown(all_devices.analog_dropdown), "var")
 .appendField("digital read");
 this.setOutput(true, "Number");
 this.setTooltip('');
 }
 };
 
 Blockly.JavaScript['analog_read_method'] = function(block) {
 var analog_var = block.getFieldValue('var');
 // TODO: Assemble JavaScript into code variable.
 var code = "my." + analog_var + ".analogRead()" ;
 return [code, Blockly.JavaScript.ORDER_ATOMIC];
 };  */
