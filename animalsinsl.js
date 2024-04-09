
// Function to fetch data from JSON file
async function fetchData() {
    try {
      const response = await fetch('animalsinsl.json'); // Replace 'data.json' with the actual path to your JSON file
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Function to extract and display relevant information
  function displayData() {
    fetchData().then(data => {
      // Accessing main sections
      const mainSections = data.main.sections;
  
      // Accessing content from each section
      mainSections.forEach(section => {
        if (section.class === 'sectback') {
          // Accessing background section content
          const backgroundContent = section.content.row.right.content;
  
          // Displaying background section content
          console.log('Background Section Content:');
          console.log('Title:', backgroundContent.h1);
          console.log('Paragraphs:');
          backgroundContent.p.forEach(paragraph => {
            console.log(paragraph);
          });
        } else if (section.class === 'sect1') {
          // Accessing cards section content
          const cardContainer = section.content['card-container'];
          const cards = cardContainer.cards;
  
          // Displaying cards section content
          console.log('Cards Section Content:');
          cards.forEach(card => {
            console.log('Image:', card.img);
            console.log('Title:', card['card-content'].h3);
            console.log('Description:', card['card-content'].p);
            console.log('Link:', card['card-content'].link.href);
          });
        }
      });
    });
  }
  
  // Call the displayData function to initiate fetching and displaying data
  displayData();