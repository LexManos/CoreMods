/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
function initializeCoreMod() {
    return {
        'coremodmethod': {
            'target': {
                'type': 'METHOD',
                'class': 'net.minecraftforge.coremod.testjar.TestClass',
                'methodName': 'False',
                'methodDesc': '()Z'
            },
            'transformer': function(method) {
                var Opcodes = Java.type('org.objectweb.asm.Opcodes');
                var arrayLength = method.instructions.size();
                for (var i = 0; i < arrayLength; ++i) {
                    var instruction = method.instructions.get(i);
                    if (instruction.getOpcode() == Opcodes.ICONST_0) {
                        var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
                        var newInstruction = new InsnNode(Opcodes.ICONST_1);
                        method.instructions.insertBefore(instruction, newInstruction);
                        method.instructions.remove(instruction);
                        print("Manually replaced false with true");
                        break;
                    }
                }
                return method;
            }
        }
    }
}