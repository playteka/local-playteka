// digital device
Blockly.Blocks['digital_device'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
    .appendField("Digital: name")
    .appendField(new Blockly.FieldTextInput("digital"), "var");
    this.appendValueInput("pin")
    .setCheck("Number")
    .appendField(" pin");
    this.setInputsInline(true);
    this.setOutput(true, "device_type");
    this.setTooltip('');
}
};

Blockly.JavaScript['digital_device'] = function(block) {
    var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
    var text_var = block.getFieldValue('var');
    
    //push the digital variable into the led_var_set for the dropdown menu
    all_devices.digital.push(text_var);
    var inside_name = all_devices.create_inside_name(text_var);
    all_devices.digital_dropdown.push([text_var,inside_name]);
    
    //push the servo variable into the object list for REPL
    all_devices.objects.push(inside_name + " : " + inside_name);
    
    //Assemble code like "var sensor = new five.Sensor.Digital(2);"
    var code = "var " + inside_name + " = new five.Sensor.Digital(" + value_pin + ");";
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



// event triggered when digitalvalue changed
Blockly.Blocks['digital_change_event'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
    .appendField("Digital: name")
    .appendField(new Blockly.FieldDropdown(all_devices.digital_dropdown), "var");
    this.appendDummyInput()
    .appendField("when recived new digital value");
    this.appendStatementInput("PROGRAM")
    .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['digital_change_event'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var statements = Blockly.JavaScript.statementToCode(block, 'PROGRAM');
    
    //Assemble JavaScript into code. eg: my.sensor.on('digitalChange', function() { ...}
    var code = dropdown_var + ".on('change', function() { \n";
    code = code + statements;
    code = code + "});\n"
    
    return code;
};


// event triggered when data recieved
Blockly.Blocks['digital_data_event'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
    .appendField("Digital: name")
    .appendField(new Blockly.FieldDropdown(all_devices.digital_dropdown), "var");
    this.appendDummyInput()
    .appendField("when data received");
    this.appendStatementInput("PROGRAM")
    .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['digital_data_event'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var statements = Blockly.JavaScript.statementToCode(block, 'PROGRAM');
    
    //Assemble JavaScript into code. eg: sensor.on("data", function() { ... }
    var code = dropdown_var + ".on('data', function() { \n";
    code = code + statements;
    code = code + "});\n"
    
    return code;
};

//digital value parameter
Blockly.Blocks['digital_value_parameter'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("digital value");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('');
}
};

Blockly.JavaScript['digital_value_parameter'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'this.value';
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};