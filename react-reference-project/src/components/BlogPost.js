class BlogPost extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            blogPost: DataSource.getBlogPost(props.id)
        };
    }

    componentDidMount()
    {
        DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount()
    {
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange()
    {
        this.setState({
            blogPost: DataSource.getBlogPost(this.props.id)
        });
    }

    render()
    {
        return <TextBlock text={this.state.blogPost} />;
    }
}
/*
CommentList and BlogPost aren't identical,
they call different methods on DataSource,
and they render different output.
But much of their implementation is the same:
-On mount, add a change listener to DataSource.
-Inside the listener, call setState whenever the data source changes.
-On unmount, remove the change listener.

You can imaginge that in a large app, this pattern of
subscribing to DataSource and calling setState will occur
over and over again. We want an abstraction that allows us to define
this logic in a sijngle place and share it across many components.
This is where higher order components excel.

We can write a function that creates components,
like CommentList and BlogPost, that subscribe to DataSource.
The function will accept as one of its arguments a child component
that receives thje subscribed data as a prop.
Let's call the function withSubscription:    */

const CommentListWithSubscription
    = withSubscription(
        CommentList,
        (DataSource) => DataSource.getComments()
    );

const BlogPostWithSubscription
    = withSubscription(
        BlogPost,
        (DataSource, props) => DataSource.getBlogPost(props.id)
    );

/*
The first parameter is the wrapped component.
The second parameter retrieves the data we're interested in,
given a DataSource and the current props.

When CommentListWithSubscription and BlogPostWithSubscription
are rendered, CommentList and BlogPost will be passed a data prop
with the most current data retrieved from DataSource:
*/

// This function takes a component...
function withSubscription(WrappedComponent, selectData)
{
    // ... and returns another component...
    return class extends React.Component
    {
        constructor(props)
        {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                data: selectData(DataSource, props)
            };
        }

        componentDidMount()
        {
            // ... that takes care of the subscription...
            DataSource.addChangeListener(this.handleChange);
        }

        componentWillUnmount()
        {
            DataSource.removeChangeListener(this.handleChange);
        }

        handleChange()
        {
            this.setState({
                data: selectData(DataSource, this.props)
            });
        }

        render()
        {
            // ...and renders the wrapped component
            //  with the fresh data!
            // Notice that we pass through any additional props
            return
            <WrappedComponent data={this.state.data} {...this.props} />;
        }
    }
}

/*
Note that a HOC doesn't modify the input component,
nor does it use inheritance to copy its behavior.
Rather, a HOC composes the original component by wrapping it in a
container component. A HOC is a pure function with zero side-effects.

And that's it!. The Wrapped component receives receives
all the props of the container, along with a new prop, data,
which it uses to render its output. The HOC isn't concerned
with how or why the data is used, and the wrapped component isn't
concerned with where the data came from.
 
*/