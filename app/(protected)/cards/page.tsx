"use client";
import { getAllCards } from "@/actions/card";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FaPlus, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";

const CardPage = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const [cards, setCards] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onClick = () => {
    router.push("/cards/createnew");
  };

  useEffect(() => {
    const fetchCards = async () => {
      if (user?.id) {
        const allCards = await getAllCards(user.id);

        if (!("error" in allCards)) {
          setCards(allCards);
        } else {
          console.error(allCards.error);
        }
      }
    };

    fetchCards();
  }, [user]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : cards.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < cards.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="w-full h-full p-4">
      <Button variant="outline" onClick={onClick} className="m-[2vh]">
        <FaPlus />
      </Button>
      {cards.length > 0 && (
        <div className="flex flex-col items-center">
          <div className="mb-4 p-4 border rounded shadow-sm w-full max-w-md">
            <h2 className="text-lg font-semibold">
              {cards[currentIndex].title}
            </h2>
            <p className="text-gray-600">{cards[currentIndex].definition}</p>
          </div>
          <div className="flex space-x-4">
            <Button onClick={handlePrev} variant="outline">
              <FaArrowLeft />
            </Button>
            <Button onClick={handleNext} variant="outline">
              <FaArrowRight />
            </Button>
          </div>
        </div>
      )}
      {cards.length === 0 && <p>No cards available.</p>}
    </div>
  );
};

export default CardPage;
