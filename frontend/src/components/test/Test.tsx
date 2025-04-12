"use client";

import React, { useEffect, useState } from "react";
import { Button, Text, Stack } from "@mantine/core";
import { usePiNetwork } from "@/contexts/PiNetworkContext"; // Assuming this is where PiNetworkContext is provided

const PiTestComponent = () => {
  const { user, signIn, createPayment, loading } = usePiNetwork();
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  // Debugging: Logging user state changes
  useEffect(() => {
    if (user) {
      console.log("User logged in:", user);
    }
  }, [user]);

  // Handle creating a payment
  const handleCreatePayment = async () => {
    if (!user) {
      console.log("User not logged in, signing in...");
      await signIn();
    }

    const metadata = { someKey: "someValue" };
    await createPayment("Test Payment", 100, metadata);
    console.log("Payment created.");
  };

  return (
    <Stack>
      <Text align="center" size="xl" weight={600}>
        Pi Network Test Component
      </Text>

      {loading ? (
        <Text align="center">Loading...</Text>
      ) : (
        <>
          <Text align="center">
            {user ? `Logged in as: ${user.username}` : "Not logged in"}
          </Text>

          <Text align="center">
            {user ? `${user.uid}` : "Not logged in"}
          </Text>

          <Button fullWidth onClick={handleCreatePayment}>
            Create Payment
          </Button>

          <Text align="center" mt="md">
            {paymentStatus ? `Payment Status: ${paymentStatus}` : "No payment status"}
          </Text>
        </>
      )}
    </Stack>
  );
};

export default PiTestComponent;
