import { useRef, useEffect } from "react";

function useInterval(callback, delay){
    const savedCallback = useRef();

    useEffect(()=>{
        savedCallback.current = callback; //최신 callback을 로드한다.
    });
    useEffect(()=>{
        function tick(){
            savedCallback.current(); //최신 callback을 로드한다.
        }
        if(delay!=null){
            let id = setInterval(tick,delay);
            return ()=>clearInterval(id);
        }
    },[delay])
    return savedCallback.current;
}

export default useInterval;