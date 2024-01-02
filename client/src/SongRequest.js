import './SongRequest.css';
import RequestForm from "./components/SongRequestForm/RequestForm";
import Footer from "./components/Footer/Footer";

function SongRequest() {
    return (
        <div className="song-request-styling">
            <RequestForm />
            <Footer />
        </div>
    )
}

export default SongRequest;