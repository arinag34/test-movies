import React, { useState, useEffect } from 'react';

const StatusMessage = ({ status }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (status) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [status]);

    return visible ? <p>{status}</p> : null;
};

export default StatusMessage;
