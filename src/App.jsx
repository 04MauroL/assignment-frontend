import './App.css'
import {useEffect, useRef, useState, useMemo} from "react";
import PostsListComponent from "./components/PostsListComponent.jsx";
import PostDetailsComponent from "./components/PostDetailsComponent.jsx";

function App() {
    const searchDebounceTimeMs = 500;
    const searchTimeoutId = useRef(null);

    const [posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [post, setPost] = useState(null)

    const setPostDetails = (postId) => {
        setPost(posts.find(post => post.id === postId))
    }

    const onPostClose = () => {
        setPost(null)
        setSearchTerm('')
    }

    const filteredPosts = useMemo(() => {
        return posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm)
        );
    }, [posts, searchTerm]);

    const onSearchChange = (event) => {
        clearTimeout(searchTimeoutId.current)
        const searchTerm = event.target.value.toLowerCase()

        searchTimeoutId.current = setTimeout(() => {
            setSearchTerm(searchTerm)
        }, searchDebounceTimeMs)
    }

    useEffect(() => {
        const controller = new AbortController()

        fetch("https://jsonplaceholder.typicode.com/posts", {signal: controller.signal})
            .then(response =>{
                if (!response.ok) {
                    throw new Error("Fout tijdens ophalen posts")
                }

                return response.json()
            })
            .then(data => {
                setPosts(data)
            })
            .catch(error => {
                if (error.name === "AbortError") return;
                console.log("Fout tijdens ophalen posts: ", error)
            })

        return () => controller.abort()
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
