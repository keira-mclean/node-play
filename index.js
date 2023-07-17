const express = require('express');

const app = express();

app.use(express.json())

app.get('/', (request, response) => {
    response.json({
        message: "Hello, world"
    })
})

app.post('/some-path/:somePathParam', (request, response) => {
    const somePathParam = request.params.somePathParam
    const queryParam = request.query["some-query-param"]
    const someHeader = request.get('Some-Header')
    const body = request.body

    response.json({
        somePathParam,
        queryParam,
        someHeader,
        body,
    })
})

const PORT = 4000
app.listen(PORT, () => {
    console.log('Listening on port ${PORT}')
})