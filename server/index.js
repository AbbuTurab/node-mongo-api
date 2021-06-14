const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const FoodModel = require('./models/Food');

app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://MERN:ABC123456789@crud.liudw.mongodb.net/food?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/insert', async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;

  const food = new FoodModel({
    foodName: foodName,
    daysSinceIAte: days,
  });

  try {
    await food.save();
    res.send('Data inserted');
  } catch (error) {
    console.log(error);
  }
});

app.get('/read', async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.put('/update', async (req, res) => {
  const newFood = req.body.newFood;
  const id = req.body.id;

  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFood;
      updatedFood.save();
      res.send('Updated');
    });
  } catch (error) {
    console.log(error);
  } 
});

app.delete('/delete/:id', async (req, res)=>{
  const id = req.params.id;
  await FoodModel.findByIdAndRemove(id)
  res.send('Deleted')
})


app.listen(3001, () => {
  console.log('server connected');
});
