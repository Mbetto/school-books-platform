// analytics.js

/**
 * Utility functions for analytics tracking
 */

export const trackEvent = (eventName, eventData = {}) => {
    if (typeof window !== 'undefined' && window.analytics) {
        window.analytics.track(eventName, eventData);
    } else {
        console.warn('Analytics library is not available.');
    }
};

export const trackPageView = (pageName) => {
    if (typeof window !== 'undefined' && window.analytics) {
        window.analytics.page(pageName);
    } else {
        console.warn('Analytics library is not available.');
    }
};