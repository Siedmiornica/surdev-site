---
title: "Czwarty i ostatni etap automatyzacji"
description: "SSH z GitHub Actions domyka pętlę: push, build, deploy bez ręcznej pracy."
date: "2026-08-05"
---

# Domykanie pętli

Do tej pory pipeline kończył się na wypchnięciu obrazu do GHCR — pobranie i uruchomienie na serwerze nadal wymagało ręcznego wejścia po SSH. Ten wpis opisuje ostatni brakujący element.

## Co się zmieniło

Do workflow doszedł nowy krok, uruchamiany zaraz po zbudowaniu i wypchnięciu obrazu:

- GitHub Actions loguje się na VPS przez SSH, dedykowanym kluczem stworzonym tylko do tego celu,
- na serwerze wykonywane jest `docker pull` najnowszego obrazu,
- kontener jest restartowany przez `docker compose up -d`.

Dane potrzebne do połączenia (adres serwera, użytkownik, klucz prywatny) trzymane są jako sekrety repozytorium — nigdzie nie pojawiają się w jawnej postaci w kodzie.

## Osobny klucz do automatyzacji

Zamiast używać swojego osobistego klucza SSH, wygenerowałem nową parę dedykowaną wyłącznie dla GitHub Actions. Dzięki temu dostęp automatyzacji jest oddzielony od mojego własnego — w razie potrzeby można go unieważnić bez wpływu na resztę dostępu do serwera.

## Efekt końcowy

Cały cykl — od `git push` do działającej, zaktualizowanej strony — dzieje się teraz bez żadnej ręcznej interwencji na serwerze.
