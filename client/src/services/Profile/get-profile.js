import { APIDOMAIN, APIDOMAIN_VERSION } from "../../../vars";
import { mock_user } from "../../data/profile/mockusers";
import { checkAuth } from "../Auth/checkAuth";

const getUserProfile = async () => {
    try {
        // Replace mock_user with your actual JSON data
        const userJsonString = localStorage.getItem('userdata');
        // Check if the data exists in localStorage
        if (!userJsonString) {
            throw new Error("No user profile found in localStorage.");
        }


        const {message,user} = JSON.parse(userJsonString);

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            authId: user.authId,
            authName: user.authName,
            roles: user.roles || [],
            avatar: user.avatar || "https://picsum.photos/id/1009/400/400",
            location: user.location || "Unknown", 
            job: user.job || "Not provided", 
            createdAt: user.created_at,
        };

        const projects = [];
        const redes = user.social_networks || [
            { id: 1, github: "jperezdev" },
            { id: 2, linkedin: "juan-perez-123" }
        ]; 
        const page = 1; // Default page
        const totalPages = 1; // Since no pagination info is provided
        const totalPosts = 0; // Default totalPosts, as it's not provided

        // Return the required structure
        return {
            userData,
            projects,
            redes,
            page,
            totalPages,
            totalPosts
        };

    } catch (error) {
        console.error("Error in the user profile request:", error.message);
        throw error; // You can handle the error more gracefully in your UI
    }
};

const getUserLikedProyects = async (page) => {
    try {

        const { projects, page, totalPages, totalPosts, ...userData } = mock_user

        return {
            projects,
            page,
            totalPages,
            totalPosts
        }

    } catch (error) {
        error("Error en la peticion del perfil del usuario :" + error.message);
    }
}
const getUserFollowed = async (page) => {

    try {
        const userJsonString = localStorage.getItem('userdata');
        
        // Check if the data exists in localStorage
        if (!userJsonString) {
            throw new Error("No user profile found in localStorage.");
        }


        const {message,user} = JSON.parse(userJsonString);
        const response = await fetch(`${APIDOMAIN}${APIDOMAIN_VERSION}/user/${user.id}/followed`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        });
        
        const data = await response.json();        

        return data;

    } catch (error) {
        error("Error en la peticion del perfil del usuario :" + error.message);
    }

}

const getUserFollowers = async (page) => {

    try {
        const userJsonString = localStorage.getItem('userdata');
        
        // Check if the data exists in localStorage
        if (!userJsonString) {
            throw new Error("No user profile found in localStorage.");
        }


        const {message,user} = await JSON.parse(userJsonString);


        const response = await fetch(`${APIDOMAIN}${APIDOMAIN_VERSION}/user/${user.id}/followers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        });

        const data = await response.json();        

        return data;

    } catch (error) {
        error("Error en la peticion del perfil del usuario :" + error.message);
    }

}
export const getProfileService = {
    getUserProfile,
    getUserFollowers,
    getUserFollowed,
    getUserLikedProyects
}
