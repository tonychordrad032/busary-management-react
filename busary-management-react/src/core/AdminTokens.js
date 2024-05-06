import axios from 'axios';
import {SecurityEnum} from './SecurityEnum';

export class AdminTokens {

    // Get Access & Refresh token for the user by passing username and password
    // Note that this username & password comes from KeyCloak under this particular realm
    async getOauthToken(username, passsword) {
        try{
            let res = await axios.post(
                            `${process.env.REACT_APP_OAUTH_AUTH_URL}`,
                            `grant_type=${process.env.REACT_APP_OAUTH_AUTH_GRANT_TYPE}&username=${username}&password=${passsword}&scope=${process.env.REACT_APP_OAUTH_AUTH_SCOPE}&client_id=${process.env.REACT_APP_OAUTH_AUTH_CLIENT}`
                        );
            //console.log(res.data);
            // storing new tokens
            await localStorage.setItem(SecurityEnum.AccessToken, res.data.access_token);
            await localStorage.setItem(SecurityEnum.RefreshToken, res.data.refresh_token);
            return {code: res.status, data: res.data};
        }catch(error) {
            console.log(error);
            return {code: error.response.status, message: error.message, data: error};
        }
    }

    // Get token using refresh token
    // Remember when you login, you store refresh token and access token
    async refreshOauthToken() {
        try{
            //Get refresh token stored on the browser(DEV Only)
            let refresh_token = await localStorage.getItem(SecurityEnum.RefreshToken);
            let res = await axios.post(
                            `${process.env.REACT_APP_OAUTH_AUTH_URL}`,
                            `grant_type=refresh_token&refresh_token=${refresh_token}&scope=${process.env.REACT_APP_OAUTH_AUTH_SCOPE}&client_id=${process.env.REACT_APP_OAUTH_AUTH_CLIENT}`
                        );

            // storing new tokens
            await localStorage.removeItem(SecurityEnum.AccessToken);
            await localStorage.removeItem(SecurityEnum.RefreshToken);
            await localStorage.setItem(SecurityEnum.AccessToken, res.data.access_token);
            await localStorage.setItem(SecurityEnum.RefreshToken, res.data.refresh_token);
            //console.log(res.data);
            return {code: res.status, data: res.data};
        }catch(error) {
            //console.log(error);
            return {code: error.response.status, message: error.message, data: error};
        }
    }

    // Return Admin tokens to access KeyCloak Admin API's
    async getAdminOauthToken() {
        try{
            let res = await axios.post(
                            `${process.env.REACT_APP_OAUTH_AUTH_URL}`,
                            `grant_type=${process.env.REACT_APP_OAUTH_AUTH_GRANT_TYPE}&username=${process.env.REACT_APP_KEYCLOAK_ADMIN_USER}&password=${process.env.REACT_APP_KEYCLOAK_ADMIN_PASSWORD}&scope=${process.env.REACT_APP_OAUTH_AUTH_SCOPE}&client_id=${process.env.REACT_APP_OAUTH_AUTH_CLIENT}`
                        );
            //console.log(res.data);
            return {code: res.status, data: res.data};
            }catch(error) {
                console.log(error);
                return {code: error.response.status, message: error.message, data: error};
            }
    }
}