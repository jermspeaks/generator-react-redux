## <%= appName %>
<% if (appDescription.length > 0) { %>
<%= appDescription %>
<% } %>

<% if (appAuthor.length > 0) { %>
This project was created by <%= appAuthor %> <% if (appEmail.length > 0) { %>(<%= appEmail %>)<% } %>
<% } %>

## Version
<%= appVersion %>

## License
<%= appLicense %>
