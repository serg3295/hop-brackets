import { ExtensionContext, Position, Selection, TextDocument, TextEditor, commands, window, workspace } from "vscode"

type FinderFunc = (currentPosition: Position, document: TextDocument) => Position

export function activate(context: ExtensionContext): void {
  const findBracketForward = ({ line, character }: Position, document: TextDocument): Position => {
    let lineContent = document.lineAt(line).text
    let lineNumber = line
    let charNumber = character

    while (lineNumber < document.lineCount) {
      while (charNumber < lineContent.length) {
        const currentCharacter = lineContent[charNumber]
        charNumber++

        if (targets.includes(currentCharacter)) {
          return new Position(lineNumber, charNumber)
        }
      }

      if (lineNumber === document.lineCount - 1) {
        return new Position(line, character)
      }

      lineNumber++
      lineContent = lineNumber <= document.lineCount ? document.lineAt(lineNumber).text : ""
      charNumber = 0
    }
    return new Position(line, character)
  }

  const findBracketBackwards = ({ line, character }: Position, document: TextDocument): Position => {
    let lineContent = document.lineAt(line).text
    let lineNumber = line
    let charNumber = character

    while (lineNumber > -1) {
      while (--charNumber >= 0) {
        const currentCharacter = lineContent[charNumber]

        if (targets.includes(currentCharacter)) {
          return new Position(lineNumber, charNumber)
        }
      }

      lineNumber--

      if (lineNumber === -1) {
        return new Position(line, character)
      }

      lineContent = document.lineAt(lineNumber).text
      charNumber = lineContent.length
    }
    return new Position(line, character)
  }

  const hop = (findBracket: FinderFunc): void => {
    const editor: TextEditor | undefined = window.activeTextEditor

    if (!editor) {
      return
    }

    const { document } = editor
    const currentPosition = editor.selection.active
    const bracketPosition = findBracket(currentPosition, document)

    editor.selection = new Selection(bracketPosition, bracketPosition)
    editor.revealRange(document.lineAt(bracketPosition).range)
  }

  const targets = workspace.getConfiguration().get("hop-brackets.charsUsed", "(){}[]'\"").split("")

  context.subscriptions.push(commands.registerCommand("hop-brackets.forward", () => hop(findBracketForward)))
  context.subscriptions.push(commands.registerCommand("hop-brackets.backwards", () => hop(findBracketBackwards)))
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate(): void { }
