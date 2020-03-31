# Movie Library
Single-page app for search specific movie from movie database.
With Vue.js, Vuex, Vue-moment, Vuetify, and Axios

## Documentation
### The project structure
The project consists of main component ```APP```, one view or page component ```Home```, and several small components.
Also has the global state in ```store.js```, vuetify plugin in ```vuetify.js```, and couple utilities in ```queryHelpers``` and ```queryMaker```.

#### Main component ```App```
The main component serves to organize the structure of the project: the ```NavBar``` component should always be the same in all viewers in spite of ```Home``` is only one view. The component doesn't have any state and functionality.

#### Component ```NavBar```
Used to show title and refreshing progress bar
The component used global state ```refreshTimer``` to animate a progress bar

#### View component ```Home```
The component includes several other small components, such as ```SearchForm```, ```Card``` and ```About```. It organizes the order of appearance, have local state and have access to the global state.
##### Structure 
Besides these small components, it includes two progress bars. First one and upper, for the scheduled refresh, second and downer, for showing loading process, when state waiting for a response from the database.
Also, it includes pagination in the upper and in the downer of the content and place for hint.
##### Local state
The local state consists of one variable ```currentPage```. This variable takes the number of the current page and pass it to the global actions if the page is changed.
##### Global state
The component has several getters from the global state:
- ```loading``` serve for the progress bar
- ```loadingAbout``` serve for progress circle when about box is loading
- ```loadingStart``` serve for the search button status
- ```pages``` serve for defined how many pages have
- ```searchResult``` impact for showing pagination
- ```lastQuery``` indicator when the hint will show up
- ```refreshTimer``` counter to animate the scheduled refresh progress bar
- ```refreshTimer``` used for the check when need auto refresh search query
- ```hint``` used to show a message about a response
Actions from the global state: 
- ```getNextPage``` used for change current page
- ```autoRefresh``` used for refresh request
- ```getOptions``` used for a request for the options to search, such as genres, languages, countries, and certifications
- ```runTimer``` used for run counting until next refresh
This component used ```created``` method for getting options to search and for run timer and ```watch``` keep track of when the page is changed and when the timer will be equal to zero to send new requests.

#### ```SearchForm``` component
Serves as a container for various search options
##### Structure
Includes ```MenuTitle```, ```MenuDate```, ```MunuLanguage```, ```MenuOther```, search button and circular progress to show availability when start requests (```getOptions```) are still loading.
The component has a local state to service all wrapped components and has a connection to the global state.
##### Local state
```item``` and ```menu``` to serve to show the search menu
```type``` object contains values of all search options
##### Global state
The component gets getter to serve the circular progress ```loadingStart```. Getters ```genres```, ```cerificationCoutry```, ```certifications```, ```languages```, ```countries``` fill out the select element values with similar names.
##### Methods
The local method ```onSubmit``` invoke when the search button is clicked. This method used ```queryHelper```, ```searchQuery``` and ```searchSpecificId``` utility functions. These functions help to compound search query string based on selected search options. When query string is ready the global state methods a calling: ```specificGetRequest``` (when need specific id's for final request) and ```commonGetRequest``` (when no need anything else)

#### Components ```MenuTitle```, ```MenuDate```, ```MenuLanguage``` and ```MenuOther```
These components serve for various part of search menu, have neither the local state and the global state, and serve through props from parent component ```SearchForm```

#### Component ```Card```
This component serves to represent information from an array. The simple structure consists of various tags for image and different text information.
It doesn't have the local state but has a connection to the global state.
##### Global state
```searchResult``` - array with information to represent
Method ```getAboutBox``` serves to request specific information about the movie and pass the movie id

#### Component ```About```
This component serves to represent information about a specific movie
##### States
It gets data from the global state and spread it to various tags to nicely appearance.
Also, for good appearance, this component has three local methods ```getGenres```, ```getCompanies``` and ```getNiceAppearance```. First two to join all companies or countries in one string. The last one about budget and revenue.
```watch``` method keep track when this component close

#### Utilities ```queryHelper.js``` and ```queryMarker.js```
##### ```queryHelper```
Serve to transfer English names of genres, languages, and countries to special id's for searching query
##### ```queryMaker```
Serve to compound all search parameters in one searching query string. File has all URL, API key.
Also have three functions for year and vote to identify when range was input.

#### Global state in ```store.js```
Heart of the app
The ```store``` has access to several URL from ```queryMaker``` for requests in actions.
##### State of global state
```genres, certifications, languages, countries``` have data for search options with similar names
```page, pages``` hold data about the current page and total pages of the response of search request
```lastQuery``` has the last query to auto-refresh. 
```loading, loadingAbout, loadingStart``` serve to circular progress or to progress bar when state wait for the response
```aboutBox, aboutData``` state, and date of a specific movie
```refreshTimer``` time to auto-refresh
```hint``` text message about the status of the search query
##### Actions
All actions serve to get requests to the server and all using ```axios```, except ```runTimer```