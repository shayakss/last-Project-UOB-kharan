import React, { useState, useEffect } from 'react';
import { NotificationManager } from '../utils/errorHandling';

const NotificationItem = ({ notification, onRemove }) => {
  const { id, type, message, timestamp } = notification;
  
  const getNotificationStyles = () => {
    const baseStyles = "fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg border-l-4 backdrop-blur-sm transition-all duration-300 ease-in-out transform";
    
    switch (type) {
      case 'error':
        return `${baseStyles} bg-red-900/90 border-red-500 text-red-100`;
      case 'success':
        return `${baseStyles} bg-green-900/90 border-green-500 text-green-100`;
      case 'warning':
        return `${baseStyles} bg-yellow-900/90 border-yellow-500 text-yellow-100`;
      case 'info':
        return `${baseStyles} bg-blue-900/90 border-blue-500 text-blue-100`;
      default:
        return `${baseStyles} bg-gray-900/90 border-gray-500 text-gray-100`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={getNotificationStyles()}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium leading-5">
            {message}
          </p>
          <p className="text-xs opacity-75 mt-1">
            {timestamp.toLocaleTimeString()}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            className="inline-flex text-current hover:opacity-75 focus:outline-none focus:opacity-75 transition-opacity"
            onClick={() => onRemove(id)}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationContainer = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = NotificationManager.subscribe(setNotifications);
    return unsubscribe;
  }, []);

  const handleRemove = (id) => {
    NotificationManager.removeNotification(id);
  };

  return (
    <div className="fixed top-0 right-0 z-50 pointer-events-none">
      <div className="flex flex-col space-y-2 p-4 pointer-events-auto">
        {notifications.slice(0, 5).map((notification, index) => (
          <div
            key={notification.id}
            style={{
              transform: `translateY(${index * 4}px)`,
              zIndex: 50 - index
            }}
          >
            <NotificationItem
              notification={notification}
              onRemove={handleRemove}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationContainer;