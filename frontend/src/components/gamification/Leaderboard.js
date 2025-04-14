import React, { useState, useEffect } from 'react';
import './Leaderboard.scss';

const Leaderboard = ({ userId, timeRange = 'weekly' }) => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(timeRange);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/leaderboard?range=${activeTab}`);
                const data = await response.json();
                setLeaders(data);
            } catch (err) {
                setError('Failed to load leaderboard');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [activeTab]);

    if (loading) return <div className="leaderboard-loading">Loading...</div>;
    if (error) return <div className="leaderboard-error">{error}</div>;

    return (
        <div className="leaderboard">
            <div className="leaderboard-header">
                <h2>Leaderboard</h2>
                <div className="time-range-tabs">
                    {['daily', 'weekly', 'monthly', 'all-time'].map((range) => (
                        <button
                            key={range}
                            className={`tab ${activeTab === range ? 'active' : ''}`}
                            onClick={() => setActiveTab(range)}
                        >
                            {range.charAt(0).toUpperCase() + range.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="leaderboard-list">
                {leaders.map((leader, index) => (
                    <div 
                        key={leader.id}
                        className={`leader-item ${leader.id === userId ? 'current-user' : ''} ${index < 3 ? `rank-${index + 1}` : ''}`}
                    >
                        <div className="leader-rank">
                            {index < 3 ? (
                                <span className="medal">{"🥇🥈🥉"[index]}</span>
                            ) : (
                                `#${index + 1}`
                            )}
                        </div>
                        <div className="leader-info">
                            <div className="leader-avatar">
                                <img src={leader.avatar || '/default-avatar.png'} alt={leader.name} />
                            </div>
                            <div className="leader-details">
                                <span className="leader-name">{leader.name}</span>
                                {leader.title && (
                                    <span className="leader-title">{leader.title}</span>
                                )}
                            </div>
                        </div>
                        <div className="leader-score">
                            {leader.score.toLocaleString()} pts
                            {leader.progress && (
                                <div className="progress-bar">
                                    <div 
                                        className="progress-fill" 
                                        style={{ width: `${leader.progress * 100}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;