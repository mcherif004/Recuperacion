# Crea en Python las siguientes clases:

"""Card que simule una carta de naipes. Un naipe tiene un palo (de un conjunto de palos) y un valor (de un conjunto de valores).
CardPlayer que simule un jugador de naipes. Un jugador tiene un nombre y un conjunto de naipes. 
Puede robar una carta de una baraja. Una vez robada el jugador tiene una carta más y la baraja una menos.
Puede deshacerse de una carta.
Puede recibir cartas.
Deck que simula un conjunto de cartas de naipes.
Inicialmente tiene las cartas que le llegan con el constructor.
Puede repartir un conjunto de cartas a un jugador. En la baraja dejan de existir esas cartas.
Le pueden quitar la primera carta (robar).
Puede barajarse.
Podemos saber cuantas cartas hay en la baraja.
Baraja Española e Inglesa (SpanishDeck e EnglishDeck) que heredan de Deck."""

import random

class Card:
    suits = ["Espadas", "Bastos", "Oros", "Copas"]
    values = ["1", "2", "3", "4", "5", "6", "7", "10", "11", "12"]

    def __init__(self, suit, value):
        if suit not in Card.suits or value not in Card.values:
            raise ValueError("El palo o el valor de la carta no es válido.")
        self.suit = suit
        self.value = value

    def __str__(self):
        return f"{self.value} de {self.suit}"

class CardPlayer:
    def __init__(self, name):
        self.name = name
        self.hand = []

    def draw(self, deck):
        card = deck.draw_card()
        if card:
            self.hand.append(card)
            print(f"{self.name} robó la carta: {card}")
        else:
            print("La baraja está vacía.")

    def discard(self, card):
        if card in self.hand:
            self.hand.remove(card)
            print(f"{self.name} se deshizo de la carta: {card}")
        else:
            print(f"{self.name} no tiene esa carta en su mano.")

    def receive_cards(self, cards):
        self.hand.extend(cards)
        print(f"{self.name} recibió {len(cards)} carta(s).")

    def show_hand(self):
        return ", ".join(str(card) for card in self.hand)

class Deck:
    def __init__(self, cards=None):
        self.cards = cards if cards else []

    def draw_card(self):
        if self.cards:
            return self.cards.pop(0)
        return None

    def shuffle(self):
        random.shuffle(self.cards)

    def card_count(self):
        return len(self.cards)

    def deal_cards(self, player, num_cards):
        dealt_cards = []
        for _ in range(num_cards):
            card = self.draw_card()
            if card:
                dealt_cards.append(card)
        player.receive_cards(dealt_cards)
        return dealt_cards

class SpanishDeck(Deck):
    def __init__(self):
        cards = [Card(suit, value) for suit in Card.suits for value in Card.values]
        super().__init__(cards)

class EnglishDeck(Deck):
    def __init__(self):
        suits = ["Corazones", "Diamantes", "Tréboles", "Picas"]
        values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
        cards = [Card(suit, value) for suit in suits for value in values]
        super().__init__(cards)

if __name__ == "__main__":
    spanish_deck = SpanishDeck()
    english_deck = EnglishDeck()

    player1 = CardPlayer("Juan")

    spanish_deck.shuffle()

    spanish_deck.deal_cards(player1, 5)

    print(f"Mano de {player1.name}: {player1.show_hand()}")

    player1.draw(spanish_deck)

    print(f"Mano de {player1.name}: {player1.show_hand()}")

    card_to_discard = player1.hand[0]
    player1.discard(card_to_discard)

    print(f"Mano de {player1.name}: {player1.show_hand()}")