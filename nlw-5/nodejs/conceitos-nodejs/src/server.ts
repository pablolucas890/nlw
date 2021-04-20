import express from 'express';

const app = express();

app.listen(3337, () => console.log('Server Started on Port 3337'));

app.get('/', (request, response) => {
    return response.json({
        message: 'ok'
    })
})

app.use('/users', (request, response) => {
    return response.json({
        message : "User save like sucessfuly"
    })
})