const BlogList = (props) =>
{
    const blogs = props.blogs;

    return (
        <>
            {blogs.map((blog) => (
                <div className="blog" key={blog.id}>
                    blog.title
                </div>
            ))}
        </>
    );
}
<BlogList blogs={blogs}></BlogList>


// if you click again too fast, you will end up again in the function
// that is being returned, the timeoutId, fn, and delay are all captured in
// the inner function
// this inner function is your event handler
// so, we call debounce when we're calling addEventListener
// this will generate the inner function
// the inner function takes args, which will be the event
// the event is then passed to the function fn
function debounce(fn, delay)
{
    let timeoutId;
    return function (...args)
    {
        // got here again, maybe didn't reach timeout callback, cancel it
        timeoutId && clearTimeout(timeoutId);
        timeoutId = setTimeout(() =>
        {
            fn(...args);
        }, delay);
    }
}

// to throttle a function means to only allow it to be called once
// in a specified interval of time
// the difference between this and debounce is, we don't reset the delay each time
// so if you were clicking like a maniac it will go through after delay
function throttle(fn, delay)
{
    let last;
    return function (...args)
    {
        const now = new Date().getTime();
        // first time, getTime should be greater than delay
        if (now - last < delay) // not enough time has passed
            return;
        last = now; // last successful execution was now
        // so when event handler is called
        // it may result in return early
        // or it may result in fn being called
        return fn(...args);
    }
}
document.getElementById("id")
    .addEventListener('click', throttle((e) =>
    {
        console.log("success");
    }, 1000));

document.getElementById("id")
    .addEventListener('click', debounce((e) =>
    {
        console.log("success");
    }, 1000));
