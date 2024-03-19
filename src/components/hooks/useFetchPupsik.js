import {useState} from "react";
// USEFETCHb
export const useFetchPupsik = (callback) => { // принимает колбэк т.к это некоторый запрос перед которым надо показать крутилку и после выполнения которого надо ее скрыть
    const [isLoadingPupsik, setIsLoadingPupsik] = useState(false)
    const [errorPupsik, setErrorPupsik] = useState('');

    const fetching = async () => {
        try {
            setIsLoadingPupsik(true)
            await callback()
        } catch (e) {
            setErrorPupsik(e.message)
        } finally {
            setIsLoadingPupsik(false)
        }
    }

    return [fetching, isLoadingPupsik, errorPupsik]

    // Возвращаем fetching для того чтобы в нужном месте его использовать
}