import { Spinner } from "@vkontakte/vkui"
import { FC } from "react"

export const Loader: FC = () => {
  return (
    <div
      aria-busy={true}
      aria-live="polite"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        margin: "40px auto",
      }}
    >
      <Spinner size="large" />
    </div>
  )
}
