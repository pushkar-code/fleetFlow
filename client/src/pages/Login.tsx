import { useState } from 'react';
import { Navigation, Lock } from 'lucide-react';
import { FormInput } from '../components/FormInput';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this dispatches an Auth action.
        // For Dev 2 mocks, we just let them blindly navigate to the dashboard.
        navigate('/dashboard');
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'var(--bg-primary)'
        }}>

            <div className="glass-panel animate-fade-in" style={{
                width: '100%',
                maxWidth: '400px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>

                <div style={{
                    background: 'var(--accent-primary)',
                    padding: '1rem',
                    borderRadius: '16px',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}>
                    <Navigation size={32} />
                </div>

                <h2 style={{ marginBottom: '0.5rem' }}>Access FleetFlow</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', textAlign: 'center' }}>
                    Secure fleet & logistics management hub.
                </p>

                <form onSubmit={handleLogin} style={{ width: '100%' }}>
                    <FormInput
                        label="Email Address"
                        type="email"
                        placeholder="admin@fleetflow.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <FormInput
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        icon={<Lock size={18} />}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                        <a href="#" style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', textDecoration: 'none' }}>Forgot Password?</a>
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
                        Login to Dashboard
                    </button>
                </form>

                <div style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    System Version 1.0.0
                </div>
            </div>
        </div>
    );
}
