const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('content', (req, res) => {
    return JSON.stringify(req.body.content)
})
app.use(morgan(':method :url :status :res[content-length] = :response-time ms :content'))

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 1
}

app.get('/info', (request, response) => {
    const timestamp = Date(Date.now()).toString()
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${timestamp}</p`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    } else if (!body.content.name) {
        return response.status(400).json({
            error: 'name must be specified'
        })
    } else if (!body.content.number) {
        return response.status(400).json({
            error: 'number must be specified'
        })
    } else if (persons.some(p => p.name.toLowerCase() === body.content.name.toLowerCase())) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        content: body.content,
        important: body.important || false,
        id: generateId(),
    }
    
    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

