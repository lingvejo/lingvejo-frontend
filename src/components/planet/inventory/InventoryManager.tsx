import React, { useState } from 'react';
import ResourceCard from './ResourceCard';

interface InventoryManagerProps {
  type: 'potion' | 'gold';
  potion: number;
  gold: number;
  setPotion: (newPotion: number) => void;
  setGold: (newGold: number) => void;
}

const InventoryManager: React.FC<InventoryManagerProps> = ({ type, potion, gold, setPotion, setGold }) => {
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1); // For potion purchase

  const handlePurchase = () => {
    if (type === 'potion') {
      const totalCost = quantity * 10;

      if (gold >= totalCost) {
        setPotion(potion + quantity);
        setGold(gold - totalCost);
        setError(null); // Clear error on successful purchase
      } else {
        setError('Not enough gold to buy potions.');
      }
    } else if (type === 'gold') {
      // Implement Pi Network logic for buying gold
    }
  };

  return (
    <ResourceCard
      type={type}
      balance={type === 'potion' ? potion : gold}
      goldBalance={gold}
      price={type === 'potion' ? 10 : undefined}
      onAction={handlePurchase}
      error={error}
      actionLabel={type === 'potion' ? 'Buy Potion' : 'Buy 100 Gold'}
      quantity={quantity}
      setQuantity={setQuantity} // Pass quantity setter for potion purchases
    />
  );
};

export default InventoryManager;
