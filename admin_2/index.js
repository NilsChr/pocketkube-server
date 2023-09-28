const express = require('express');
const fs = require('fs/promises');

const app = express();
const port = 3000;

const dataFilePath = 'data.json';

// Middleware to parse JSON requests
app.use(express.json());

// Read initial data from the JSON file
let data = [];
fs.readFile(dataFilePath, 'utf8')
  .then((fileData) => {
    data = JSON.parse(fileData);
  })
  .catch((err) => {
    console.error('Error reading data file:', err.message);
  });

// Endpoint to get all items
app.get('/test', (req, res) => {
  res.status(200).send("Hello world");
});

// Endpoint to get all items
app.get('/items', (req, res) => {
  res.json(data);
});

// Endpoint to create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = Date.now().toString(); // Generate a simple ID (you might want to use a more robust solution)
  
  data.push(newItem);

  // Save the updated data to the file
  fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
    .then(() => {
      res.status(201).json(newItem);
    })
    .catch((err) => {
      console.error('Error writing data to file:', err.message);
      res.status(500).send('Internal Server Error');
    });
});

// Endpoint to delete an item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;

  // Find the index of the item with the specified ID
  const index = data.findIndex(item => item.id === itemId);

  if (index !== -1) {
    // Remove the item from the array
    const deletedItem = data.splice(index, 1)[0];

    // Save the updated data to the file
    fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
      .then(() => {
        res.json(deletedItem);
      })
      .catch((err) => {
        console.error('Error writing data to file:', err.message);
        res.status(500).send('Internal Server Error');
      });
  } else {
    res.status(404).send('Item not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
