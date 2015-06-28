//arduino board block based on cylon.js
Blockly.Blocks['main_board'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    
    this.appendDummyInput("ARDUINO")
    .appendField("main board");
    
    this.appendDummyInput("NAME")
    .appendField("name")
    .appendField(new Blockly.FieldTextInput("board"), "name");
    
    this.appendDummyInput("SERIAL_PORT")
    .appendField("port")
    .appendField(new Blockly.FieldTextInput(""), "port");
    
    this.appendValueInput('CONNECTION0')
    .appendField("connections")
    .setCheck("device_type");
    
    this.appendStatementInput("PROGRAM")
    .appendField("program");
    
    this.setMutator(new Blockly.Mutator(['connections_create_with_item']));
    this.itemCount_ = 1;
    
    this.setTooltip('');
},
mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
},
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
domToMutation: function(xmlElement) {
    for (var x = 0; x < this.itemCount_; x++) {
        this.removeInput('CONNECTION' + x);
    }
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    
    for (var x = 0; x < this.itemCount_; x++) {
        var input = this.appendValueInput('CONNECTION' + x).setCheck("device_type");
        this.moveInputBefore("CONNECTION"+x, "PROGRAM");
        if (x == 0) {
            input.appendField("connections");
        }
    }
    if (this.itemCount_ == 0) {
        this.appendDummyInput('EMPTY')
        .appendField("no connection");
        this.moveInputBefore("EMPTY", "PROGRAM");
    }
},
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
decompose: function(workspace) {
    var containerBlock = Blockly.Block.obtain(workspace, 'connections_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.itemCount_; x++) {
        var itemBlock = Blockly.Block.obtain(workspace, 'connections_create_with_item');
        itemBlock.initSvg();
        connection.connect(itemBlock.previousConnection);
        connection = itemBlock.nextConnection;
    }
    return containerBlock;
},
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
compose: function(containerBlock) {
    // Disconnect all input blocks and remove all inputs.
    if (this.itemCount_ == 0) {
        this.removeInput('EMPTY');
    } else {
        for (var x = this.itemCount_ - 1; x >= 0; x--) {
            this.removeInput('CONNECTION' + x);
        }
    }
    this.itemCount_ = 0;
    
    // Rebuild the block's inputs.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    while (itemBlock) {
        var input = this.appendValueInput('CONNECTION' + this.itemCount_).setCheck("device_type");
        this.moveInputBefore('CONNECTION' + this.itemCount_ , "PROGRAM");
        if (this.itemCount_ == 0) {
            input.appendField("connections");
        }
        // Reconnect any child blocks.
        if (itemBlock.valueConnection_) {
            input.connection.connect(itemBlock.valueConnection_);
        }
        this.itemCount_++;
        itemBlock = itemBlock.nextConnection &&
        itemBlock.nextConnection.targetBlock();
    }
    if (this.itemCount_ == 0) {
        this.appendDummyInput('EMPTY')
        .appendField("no connection");
        this.moveInputBefore("EMPTY", "PROGRAM");
    }
    
},
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (itemBlock) {
        var input = this.getInput('CONNECTION' + x);
        itemBlock.valueConnection_ = input && input.connection.targetConnection;
        x++;
        itemBlock = itemBlock.nextConnection &&
        itemBlock.nextConnection.targetBlock();
    }
}
};

Blockly.Blocks['connections_create_with_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
init: function() {
    this.setColour(260);
    this.appendDummyInput()
    .appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
    this.appendStatementInput('STACK');
    this.setTooltip('');
    this.contextMenu = false;
}
};

Blockly.Blocks['connections_create_with_item'] = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
init: function() {
    this.setColour(260);
    this.appendDummyInput()
    .appendField("connection");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
}
};




Blockly.JavaScript['main_board'] = function(block) {
    
    var board_name = block.getFieldValue('name');
    var board_port = block.getFieldValue('port');
    
    // get program statements
    var program_statements = Blockly.JavaScript.statementToCode(block, 'PROGRAM');
    
    //push the pin variable into the pin_var_set for the dropdown menu
    all_devices.board.push(board_name);
    var inside_name = all_devices.create_inside_name(board_name);
    all_devices.board_dropdown.push([board_name,inside_name]);
    
    //push the servo variable into the object list for REPL
    all_devices.objects.push(inside_name + " : " + inside_name);
    
    // assemble the connections
    var connection_list = new Array();
    for (var n = 0; n < block.itemCount_; n++) {
        var connection = Blockly.JavaScript.valueToCode(block, 'CONNECTION' + n, Blockly.JavaScript.ORDER_COMMA);
        if (connection) {
            connection_list.push(connection);
        };
    }
    
    //assemble devices
    var device_defintions = "\n" + connection_list.join("\n") +"\n";
    
    //assemble object list for REPL
    var repl_definition;
    if(all_devices.objects.length != 0){
        repl_definition = "this.repl.inject({\n" + all_devices.objects.join(",\n") + "\n});\n";
    }
    else{
        repl_definition = "";
    }
    
    
    
    
    //assemble code
    var code = "var five = require('johnny-five');\n\n";
    code = code + "var "+inside_name+" = new five.Board({port:'" + board_port + "'});\n\n";
    code = code +  inside_name + ".on('ready', function() {\n";
    code = code + device_defintions;
    code = code + repl_definition;
    code = code + program_statements +"})\n";
    
    return code;
};


