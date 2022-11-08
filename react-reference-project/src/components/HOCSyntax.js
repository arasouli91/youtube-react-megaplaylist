const UpdatedComponent = (OriginalComponent) =>
{
    return class extends React.Component
    {
        render()
        {
            return <OriginalComponent />
        }
    }
}

// function syntax

function UpdatedComponent(WrappedComponent)
{
    return class extends React.Component
    {
        render()
        {
            // pass in state from HOC and props
            return <OriginalComponent 
                        data={this.state.data} 
                        {...this.props} 
                    />
        }
    }
}

export default UpdatedComponent;