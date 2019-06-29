# Maze in JS

## Description

A random generated maze in JS.

Built with:

* Javascript
* React

## Design

### `src/components/Maze.js`

* Input:
* Output:
  * Generate a div elements consists of following components:
    * Canvas: Maze
    * Canvas: Solution
    * div: player
    * div: start (static)
    * div: destination (static)
* Behaviors:
  * The div element(root) should have a fixed size.
  * If the player reached to the destination, start a new maze.
    * To start a new maze:
      * Create a new MazeStructure
      * Reset Both player(position) and solution.

### `src/utils/MazeStructure.js`

* Input:
  * `seed`: the number used to produce sudo-random numbers
  * `mazeSize`: the number of blocks for each row/column of the maze.
* Output:
  * `maze`: a 2D n*n Array represents the "walls" of the maze where n is the `mazeSize`.
  * `solution`: a M*2 Array represents the path from the beginning (top-left) to the end (bottom-right) of coordinates.

## TODO

* Added bot/bots that can automatically run the maze.
* Path Tracking. Allows user to show/hide the path.
* Multiplayer.
  * Allows multiple players to play the maze at the same time.
  * Allows user to save or load the past record.
