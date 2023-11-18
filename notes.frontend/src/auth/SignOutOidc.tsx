import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOutRedirectCallback } from './user-service';

const SignOutOidc: FC<{}> = () => {
    const navigation = useNavigate();
    useEffect(() => {
        const signOutAsync = async () => {
            await signOutRedirectCallback();
            navigation('/');
        };
        signOutAsync();
    }, [navigation]);
    return <div>Redirecting...</div>;
};

export default SignOutOidc;