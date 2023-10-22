import React from 'react';
import {useGetPostByIdQuery} from "../widgets/PostService.js";
import BackButton from "./BackButton.jsx";
import {useLocation} from "react-router-dom";

const Post = () => {
    const location = useLocation()
    const {id} = location.state
    const {data, error, isLoading} = useGetPostByIdQuery(id)
    console.log(id)
    return (
        <div className="App">
            {error ? (
                <>Oh no, there was an error</>
            ) : isLoading ? (
                <>Loading...</>
            ) : data ? (
                <>
                    <h3>{data.title}</h3>
                    <div>{data.body}</div>
                </>
            ) : null}
            <BackButton/>
        </div>
    );
};

export default Post;