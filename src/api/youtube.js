import axios from "axios";

export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        part: "snippet",
        maxResults: 5,
        key: "AIzaSyCp843L2L6YUCZDIIcjsefIseZ-w1Cm3pY"
    }
});