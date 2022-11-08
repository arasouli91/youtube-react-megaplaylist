import { useEffect, useState } from "react";

// we could make our own hook like this
export const useFetch = url => {
  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    setState(state => ({ data: state.data, loading: true }));
    fetch(url)
      .then(x => x.text())
      .then(y => {
        setState({ data: y, loading: false });
      });
  }, [url, setState]);
  const renderCount = useRef(1)
  renderCount.current // must access the current property
  return state;
};