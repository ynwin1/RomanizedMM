import './App.css';
import NavBar from "./components/NavBar";
import RequestForm from "./components/RequestForm";
import Footer from "./components/Footer";

function SongRequest() {
    return (
        <div className="App">
            <NavBar />
            <RequestForm />
            <Footer />
        </div>
    )
}