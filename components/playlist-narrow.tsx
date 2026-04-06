import Iframe from "react-iframe";

import React from "react";

const SpotifyPlaylistNarrow = () => {
    return (
        <div className="flex">
            <Iframe
                url="https://open.spotify.com/embed/playlist/1xJRv4pOn0Ou2jMB36L6mV"
                id="spotifyPlaylist"
                className="spotify-iframe"
                display="initial"
                position="relative"
                height="500px"
                width="380px"
            />
        </div>
    );
};

export default SpotifyPlaylistNarrow;
