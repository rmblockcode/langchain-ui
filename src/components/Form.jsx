import { useState } from "react"

export function Form () {
    const [formData, setFormData] = useState({
        query: '',
    });
    const [result, setResult] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        // POST request
        fetch('http://127.0.0.1:5000/langchain-db', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => setResult(data.result))
        .catch((error) => console.error(error));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>
                <input
                type="text"
                name="query"
                size={50}
                value={formData.name}
                onChange={handleChange}
                />
            </label>
            <br />
            <br />
            <button type="submit">Submit</button>
            </form>
            {result && <p>{result}</p>}
        </div>
      )
}