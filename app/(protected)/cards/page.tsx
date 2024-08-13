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
  const [isFlipped, setIsFlipped] = useState(false);

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
    setIsFlipped(false); // Reset flip state
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : cards.length - 1
    );
  };

  const handleNext = () => {
    setIsFlipped(false); // Reset flip state
    setCurrentIndex((prevIndex) =>
      prevIndex < cards.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full h-full p-4 flex flex-col items-center">
      <Button variant="outline" onClick={onClick} className="m-[2vh]">
        <FaPlus />
      </Button>
      {cards.length > 0 && (
        <div className="flex flex-col items-center space-y-4">
          <div
            className={`w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {isFlipped ? (
              <div className="w-[35vh] h-[20vh] bg-white">
                <Button
                  onClick={handleFlip}
                  className="w-full h-full text-center overflow-hidden text-ellipsis"
                >
                  <p className="overflow-y-auto rotate-y-180 h-full w-full break-words whitespace-normal flex text-center justify-center items-center">
                    {cards[currentIndex].title}
                  </p>
                </Button>
              </div>
            ) : (
              <div className="w-[35vh] h-[20vh] bg-white">
                <Button
                  onClick={handleFlip}
                  className="w-full h-full text-center overflow-hidden text-ellipsis"
                >
                  <p className="overflow-y-auto h-full w-full break-words whitespace-normal flex text-center justify-center items-center">
                    {cards[currentIndex].definition}
                  </p>
                </Button>
              </div>
            )}
          </div>
          <div className="flex gap-x-[5vh]">
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
