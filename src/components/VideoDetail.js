import React from "react";

const VideoDetail = () =>
{
    return (
        <h1>This is video detail comp</h1>
    )
}

/*
arrow functions dont have their own this
so, it will use the parent's this

you want to put event.preventDefault()
inside of any submit handler for a form
because by default it refreshes page
*/

export default VideoDetail;