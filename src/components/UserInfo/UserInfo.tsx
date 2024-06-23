import React, { FC } from 'react';
import './UserInfo.css';

const UserInfo: FC = () => {
    return (
        <div className="user-info">
            <div className="user-avatar">
                {/* Ваш аватар */}
            </div>
            <div className="user-name">
                {/* Ваше ім'я */}
            </div>
        </div>
    );
};

export default UserInfo;