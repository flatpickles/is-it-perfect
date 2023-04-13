# Is It Perfect?

Because everyone needs another vaguely functional weather app, I present: Is It Perfect? This cool tool will tell you if it's "perfect" outside, and allows you to define "perfection" as you see fit.

When you first load the page, it'll check your IP address's location and use that for weather determination. You can further define your location with a zip code or similar identifier, and use that instead. We start with some reasonable defaults for "perfection", but adjusting these settings according to your preferences is encouraged.

Perhaps you could guess – I built this little app mostly to practice making something with SvelteKit that maintains some state (via cookies) and leverages multiple external APIs. The APIs I'm using here are:

-   [IP-API](https://ip-api.com/) for IP address localization
-   [Open-Meteo](https://open-meteo.com/) for weather and geocoding (place name -> lat/long)
-   [Google's Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview) for reverse geocoding (lat/long -> place name)

Of course, lots more that could be done here. Some ideas:

-   Using the browser's geolocation API for location selection & updates
-   Map visualization & selection for location
-   More weather attributes (humidity, etc)
-   Time of year settings; perfection is different in the summer vs. the fall!
-   Historical perfection: how often is it perfect?
-   Perfection mapping: where is it perfect, and how often is it perfect there?
-   Perfection push notifications, as little reminders to go outside!
