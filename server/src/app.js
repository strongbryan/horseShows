const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
// const mysql = require('mysql')
// const myConnection = require('express-myconnection')

const app = express()
app.use(morgan('combined'))

app.use(bodyParser.json())
app.use(cors())

// routes
var ageGroupsRoutes = require('./routes/ageGroupsRoutes')
ageGroupsRoutes.configure(app)

var startupRoutes = require('./routes/startupRoutes')
startupRoutes.configure(app)

var riderRoutes = require('./routes/riderRoutes')
riderRoutes.configure(app)

var pairsRoutes = require('./routes/pairsRoutes')
pairsRoutes.configure(app)

var horseRoutes = require('./routes/horseRoutes')
horseRoutes.configure(app)

var classesRoutes = require('./routes/classesRoutes')
classesRoutes.configure(app)

var divisionRoutes = require('./routes/divisionRoutes')
divisionRoutes.configure(app)

var DeclaredDivisionRoutes = require('./routes/decDivisionRoutes')
DeclaredDivisionRoutes.configure(app)

var showTypesRoutes = require('./routes/showTypesRoutes')
showTypesRoutes.configure(app)

var riderAgesRoutes = require('./routes/riderAgesRoutes')
riderAgesRoutes.configure(app)

var participantsRoutes = require('./routes/participantsRoutes')
participantsRoutes.configure(app)

var showDivisionsRoutes = require('./routes/showDivisionRoutes')
showDivisionsRoutes.configure(app)

var showResultsRoutes = require('./routes/resultsRoutes')
showResultsRoutes.configure(app)

var showClassesRoutes = require('./routes/showClassesRoutes')
showClassesRoutes.configure(app)

var showAdministrationRoutes = require('./routes/showAdministrationRoutes')
showAdministrationRoutes.configure(app)

var listener = app.listen(process.env.PORT || 8081)
console.log('Listening on port ' + listener.address().port)
