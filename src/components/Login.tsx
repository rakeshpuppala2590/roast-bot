import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db, provider } from '@/lib/firebase'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error logging in:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 border rounded"
                required
            />
            <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded"
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Log In'}
            </button>
        </form>
    );
}

