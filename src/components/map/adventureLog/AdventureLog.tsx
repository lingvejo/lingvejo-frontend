'use client';

import {
  Center,
  Container,
  Tabs,
} from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useVoyager } from '@/contexts/VoyagerContext';
import LoadingScreen from '@/components/core/LoadingScreen';
import { getAdventuringPlanets } from '@/utils/data/queries/getAdventuringPlanets';
import { getWizardingPlanets } from '@/utils/data/queries/getWizardingPlanets';
import AdventureLogList from './AdventureLogList';

type TabType = 'adventurer' | 'wizard';

export default function AdventureLog() {
  const t = useTranslations('adventureLog');
  const { voyager, loading } = useVoyager();
  const [tab, setTab] = useState<TabType>('adventurer');
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!voyager?.id) return;

    const fetchData = async () => {
      const result =
        tab === 'adventurer'
          ? await getAdventuringPlanets(voyager.id)
          : await getWizardingPlanets(voyager.id);
      setData(result);
    };

    fetchData();
  }, [tab, voyager?.id]);

  if (loading || !voyager) {
    return <LoadingScreen />;
  }

  return (
    <Container size="xs">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Center mb="md">
          <Tabs
            value={tab}
            onChange={(v: string) => setTab(v as TabType)}
            radius="lg"
          >
            <Tabs.List grow>
              <Tabs.Tab value="adventurer">{t('adventurer.title')}</Tabs.Tab>
              <Tabs.Tab value="wizard">{t('wizard.title')}</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Center>
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <AdventureLogList role={tab} data={data} />
        </motion.div>
      </AnimatePresence>
    </Container>
  );
}
