
// import Navbar from './navbar'
import Footer from './Footer.js'

export default function Layout({ children }) {
    return (
        <>
            {/* <Navbar /> */}
            {children}
            <Footer />
        </>
    )
}