import './SongRequest.css';
import RequestForm from "../components/SongRequestForm/RequestForm";
import Footer from "../components/Footer/Footer";
import {Helmet} from "react-helmet";

function SongRequest() {
    return (
        <>
            <Helmet>
                <title>Song Request</title>
                <meta name="description" content="Request your favorite songs to be romanized by RomanizedMM." />
            </Helmet>
            <div className="song-request-styling">
                <RequestForm />
                <Footer />
            </div>
        </>

    )
}

export default SongRequest;