import {useState} from "react";
// USEFETCHb
export const useFetch = (callback) => { // принимает колбэк т.к это некоторый запрос перед которым надо показать крутилку и после выполнения которого надо ее скрыть
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('');

    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]

    // Возвращаем fetching для того чтобы в нужном месте его использовать
}