---
title: "#7: Domena, nginx i HTTPS"
description: "Od gołego IP:port do surdev.pl z certyfikatem SSL."
date: "2026-08-11"
---

# Domena, nginx i HTTPS

Ten wpis zbiera kilka zmian naraz — strona przeszła z adresu z numerem portu do pełnoprawnej domeny z szyfrowanym połączeniem.

## Domena zamiast adresu IP

Strona miała dotąd adres z numerem portu wprost w URL-u. Teraz działa pod własną domeną `surdev.pl`, wskazującą przez rekord DNS na serwer.

## Osobne repozytorium dla infrastruktury

Konfiguracja serwera (reverse proxy, docelowo kolejne usługi) trafiła do osobnego repozytorium, oddzielonego od kodu samej strony. Aplikacja i infrastruktura mają teraz różne cykle życia i różne odpowiedzialności, połączone tylko wspólną siecią Dockera.

## nginx jako reverse proxy

Zamiast wystawiać aplikację bezpośrednio na świat, ruch teraz przechodzi przez nginx — to on nasłuchuje na standardowych portach i przekazuje żądania dalej, do kontenera z aplikacją. Dzięki temu jeden serwer będzie w stanie w przyszłości obsłużyć więcej niż jedną usługę, każdą pod inną domeną.

## Certyfikat SSL

Domena ma teraz własny, w pełni ważny certyfikat SSL, wydany automatycznie i za darmo. Strona jest dostępna przez szyfrowane połączenie, z przekierowaniem z wersji nieszyfrowanej.

## Co dalej

Kolejny etap to automatyzacja odnawiania certyfikatu oraz przejście na Ansible przy zarządzaniu konfiguracją serwera — przydatne, gdy dojdą kolejne usługi obok samej strony.