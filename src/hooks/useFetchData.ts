import { useEffect, useState } from "react"
import { BASE_API_URL } from "../utils"

function useFetchData<ResponseType>(ids: number[] | undefined) {
  const [data, setData] = useState<ResponseType[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchData(ids: number[]) {
      try {
        setError(null)
        setIsLoading(true)
        const promises = ids.map((id) =>
          fetch(`${BASE_API_URL}item/${id}.json`).then((response) =>
            response.json()
          )
        )
        const result: ResponseType[] = await Promise.all(promises)
        setData(result)
      } catch (err) {
        if (err instanceof TypeError) setError(err.message)
        else setError("Something went wrong")
      } finally {
        setIsLoading(false)
      }
    }
    if (ids) fetchData(ids)
  }, [ids])

  return { data, error, isLoading }
}

export default useFetchData
