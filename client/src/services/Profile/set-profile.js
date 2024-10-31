import { APIDOMAIN, APIDOMAIN_VERSION } from "../../../vars";

const updateProfile = async (updatedUserData) => {
    try {
        const {
            name,
            username,
            roles,
            avatar,
            location,
            job
        } = updatedUserData;


        const response = await fetch(`${APIDOMAIN}${APIDOMAIN_VERSION}/user`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                username,
                role: roles,
                avatar,
                location,
                job,
            })
        });

        const responseData = await response.json();
        
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};


export const SetProfileService = {
    updateProfile

}