import { useState } from "react"
import { BASE_API_URL } from "../utils"

function useFetchChildren<ResponseType>(ids: number[]) {
  const [data, setData] = useState<ResponseType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const fetchChildren = async (ids: number[]) => {
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
    } finally {
      setIsLoading(false)
    }
  }

  const toggleChildren = () => {
    if (data.length === 0 && !isLoading) {
      fetchChildren(ids)
      setIsOpen(true)
    } else {
      setData([])
      setIsOpen(false)
    }
  }

  return {
    data,
    error,
    isLoading,
    isOpen,
    toggleChildren,
  }
}

export default useFetchChildren
