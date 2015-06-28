// the RGBled block
Blockly.Blocks['RGBled_device'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
    .appendField("RGBled: name")
    .appendField(new Blockly.FieldTextInput("RGBled"), "RGBled_var");
    this.appendValueInput("redpin")
    .setCheck("Number")
    .appendField("red pin");
    this.appendValueInput("greenpin")
    .setCheck("Number")
    .appendField("green pin");
    this.appendValueInput("bluepin")
    .setCheck("Number")
    .appendField("blue pin");
    this.setInputsInline(true);
    this.setOutput(true, "device_type");
    this.setTooltip('');
}
};

Blockly.JavaScript['RGBled_device'] = function(block) {
    var text_RGBled_var = block.getFieldValue('RGBled_var');
    var value_redpin = Blockly.JavaScript.valueToCode(block, 'redpin', Blockly.JavaScript.ORDER_ATOMIC);
    var value_greenpin = Blockly.JavaScript.valueToCode(block, 'greenpin', Blockly.JavaScript.ORDER_ATOMIC);
    var value_bluepin = Blockly.JavaScript.valueToCode(block, 'bluepin', Blockly.JavaScript.ORDER_ATOMIC);
    
    
    //push the RGBled variable into the RGBled_var_set for the dropdown menu o
    all_devices.RGBled.push(text_RGBled_var);
    var inside_name = all_devices.create_inside_name(text_RGBled_var);
    all_devices.RGBled_dropdown.push([text_RGBled_var,inside_name]);
    
    //push the servo variable into the object list for REPL
    all_devices.objects.push(inside_name + " : " + inside_name);
    
    //Assemble code like "var b = new five.Led.RGB({pins: {red: 3,green: 5,blue: 6}});"
    var code = "var " + inside_name + " = new five.Led.RGB({pins: {red: " + value_redpin + ", green: " + value_greenpin + ", blue: " + value_bluepin + "}});"
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


// Sets coloe of the RGBLED to the specified value like "ff00cc"
Blockly.Blocks['RGBled_color_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("RGBLed:")
    .appendField(new Blockly.FieldDropdown(all_devices.RGBled_dropdown), "var");
    this.appendValueInput("color")
    .setCheck("String")
    .appendField("set color");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['RGBled_color_method'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_var + ".color('" + value_color + "'); \n" ;
    return code;
};


Blockly.Blocks['color_constant'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField(new Blockly.FieldColour("#ff0000"), "color");
    this.setOutput(true, "String");
    this.setTooltip('');
}
};

Blockly.JavaScript['color_constant'] = function(block) {
    var colour_color = block.getFieldValue('color');
    // TODO: Assemble JavaScript into code variable.
    //var code = colour_color.slice(1);
    code = colour_color
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};


/*
 // led isOn block to check whether or not the led is on
 Blockly.Blocks['RGBled_isOn_method'] = {
 init: function() {
 this.setHelpUrl('http://www.example.com/');
 this.setColour(230);
 this.appendDummyInput()
 .appendField("RGBLed:")
 .appendField(new Blockly.FieldDropdown(all_devices.RGBled_dropdown), "var")
 .appendField("is on");
 this.setOutput(true, "Boolean");
 this.setTooltip('');
 }
 };
 
 Blockly.JavaScript['RGBled_isOn_method'] = function(block) {
 var dropdown_var = block.getFieldValue('var');
 // TODO: Assemble JavaScript into code variable.
 var code = "my." + dropdown_var + ".isOn()" ;
 return [code, Blockly.JavaScript.ORDER_ATOMIC];
 };
 */