import {useEffect, useState} from "react";

function PostDetailsComponent({post, onPostClose}) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.log("Fout tijdens ophalen comments: ", error))
    }, [post.id])

    return (
        <>
            <button onClick={onPostClose}>Close</button>
            <h2>Post Details</h2>
            <h3>{post.title}</h3>
            <p>{post.body}</p>

            <h4>Post Comments</h4>
            <ul>
                {
                    comments.map(comment => (
                        <li key={comment.id}>{comment.body}</li>
                    ))
                }
            </ul>
        </>
    )
}

export default PostDetailsComponent;