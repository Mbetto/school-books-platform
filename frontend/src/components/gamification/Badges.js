import React from 'react';
import PropTypes from 'prop-types';
import './Badges.scss';

const Badges = ({ badges, onBadgeSelect }) => {
    const handleBadgeClick = (badge) => {
        if (onBadgeSelect) {
            onBadgeSelect(badge);
        }
    };

    return (
        <div className="badges-container">
            <h3 className="badges-title">Achievements</h3>
            <div className="badges-grid">
                {badges.map((badge) => (
                    <div 
                        key={badge.id}
                        className={`badge ${badge.unlocked ? 'unlocked' : 'locked'}`}
                        onClick={() => handleBadgeClick(badge)}
                        title={badge.description}
                    >
                        <div className="badge-icon-container">
                            <img 
                                src={badge.unlocked ? badge.icon : '/locked-badge.svg'} 
                                alt={badge.name} 
                                className="badge-icon"
                            />
                            {badge.unlocked && badge.progress < 1 && (
                                <div className="progress-ring">
                                    <svg viewBox="0 0 36 36">
                                        <path
                                            d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#4caf50"
                                            strokeWidth="3"
                                            strokeDasharray={`${badge.progress * 100}, 100`}
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <p className="badge-name">{badge.name}</p>
                        {!badge.unlocked && (
                            <p className="badge-requirement">{badge.requirement}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

Badges.propTypes = {
    badges: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            unlocked: PropTypes.bool.isRequired,
            progress: PropTypes.number,
            requirement: PropTypes.string,
        })
    ).isRequired,
    onBadgeSelect: PropTypes.func,
};

export default Badges;