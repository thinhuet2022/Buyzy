import {Link} from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/" className="block text-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Buyzy
            </span>
        </Link>
    )
}
export default Logo;