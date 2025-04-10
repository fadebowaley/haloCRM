import React from 'react';
import BeefIcon from '@core/components/icons/beef';
import BurgerIcon from '@core/components/icons/burger';
import ChickenIcon from '@core/components/icons/chicken';
import CoffeeCupIcon from '@core/components/icons/coffee-cup';
import ColdDrinkIcon from '@core/components/icons/cold-drink';
import CookiesIcon from '@core/components/icons/cookies';
import DinnerIcon from '@core/components/icons/dinner';
import FrenchFriesIcon from '@core/components/icons/french-fries';
import LunchIcon from '@core/components/icons/lunch';
import PastaIcon from '@core/components/icons/pasta';
import PineAppleIcon from '@core/components/icons/pine-apple';
import PizzaIcon from '@core/components/icons/pizza';
import SweetIcon from '@core/components/icons/sweet';

export type InitialStateType = {
  filter: string;
};

export const initialState: InitialStateType = {
  filter: '',
};

// Options
export const filterOptions = [
  {
    id: 2,
    name: 'Pizza',
    value: 'pizza',
    icon: PizzaIcon,
  },
  {
    id: 3,
    name: 'Cold Drink',
    value: 'cold-drink',
    icon: ColdDrinkIcon,
  },
  {
    id: 4,
    name: 'Burger',
    value: 'burger',
    icon: BurgerIcon,
  },
  {
    id: 5,
    name: 'Coffee',
    value: 'coffee',
    icon: CoffeeCupIcon,
  },
  {
    id: 6,
    name: 'French Fry',
    value: 'french-fry',
    icon: FrenchFriesIcon,
  },
  {
    id: 7,
    name: 'Lunch',
    value: 'lunch',
    icon: LunchIcon,
  },
  {
    id: 8,
    name: 'Dinner',
    value: 'dinner',
    icon: DinnerIcon,
  },
  {
    id: 9,
    name: 'Sweet',
    value: 'sweet',
    icon: SweetIcon,
  },
  {
    id: 10,
    name: 'Veg',
    value: 'veg',
    icon: PizzaIcon,
  },
  {
    id: 11,
    name: 'Pasta',
    value: 'pasta',
    icon: PastaIcon,
  },
  {
    id: 12,
    name: 'Cookies',
    value: 'cookies',
    icon: CookiesIcon,
  },
  {
    id: 13,
    name: 'Chicken',
    value: 'chicken',
    icon: ChickenIcon,
  },
  {
    id: 14,
    name: 'Beef',
    value: 'beef',
    icon: BeefIcon,
  },
  {
    id: 15,
    name: 'Fruits',
    value: 'fruits',
    icon: PineAppleIcon,
  },
  {
    id: 16,
    name: 'Juice',
    value: 'juice',
    icon: LunchIcon,
  },
];
