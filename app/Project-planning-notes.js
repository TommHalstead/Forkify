/*
----------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------- PROJECT PLANNING --------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------


USER STORIES: 

1.) As a user, I want to SEARCH FOR RECIPES, so that I can find NEW IDEAS FOR MEALS
2.) As a user, I wasnt to be able to UPDATE THE NUMBER OF SERVINGS, so that I can cook a meal for DIFFERENT NUMBER OF PEOPLE 
3.) As a user, I want to BOOKMARK RECIPES, so that I can REVIEW THEM LATER
4.) As a user, I want to be able to CREATE MY OWN RECIPES, so that I have them all ORGANIZED IN THE SAME APP
5.) As a user, I want to be able to SEE MY BOOKMARKS AND RECIPES SO THAT I CAN VIEW THEM LATER ONCE I CLOSE THE APP.


FEATURES: 

        User-1 - Search for items
1.) Search functionality: Input fields to send request to API with searched keywords
2.) Display results with multiple pages (pagination) for multiple results.
3.) Display recipe with cooking time, servings and ingredients 

        User-2 - Update servings
4.) Change servings functionality: Update all ingredients according th current number of servings

        User-3 - Bookmark recipes
5.) Bookmarking functionality: Display list of all bookmarked ingredients

        User-4 - Create recipes
6.) User can upload their own recipes
7.) User own recipes will automatically be bookmarked
8.) User can only see their own recipes, not recipes from other users.

        User-5 - See my bookmarks and recipes and come back later
9.) Store bookmark data in the browser using local storage.
10.) On page load, read saved bookmarks from local storage and display them on the page.


----------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------- SETTING UP PARCEL -------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------

- When we setup parcel, we give it initial access to our controller.js file or our starting file, we then from there have to import every other file that is related to the controller, so that parcel will now have access to these other filse and therefore be able to read and use them.

- When working with your package.json file, a devDependency is an element that contains all the packages that your prject requires in the development process and not in the prodcution or testing environments/phases.

- When we set up parcel, the folders that parcel create in the 'dist' folder are the real ones that we will use for future deployment.

- Since we referenced the css file within the <link rel>, parcel knows it needs to compile the sass file to css. href="src/sass/main.scss", that way parcel will know it needs to compile the sass css file to css in the end, and place that compiled code into the new index.html file that was created by parcel. The same works with the images, parcel will copy all of these files and give them a new name, and replace that image in the newly creaetd index.html file to the new image names that parcel has created.

- A module bundler takes our raw source code and compiles it into a nice package (folder) that browsers can understand, and then be shipped to the browser so that it can display this newly created source code.

- For reminder, we use the const res = await fetch(`API URL`) to await the promise within an async function. Once the data is received, it will be stored into this variable for later use. Once we parse our first response through json() we can then get our data from that parsed response.

- Parcel can import all sorts of things, not just variables or modules, but images and icons etc etc.

- When using parcel, we also need add polyfills for ES6 features via packages with npm to our codebase.

- We use regenerator-runtime for the compiling of async functions. 

- We use core-js for polyfilling general ES6 features and methods, etc.

- npm i core-js regenerator-runtime will install both of these packages at once.

- Once we install these packages, we have to import them into our code so that they can be utilized. 

- When we import packages from npm, we don't need to specify any patch because they are in the package.json folder. 

----------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------ GENERAL PROGRAMMING TIPS --------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------


- A common practice (if needed) is to rename variables inside of an object received by an API call to match javascript standards.

- Within a URL like so: 'https://forkify-v2.netlify.app/#5ed6604591c37cdc054bcd09' The digits at the end is the ID of the URL and the # with all of the numbers, is the hash.

- The hash changing, is an event that we can actually listen for and make decisions based off of that hash changing. In order to listen to the event of the hash changing, we first have to add an event listener to the window object. So, window.addEventListener(`hashchange`, callback fn).

- In order to change the data based on this hash, we grab the hash location with 'window.location.hash'.

- When building your project, try to think as broad as possible. Meaning try to use as few functions to accomplish all the tasks needed. Combine functionality when possible.

- When verifying forms, we can use the FormData web API. new FormData(), and into this we have to pass in an element that is a form.

- Object.fromEntries() allows you to transform a list of key-value pairs into an object.

----------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------- IMPORTING ICONS AND IMAGES WITH PARCEL -------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------


- When we are developing our project with parcels development environment, our originally linked images and icons will no longer be the ones we have in our assets folder, but instead they will be the ones sent to this 'dist' folder by parcel. So in order to use them, we must import them from our original icons folder into our file they we are doing our work in.

- When we import these images or icons, we have to import it in regards to our current file location. For example if the folder is a sibling of the current folder, we must use '../' that way we are accessing our parent folder, and from there we can navigate to the folder we are trying to reach. For example: "import icons from 'url:../img/icons.svg';" with parcel 2, we must also use the 'url:' keyword beforehand in order for this to work.


----------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------ ARCHITECTURE --------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------


- We must create a structure for our program so that our code isn't just all over the place in the global scope etc etc.

- When building a project, the architecture is very important for maintainability, a project is NEVER DONE! We will always have to go back and maintain the code within our projects, so organizing our code helps very much with this.

- Architecture helps with expandability, in case we want to come back later and add more features. This is only possible with a good structure that we can rely on in order to implement new abilities easier.

-- The perfect achitecture is the one that allows all three of these key ideas to work together best.

- We can build our own architecture, but this is very difficult. Especially with a large program. There are established architecture patterns developed by previous programmers. Such as MVC, MVP, Flux etc.

- Frameworks like React, Angular, Vue, Svelte etc. are popular ways for organzing and structuring code.

-- There are some main components that any architecture must have, those are:

1.) Business Logic 
- All the code that solves the actual business problems. 
- The actual processing logic of the application. (Taxes calculation, messaging, storing transactions etc.)
2.) State
- Application state is what stores all the data about the application running in the browser (The data about the front-end processes) e.g objects from APIs, form data, any data used on the front-end
- Should be the 'single source of truth' 
- Should be kepy in sync with the UI. If data changes in the state, the UI should represent this.
- State management libraries exist like redux  
3.) HTTP library
- Responsible for making and receiving AJAX requests.
- Fetch requests etc.
4.) Application Logic (Router)
- Code that is only concerned about the implementation of the application itself. (Handling UI events, nav on the page etc.) Rendering elements to the DOM and these type of non-business related items
5.) Presentation Logic (UI LAYER)
- Code that is concerned with the actual UI design. 
- Essensially displays the applications state so users can interact with this state.
- We need to keep the state in sync with the UI layer, by having our UI represent the state and update both according to the application logic.

-- Any good achitecture has a way of seperating all of these componenets so they are neatly organized and work toegether well with each other.

-- We will be using the MVC ( Model, View, Controller ) architecture design pattern.

- Model - Applications data ( Usually contains the state and the business logic, also contains the HTTP library as well.)

- View - Presentation Logic

- Controller - Application logic, sits in between the model and the view as a way to implement the model to the view. 

-- One of the big goals the the MVC pattern is to seperate the business logic from the application logic. Doing this, we need a way to connect the business logic to the presentation logic. This is the controller, or the application logic.

- A mini representation to how this works is as follows: User clicks a button, 'controller' - handles this event and communicates this to the business logic 'model' - does computations and sends this info to the controller, who then updates the presentation logic or the 'view'. 

- With this logic, it's only the controller who calls functions and imports from the model and the view. The MODEL and the VIEW are completely standalone logics within this paradigm that are only controlled and interacted with by the controller.

- All that either the view or the model do is sit there with their own processes and logic ready to be interacted with by logic and function calls from the controller.

- We create a config.js file in order to store functions, variables, or any peice of code that we're not 100% sure about that might be changed later or updated, reused etc. The standard for config.js files is to capitalize all of the variable names for them to standout. Any time we have random numbers or random pieces of data that may be unreadable from anothers perspective, we should name these and place them in our config files so that we have a cookie trail or something we can look at to verify this data and its purpose.

- We have created multiple views for each section of the webpage that we need to add funtionality to. We have a searchView.js, resultsView.js, recipeView.js and a View.js. This splits up all of our actual imlementation related to the UI, therefore making it easier to refactor and add to later on.

- Within all of these views, we have created classes in order to hide and encapsulate our functionality without it being in the global scope. 

----------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------- ACTUAL IMPLEMENTATION ----------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------

- We create a seperate javascript folder for our controller, model, and then the multiple views.

- We use multiple view folders simply because we don't want to folder to contain 500+ lines of code. We could also split up the controller and the model as well, but for this project that won't be necessary because they shouldn't be too big.

- We first start by creating our state object and loadRecipe() functionality and export all of this info to the controller.js module.

- If we have async functions in one module and we export them, all the same rules still apply. We still must await these promises and parse these promises before we can have access to them.

- ITS VERY IMPORTANT to remember that whenever we create an async function it will ALWAYS return a promise that we first must handle whenever we call that async function to get data. EVEN IF this function returns nothing, we still must handle the promise when we call it.

- Export default means to only export one item. 

- We create a class for our recipes and we export a new object created from that class. export default new RecipeView();. Since we don't have a constructor, we don't need to pass any data into this new class. After this we have to import this class into our controller file so we can use this data in this other module.

- When we import default, we can give that default any name on the importing file.

- We create a config.js file in order to store all of our global variables in it, that way we can easily change and update this information just purely based on this one file

- Since our API URL grab will be used more than one time across our application, we create a config.js file in order to use this same URL again within any of our scripts easily. We make it API_URL all caps because it will be a constant that will NEVER change. (A common practice.)

- We put all global const declarations into a seperate folder so that we need to import it in order to use it. 

- We also create a new file to hold all of our helper functions. These are functions that will be little pieces of code to help apply the DRY principle. We create a new file for this so that we can ration this data up and use it when we need to across all files.


----------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------- ERROR HANDLING --------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------

- When we are handling errors, especially when we have try{}catch(){} blocks, we will get multiple errors thrown because lets say we have an API call that fails, we got one error for that and then whatever other data or actions are piggybacking off of this API call will also throw errors as well in their respective functions and locations. The goal is to handle the actual error where it is actually happening. We will get an error thrown in our helper.js file because of a bad request, because this is where the function is living. The function wasn't called in this file itself though, it simply was created and the function body lives in this file so therefore it will throw an error at this file too. We only call this function within the model.js loadRecipe() function, so that is what we want this error to represent.

- When we need to catch an error that is happening in one function, but is being called in another function(therefore that's where we want to handle the error) we have to re-throw our error from our original function so that it will propegate down the line in order to be caught in the correct function.

- When we use a try...catch block, and we throw new Error(), this error object will be created and passed down to the nearest .catch() block in the call stack with our message we defined in the error object. When we throw a error, and we define a message. This is the message that will be sent to the nearest catch block.

- When we are throwing an error, we can use either the simple throw Error(), or we can use the constructor syntax of throw new Error(). The constructor syntax is better because it wraps the developer created error into an object with the following format: {name: `Error`, message: `String that you define in the constrcutor`}. Therefore when we use the constrcutor syntax, we are then able to access the error name and the error message. Whereas with just creating a simple Error object, we don't then have access to the name and message property.

- .catch() handlers will handle errors thrown in promises. Whether it's a reject() call or an error created by the developer with the throw new Error() constrcutor. When we throw an error from an async function, it will then reject the error. That way we can handle this error later on.

- A common usecase of the setTimeout() function is to set a timer to automatically make this request fail. Therefore if a user has bad internet connection, it will timout after the designated time that we set. This way we prevent the fetch from running forever. In order to implement this functionality, we must first create a function that retuns a promise. Within that promise, we have a setTimeout() function that within its function body will reject the promise. Now we will use the Promise.race() static method in order to pass in both of these promises. Whatever promise returns first wins the race and that response is now the return value of that Promise.race() function. The reject() method will only be called once and if the setTimeout() function finishes before the API fetch() call returns.

- We can create a seperate function(s) to render and handle our errors for us, wherever we want our errors to end up, we just have to make sure we properly propegate these errors down through the correct catch blocks in order to get it to where we want it to be. In order to keep from hardcoding anything directly to the console, we can make a private field in a class and set that to our error message. Within our errorHandler function, we can pass in that default error message to display. Now we can re-use this function multiple times in many places with a seperate error message. 

- We can use the `debugger` keyword ANYWHERE in our code and code execution will stop at that point within the console and we can then do a play by play for each individual step and watch the flow of our code in order to understand why we're getting errors. To the right of the console without our debugging screen, we can view the enire callstack in action as we go through each line of our code.


----------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------- Events ----------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------

- Within the MVC pattern, we want to HANDLE events within the controller. Otherwise, application logic would be in the view and this is not what we want.

- On the other hand, we want to listen for these events inside the view because otherwise we would need our DOM elements in the controller, and this is not what we want either.

-- So we want to listen to our events in the view that they are in, but we want to handle these events in our controller module.

- A solution of having our event handlers in one script and our actual functionality to handle that event in another folder, is easily handled by the Publisher/Subscriber architecture pattern. These patterns that we are using, are simply well established solutions to these issues that are well known in the developer world.

- A PUBLISHER is the code that knows WHEN to react to an event. 

- A SUBSCRIBER is the code that is actually executed when this event is triggered. 

-- The solution to this issue, is that we can now SUBSCRIBE to the PUBLISHER by passing in the SUBSCRIBER function as an argument to the PUBLISHER. The way this works is, we have our program that loads, which calls our addHandlerRender() function, that has the controlRecipes() function passed in as an argument. This means we SUBSCRIBE controlRecipes() to the addHandlerRener() function.

- AS SOON AS THE PUBLISHER PUBLISHES AN EVENT, THE SUBSCRIBER WILL GET CALLED. WE PASS IN THE SUBSCRIBER TO THE PUBLISHER.

- The PUBLISHER needs access to the SUBSCRIBER.

--- PUBSUB STEP-BY-STEP: 

1.) We first create our publisher, which is our function that is the one to be listening for the event. This happens in our view.js since that is where we will be listening for the event at. As a parameter, we set it to the SUBSCRIBER(handler), which is the function that will be called once this event is triggered. Inside this function is where we add our event listener, and as a callback function to this event handler, we pass in our SUBSCRIBER or 'handler' parameter that we just created.

2.) Within our controller, since this is where we actually want to handle this event, we create a new function called `init()` and it is called immediately, that way the event listeners are added to the designated locations as soon as the page loads because inside this function body we are calling the handler method with the controlReciped passed in as an argument.

3.) Now, upon the program starting, the init() function will be called in the controller.js file with its function body containing the call to the recipeView.addHandlerRender(controlRecipes) class method that is in our recipeView module. This way, we have our listener inside a function within the view.js file that takes the SUBSCRIBER as an argument. Into our event handler, we pass in the argument of `handler`. Then when we call this file on startup with the init() method that lives inside of the (controller.js) file, which in turn as the argument has the controlRecipes function passed in. This way we have interconnectivity between our pages via the PUBSUB architecture method.

---- PUBSUB IS SIMPLY CREATING AN EVENT LISTENER INSDIE A FUNCTION FOR A SPECIFIC VIEW INSIDE THAT VIEWS FOLDER. THEN PASSING IN A HANDLER AS A PARAMETER. THEN SIMPLY CALLING THAT FUNCTION WITH THAT EVENT HANDLER INSIDE OF IT INSIDE OF THE CONTROLLER MODULE CONTAINING THE FUNCTION WE WANT TO PASS IN AS AN ARGUMENT.


----------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------- Searching ---------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------

- Since we want to keep all of our data seperated by the MVC architevture pattern, we will implement our actual search function in the model.js file but that function will only be called by the controller.js.

- We store ALL of our information related to the business logic application should be stored ALL in the state object that we are exporting, this way other modules can interact with it, and we have all of our relevant information saved into one object.

- We will create a new view for both our search results that are rendered to the UI and a different view for the actual search bar implementation. This is because these pieces sort of interact, but they aren't necessarily connected. Functionally and visually as well.

- In this search view, we use OOP and stick with classes for each view. This way we can have our private methods and private fields.

- We can use the `submit` keyword to listen for either the user clicking the button or for them hitting submit or enter. 


----------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------- Pagination ---------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------

- Pagination means to only load a limited number of results to show on the page at one time.

- In order to create a pagination function, we can do this formula: (page - 1) * 10 - for the start. Meaning page 1 - 1 * 10 = 0 and simply (page * 10) for the end result. This way if we want page 1 * 10, we get results from 0 - 10 with both of these forumlas. Then after this we can slice our array and grab the items from the array based on these values. We create a variable `RES_PER_PAGE` and save it in our config file singe it's a random number appearing out of nowhere and would be easy to change later on if we so wanted to.

- Since this function is a function that is an integral part of the whole entire pages functionality, we store this function in the model.js file. We also store the actual page that we are currently on as a property in the state as well so that we can know later on what page we are on and therefore navigate between pages. We also create this variable inside of our function and set it to the parameter that we have of page. 

- With pagination, we have a few scenarios:

1.) With >= 10 results, we want to show no page buttons.

2.) On page 1, we want to show the page button for page 2

3.) On any middle page, we want to be able to go forward and back pages.

4.) On the last page, we only want to be able to go back.

- We first find out how many pages we are going to have by dividing our results by the results per page we would like and round that to the next nearest int.

- In order for javascript to know what page we're on and what page we would like to go to (what results to dislpay) we need a way to connect our DOM with our code. We can do this with datasets.



----------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------- DOM Updating Algorithm --------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------

- These functions will convert a markup string to a DOM element that's living in the memory, that we can then use to compare to the actual DOM on the page.

- The createDocumentFragment() method can also be used to extract parts of a document, change, add, or delete some of the content, and insert it back to the document.

- We pass into the createDocumentFragment() the markup that we would like to create a virtual DOM out of, that will live in the memory. We can then use that markup as if it's the real DOM. 

- So we can use this as a DOM tree in memory to represent only specific changes on a webpage and then render only that new information to the page.

- In order to compare old DOM elements to new DOM elements, we can loop over our newElement nodelist ARRAY and store our current DOM elements at each index into a variable 

-- CREATES A NEW DOM FROM INPUTTED MARKUP --
const newDOM = document.createRange().createContextualFragment(newMarkup);
const newElements = newDOM.querySelectorAll(`*`);
console.log(newDOM, newElement);

-- COMPARES NEW DOM TO OLD DOM AT EACH ITERATION --- YOU CAN VIEW ANOTHER ARRAYS ELEMENT AT EACH ITERATION EVEN WITHOUT EXPLICITLY LOOPING IT
newElements.forEach((newEl, i) => {
const curEl = curElements[i];
console.log(newEl.isEqualNode(curEl), ` -- `, newEl, ` -- `, curEl);
});


- We can use nodeValue to extract just the value of a node (if it's a text node that is), and then reassign it to our wanted value.

- We can use the .attributes method to view all of the attributes that belong to a specific element and from there change those attributes to match what we need.

- USE ARRAY.FROM(`ARRAY`) IN ORDER TO CONVERT AN ITERABLE TO AN ARRAY.

- We can use the setAttribute(name, value) method in order to set the value of an attribute to our desired value.


----------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------- Bookmarks ---------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------


- For bookmarks we create another handlerevent in our recipeView and an addBookmark in our controller.js. We use the PUBSUB method once again and we push the recipe that we bookmarked to a bookmarks array within the state object. Within our loadRecipes function in the model.js we check if we have any bookmarks in the array matching the id that we have in our loadRecipe function, and if they match, we add the property of 'bookmarked: true' to this recipe object.

- When we need to add something, we typically get the entire object itself, and when we want to delete something, we only grab the ID.

- We create a new bookmarksView.js so that we can control and update our bookmarksView from there. 

- We now create a new view called previewView.js in order to act as a child view to our bookmarksView.js and resultsView.js.

- We use our previewView.js folder in order to generate our markup for our previews.

- In order to use local storage, we first must call the localStorage. localStorage.setItem(`bookmarks`, JSON.stringify(state.bookmarks)); - this right here will make a key value pair and set the key to bookmarks, we must pass in a string in order to save it as data in the bookmarks, so we use our JSON.stringify() method and pass in the object we want saved to local storage converted by JS to a string.



----------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------- SEND OR POST API DATA ----------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------

- When we want to send or post an API call, we call the fetch with our desired API location as always, and then our second parameter is an object of options. The first option is `method:` which should be `POST`, the second option should be `headers:` and headers are snippets of info about our POST. The headers should ALWAYS BE EXACLTY IN THIS FORMAT: 'Content-Type': 'application/json', after this we have the 'payload' of our request. (What we're trying to send. THIS MUST BE IN JSON) so `body: JSON.stringify(data)`




----------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------- HISTORY API --------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------

- window.history.pushState(null, '', `#${model.state.recipe.id}`)

- This command allows you to change the id of the window to that of whatever you would like

- First two params don't matter, third is the the URL



----------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------ JSDOC COMMENTS ------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------


- A JS DOC is a standard for writing notes about your function for other developers to look at and be able to understand. It is made with the following syntax // ** * / - put together.

- These JS DOCS are really cool, VS code will automatically find and comment in the parameters and variables, therefore allowing you to write a message about what is going on in this function. We can then hover over this funtion and be able to see out custom written messages.


----------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------- Building our final package for deployment ----------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------

- When we build our final package, we need to delete out distribution and parcel cache folders just in order to get a fresh build. Inside of our package.json folder, we have to specify in our build script --dist-dir or the folder that we actually want to create. 

- We also need to change our branch from "main" to "default" otherwise our build command will not run in parcel 2


































*/
