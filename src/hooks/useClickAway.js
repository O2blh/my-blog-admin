import {useEffect, useRef } from 'react'

const defaultEvents = ['mousedown','touchstart']

export const on = (obj,...args) => obj.addEventListener(...args)

export const off = (obj,...args) => obj.removeEventListener(...args)

const useClickAway = (ref,onClickAway,events =defaultEvents ) => {
    const savedCallback = useRef()

    useEffect(() => {
        savedCallback.current = onClickAway
    }, [onClickAway])

    useEffect(()=>{

        const handler = (event) => {
            const {current:el} = ref
            el && !el.contains(event.target) && savedCallback.current(event)
        }

        for(const eventName of events){
            on(document,eventName,handler)
        }
        return () => {
            for(const eventName of events){
                off(document,eventName,handler)
            }
        }
    },[events, ref])
}

export default useClickAway