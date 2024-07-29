import '../styles/App.css';   // Importing App.css for application-specific styles
import '../styles/index.css'; // Importing index.css for global styles
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/favicon.ico" />
        </head>
        <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
        </body>
        </html>
    );
}