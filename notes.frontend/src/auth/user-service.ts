import { UserManager, UserManagerSettings } from 'oidc-client';
import { setAuthHeader } from './auth-headers';

const userManagerSettings: UserManagerSettings = {
    client_id: 'notes-web-api',
    redirect_uri: 'http://localhost:3000/signin-oidc',
    response_type: 'code',
    scope: 'openid profile NotesWebAPI',
    authority: 'https://localhost:7113/',
    post_logout_redirect_uri: 'http://localhost:3000/signout-oidc',
};

const userManager = new UserManager(userManagerSettings);
export async function loadUser() {
    const user = await userManager.getUser();
    console.log('User: ', user);
    const token = user?.access_token;
    setAuthHeader(token);
}

export const signInRedirect = () => userManager.signinRedirect();

export const signInRedirectCallback = () => 
    userManager.signinRedirectCallback();

export const signOutRedirect = (args?: any) => {
    userManager.clearStaleState();
    userManager.signoutRedirect(args);
};

export const signOutRedirectCallback = () => {
    userManager.clearStaleState();
    userManager.removeUser();
    return userManager.signoutRedirectCallback();
};

export default userManager;
