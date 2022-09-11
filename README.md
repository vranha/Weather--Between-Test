
# Weather app - Between Fullstack test - Oriol Arias


![App Screenshot](https://i.postimg.cc/W1WH7ZyD/6.png)
## [You can look at this app deployed here!](https://weather-api-7c25c.web.app/week)
##  Highlights

- **Realtime comunication** with the Firestore *onSnapshot* method
- Custom Hooks
- Context API
- Combine *modules.scss* with average scss
- Lotties (giffs)
- Loading component
- { *children* } props
- Frontend and Backend methods to call an API Rest
- React-router-dom security 

## How to Run Locally

#### Clone the project

```bash
  git clone https://github.com/vranha/Weather--Between-Test
```

#### Backend directory

```bash
  cd firebase-api
  cd functions
```
```bash
  npm install
```
```bash
  firebase serve
```
If you want to run the app locally, you have to change the axios routes of the frontend to the localhost path given by the `firebase serve`.

#### Frontend directory

```bash
  cd weather-app
```
```bash
  npm install
```
```bash
  npm start
```




## Api Routes

**GET all:** app/api/weather

**GET day with params:** app/api/weather/{*date*}&{*city*}

**GET day with querys:** app/api/weather/find?date={*your-date*}&location={*your-location*}

**GET current week:** app/api/weather/findWeek?&location={*your-location*}

**PUT:** app/api/weather/{*id*}

**PATCH:** app/api/weather/{*id*}

**POST:** app/api/weather

**DELETE:** app/api/weather/{*id*}




## Used Dependencies

- axios
- firebase
- moment
- nose-sass
- react-dropdown
- react-icons
- react-lottie
- react-router-dom
- react-scripts
- uuidv4




**This app is deployed on:**

- #### https://weather-api-7c25c.web.app

By the way, in cas you want to deploy your own version, follow these steps:

#### Frontend
```bash
  cd weather-app
```
```bash
  npm run build
```
```bash
  firebase deploy
```

#### Backend
```bash
  cd firebase-api
```
```bash
  firebase deploy
```


## Author

- [@vranha](https://www.github.com/vranha) - [Linkedin](https://www.linkedin.com/in/oriol-arias)
