import React, { useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { signInRedirectCallback } from './user-service';

const SignInOidc: FC<{}> = () => {
    const navigation = useNavigate();
    useEffect(() => {
        async function signInAsync() {
            await signInRedirectCallback();
            navigation('/');
        }
        signInAsync();
    }, [navigation]);
    return <div>Redirecting</div>;
};

export default SignInOidc;
