import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <div className="centered-container">
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <Link to="/">Visit Our Homepage</Link>
        </div>
    )
}

export default Missing