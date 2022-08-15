
const InputData = ({ description, setDescription, quantity, setQuantity, calories, setCalories, protein, setProtein, setNewItem}) => {

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const body = { description, quantity, calories, protein }

            await fetch('/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)

            })

            setNewItem(true) //in order to refresh Table.js component

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <label>Food</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <label>Quantity</label>
                <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <label>Calories</label>
                <input type="text" value={calories} onChange={(e) => setCalories(e.target.value)} />
                <label>Protein</label>
                <input type="text" value={protein} onChange={(e) => setProtein(e.target.value)} />
                <button className="form-button">Add Item</button>
            </form>
        </div>
    )
}

export default InputData