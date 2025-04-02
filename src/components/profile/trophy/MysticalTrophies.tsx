import React from "react";
import { Container, Text, Card, Grid, Button } from "@mantine/core";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const achievements = [
  { id: 1, name: "Arcane Novice", description: "Begin your magical journey.", unlocked: true },
  { id: 2, name: "Runemaster", description: "Decipher the first ancient rune.", unlocked: false },
  { id: 3, name: "Celestial Scholar", description: "Learn the language of the stars.", unlocked: false },
  { id: 4, name: "Eldritch Adept", description: "Unlock a forbidden spell.", unlocked: false }
];

const MysticalTrophies = () => {
  return (
    <Container size="md" style={{ textAlign: "center", paddingTop: 40 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Text size="xl" weight={700} style={{ marginBottom: 20 }}>
          🏆 Hall of Legends 🏆
        </Text>
      </motion.div>
      
      <Grid gutter={30}>
        {achievements.map((achievement) => (
          <Grid.Col key={achievement.id} span={6}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: achievement.id * 0.2 }}
            >
              <Card
                shadow="xl"
                style={{
                  padding: 20,
                  background: achievement.unlocked ? "#ffd700" : "#444",
                  color: achievement.unlocked ? "black" : "gray",
                  borderRadius: "12px",
                  position: "relative"
                }}
              >
                {achievement.unlocked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ position: "absolute", top: -10, right: -10 }}
                  >
                    <Sparkles size={24} color="yellow" />
                  </motion.div>
                )}
                <Text weight={600} size="lg">
                  {achievement.name}
                </Text>
                <Text size="sm" style={{ marginTop: 10 }}>
                  {achievement.description}
                </Text>
              </Card>
            </motion.div>
          </Grid.Col>
        ))}
      </Grid>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <Button mt={30} size="lg" variant="gradient" gradient={{ from: "indigo", to: "violet" }}>
          Unlock More Secrets
        </Button>
      </motion.div>
    </Container>
  );
};

export default MysticalTrophies;
