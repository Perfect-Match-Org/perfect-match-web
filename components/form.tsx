import { useState } from 'react'

const MyForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '' })

    const handleChange = (event: any) => {
        const { name, value } = event.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        alert(`Hello ${formData.name}! Your email is ${formData.email}.`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <br />
            <button type="submit">Submit</button>
        </form>
    )
}
