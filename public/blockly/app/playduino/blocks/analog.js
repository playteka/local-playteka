// the analog sensor block with 0 as lower limit and 1023 as upper limit
Blockly.Blocks['analog_device'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
    .appendField("Analog: name")
    .appendField(new Blockly.FieldTextInput("analog"), "var");
    this.appendValueInput("pin")
    .setCheck("Number")
    .appendField(" pin");
    this.setInputsInline(true);
    this.setOutput(true, "device_type");
    this.setTooltip('');
}
};

Blockly.JavaScript['analog_device'] = function(block) {
    var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
    var text_var = block.getFieldValue('var');
    
    //push the analog variable into the led_var_set for the dropdown menu
    all_devices.analog.push(text_var);
    var inside_name = all_devices.create_inside_name(text_var);
    all_devices.analog_dropdown.push([text_var,inside_name]);
    
    //push the servo variable into the object list for REPL
    all_devices.objects.push(inside_name + " : " + inside_name);
    
    //Assemble code like "var sensor = new five.Sensor('A0');"
    var code = "var " + inside_name + " = new five.Sensor('A" + value_pin +"');";
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};





// event triggered when analog value changed
Blockly.Blocks['analog_change_event'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
    .appendField("Analog: name")
    .appendField(new Blockly.FieldDropdown(all_devices.analog_dropdown), "var");
    this.appendDummyInput()
    .appendField("when value changed");
    this.appendStatementInput("PROGRAM")
    .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['analog_change_event'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var statements = Blockly.JavaScript.statementToCode(block, 'PROGRAM');
    
    //Assemble JavaScript into code. eg: sensor.on("change", function() { ... }
    var code = dropdown_var + ".on('change', function(val) { \n";
    code = code + statements;
    code = code + "});\n"
    
    return code;
};


// event triggered when analog value changed
Blockly.Blocks['analog_data_event'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
    .appendField("Analog: name")
    .appendField(new Blockly.FieldDropdown(all_devices.analog_dropdown), "var");
    this.appendDummyInput()
    .appendField("when data received");
    this.appendStatementInput("PROGRAM")
    .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['analog_data_event'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var statements = Blockly.JavaScript.statementToCode(block, 'PROGRAM');
    
    //Assemble JavaScript into code. eg: sensor.on("change", function() { ... }
    var code = dropdown_var + ".on('data', function(val) { \n";
    code = code + statements;
    code = code + "});\n"
    
    return code;
};


//analog value parameter used in analog event
Blockly.Blocks['analog_value_parameter'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("analog value");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('');
}
};

Blockly.JavaScript['analog_value_parameter'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'this.value';
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};