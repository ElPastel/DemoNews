import { FC } from "react"
import {
  Button,
  Caption,
  Card,
  Div,
  Spinner,
  Text,
  Title,
} from "@vkontakte/vkui"
import { Comment } from "../store/types"
import DOMPurify from "dompurify"
import parse from "html-react-parser"
import { Icon24ChevronDown, Icon24ChevronUp } from "@vkontakte/icons"
import useFetchChildren from "../hooks/useFetchChildren"
import { getDate } from "../utils"
import { ErrorMsg } from "./ErrorMsg"

export const CommentItem: FC<{ comment: Comment }> = ({ comment }) => {
  const { text, by, time, kids, deleted } = comment
  const {
    data: children,
    error,
    isLoading,
    isOpen,
    toggleChildren,
  } = useFetchChildren<Comment>(kids || [])

  return (
    <>
      {!deleted && (
        <Div>
          <Card mode="shadow">
            <Div>
              <Title level="3" weight="2" style={{ marginBottom: 16 }}>
                {by}
              </Title>
              <Text>{parse(DOMPurify.sanitize(text))}</Text>
              <Caption level="1" style={{ marginBottom: 16 }}>
                {getDate(time)}
              </Caption>
              {kids && (
                <Button
                  mode="link"
                  before={
                    isLoading ? (
                      <Spinner size="regular" />
                    ) : isOpen ? (
                      <Icon24ChevronUp />
                    ) : (
                      <Icon24ChevronDown />
                    )
                  }
                  onClick={toggleChildren}
                />
              )}
            </Div>
          </Card>
        </Div>
      )}

      {children
        .filter((comment) => !comment.deleted)
        .map((comment) => (
          <Div key={comment.id}>
            <CommentItem comment={comment} />
          </Div>
        ))}
      {error && <ErrorMsg type="comments" error={error} />}
    </>
  )
}
