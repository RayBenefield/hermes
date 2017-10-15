# Work Log

## #20

Started working on engineering the domain for the game and how it interacts with
outside platforms like Facebook. This will be important for ensuring that we
test the right things and we keep the logic in the right places. Quick break.


## #19

Back to coding today. I started out by fixing a major issue where messages were
all sent at the same time and as a result did not show up in the right order. So
I implemented a solution I found here:
https://hackernoon.com/functional-javascript-resolving-promises-sequentially-7aac18c4431e,
and it worked like a charm. Then I did a bit of refactoring to clean it up.
Today I need to spend a lot of time on planning out the engineering effort and
separating Facebook rendering responsibilities from the actual domain itself. I
have to think of this in terms of the domain being its own server. Even though I
won't be splitting it off since I'm running small efficient nanoservices. Time
for a break.


## #18

WOOT!!! I finally got the visuals mostly done all the way through for all of the
major actions and events. Now I can just clean up the Facebook library and start
working on the actual domain logic that will support all of this. Tomorrow will
be a good day and I'll have a very powerful visual system already setup for all
of this. WOOT!!!

Here are a couple of shots from mobile (ignore the order of the messages):

![Black Cards](./images/mobile-cards.png)
![Votes](./images/voter-list.png)


## #17

Finished up the work for the carousel for showing a hand. Took a little bit to
realize that I was messing up syntax somewhere, but I got it. Next will be
tackling the two different kinds of lists at the same time and hopefully
finishing up the visuals for all of the actions.


## #16

Finally got the generic card to work for when you are picking a card. Now I need
to start work on the list template, cuz that one is crucial for the goal and the
voting. So that is my next target.


## #15

Setup the placeholder messages for the various actions. Also figured out how to
setup a persitent menu. I now need to setup support for an array of messages or
a single object. Then I can split up the placeholder system without using double
new lines.


## #14

I setup proper recognition of some postbacks and quick replies now. This will
give me some flexibility in how I trigger the visuals for these messages. Right
now the goal is to have all the pretty pictures done hopefully in a session or
two and then we can start playing with the domain.


## #13

Got the Facebook endpoints working smoothly and now I'm ready to start sending
mocked Facebook messages based on actions. Shouldn't be too bad, but I haven't
worked with persistent menus or the getting started button yet, so I may hit a
couple roadblocks.


## #12

I was going to setup the firebase server local database, but it ultimately
didn't work out. I couldn't get the server to be recognized by my local running
function so for now I'm just gonna call it good. I'll just move on to doing
Facebook integration.


## #11

Setup the node project for the functions. Set it up to work with a new firebase
project. Also setup a script to easily run the functions locally while also
refreshing for any changes that are made. Next is to setup a local firebase
database and also setup the facebook endpoint to get to work.


## #10

Finished up the last of the design for the interface. Including the winner
presentation and the next goal. Everything should be good to go for jumping into
coding now. So after a long break I'm going to jump back on and start working on
the minimal portion of interacting with Facebook. But first a really long break.

Final first draft of the interface:

![Interface Design Session #5](./images/interface-design-5.png)


## #9

Finally created the voting list symbol and started going through the whole
voting flow. Shouldn't be long to finish the remaining votes and then it is just
a matter of handling the winner and showing a new goal. After that it should be
good.

Current progress:

![Interface Design Session #4](./images/interface-design-4.png)


## #8

Created the items for the goal list as well as the carousel items for white
cards to be used and added a couple more steps to the flow. Next I'll have to
start tackling the voting system flow and then the winner portion. And that
should be it. So 1 or two more sessions as I guess.

Current progress:

![Interface Design Session #3](./images/interface-design-3.png)


## #7

Created most of the flow up until I needed custom messages for the goal. So now
I'm creating the symbols needed for the different containers of data. Making
solid progress though. Probably 3 more sessions for interface design.

Current progress:

![Interface Design Session #2](./images/interface-design-2.png)


## #6

I've officially started the interface design. I had to build the base templates
for the android interface including the get started page and more. But next
session I'm good to start creating the flow of the interface.

The initial work for the interface design:

![Interface Design Session #1](./images/interface-design-1.png)


## #5

Finished up the last of the use cases for the domain and now I'm making plans
for the interface design process. Should be a good time. I will have to probably
create the list template, the message bubbles, the getting started page, and a
few other things to really do it right.

Below is the final first draft of use cases:

![Use cases Session #4](./images/use-cases-4.jpg)


## #4

Got through a good portion of the voting process and just need to finish up the
final portion so we can start on interface design. Still lots to do for the
product side of things, but it is necessary before we start coding so we have a
clear direction moving forward and everything is sort of pre-thought out.

Current progress on the use cases:

![Use Cases Session #3](./images/use-cases-3.jpg)



## #3

So I realized during my walk that I needed to re-think how I was creating the
use cases. The use cases should really be around the platform/domain not around
the interface itself. That will be what the interface design is for. So I made
some solid progress on starting up a game and am working towards the use cases
revolving around actual play. Shouldn't take me more than 2 more sessions to
finish up the use case design. Which after that I'll probably take a break for
Breakfast and then after Breakfast I'll tackle interface design. And hopefully
finish interface design by Lunch time and then start the initial coding after
Lunch.

Current progress on the new use cases:

![Use Cases Session #2](./images/use-cases-2.jpg)


## #2

So I organized all of the brainstorming ideas that I had into Product,
Technology, and Executive groups. Then I started working on the use cases. It is
going to prove to be a fairly long process as it is a mix of both UI interaction
for the user and domain management.

Current progress on use cases:

![Use Cases Session #1](./images/use-cases-1.jpg)


## #1

I started out with a brainstorming session for Hermes. Setup the initial
directory structure for the project to track all artifacts and code. Getting
ready to start working on the use case design after brainstorm organization.

Here is a snapshot of the brainstorming:

![Brainstorming](./images/brainstorming.jpg)
