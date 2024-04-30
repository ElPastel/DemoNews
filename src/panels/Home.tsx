import { FC, useState } from "react"
import {
  Panel,
  Group,
  NavIdProps,
  ScreenSpinner,
  PanelHeader,
  CardGrid,
  ContentCard,
  CellButton,
  Div,
  Spinner,
} from "@vkontakte/vkui"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Story } from "../store/types"
import { Icon20RefreshOutline } from "@vkontakte/icons"
import useFetchData from "../hooks/useFetchData"
import { useGetNewsIdsQuery } from "../store/services/newsApi"
import ErrorMsg from "../components/ErrorMsg"
import { getDate } from "../utils"

export interface HomeProps extends NavIdProps {}

export const Home: FC<HomeProps> = ({ id }) => {
  const [isRefresh, setIsRefresh] = useState(false)
  const {
    data: ids,
    error: errorIds,
    isLoading: isLoadingIds,
    refetch,
  } = useGetNewsIdsQuery(undefined, {
    pollingInterval: 60_000,
  })
  const {
    data: stories,
    error: storiesError,
    isLoading: isLoadingStories,
  } = useFetchData<Story>(ids || [])

  const routeNavigator = useRouteNavigator()

  return (
    <Panel id={id}>
      <PanelHeader>Latest News</PanelHeader>
      {(storiesError || errorIds) && (
        <ErrorMsg type="news" error={storiesError} />
      )}

      <Group>
        <Div>
          <CellButton
            centered
            disabled={isLoadingStories || isLoadingIds || isRefresh}
            before={
              isLoadingStories || isLoadingIds || isRefresh ? (
                <Spinner size="regular" />
              ) : (
                <Icon20RefreshOutline />
              )
            }
            onClick={() => {
              setIsRefresh(true)
              refetch().finally(() => setIsRefresh(false))
            }}
          >
            Update the news
          </CellButton>
        </Div>

        <CardGrid size="l">
          {stories?.map((story) => (
            <ContentCard
              key={story?.id}
              onClick={() => routeNavigator.push(`story/${story?.id}`)}
              subtitle={`Rating: ${story?.score || 0}`}
              header={story?.title}
              text={story?.by}
              caption={getDate(story?.time)}
              maxHeight={150}
            />
          ))}
        </CardGrid>
      </Group>
      {(isLoadingStories || isLoadingIds) && <ScreenSpinner size="large" />}
    </Panel>
  )
}
