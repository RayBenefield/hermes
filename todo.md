 - Optimize the domain model to require less database calls as a whole
 - Add context to domain which specifically only holds IDs to track context
 - Add case for when trying to re-vote for a card
 - Use doEach now to save the context
 - Set the environment variable to determine how to log (colors are printed
   while running in Firebase)
 - Added automatic prettification in Vim
 - Refactor out the common prompt steps in all of the dev scripts
 - Refactor the handsForPlayers saving system, move to the "start" game domain service
 - Create discard pile for white deck
 - Create discard pile for black deck
 - Create a has utility function to remove lodash as a dependency
 - Make dev script to update persistent menu
 - Make dev script to update getting started call to action

# Bugs

## 1
Given: Queue with player already in it
When: Join the queue again
Then: Returns message with number of players equal to 1 more than it should have
