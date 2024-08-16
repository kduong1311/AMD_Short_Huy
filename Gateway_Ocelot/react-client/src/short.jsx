import axios from 'axios';
import { useState } from 'react';

const Short = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:8888/gateway/shorten', { originalUrl });
            setShortUrl(response.data.shortUrl);
            setError(null);
        } catch (err) {
            setError('Error shortening the URL');
            console.error('Error:', err);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">URL Shortener</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="url" className="form-label">Enter URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="url"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        placeholder="https://example.com"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Shorten</button>
            </form>

            {shortUrl && (
                <div className="mt-4">
                    <h4>Shortened URL:</h4>
                    http://localhost:5001/<a href={`http://localhost:5001/${shortUrl}`} target="_blank" rel="noopener noreferrer">
                        {shortUrl}
                    </a>
                </div>
            )}

            {error && (
                <div className="alert alert-danger mt-3">
                    {error}
                </div>
            )}
        </div>
    );
};

export default Short;
