import React, { useEffect } from 'react'

const Table = ({ items, setItems, calSum, setCalSum, protSum, setProtSum, setDescription, setQuantity, setCalories, setProtein, newItem, setNewItem }) => {

  useEffect(() => {
    
    fetch('/items')
      .then(res => res.json())
      .then(data => setItems(data))

    setDescription('')
    setQuantity('')
    setCalories('')
    setProtein('')

    setNewItem(false)

  }, [setItems, newItem])


  useEffect(() => {

    setCalSum(items.map(item => {
      return item.total_cal;
    }))

    setProtSum(items.map(item => {
      return item.total_prot;
    }))

  }, [items, setCalSum, setProtSum])


  const deleteItem = async (id) => {
    try {
      await fetch(`/items/${id}`, {
        method: 'DELETE',

      });

      setItems(items.filter(item => item.item_id !== id))

    } catch (err) {
      console.error(err.message)
    }
  }


  return (
    <div className='container'>
      <table className='content-table'>
        <thead>
          <tr>
            <th>Food</th>
            <th>Quantity</th>
            <th>Calories</th>
            <th>Protein</th>
            <th>Total Cal</th>
            <th>Total Prot</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>

          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.calories}</td>
              <td>{item.protein}</td>
              <td>{item.total_cal}</td>
              <td>{item.total_prot}</td>
              <td><button className="edit-button" onClick={() => deleteItem(item.item_id)}>Delete</button></td>
            </tr>
          ))}


        </tbody>
        <tfoot>
          <tr>
            <td>TOTAL</td>
            <td></td>
            <td></td>
            <td></td>
            <td>{calSum && calSum.reduce((acc, val) => acc + val, 0)}</td>
            <td>{protSum && protSum.reduce((acc, val) => acc + val, 0)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default Table