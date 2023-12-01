import { useState, useContext } from 'react';
import '../App.css';
import loginRequest from '../api/loginRequest';
import { useLocation, useNavigate } from 'react-router-dom';
import { TokenContext } from '../App';
// import { useContext } from 'react';
export const LoginPage = () => {
    const [username, setUsername] = useState(''); // Add username state
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { setToken } = useContext(TokenContext); // Add token state

    const handleLogin = async (event) => {
        console.log('handleLogin called'); // Add this line
        event.preventDefault();

        try {
            console.log('Login attempted'); // Add this line
            const response = await loginRequest(username, password);
            console.log('Full response:', response);
            if (response.token) {
                setToken(response.token);
                const from = location.state?.from || '/shoppinglist';
                navigate(from);
            }
        } catch (error) {
            setError(error.message);
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <div style={{ color: 'red' }}>{error}</div>
            <form onSubmit={handleLogin}>
                <input
                    type="text" // Change to text input for username
                    placeholder="Username" // Add a placeholder
                    name="username" // Add a name attribute
                    value={username} // Use username state
                    onChange={(e) => setUsername(e.target.value)} // Update username state
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
