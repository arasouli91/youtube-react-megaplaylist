<BlogList blogs={blogs}></BlogList>
const BlogList = (props) => {
    const blogs = props.blogs;

    return (
        <>
            {blogs.map((blog)=>{
                <div className="blog" key={blog.id}>
                    <h1>{blog.title}</h1>
                </div>
            })}
        </>
    )
}

const Comp = (props) => {
    [word, setWord] = useState("art");
    setWord("black");
}

