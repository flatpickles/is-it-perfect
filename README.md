# Is It Perfect?

-   Main page checks cookies (?) to see if we have the lat/long & other configuration.
    -   If so, check timeout, and update if we're within the resolution of the backing API
    -   If not, direct to the "config" page
-   Config is a progressively enhanced form where you can set your location and other preferences
    -   Submit sets these cookies and redirects back to the homepage
    -   Use form actions
