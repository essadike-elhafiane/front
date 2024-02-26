import React from 'react';

export class updateUserData {
    userName: string = '';
    image: string = '';
}

const UpdateUserData = React.createContext<updateUserData | null>(null);

export default UpdateUserData;