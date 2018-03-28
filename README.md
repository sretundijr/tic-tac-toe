
Currently has a two player mode and prints winner to console

First iteration, make a working easy game setting to understand some of the challenges
presented by the game logic.

Currently two player game works and ai easy works

Next step add a medium difficulty version that plays a defensive game.

Medium version is working but is still easy as it does not look for winning combos only defensive moves

Bug fix with event propagation and object creation.  The older objects were bound to the old event listeners
causing old object data to creep into the output. Issue was resolved by creating event listeners for the rendered
buttons.

End goal is to reproduce a version of the minimax algorithm for the difficult game setting