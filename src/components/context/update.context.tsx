import React, { SetStateAction } from 'react';

export class updateUserData {
    userName: string = '';
    image: string = '';
    setNeedUpdate: React.Dispatch<SetStateAction<boolean>> = () => {};
}

const UpdateUserData = React.createContext<updateUserData | null>(null);

export default UpdateUserData;