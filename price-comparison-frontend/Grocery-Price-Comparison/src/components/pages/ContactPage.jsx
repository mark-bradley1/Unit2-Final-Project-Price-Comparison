// import { Form } from "react-router"
import Form from "../Form"

const ContactPage = () => {
    return (
        <>
            <div id="contact-info">
                <h1>Contact Information Page</h1>
                <h2>My Contact Information</h2>
                <address>
                    <a href="mailto:gpcmb@example.com">gpcmb@example.com</a><br />
                    <a href="tel:+13145551234">(314) 555-1234</a><br />
                    Snail Mail to:<br />
                    GPCMB <br />
                    1234 Broadway Ave<br />
                    St. Louis, MO 63111
                </address>
            </div>
            <div id="form">
                <Form />
            </div>
        </>
    )
}

export default ContactPage;

