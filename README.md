# *CITYZEN.*


#### Usage:
Access the [website](https://cityzen-client.herokuapp.com).

###### Map functionality:
1. Type in a start and end location, select an option, and a mode of transport.
2. Click submit.
3. Hover the mouse over the different options to view the place's name.
4. Click on an icon to include that option in the route.

Accessed at "/".
Relies on Input.jsx and Map.jsx from the frontend.
Does not rely on our backend. 
Allows the user to search for POIs along a route from A to B. Presents the user with a route from A to B along with clickable POIs. Upon clicking a POI, a new route is generated to show the user how to get from A to B whilst making a detour to the POI. The selected POI will be enlarged and all other POI disappear after the click. POIs, A and B are all show popups upon hovering them. The popups will have information about the place. The map will only appear if the user has already logged in, or after they submit a search. Outside of those cases, a welcome message will be displayed in place of the map.

###### User functionality:
1. Register a user.
2. Logout.
3. Log in with registered user

Accessed at "/profile".
Relies on Profile.jsx, ProfileContents.jsx, LoginForm.jsx, RegistrationForm.jsx, App.jsx, and userContext.js from the frontend.
Relies on userRouter.js, userController.js, auth.js (middleware) and users.js (model) from the backend.
Allows the user to register an account or login to an account. User can quickly swap between login form or registration form. User can select "Remember me" to have their authorisation token saved in their browser. If they don't select this the token will not be saved. If they logout the token will be deleted from their browser and the client. User information is shared throughout all components of the app. 

###### Favourites functionality:
1. Login as user.
2. Go to Home.
3. Type in a start and end location, select an option, and a mode of transport.
4. Click Save
5. Click Show favourites
6. Click Apply to search the favourite or Delete to delete the favourite.

Accessed at either "/" or "/profile" after logging in.
Relies on Favourites.jsx and ProfileContents.jsx from the frontend.
Relies on favouritesRouter.js, favouritesController.js, auth.js (middleware) and users.js (model) from the backend.
Allows the user to save favourite search configurations. They can also delete them or access them to apply them instead of manually entering their configuration. They are accessed by a button on "/". Here they can be applied and the results will appear on the map in the same way as if the configuration was manually entered. They can also be deleted here. From "/profile" they will be presented as a list and can be deleted.

##### Account Access:
Although it is very easy to make an account, below are some existing ones.

An account with predefined favourites:
Username - TestUser
Password - password

An account with no predefined favourites:
Username - test
Password - test

#### Local use:
1. To run locally, clone or download this repository.
2. `$ npm install`
3. `$ npm start`
