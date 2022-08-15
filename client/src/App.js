import React, { useState } from 'react';
import Table from './components/Table';
import InputData from './components/InputData';
import './App.css';

function App() {

  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [calSum, setCalSum] = useState(0)
  const [protSum, setProtSum] = useState(0)
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState(false)

  return (
    <div className="App">
      <InputData
        description={description}
        setDescription={setDescription}
        quantity={quantity}
        setQuantity={setQuantity}
        calories={calories}
        setCalories={setCalories}
        protein={protein}
        setProtein={setProtein}
        newItem={newItem}
        setNewItem={setNewItem}
      />
      <Table
        items={items}
        setItems={setItems}
        calSum={calSum}
        setCalSum={setCalSum}
        protSum={protSum}
        setProtSum={setProtSum}
        newItem={newItem}
        setNewItem={setNewItem}
        setDescription={setDescription}
        setQuantity={setQuantity}
        setCalories={setCalories}
        setProtein={setProtein}
      />

      
    </div>
  );
}

export default App;
