import Iframe from "react-iframe";

import React from "react";

const SpotifyPlaylist = () => {
    return (
        <div className="flex">
            <Iframe
                url="https://open.spotify.com/embed/playlist/1xJRv4pOn0Ou2jMB36L6mV"
                id="spotifyPlaylist"
                className="spotify-iframe"
                display="initial"
                position="relative"
                height="550px"
                width="450px"
                styles={{
                    borderRadius: "20px",
                }}
            />
        </div>
    );
};

export default SpotifyPlaylist;
