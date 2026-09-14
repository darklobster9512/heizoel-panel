# `superadmin@admin.de` als Admin freischalten

## Umsetzung
- Dem bereits angelegten Konto `superadmin@admin.de` genau eine `admin`-Rolle in der separaten Rollentabelle zuweisen.
- Die Zuweisung wiederholbar ausführen, damit keine doppelte Rolle entstehen kann.
- Anschließend prüfen, dass Konto und Rolle korrekt verknüpft sind.

## Ergebnis
Nach erneutem Laden beziehungsweise erneutem Anmelden wird das Konto von `/weiterleitung` in den Adminbereich weitergeleitet. Eine Rollenverwaltung in der Oberfläche wird nicht ergänzt.
