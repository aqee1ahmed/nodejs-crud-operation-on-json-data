const express = require('express');

const fs = require('fs');

const userData = require('./MOCK_DATA.json');

const app = express();

const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

app.get('/user', (req, res) => {
    const html =
        `<ul> 
        ${userData.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
    </ul>`
    res.send(html);
})

app.get('/api/user', (req, res) => {
    res.json(userData)
})

app.get('/api/user/:id', (req, res) => {

    const id = Number(req.params.id)
    const user = userData.find(user => user.id = id)
    res.json(user)
})

app.post('/api/user', (req, res) => {
    const body = req.body;
    console.log(body);
    userData.push({ ...body, id: userData.length + 1 });
    fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(userData), (err) => {
        res.json({ message: "User created with ", id: user.length })
    });
    res.json({ message: "User created" })
})

app.patch('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = userData.findIndex(user => Number(user.id) === id);
    if (index !== -1) {
        userData[index] = { ...userData[index], ...req.body };
        fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(userData));
        return res.json({ message: "User updated", id });
    } else {
        return res.json({ message: "User not found" });
    }
})

app.delete('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = userData.findIndex(user => Number(user.id) === id);
    if (index !== -1) {
        userData.splice(index, 1);
        fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(userData));
        return res.json({ message: "User Deleted", id });
    } else {
        return res.json({ message: "User not found" });
    }
})

app.listen(PORT, () => { console.log("Server is running on port 8000"); });