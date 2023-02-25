import chalk from "chalk"
import { Player } from "./1player.js"

// Board is a place where the player can put marks on it. As said before, Tic Tac Toe contains nine spots. 
// We start by making a class that has board information in it. 
// 0s are empty spots, 1s are spots with player order one's mark (O), and 2 are spots with player order two's mark (X).
export class Board {
  constructor() {
    this.table = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    this.marks = [
      chalk.gray('-'),
      chalk.blueBright('O'),
      chalk.magenta('X')
    ]
  }

  /**
   * Place a piece on board[pos]
   * if it is empty (0)
   * 
   * @param {Player} player Player who places (0-1)
   * @returns {boolean} return true if successful
   */

  //Now we get into building the game rule. 
  // First, we want to enable the player to play the move, the player needs to put their marks on board. 
  //But we don't want players to choose spots with a mark on it. 
  // SO WE WILL CREATE AN ASYNCHRONOUS FUNCTION THAT WILL RETURN THE PLAYER'S MOVEMENT ONLY IF HE CHOSE AN EMPTY SPOT, OTHERWISE, WE WILL CONSOLE LOG THAT PLACE IS TAKEN ALREADY, AND WE WILL RETURN FALSE. 

  async place(player) {
    const pos = await player.calcMove(this)

    if (this.table[pos] == 0) {
      this.table[pos] = player.order
      return true
    }

    console.log('Place is busy ⭕ Choose an empty spot!')
    return false
  }

  /**
   * Print out board with marks
   * 
   * @returns {void} return true if successful
   */
  print() {
    const arr = []

    for (let i = 0; i < 3; i++) {
      let row = []

      for (let j = 0; j < 3; j++) {
        row.push(this.marks[this.table[i * 3 + j]])
      }

      arr.push(row.join(' | '))
    }
    console.log(arr.join('\n') + '\n')
  }

  /**
   * Check if Player Win
   * 
   * @param {Player} player Player (0-1)
   * @returns {boolean} return true if player win
   */
  checkIsWin(player) {
    const checkList = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], 
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], 
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < checkList.length; i++) {
      const check = checkList[i]
      let count = 0

      for (let i = 0; i < check.length; i++) {
        if (this.table[check[i]] === player.order) {
          count = count + 1
        }

        if (count === 3) {
          return true
        }
      }
    }

    return false
  }
}
