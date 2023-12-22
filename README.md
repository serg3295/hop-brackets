A Visual Studio code extension that allows you to easily navigate between the **nearest** brackets and quotation marks in the source code.

The built-in VS Code command `editor.action.jumpToBracket` moves the cursor to the closest enclosing bracket when not on a bracket character. This extension adds the feature of moving the cursor to the *nearest* bracket.

The extension is highly inspired by [jump-brackets](https://github.com/syovchev/jump-brackets) extension. Main differences to the *jump-brackets*:

- Heavily refactored
- Fixed bugs
- Removed selection feature

## Commands

- `hop-brackets.forward` Go to next bracket or quotes.
- `hop-brackets.backwards` Go to previous bracket or quotes.

ℹ️ No default keybindings are provided by this extension - you'll have to bind the commands yourself.

## Settings

- `hop-brackets.symbolsUsed` Specifies the characters to jump to. Default value: (){}[]'\"

## Requirements

VS Code version >= 1.75.0
