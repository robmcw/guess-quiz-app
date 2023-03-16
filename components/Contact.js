import { useState } from "react"
import { sendContactForm } from "../lib/api"

const Contact = () => {

    const initValues = { email: " " }

    const initState = { values: initValues }

    const [state, setState] = useState(initState)

    const { values } = state

    const handleChange = ({ target }) => setState((prev) => ({
        ...prev,
        values: {
            ...prev.values,
            [target.name]: target.value
        }
    }))

    const onSubmit = async () => {
        setState((prev) => ({
            ...prev,
        }))
        await sendContactForm(values)
    }

    return (
        <form >
            <label >Your email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
            />
            <button
                disabled={!values.email}
                onClick={onSubmit}
            >Submit
            </button>
        </form>
    )
}

export default Contact