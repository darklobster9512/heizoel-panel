# Bestellbestätigung testen

## Ausgangslage

Beim Branding "Heizöl Deutschland" sind inzwischen Resend-Zugangsdaten hinterlegt (Absender `info@heizoel-deutschland.com`, Absendername "Heizöl Deutschland") und auch Seven.io ist gefüllt. Mein letzter Test lief kurz davor und meldete deshalb noch "keine Resend-Daten". Der automatische Auslöser in der Datenbank ist eingerichtet und feuert bei jeder neuen Bestellung.

## Was ich jetzt mache

1. Eine echte Testbestellung über die Bestell-Schnittstelle anlegen — mit dem Branding "Heizöl Deutschland" und `klaro@yopmail.com` als Kundenadresse.
2. Prüfen, ob die Bestellung gespeichert wurde und ob der automatische Auslöser die Bestätigungsmail angestoßen hat.
3. Die Antwort des Mailversands kontrollieren und melden, ob die Mail tatsächlich rausgegangen ist.
4. Falls der Versand scheitert, die genaue Ursache benennen und direkt beheben (z. B. Absenderdomain bei Resend nicht freigegeben, Adresse der Anwendung noch auf Vorschau statt Live).

## Hinweis zur Adresse

Der Auslöser zeigt aktuell auf die Vorschau-Adresse der Anwendung. Falls diese den Aufruf abweist, stelle ich im Test auf einen direkten Aufruf um und wir schalten nach dem Veröffentlichen auf die Live-Adresse.
