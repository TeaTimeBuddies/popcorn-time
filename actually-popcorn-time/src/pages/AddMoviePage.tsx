import React, { useState } from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import { useNavigate } from "react-router-dom";

export interface MovieForm {
    title: string;
    director: string;
    genre: string;
    stars: string;
    year: number;
}

const AddMoviePage: React.FC = () => {
    const [movie, setMovie] = useState<MovieForm>({ title: '', director: '', genre: '', stars: '', year: new Date().getFullYear() });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMovie(prevMovie => ({ ...prevMovie, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}movies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...movie,
                    genre: movie.genre.split(',').map(g => g.trim()),
                    stars: movie.stars.split(',').map(s => s.trim()),
                    year: parseInt(movie.year.toString(), 10),
                }),
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to add the movie.');
            }
            alert('Successfully added movie. Please wait for admin approval.');
            navigate('/movies');
        } catch (err: any) {
            setError(err.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <GeneralLayout title="Adding Movie...">Adding Movie...</GeneralLayout>;
    }

    return (
        <GeneralLayout title="Add a New Movie">
            <form onSubmit={handleSubmit} className="form">
                {error && <p className="error">{error}</p>}
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={movie.title} onChange={handleChange} required />
                </div>

                <div>
                    <label>Director:</label>
                    <input type="text" name="director" value={movie.director} onChange={handleChange} required />
                </div>

                <div>
                    <label>Genre:</label>
                    <input type="text" name="genre" value={movie.genre} onChange={handleChange} required />
                </div>

                <div>
                    <label>Stars:</label>
                    <input type="text" name="stars" value={movie.stars} onChange={handleChange} required />
                </div>

                <div>
                    <label>Year:</label>
                    <input type="text" name="year" value={movie.year} onChange={handleChange} required />
                </div>


                <button type="submit">Add Movie</button>
            </form>
        </GeneralLayout>
    );
};

export default AddMoviePage;
