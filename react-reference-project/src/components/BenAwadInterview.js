import { useEffect, useState } from "react";
import { isCompositeComponent } from "react-dom/test-utils";

let Counter = () =>
{
    const [count, setCount] = useState(0);
    const [data, setData] = useState(null);

    function fetchMore()
    {
        fetch("https://randomuser.me/api")
            .then((resp) => resp.json())
            .then((d) =>
            {
                if (data) data.results.push(d.results[0]);
                else data = d;
                setData(data);
                console.log("fetch more ", d);
            });
    }

    useEffect(() =>
    {
        fetchMore();
    }, []);

    let clickHandler = () =>
    {
        setCount(count + 1);
        fetchMore();
    }

    return (
        <div>
            <div>{count}</div>
            <button onClick={clickHandler}>click me</button>
            <div>
                {data &&
                    data.results.map((elem) =>
                    {
                        return (
                            <div key={elem.login.uuid}>
                                {elem.name.title} {elem.name.last}
                                <br />
                                <img width={200} src={elem.picture.thumbnail} alt="" />
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Counter;