export const OauthSignIn = (params) => {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  // Create element to open OAuth 2.0 endpoint in new window.
  var form = document.createElement("form");
  form.setAttribute("method", "GET"); // Send as a GET request.
  form.setAttribute("action", oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var configs = {
    client_id:
      "401220103720-9l4v878v94r3854sbpo3cb15mbdb93ra.apps.googleusercontent.com",
    redirect_uri: "http://localhost:3000/sendFeedback?oauth_callback=1",
    scope: "https://www.googleapis.com/auth/gmail.send",
    state: JSON.stringify(params),
    include_granted_scopes: "true",
    response_type: "token",
  };

  // Add form parameters as hidden input values.
  for (var p in configs) {
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", configs[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
};

export const sendMail = (access_token, feedbackValue) => {
  const url = "https://www.googleapis.com/gmail/v1/users/me/messages/send";
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${access_token}`);
  headers.append("Content-Type", "application/json");
  const message = `From: me\nTo: dohuyhieu2911@gmail.com\nSubject: Feedback\n\nHere is my feedback : ${feedbackValue}`;
  const encodedMessage = btoa(message);
  const data = JSON.stringify({
    raw: encodedMessage,
  });

  fetch(url, {
    method: "POST",
    headers: headers,
    body: data,
  })
    .catch((error) => console.error(error));
};
