---
title: "Bezpieczeństwo i trzeci etap automatyzacji"
description: "SSH kluczem, fail2ban i GitHub Actions budujące obraz po każdym pushu."
date: "2026-08-04"
---

# Dwa fronty naraz

Ten wpis łączy dwie osobne zmiany — jedną po stronie bezpieczeństwa serwera, drugą po stronie procesu wdrożenia.

## Bezpieczeństwo VPS-a

Logowanie po haśle zostało wyłączone — dostęp do serwera jest teraz możliwy wyłącznie kluczem SSH. Dodatkowo działa fail2ban, który blokuje adresy IP po kilku nieudanych próbach logowania. To podstawowa, ale ważna warstwa ochrony przed automatycznymi atakami typu brute-force.

## Automatyczny build obrazu

Do tej pory każdy nowy obraz budowałem ręcznie — lokalnie albo bezpośrednio na serwerze. Teraz ten etap przejął GitHub Actions:

- każdy `push` na branch `main` uruchamia workflow,
- workflow sam loguje się do GHCR, buduje obraz i go wypycha,
- obraz trafia do rejestru z dwoma tagami: `latest` oraz unikalnym hashem commita.

Wdrożenie na serwer nadal wymaga ręcznego `pull`, ale sam proces budowania i publikacji obrazu dzieje się już bez mojego udziału.

## Co dalej

Kolejnym krokiem będzie domknięcie pętli — automatyczny deploy na VPS bezpośrednio z workflow, żeby cały cykl od `push` do działającej strony przebiegał bez ręcznej interwencji.
