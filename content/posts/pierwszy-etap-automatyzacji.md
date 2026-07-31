---
title: "Pierwszy etap automatyzacji"
description: "Docker i docker compose up -d --build"
date: "2026-07-31"
---

# Pierwszy etap automatyzacji

Zanim strona zaczęła się sama aktualizować, przeszedłem przez wszystkie kroki ręcznie. Zalogowałem się na serwer, sklonowałem repozytorium i zbudowałem obraz Dockera bezpośrednio na maszynie produkcyjnej.

## Dlaczego zacząłem od ręcznej wersji

Automatyzacja bywa kusząca od pierwszego dnia, ale łatwiej ją zrozumieć, gdy wcześniej zobaczy się, co dokładnie dzieje się "pod spodem".

- `git pull` pobiera najnowszy kod na serwer,
- `docker compose up -d --build` buduje obraz i uruchamia kontener,
- każda zmiana wymaga ręcznego powtórzenia tych kroków.

## Co dalej

Ten etap pokazuje mechanikę wdrożenia bez żadnych skrótów. Kolejnym krokiem będzie przeniesienie budowania obrazu poza serwer — najpierw ręcznie, a później w pełni automatycznie przez GitHub Actions.