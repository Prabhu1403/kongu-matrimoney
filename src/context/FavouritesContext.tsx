"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type FavouriteItem = {
  id: string;
  type: "temple" | "event";
  title: string;
  subtitle?: string;
  image: string;
  link: string;
};

interface FavouritesContextType {
  favourites: FavouriteItem[];
  addFavourite: (item: FavouriteItem) => void;
  removeFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
  toggleFavourite: (item: FavouriteItem) => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("kongu_favourites");
    if (stored) {
      try {
        setFavourites(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse favourites");
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("kongu_favourites", JSON.stringify(favourites));
    }
  }, [favourites, isLoaded]);

  const addFavourite = (item: FavouriteItem) => {
    setFavourites((prev) => {
      if (prev.some((fav) => fav.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFavourite = (id: string) => {
    setFavourites((prev) => prev.filter((item) => item.id !== id));
  };

  const isFavourite = (id: string) => {
    return favourites.some((item) => item.id === id);
  };

  const toggleFavourite = (item: FavouriteItem) => {
    if (isFavourite(item.id)) {
      removeFavourite(item.id);
    } else {
      addFavourite(item);
    }
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, isFavourite, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};
