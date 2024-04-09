// Fetching data from JSON file
fetch('pitviper.json')
  .then(response => response.json())
  .then(data => {
    const { body } = data;

    // Updating HTML with fetched data
    const section = body.main.section;
    const leftImage = document.querySelector('.left img');
    const rightContent = document.querySelector('.right');

    leftImage.src = section.row.left.img;
    leftImage.classList = section.row.left.class;

    rightContent.innerHTML = `
      <div class="content">
        <h1 id="pitviperh1">${section.content.row.right.content.h1}</h1>
        <h2 id="pitviperh2">${section.content.row.right.content.h2}</h2>
        <br>
        <p id="pitviperp1">${section.content.row.right.content.p}</p>
      </div>
    `;
  })
  .catch(error => console.log(error));