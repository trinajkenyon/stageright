# stageright

StageRight is a stack-based esoteric interpreted programming language inspired by (some might say nearly copied off of) [BeeScript](https://esolangs.org/wiki/BeeScript). It is interpreted by JavaScript, because why not.

This language allows for comments when preceded by "//". Comments still count as lines in the program when considering jumps. 
Lines are separated by newlines. 

| Instruction | Description |
| ------ | ------ |
| LINE | Read any amount of input from the user. It will be pushed one character at a time onto the stack unless preceded by "##". |
| DELIVER | Pop and print the top value of the stack. |
| CAST n | Push the given value onto the stack. |
| CUT | Pop the top value from the stack. |
| ENCORE | Duplicate the top value on the stack. |
| DUET | Pop the top two values from the stack, add them, and push the result back onto the stack. |
| SOLO | Pop the top value of the stack, A. Pop the next value, B. Subtract B - A and push the result back onto the stack. |
| CHORUS | Pop the top two values of the stack. Multiply and push the result back onto the stack. |
| TAKE n | Pop the top of the stack. If it is not 0 or '0', go to line n in the program (1-based addressing). |
| UNDERSTUDY | Move the bottom value of the stack to the top. |
| DIVA | Move the top value of the stack to the bottom. |