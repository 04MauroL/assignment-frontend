function PostsListComponent({posts, onPostSelect, onSearchChange}) {
    return (
        <>
            <input id="search" type="text" placeholder="Search post titles" onChange={onSearchChange}/>
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        {post.title}
                        <button onClick={() => onPostSelect(post.id)}>View</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default PostsListComponent;