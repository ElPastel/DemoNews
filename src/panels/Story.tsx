import { FC, useEffect, useState } from "react"
import {
  CellButton,
  Div,
  Group,
  Header,
  InfoRow,
  Link,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  SimpleCell,
  Spinner,
} from "@vkontakte/vkui"
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { useGetStoryByIdQuery } from "../store/services/newsApi"
import { Comment } from "../store/types"
import { Icon24RefreshOutline } from "@vkontakte/icons"
import { CommentItem } from "../components/CommentItem"
import useFetchData from "../hooks/useFetchData"
import ErrorMsg from "../components/ErrorMsg"
import { getDate } from "../utils"

export const Story: FC<NavIdProps> = ({ id }) => {
  const [isRefresh, setIsRefresh] = useState(false)
  const routeNavigator = useRouteNavigator()
  const params = useParams<"id">()

  useEffect(() => {
    if (params?.id && isNaN(Number(params?.id))) routeNavigator.replace("/")
  }, [params, routeNavigator])

  const {
    data: ids,
    isLoading: isLoadingStory,
    error: errorStory,
    refetch,
  } = useGetStoryByIdQuery(Number(params?.id))

  const {
    data: comments,
    error: commentError,
    isLoading: isLoadingComments,
  } = useFetchData<Comment>(ids?.kids)

  if (isLoadingStory)
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

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        {ids?.title}
      </PanelHeader>
      {errorStory && <ErrorMsg type="story" error="" />}
      <Group>
        <SimpleCell multiline>
          <InfoRow header="Author">{ids?.by}</InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header="Date">{getDate(ids?.time)}</InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header="Comments counter">{ids?.descendants}</InfoRow>
        </SimpleCell>
        <SimpleCell>
          <Link href={ids?.url} hasVisited target="_blank">
            Link
          </Link>
        </SimpleCell>
      </Group>
      <Group header={<Header mode="secondary">Comments</Header>}>
        <Div>
          <CellButton
            centered
            disabled={isLoadingComments || isLoadingStory || isRefresh}
            before={
              isLoadingComments || isRefresh ? (
                <Spinner size="regular" />
              ) : (
                <Icon24RefreshOutline />
              )
            }
            onClick={() => {
              setIsRefresh(true)
              refetch().finally(() => setIsRefresh(false))
            }}
          >
            Update the comments
          </CellButton>
          {commentError && <ErrorMsg type="comments" error={commentError} />}
        </Div>
        {comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </Group>
    </Panel>
  )
}
