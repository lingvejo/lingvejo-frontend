import { useState, useEffect } from "react";
import { Card, Text, Avatar, Stack, Group, Breadcrumbs, Pagination, Center } from "@mantine/core";
import { getAllLeagues } from "@/utils/data/getter/getAllLeagues";
import { getVoyagersInLeague } from "@/utils/data/getter/getVoyagersInLeague";
import LoadingScreen from "@/components/core/LoadingScreen";
import { useTranslations } from "next-intl";

// Define types
interface League {
  id: number;
  name: string;
  minXP: number;
  maxXP?: number | null;
}

interface Voyager {
  id: number;
  username: string;
  profilePicture?: string | null;
}

export default function LeaguePage() {
  const t = useTranslations("league");

  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [voyagers, setVoyagers] = useState<Voyager[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingVoyagers, setLoadingVoyagers] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);

  // Calculate number of items per page dynamically
  useEffect(() => {
    function updateItemsPerPage() {
      const cardHeight = 50; // Estimated height of each card
      const viewportHeight = window.innerHeight;
      const availableSpace = viewportHeight - 420; // Adjust for headers, margins
      const newItemsPerPage = Math.max(3, Math.floor(availableSpace / cardHeight));

      setItemsPerPage(newItemsPerPage);
    }

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    async function fetchLeagues() {
      setLoading(true);
      const data = await getAllLeagues();
      setLeagues(data);
      setLoading(false);
    }
    fetchLeagues();
  }, []);

  useEffect(() => {
    async function fetchVoyagers() {
      if (selectedLeague) {
        setLoadingVoyagers(true);
        const data = await getVoyagersInLeague(
          selectedLeague.minXP,
          selectedLeague.maxXP ?? 999999
        );
        setVoyagers(data);
        setPage(1);
        setLoadingVoyagers(false);
      }
    }
    fetchVoyagers();
  }, [selectedLeague]);

  if (loading) {
    return <LoadingScreen />;
  }

  const paginatedVoyagers = voyagers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Stack spacing="md">
      {/* Breadcrumbs */}
      <Breadcrumbs>
        <Text
          component="span"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedLeague(null)}
        >
          Leagues
        </Text>
        {selectedLeague && <Text>{selectedLeague.name}</Text>}
      </Breadcrumbs>

      {/* League Selection */}
      {!selectedLeague ? (
        <>
          <Stack spacing="sm">
            {leagues
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((league) => (
                <Card
                  key={league.id}
                  withBorder
                  shadow="sm"
                  onClick={() => setSelectedLeague(league)}
                  style={{ cursor: "pointer" }}
                >
                  <Text size="lg" weight={600}>
                    {league.name}
                  </Text>
                  <Text size="sm" color="gray">
                    {league.minXP} - {league.maxXP ?? "∞"} XP
                  </Text>
                </Card>
              ))}
          </Stack>

          {/* Pagination for leagues */}
          {leagues.length > itemsPerPage && (
            <Center pb="5rem" mt="md">
              <Pagination
                total={Math.ceil(leagues.length / itemsPerPage)}
                page={page}
                onChange={setPage}
              />
            </Center>
          )}
        </>
      ) : loadingVoyagers ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Voyagers List */}
          <Stack spacing="xs">
            {paginatedVoyagers.length === 0 ? (
              <Text align="center" color="dimmed" italic>
                {t("noVoyagers")}
              </Text>
            ) : (
              paginatedVoyagers.map((voyager) => (
                <Card
                  key={voyager.id}
                  withBorder
                  shadow="xs"
                  p="xs"
                  style={{ cursor: "pointer", height: "50px" }}
                >
                  <Group spacing="sm">
                    <Avatar
                      size="sm"
                      src={voyager.profilePicture ?? undefined}
                    />
                    <Text>{voyager.username}</Text>
                  </Group>
                </Card>
              ))
            )}
          </Stack>

          {/* Bottom Pagination */}
          {voyagers.length > itemsPerPage && (
            <Center pb="5rem" mt="md">
              <Pagination
                total={Math.ceil(voyagers.length / itemsPerPage)}
                page={page}
                onChange={setPage}
              />
            </Center>
          )}
        </>
      )}
    </Stack>
  );
}