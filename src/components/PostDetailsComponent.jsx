import {useEffect, useState} from "react";

function PostDetailsComponent({post, onPostClose}) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        const controller = new AbortController()

        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`, {signal: controller.signal})
            .then(response => {
                if (!response.ok) {
                    throw new Error("Fout tijdens ophalen comments")
                }

                return response.json()
            })
            .then(data => setComments(data))
            .catch(error => console.log("Fout tijdens ophalen comments: ", error))

        return ()=> controller.abort()
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