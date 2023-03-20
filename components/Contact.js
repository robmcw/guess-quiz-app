import { useState } from "react"
import { sendContactForm } from "../lib/api"

const Contact = () => {

    const initValues = { email: null }
    const initState = { values: initValues }
    const [state, setState] = useState(initState)
    const { values } = state
    const [emailSent, setEmailSent] = useState(false)


    // Update state based on changes to form
    const handleChange = ({ target }) => setState((prev) => ({
        ...prev,
        values: {
            ...prev.values,
            [target.name]: target.value
        }
    }))

    // On submit, update state and use Nodemailer to send email with field input as contents
    const onSubmit = async (event) => {
        setState((prev) => ({
            ...prev,
        }))

        try {
            // Prevent page refresh so emailSentBlock shows
            event.preventDefault()

            await sendContactForm(values)
            setState(initState)
            setEmailSent(true)
        } catch (error) {
            console.error(error)
        }
    }

    const submitBtn =
        <div className="flexContainer">
            <button
                className="button-sm"
                disabled={!values.email}
                onClick={onSubmit}
            > Send
            </button>
        </div>

    // On form submission, show success message
    let emailSentBlock = ""
    if (emailSent) {
        emailSentBlock = <p>✅ Sent </p>
    }

    return (

        <form action={setEmailSent} method="post">
            <div className="flexContainer">
                <label >Leave your email for when the next questions drop: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="youremail@email.com"
                    value={values.email}
                    onChange={handleChange}
                    required
                />
            </div>
            {submitBtn}
            {emailSentBlock}
        </form>

    )
}

export default Contact