const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, data) => {
    if (error) {
      console.log(error, "there is an error")
    } else {
      // console.log(data)
      res.send(data)
    }    
  })
})

app.post('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, data) => {
    if (error) {
      console.log(error, "there is an error")
    } else {
      // console.log(data)
      // res.send(data)
      const arrData = JSON.parse(data)
      //parse
      //use parse 
      //make variable
      console.log(req.body)
      req.body.id = uuidv4()
      arrData.push(req.body)
      //use that to modify new array
      fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(arrData),"utf8", (error) => {
        if (error) {
          console.log(error, "there is an error")
        } else {
          res.json(req.body)
        }
      })
    }    
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

