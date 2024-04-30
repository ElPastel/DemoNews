import { Icon16ErrorCircleFill } from "@vkontakte/icons"
import { Card, Div, Text } from "@vkontakte/vkui"

interface ErrorMsg {
  error: string | null
  type: "comments" | "news" | "story"
}

export default function ErrorMsg({ error, type }: ErrorMsg) {
  return (
    <Div>
      <Card mode="outline-tint">
        <Div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Icon16ErrorCircleFill />
          <Text>
            Something went wrong while uploading {type}.{" "}
            {error ? `${error}.` : ""}
          </Text>
        </Div>
      </Card>
    </Div>
  )
}
