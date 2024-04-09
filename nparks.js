// Function to fetch data from JSON file
async function fetchData() {
    try {
      const response = await fetch('nparks.json'); // Replace 'data.json' with the actual path to your JSON file
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Function to update HTML elements with fetched data
  function updateHTML() {
    fetchData().then(data => {
      // Accessing main sections
      const mainSections = data.main.sections;
  
      // Loop through each section and update HTML elements
      mainSections.forEach(section => {
        const sectionClass = section.class;
        const sectionContent = section.content;
  
        // Selecting the section by class
        const sectionElement = document.querySelector(`.${sectionClass}`);
  
        // Check if section has a row element
        if (sectionContent.row) {
          const row = sectionContent.row;
  
          // Update left column
          if (row.left) {
            const leftColumn = sectionElement.querySelector('.left');
            if (row.left.img) {
              leftColumn.querySelector('img').src = row.left.img;
            }
          }
  
          // Update right column
          if (row.right) {
            const rightColumn = sectionElement.querySelector('.right');
            const content = row.right.content;
  
            // Update heading and paragraphs
            rightColumn.querySelector('h1').innerText = content.h1;
            if (content.paragraphs) {
              const paragraphs = rightColumn.querySelectorAll('p');
              if (paragraphs.length === 1) {
                paragraphs[0].innerText = content.paragraphs.join('\n');
              } else {
                paragraphs.forEach((p, index) => {
                  p.innerText = content.paragraphs[index];
                });
              }
            }
          }
        } else if (section.card-container) {
          // Update card containers
          const cardContainer = sectionElement.querySelector('.card-container');
          const cards = section.card-container;
  
          // Remove existing cards
          cardContainer.innerHTML = '';
  
          // Create and append new cards
          cards.forEach(cardData => {
            const card = cardData.card;
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            const cardContent = `
              <img src="${card.img}">
              <div class="card-content">
                <h3>${card['card-content'].h3}</h3>
                <p>${card['card-content'].p}</p>
                <a href="${card['card-content'].link.href}" class="${card['card-content'].link.class}">${card['card-content'].link.text}</a>
              </div>
            `;
            cardElement.innerHTML = cardContent;
            cardContainer.appendChild(cardElement);
          });
        }
      });
    });
  }
  
  // Call the updateHTML function to initiate fetching and updating HTML
  updateHTML();