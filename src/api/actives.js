import instance from "./instance";

export const getActive = () => {
    const url ="/active"
    return instance.get(url)
}

export const getOneActive = (id) => {
    const url = `/active/${id}`
    return instance.get(url)
}

export const createActive = (active) => {
    const url ="/active"
    return instance.post(url, active)
}

export const updateActive = (active) => {
    const url = `/active/${active.id}`
    return instance.put(url, active)
}

export const removeActive = (id) => {
    const url = `/active/${id}`
    return instance.delete(url)
}