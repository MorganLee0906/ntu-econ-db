import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './navbar'
export default function Layout({ children }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>);
}