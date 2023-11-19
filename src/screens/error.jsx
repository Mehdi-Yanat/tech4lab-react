import React from 'react'
import '../styles/error.css'
function Error() {
    return (
        <section className="centered">
            <h1>500 Server Error</h1>
            <div className="container">
                <span className="message" id="js-whoops"></span> <span className="message" id="js-appears"></span> <span className="message" id="js-error"></span> <span className="message" id="js-apology"></span>
            </div>
        </section>
    )
}

export default Error
