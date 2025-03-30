'use client';
import { AppShell, Group, Stack } from '@mantine/core';
import theme from '@/components/theme/Theme'
import { icons } from './Content';

const IconStack = ({ icon, label, isSelected, onClick }) => (
    <Stack
        h={60}
        label={label}
        align='center'
        justify='center'
        gap={0}
        style={{
            color: isSelected ? theme.colors.primary : 'gray',
            cursor: 'pointer',
        }}
        onClick={onClick}
    >
        {icon}
    </Stack>
);

export function BottomNavigation({content, setContent}): JSX.Element {
    return (
        <AppShell.Footer>
            <Group grow gap={0}>
                {icons.map(({ icon, label }) => (
                    <IconStack
                        key={label}
                        icon={icon}
                        label={label}
                        isSelected={content === label}
                        onClick={() => setContent(label)}
                    />
                ))}
            </Group>
        </AppShell.Footer>
    );
}
