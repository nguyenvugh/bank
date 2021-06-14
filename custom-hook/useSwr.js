import useSWR from "swr"
import { fetcher } from "../utils/swr.utils"

const useSwr = (
  url = "",
  options = {
    initialData: {},
    refreshInterval: 1000,
  }
) => {
  const { data } = useSWR(url, fetcher, options)

  return data
}

export default useSwr
