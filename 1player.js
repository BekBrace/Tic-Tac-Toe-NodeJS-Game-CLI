// Start with player.js first, then board, and finally match

import inquirer from 'inquirer'

import { Board } from "./2board.js"

// Create the movement list that each player will choose
const MOVE_LIST = [
  '0 (Top Left)',
  '1 (Top Middle)',
  '2 (Top Right)',
  '3 (Middle Left)',
  '4 (Middle Middle)',
  '5 (Middle Right)',
  '6 (Bottom Left)',
  '7 (Bottom Middle)',
  '8 (Bottom Right)',
]

// First, I will create a class that defines Player, setting order the variable which tells if the 
// player is first or second to make a move and name to record the player's name.
export class Player {
  constructor(order) {
    this.order = order
    this.name = `Player ${order}`
  }

//   We want the player to put their name in, so we add a function in that class to ask the player what their name is.

//  Using inquirer, we can do that easily.
async init() {
  const answer = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'What is your name?',
    default: `Player ${this.order}`
  })
  if (answer.name) {
    this.name = answer.name
  }
}
// ---------------------------------------------------------------------------------------
// STOP HERE AND GO CREATE THE BOARD FILE
// THEN RETURN TO CONTINUE
// ---------------------------------------------------------------------------------------

/**
 * Make Player choose move
 * @param {Board} board 
 * @returns {int} return calculated move
 */

// we will create an asynchronous function that let players choose which spot they want to mark. 
//Tic Tac Toe has nine spots, so we make an array of it, this is the move_list array that we've created above.
// We will filter it by value and index and will return the index in the board
  
async calcMove(board) {
    const legalMoveList = MOVE_LIST.filter((_, index) => !board.table[index])
    
    const answer = await inquirer.prompt({
      name: 'move',
      type: 'list',
      message: `${this.name} Choose your move.`,
      choices: legalMoveList
    })
    return MOVE_LIST.findIndex(move => move === answer.move)
  }
}
