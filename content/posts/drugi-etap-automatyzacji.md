---
title: "Drugi etap automatyzacji"
description: "O tym jak serwer z buildu obrazu zrobił tylko docker pull"
date: "2026-08-02"
---

# Budowanie poza serwerem

Do tej pory każda zmiana na stronie wymagała `docker compose up -d --build` bezpośrednio na serwerze — VPS sam pobierał kod i sam go budował. Tym razem proces przebiegł inaczej.

## Co się zmieniło

Budowanie obrazu przeniosłem poza serwer produkcyjny:

- zbudowałem obraz lokalnie, na własnym komputerze,
- zalogowałem się do GHCR (GitHub Container Registry) tokenem dostępu,
- wypchnąłem gotowy obraz do rejestru,
- na serwerze wykonałem tylko `docker pull`, a potem `docker compose up -d` — bez `--build`.

Serwer nie widział ani jednej linijki kodu źródłowego — dostał wyłącznie gotowy, zbudowany artefakt.

## Mała pułapka po drodze

Pierwsze uruchomienie po `pull` nie pokazało zmian, mimo że nowy obraz był już pobrany. Powód okazał się prosty: plik `compose.yaml` nadal wskazywał na starą, lokalnie zbudowaną wersję obrazu, a nie na tę z rejestru. Wystarczyło zamienić `image: surdev-site:latest` na pełny adres `ghcr.io/...`, żeby kontener zaczął korzystać z właściwej wersji.

## Dlaczego to ma znaczenie

Serwer produkcyjny nie musi już mieć zainstalowanego całego środowiska do budowania — wystarczy mu sam runtime Dockera i dostęp do rejestru. To krótszy czas wdrożenia i mniejsze ryzyko, że coś się wysypie w trakcie budowania akurat na maszynie, na której działa aktywna strona.