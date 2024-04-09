async function fetchData() {
    try {
      const response = await fetch('deptofwl.json'); // Replace 'data.json' with the actual path to your JSON file
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
      const mainSections = data.body.main.sections;
  
      // Loop through each section and update HTML elements
      mainSections.forEach(section => {
        const sectionClass = section.class;
        const sectionContent = section.content;
  
        // Selecting the section by class
        const sectionElement = document.querySelector(`.${sectionClass}`);
  
        // Updating heading and paragraph elements
        sectionElement.querySelector('h1').innerText = sectionContent.h1;
        sectionElement.querySelector('p').innerText = sectionContent.p.join('\n');
      });
    });
  }
  
  // Call the updateHTML function to initiate fetching and updating HTML
  updateHTML();