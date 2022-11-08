export default function App() {
    const [name, setName] = useState('');
    // continues to exist between rerenders
    // does not cause rerenders
    const renderCount = useRef(1);
    const inputRef = useRef();

    // useEffect runs after the rendering/re-rendering of the component
    //  but only if any of the dependencies is changed
    useEffect(() => {
        renderCount.current = renderCount.current + 1;
    }) // adding an empty dependency array means run only once

    function focus() {
        console.log(inputRef.current); // gives you DOM node
        inputRef.current.focus();
        // this is bad practice, we shouldn't be updating state like this
        inputRef.current.value = 'Some value';
    }

    return (
        <>
            <input ref={inputRef} value={name}/>
            <div>I rendered {renderCount.current} times</div>
            <button onClick={focus}>Focus</button>
        </>
    )
}