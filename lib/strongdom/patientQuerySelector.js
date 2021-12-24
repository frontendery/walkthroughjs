// Tries to querySelect a DOM element for `maxWait` time before giving up and returning null
// Can be helpful when you need to querySelect an element on a page that is added dynamically
// after the initial page render (such as is common scenario in SPA scenarios)
export default async function patientQuerySelector(selector, maxWait = 10000) {
  let running = true;

  function querySelectorLoop(callback) {
    const result =
      selector instanceof HTMLElement
        ? selector
        : document.querySelector(selector);

    if (result) {
      callback(result);
    } else if (running) {
      setTimeout(() => {
        querySelectorLoop(callback);
      }, 500);
    }
  }

  const selectElement = new Promise(resolve => {
    querySelectorLoop(resolve);
  });

  const orTimeout = new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
      running = false;
    }, maxWait);
  });

  return Promise.race([selectElement, orTimeout]);
}
