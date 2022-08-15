const express = require('express')
const app = express()
const pool = require('./db')
// const path = require('path')

const PORT = process.env.PORT || 5000;

app.use(express.json())

// app.use(express.static(path.join(__dirname + '/public')));


const items = [
    {
        id: 1,
        food: "Meat",
        calories: 100,
        protein: 20
    },
    {
        id: 2,
        food: "Fish",
        calories: 120,
        protein: 25
    },
    {
        id: 3,
        food: "Milk",
        calories: 45,
        protein: 10
    },
    {
        id: 4,
        food: "Oats",
        calories: 340,
        protein: 5
    },

];



app.get('/items', async (req, res) => {

    try {
        const getAllItems = await pool.query('SELECT * FROM item')
        res.json(getAllItems.rows)

    } catch (err) {
        console.error(err.message)

    }
})

app.get('/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getItem = await pool.query('SELECT * FROM item WHERE item_id = $1', [id])

        res.json(getItem.rows[0])

    } catch (err) {
        console.error(err.message)

    }
})


app.post('/items', async (req, res) => {

    try {

        const { description, quantity, calories, protein } = req.body;

        const totalCal = (calories * quantity) / 100;
        const totalProt = (protein * quantity) / 100;

        const addItem = await pool.query('INSERT INTO item (description, quantity, calories, protein, total_cal, total_prot) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [description, quantity, calories, protein, totalCal, totalProt])

        res.json(addItem.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})


app.put('/items/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const { description, calories, protein } = req.body;

        const editItem = await pool.query('UPDATE item SET description = $1, calories = $2, protein = $3 WHERE item_id = $4', [description, calories, protein, id])
        res.json('Todo updated')

    } catch (err) {
        console.error(err.message)

    }

})


app.delete('/items/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deleteItem = await pool.query('DELETE FROM item WHERE item_id = $1', [id])

        res.json('Item deleted')

    } catch (err) {
        console.error(err.message)

    }

})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))