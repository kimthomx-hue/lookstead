/**
 * Forwards Supabase email auth hashes from lookstead.com into the Lookstead app.
 * Used on /auth/callback/ and the home page (legacy Site URL redirects).
 */
(function () {
  var hash = window.location.hash || '';
  if (!hash || hash.length < 2) {
    return;
  }
  var params = hash.slice(1);
  if (
    params.indexOf('access_token=') === -1 &&
    params.indexOf('token_hash=') === -1 &&
    params.indexOf('error=') === -1 &&
    params.indexOf('code=') === -1
  ) {
    return;
  }

  var appUrl = 'lookstead://auth/callback#' + params;
  window.__looksteadAuthRedirect = appUrl;

  try {
    window.location.replace(appUrl);
  } catch (e) {
    /* ignore — show manual open UI on callback page */
  }
})();
