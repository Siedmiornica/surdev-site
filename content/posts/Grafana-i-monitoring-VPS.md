---
title: "Grafana i monitoring VPS"
description: "Node Exporter, Prometheus i Grafana pod własną subdomeną, plus lekcja o Docker volumes."
date: "2026-08-12"
---

# Monitoring wchodzi do gry

Kolejny kawałek infrastruktury stanął na nogi — serwer ma teraz własny stos monitoringu, widoczny pod osobną subdomeną.

## Trzy nowe kontenery

Do dotychczasowej infrastruktury doszły trzy usługi, działające razem:

- Node Exporter — zbiera metryki hosta (CPU, RAM, dysk),
- Prometheus — przechowuje te dane w czasie,
- Grafana — wizualizuje je na dashboardach.

Wszystkie trzy siedzą w tej samej sieci Dockera co reszta usług, bez żadnego portu wystawionego bezpośrednio na świat — jedyną drogą z zewnątrz jest, jak zawsze, nginx.

## Subdomena zamiast ścieżki

Grafana dostała własną subdomenę, `grafana.surdev.pl`, z osobnym rekordem DNS i osobnym certyfikatem SSL. Dzięki temu działa od razu, bez dodatkowej konfiguracji wewnątrz samej aplikacji — subdomeny są tu prostsze niż wystawianie usługi pod ścieżką.

## Nieoczywista pułapka z Dockerem

Po dodaniu nowej konfiguracji nginx, samo przeładowanie (`nginx -s reload`) nie wystarczyło — kontener uparcie pokazywał stary certyfikat. Powód okazał się subtelny: edytor zapisujący plik tworzy go od nowa na dysku, zamiast modyfikować w miejscu, a zamontowany wolumen w kontenerze zostaje przy starej wersji pliku. Rozwiązaniem był pełny restart kontenera, nie tylko przeładowanie configu.

## Co dalej

Kolejny etap to przejście na Ansible do zarządzania wdrażaniem konfiguracji — przyda się, zanim dojdą kolejne usługi obok monitoringu.