import React from 'react';

export type UserData = {
    id       : number,
    createdAt: Date,
    updatedAt: Date,
    userName : string,
    email    : string,
    image    : string,
    firstName: string,
    lastName : string,
    online   : Boolean,
}

const UserDataContext = React.createContext<UserData | null>(null);

export default UserDataContext;