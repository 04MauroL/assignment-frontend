import './App.css'
import {useEffect, useRef, useState} from "react";
import PostsListComponent from "./components/PostsListComponent.jsx";
import PostDetailsComponent from "./components/PostDetailsComponent.jsx";

function App() {
    const searchDebounceTimeMs = 500;
    const searchTimeoutId = useRef(null);

    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [post, setPost] = useState(null)

    const setPostDetails = (postId) => {
        setPost(posts.find(post => post.id === postId))
    }

    const onPostClose = () => {
        setPost(null)
        setFilteredPosts(posts)
    }

    const onSearchChange = (event) => {
        clearTimeout(searchTimeoutId.current)
        const searchTerm = event.target.value.toLowerCase()

        const timeoutId = setTimeout(() => {
            setFilteredPosts(posts.filter(post => post.title.toLowerCase().includes(searchTerm)))
        }, searchDebounceTimeMs)

        searchTimeoutId.current = timeoutId
    }

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(data => {
                setPosts(data)
                setFilteredPosts(data)
            })
            .catch(error => console.log("Fout tijdens ophalen posts: ", error))
    }, [])

    return (
        <>
            <h1>Assignment Frontend - Mauro Leonardo</h1>

            {
                !post
                    ? <PostsListComponent posts={filteredPosts} onPostSelect={setPostDetails}
                                          onSearchChange={onSearchChange}/>
                    : <PostDetailsComponent post={post} onPostClose={onPostClose}/>
            }
        </>
    )
}

export default App
