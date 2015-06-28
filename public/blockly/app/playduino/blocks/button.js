// the button block with 0 as lower limit and 1023 as upper limit
Blockly.Blocks['button_device'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
    .appendField("Button: name")
    .appendField(new Blockly.FieldTextInput("button"), "var");
    this.appendValueInput("pin")
    .setCheck("Number")
    .appendField(" pin");
    this.appendDummyInput()
    .appendField("invert")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "invert");
    this.setInputsInline(true);
    this.setOutput(true, "device_type");
    this.setTooltip('');
}
};

Blockly.JavaScript['button_device'] = function(block) {
    var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
    var text_var = block.getFieldValue('var');
    var checkbox_invert = block.getFieldValue('invert') == 'TRUE';
    
    //push the button variable into the led_var_set for the dropdown menu
    all_devices.button.push(text_var);
    var inside_name = all_devices.create_inside_name(text_var);
    all_devices.button_dropdown.push([text_var,inside_name]);
    
    //push the servo variable into the object list for REPL
    all_devices.objects.push(inside_name + " : " + inside_name);
    
    //Assemble definition code
    if (checkbox_invert == false) {
        var code = "var " + inside_name + " = new five.Button(" + value_pin + ");";
    }
    else{
        var code = "var " + inside_name + " = new five.Button({pin: " + value_pin + ", invert: true});";
    }
    
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};




// event triggered when button is pushed
Blockly.Blocks['button_press_event'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
    .appendField("Button: name")
    .appendField(new Blockly.FieldDropdown(all_devices.button_dropdown), "var")
    .appendField("pushed");
    this.appendStatementInput("PROGRAM")
    .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['button_press_event'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var statements = Blockly.JavaScript.statementToCode(block, 'PROGRAM');
    
    //Assemble code
    var code = dropdown_var + ".on('press', function() { \n";
    code = code + statements;
    code = code + "});\n"
    
    return code;
};



// event triggered when button is released
Blockly.Blocks['button_release_event'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
    .appendField("Button: name")
    .appendField(new Blockly.FieldDropdown(all_devices.button_dropdown), "var")
    .appendField("released");
    this.appendStatementInput("PROGRAM")
    .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['button_release_event'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var statements = Blockly.JavaScript.statementToCode(block, 'PROGRAM');
    
    //Assemble JavaScript into code. eg: button.on('release', function() { ...}
    var code = dropdown_var + ".on('release', function() { \n";
    code = code + statements;
    code = code + "});\n"
    
    return code;
};


// event triggered when button is on hold for 500 milliseconds
Blockly.Blocks['button_hold_event'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
    .appendField("Button: name")
    .appendField(new Blockly.FieldDropdown(all_devices.button_dropdown), "var")
    .appendField("hold");
    this.appendStatementInput("PROGRAM")
    .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['button_hold_event'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var statements = Blockly.JavaScript.statementToCode(block, 'PROGRAM');
    
    //Assemble JavaScript into code. eg: button.on('hold', function() { ...}
    var code = dropdown_var + ".on('hold', function() { \n";
    code = code + statements;
    code = code + "});\n"
    
    return code;
};
