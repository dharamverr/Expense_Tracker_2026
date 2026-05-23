import React, { useEffect, useState } from 'react'

export default function useLocalStorage(key, initialData) {
    const [data, setData] = useState(initialData)

    
    useEffect(() => {
        const existingData = JSON.parse(localStorage.getItem(key))
        if(existingData) {
            setData(existingData)
        }else {
            localStorage.setItem(key,JSON.stringify(initialData))
        }
    },[])

    //updater function like useState
    function setLocalStorage(newData) {
        let valueToStore
        if(typeof newData === 'function') {
           valueToStore= newData(data)
        }else {
            valueToStore = newData
        }
        localStorage.setItem(key, JSON.stringify(valueToStore))
        setData(valueToStore)
    }

    return [data, setLocalStorage]
}
