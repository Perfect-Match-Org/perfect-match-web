function Spinner() {
    return (
        <div className="container h-screen mx-auto">
            <div className="flex items-center justify-center container h-screen mx-auto">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-600 border-opacity-60" role="status"></div>
            </div>
        </div>
    );
}

export default Spinner;