// "wait" block based on loop event
Blockly.Blocks['board_wait_event'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
    .appendField("Board:")
    .appendField(new Blockly.FieldDropdown(all_devices.board_dropdown), "var");
    this.appendValueInput("duration")
    .setCheck("Number")
    .appendField("wait");
    this.appendDummyInput()
    .appendField("ms");
    this.appendStatementInput("action")
    .appendField("do");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['board_wait_event'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var value_interval = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_action = Blockly.JavaScript.statementToCode(block, 'action');
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_var + ".wait(" + value_interval + ", function() { \n";
    code = code + statements_action;
    code = code + "});\n"
    return code;
};



// "every" block based on loop event
Blockly.Blocks['board_loop_event'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
    .appendField("Board:")
    .appendField(new Blockly.FieldDropdown(all_devices.board_dropdown), "var");
    this.appendValueInput("interval")
    .setCheck("Number")
    .appendField("every");
    this.appendDummyInput()
    .appendField("ms");
    this.appendStatementInput("action")
    .appendField("do");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['board_loop_event'] = function(block) {
    var dropdown_var = block.getFieldValue('var');
    var value_interval = Blockly.JavaScript.valueToCode(block, 'interval', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_action = Blockly.JavaScript.statementToCode(block, 'action');
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_var + ".loop(" + value_interval + ", function() { \n";
    code = code + statements_action;
    code = code + "});\n"
    return code;
};


// the "pin mode" block
Blockly.Blocks['board_pinmode_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Board:")
    .appendField(new Blockly.FieldDropdown(all_devices.board_dropdown), "var");
    this.appendValueInput("pin")
    .setCheck("Number")
    .appendField("pin");
    this.appendDummyInput()
    .appendField("mode")
    .appendField(new Blockly.FieldDropdown([["INPUT", "five.Pin.INPUT"], ["OUTPUT", "five.Pin.OUTPUT"],["ANALOG", "five.Pin.ANALOG"],["PWM", "five.Pin.PWM"],["SERVO", "five.Pin.SERVO"]]), "mode");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['board_pinmode_method'] = function(block) {
    var board_var = block.getFieldValue('var');
    var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
    var value_mode = block.getFieldValue('mode');
    
    //Assemble code like : board.pinMode(13, five.Pin.INPUT);
    var code = board_var + ".pinMode(" + value_pin + ", "+ value_mode + ");\n";
    
    return code;
};



// the "analog write" block
Blockly.Blocks['board_analogwrite_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Board:")
    .appendField(new Blockly.FieldDropdown(all_devices.board_dropdown), "var");
    this.appendValueInput("pin")
    .setCheck("Number")
    .appendField("pin");
    this.appendValueInput("value")
    .setCheck("Number")
    .appendField("analog write");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['board_analogwrite_method'] = function(block) {
    var board_var = block.getFieldValue('var');
    var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    
    //Assemble code like : board.pinMode(13, five.Pin.INPUT);
    var code = board_var + ".analogWrite(" + value_pin + ", "+ value_value + ");\n";
    
    return code;
};


// the "digital write " block
Blockly.Blocks['board_digitalwrite_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Board:")
    .appendField(new Blockly.FieldDropdown(all_devices.board_dropdown), "var");
    this.appendValueInput("pin")
    .setCheck("Number")
    .appendField("pin");
    this.appendValueInput("value")
    .setCheck("Number")
    .appendField("digital write");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['board_digitalwrite_method'] = function(block) {
    var board_var = block.getFieldValue('var');
    var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    
    //Assemble code like : board.pinMode(13, five.Pin.INPUT);
    var code = board_var + ".digitalWrite(" + value_pin + ", "+ value_value + ");\n";
    
    return code;
};


// the "servo write " block
Blockly.Blocks['board_servowrite_method'] = {
init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
    .appendField("Board:")
    .appendField(new Blockly.FieldDropdown(all_devices.board_dropdown), "var");
    this.appendValueInput("pin")
    .setCheck("Number")
    .appendField("pin");
    this.appendValueInput("value")
    .setCheck("Number")
    .appendField("servo write");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
}
};

Blockly.JavaScript['board_servowrite_method'] = function(block) {
    var board_var = block.getFieldValue('var');
    var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    
    //Assemble code like : board.pinMode(13, five.Pin.INPUT);
    var code = board_var + ".servoWrite(" + value_pin + ", "+ value_value + ");\n";
    
    return code;
};


