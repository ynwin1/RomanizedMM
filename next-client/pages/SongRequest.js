import React from 'react';
import '../src/styles/SongRequest.css
import RequestForm from '../src/components/SongRequestForm/RequestForm';
import Footer from '../src/components/Footer/Footer';

function SongRequest() {
    return (
        <div className="song-request-styling">
            <RequestForm />
            <Footer />
        </div>
    );
}

export default SongRequest;