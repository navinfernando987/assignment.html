fetch('index.json')
  .then(response => response.json())
  .then(data => {
    // Update HTML elements based on JSON data

    // Update title
    const titleElement = document.querySelector('h1#indexh1');
    if (titleElement) {
      titleElement.textContent = data.content.title;
    }

    // Update link
    const exploreLink = data.content.link;
    const exploreElement = document.querySelector('.content a');
    if (exploreElement) {
      exploreElement.textContent = exploreLink.text;
      exploreElement.href = exploreLink.url;
    }
  })
  .catch(error => console.error('Error fetching data:', error));