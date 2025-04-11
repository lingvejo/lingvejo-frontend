import {
  Container,
  Stack,
  Text,
  Title,
  Timeline,
  ThemeIcon,
  Card,
  Divider,
} from '@mantine/core';
import { IconMapPin, IconBuildingCastle } from '@tabler/icons-react';

type Settlement = { settlementId: number; name: string };
type Region = {
  regionId: number;
  name: string;
  description: string;
  planetSettlements: Settlement[];
};

type QuestQuillProps = {
  continent: {
    name: string;
    description: string;
    regions: Region[];
  };
  onSettlementClick?: (settlement: Settlement) => void;
};

const QuestQuill = ({ continent, onSettlementClick }: QuestQuillProps) => (
  <Container size="xs" py="xl">
    <Stack gap="lg" align="center">
      <Title
        order={1}
        sx={{
          background:
            'linear-gradient(90deg, var(--mantine-primary-color-filled) 0%, var(--mantine-primary-color-filled-hover) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          fontFamily: '"Cinzel", serif',
          letterSpacing: '0.04em',
        }}
      >
        {continent.name}
      </Title>

      <Text size="sm" color="dimmed" ta="center">
        {continent.description}
      </Text>

      <Timeline
        active={continent.regions.length}
        bulletSize={28}
        lineWidth={2}
        color="var(--mantine-primary-color-filled)"
      >
        {continent.regions.map((region) => (
          <Timeline.Item
            key={region.regionId}
            bullet={
              <ThemeIcon
                size="lg"
                radius="xl"
                sx={{
                  background: 'var(--mantine-primary-color-filled)',
                  color: 'white',
                  boxShadow: '0 0 6px var(--mantine-primary-color-light-hover)',
                }}
              >
                <IconMapPin size={16} />
              </ThemeIcon>
            }
            lineVariant="solid"
          >
            <Card
              shadow="md"
              padding="lg"
              radius="md"
              withBorder
              sx={{
                backgroundColor: 'var(--mantine-primary-color-light)',
                borderColor: 'var(--mantine-primary-color-light-hover)',
                transition: 'transform 150ms ease, box-shadow 150ms ease',
                '&:hover': {
                  transform: 'scale(1.01)',
                  boxShadow: '0 0 12px var(--mantine-primary-color-light-hover)',
                },
              }}
            >
              <Stack gap="xs">
                <Text fw={700} ta="center" size="lg">
                  {region.name}
                </Text>

                <Text size="sm" color="dimmed" ta="center">
                  {region.description}
                </Text>

                <Divider
                  labelPosition="center"
                  my="sm"
                  color="var(--mantine-primary-color-light-hover)"
                />

                <Stack gap="xs">
                  {region.planetSettlements.map((settlement) => (
                    <Card
                      key={settlement.settlementId}
                      padding="xs"
                      radius="sm"
                      withBorder
                      onClick={() => onSettlementClick?.(settlement)}
                      sx={{
                        borderColor: 'var(--mantine-primary-color-light-hover)',
                        backgroundColor:
                          'var(--mantine-primary-color-light)',
                        transition: 'transform 120ms ease, background-color 120ms ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          backgroundColor:
                            'var(--mantine-primary-color-light-hover)',
                        },
                      }}
                    >
                      <Stack gap={4} align="center">
                        <ThemeIcon
                          size="sm"
                          radius="xl"
                          sx={{
                            background: 'var(--mantine-primary-color-filled)',
                            color: 'white',
                          }}
                        >
                          <IconBuildingCastle size={12} />
                        </ThemeIcon>
                        <Text fw={600} size="sm" ta="center">
                          {settlement.name}
                        </Text>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              </Stack>
            </Card>
          </Timeline.Item>
        ))}
      </Timeline>
    </Stack>
  </Container>
);

export default QuestQuill;
