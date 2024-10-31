import { APIDOMAIN, APIDOMAIN_VERSION } from "../../../vars";

const setNewFollower = async (idFollowed) => {

    try {

        const response = await fetch(`${APIDOMAIN}${APIDOMAIN_VERSION}/follow/${idFollowed}`, {
            method: 'POST',
            credentials: 'include'
        });

        const responseData = await response.json();

        return response.data;

    } catch (error) {
        console.error(error);
    }

}

export const FollowService = {

    setNewFollower

}