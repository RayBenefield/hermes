 - Make sure everything in a domain message return is just an id where possible
   for context
 - The context/entities system should have access to the entire snowball, not
   just the payload, otherwise the payload is affected when it shouldn't need to
 - Change the word Payload in the domain message structure to be context instead
 - Added automatic prettification in Vim
 - Flatten the Player object
 - Change payload to context
 - Rethink the entire entities system
 - Fix the save Context system to not only be based on the message that it is
   getting and instead use the stream
 - Refactor out the common prompt steps in all of the dev scripts
 - Refactor the handsForPlayers saving system
 - Refactor facebook to handle messages out to multiple leads
 - Create discard pile for white deck
 - Create discard pile for black deck
 - Combine getContext, enterDomain, and saveContext into just domain
 - Removed Object.values as it is only in Node 7.0 and not Node 6.11.1 on
   Firebase Cloud Functions
 - Create a has utility function to remove lodash as a dependency
 - Flesh out the candidates-submitted domain action
 - Flesh out the votes-submitted domain action
 - Make dev script to update persistent menu
 - Make dev script to update getting started call to action
