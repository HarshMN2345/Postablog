import Post from "./Post"

const Feed = ({posts}) => {
    return (
        <>
            {
                posts.map((post, index) => {
                    return <Post key={index} post={post} />
                })
            }
        </>
    )
}

export default Feed