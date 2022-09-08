const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: true }));

var permisos = require("./permisos.json");
admin.initializeApp({
  credential: admin.credential.cert(permisos),
  databaseURL: "http://localhost:5000/weather-api-7c25c/us-central1/app.firebaseio.com"
});

const db = admin.firestore();

// Manejar Status
function salida(codigo, entrada){
    var today = new Date();
    var date = today.getFullYear()+'-'
    +(today.getMonth()+1)+'-'
    +today.getDate()+"|"
    + (today.getHours() < 22 ? (today.getHours() + 2) : today.getHours() == 22 ? 0 : 1) + ":" 
    + today.getMinutes() + ":" 
    + today.getSeconds();
    
    if(codigo === "200") return {
        mensaje : "Proceso terminado exitosamente",
        fecha : date,
        resultado : entrada
    }

    if(codigo === "201") return {
        mensaje : "Elemento creado exitosamente",
        fecha : date,
        resultado : entrada
    }

    if(codigo === "500") return {
        mensaje: "Oops, algo ha salido mal.",
        fecha : date,
        resultado : entrada
    }

    return {
        mensaje: "Oops, algo ha salido mal.",
        fecha : date,
        resultado : entrada
    }
}

// Crear entrada
app.post('/api/weather', (req, res) => {
    (async () => {
        try {
          await db.collection('weather').doc('/' + req.body.id + '/')
              .create({
                date: req.body.date,
                rain_chance: req.body.rain_chance,
                location: {
                    city: req.body.location.city,
                    country: req.body.location.country
                },
                hourly_temperature: req.body.hourly_temperature,
                hourly_rain_chance: req.body.hourly_rain_chance,
            });
          return res.status(200).send(salida("200", "Clima creado correctamente"));
        } catch (error) {
          console.log(error);
          return res.status(500).send(salida("500", error));
        }
    })();
});

// Buscar todas las entradas
app.get("/api/weather", async (req, res) => {
    try{
        
        let query = db.collection("weather");
        const querySnapshot = await query.get();
        let docs = querySnapshot.docs;
  
        const response = docs.map((doc) => ({
            id: doc.id,
            date: doc.data().date,
            rain_chance: doc.data().rain_chance,
                location: {
                    city: doc.data().location.city,
                    country: doc.data().location.country
                },
                hourly_temperature: doc.data().hourly_temperature,
                hourly_rain_chance: doc.data().hourly_rain_chance,
        }));
  
        return res.status(200).json(salida("200", response));
    } catch (error) {
        return res.status(500).json(salida("500", error));
    }
  })

// Buscar una entrada por querys
  app.get('/api/weather/find', async (req, res) =>{
    
        try{
            const citiesRef = db.collection('weather')
            const queryRef = citiesRef.where('date', '==', req.query.date).where('location.city', '==', req.query.location)
            const docs = await queryRef.get();

            console.log(docs)
            const response = []
            
            docs.forEach(doc => {
                console.log(doc.data());
                response.push({id: doc.id, doc: doc.data()})
              });

            return res.status(200).json(salida("200", response))
        } catch(error) {
            return res.status(500).send(salida("500", error));
        }
    ;
  });
  
// Buscar una entrada por params
  app.get('/api/weather/:date&:location', async (req, res) =>{
    
        try{
            const citiesRef = db.collection('weather')
            const queryRef = citiesRef.where('date', '==', req.params.date).where('location.city', '==', req.params.location)
            const docs = await queryRef.get();

            console.log(docs)
            const response = []
            
            docs.forEach(doc => {
                console.log(doc.data());
                response.push({id: doc.id, doc: doc.data()})
              });

            return res.status(200).json(salida("200", response))
        } catch(error) {
            return res.status(500).send(salida("500", error));
        }
    ;
  });
  
// Cambiar entrada
  app.put("/api/weather/:weather_id", async (req, res) => {
    try {      
        const doc = db.collection("weather").doc(req.params.weather_id);
        
        await doc.update({
            date: req.body.date,
                rain_chance: req.body.rain_chance,
                location: {
                    city: req.body.location.city,
                    country: req.body.location.country
                },
                hourly_temperature: req.body.hourly_temperature,
                hourly_rain_chance: req.body.hourly_rain_chance,
        });
        
        return res.status(200).json(salida("200", "El Clima ha sido actualizado"));
    } catch (error) {
      return res.status(500).json(salida("500", error));
    }
  });

// Borrar todas las entradas
  app.delete("/api/weather", async (req, res) => {
    try {

        const doc = db.collection('weather')
        const querySnapshot = await doc.get()
        querySnapshot.docs.forEach(snapshot => {
            snapshot.ref.delete()
        })


      return res.status(200).json(salida("200", "Todos los climas han sido borrados correctamente"));
    } catch (error) {
      return res.status(500).send(salida("500", error));
    }
  });
  

// Borrar entrada
  app.delete("/api/weather/:weather_id", async (req, res) => {
    try {
      const doc = db.collection("weather").doc(req.params.weather_id);
      await doc.delete();
      return res.status(200).json(salida("200", "El Clima ha sido borrado exitosamente"));
    } catch (error) {
      return res.status(500).send(salida("500", error));
    }
  });
  


exports.app = functions.https.onRequest(app);

