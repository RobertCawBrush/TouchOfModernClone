## runThrough

#Formatting

an IIFE was wrapped around the entire script to avoid variable leakage

a `'use strict';` was placed at the top of the document to force the code conventions we want to follow to avoid careless errors

all lines of code that should be terminated are terminated with ;, not doing this and leaving it up to the compiler to add ; can cause "invisible" errors

all == signs were changed to === to avoid coercian( or what is known as a type of typeCasting) which if left by itself an if statement like `if(1 == '1')`` will evaluate
true

all variables were changed to be defined as explicit variables

all variables were camelCased and all constructors were pascal cased as per modern conventions

from there I reformatted a good amount of the whitespace to be much much easier to read
(there was an area of code that was formatted like you would see a config, I changed that but that was a matter of preference

#Understanding the code

`ah geez, it's ALL jQuery`

the next step was running through the code with a debugger to understand exactly what was happening. Initially, nothing was displaying on the page even after setting up the apache server,
from the readme it looked like this was undesirable and it was supposed to fail something like 6/10 times. My solution (or what was supposed to be the solution) was to introduce promises.

I think promises have been back ported to native ES5 but I am used to using q for my promises so I imported ES6 to get something like it. As you can see my promises didn't exactly turn out right. I believe this is due to my lack of understanding of the challenge's code.

Now as ES6 is not a library rather a new iteration of javascript I count it as not violating that rule. With ES6 comes arrows functions, promises, operations that remove the need for for loops, and much more.
Es6(what is now known as ES2015) isn't natively supported in all browsers yet so I needed to transpile my code. I installed Webpack and babel and the presets it needed to function. Again these are all jsut tools there isn't any code provided by
 webpack or babel.

 #My understanding of the code

 from what I gather the code works as follows:

 1. An object is created that has functions constructed on it, this first object is necessary mainly for the self.products array

 2. an AJAX call is made from that object and a for loop worker ran to populate self.products which fills said array with fifty something objects

 3. with the calls completion page.updateProductHTML is called and it fires another worker that devours the properties on the objects in self.products which psueod binds the values to a template

 4. from there the code runs it's final function, page.updateDOM, which attempts to build the HTML's rows  alternating between the remainder of 3 populating a row every 3 elements

 5. If everything executed in order than the page loads with about fifty components

 #explanation (WTFs with this guy's code)

 I've never only used Jquery before and was frankly surprised that this challenge was only Jquery. From what I gather, you're attempting to hire an engineer for a rewrite which i would say you're up for if this code is typical of the app

 I'm unfortunately a pretty modern developer so only using jQuery is mostly lost on me. That's not exactly a problem though as angular and react can run alongside a prebuilt jQuery application.

 So far I like the company(based on its history) but I'm not sure if our technologies are in the same vein.

 #What I would improve, and libraries

 This day in age a jQuery only app is fairly legacy, I would reWrite as soon as you could using something like React/Redux or even Angular.
 The speed you would gain would be worth it alone besides how simple some of the code could be rendered. Frameworks also significantly speed up development time and can cut down on the large amount of libraries you are no doubt using currently.
 Bootstrap would also be easier to use along with some mixins from SASS/LESS

 I would immediately cease using global variables as they can cause protectedName clashes as well as overwrite prototypes and cause general chaos.
 Variables should be declared locally and passed into functions as needed. Redux handles that pretty well with how it manages State(immutable state).

 Maybe look into ES6/ES2015 or TypeScript and look into a class based system from the challenge code it seems you favor that type of programming.

 As mentioned earlier I would import Q as I am familiar with it's methods and it's promises are more or less the same as ES6, plus there's a couple helper methods that cut down on code.

 I'd install a linter to check that a specific format is kept project wide, and define a specific server for my code. Cleaner code is better code.

 to maximize speed, all code needs to be uglified/minified to eliminate white space and long variable names. Besides the speed increase the file will also be smaller speeding the runTime up even more.

  ## wrapup
  I apologize if I came off as rude in the above text that is not my intention. The challenge was interesting even with me failing it. I will be recreating the page in React in the next coming days.