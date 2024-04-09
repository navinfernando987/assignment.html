async function fetchData() {
    try {
      const response = await fetch('loris.json'); // Replace 'data.json' with the actual path to your JSON file
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
  
      // Accessing content from each section
      mainSections.forEach(section => {
        if (section.class === 'sectback') {
          // Accessing background section content
          const row = section.content.row;
          const leftImg = row.left.img;
          const rightContent = row.right.content;
  
          // Updating background section elements
          document.getElementById('lorisimg1').src = leftImg;
          document.getElementById('lorish1').innerText = rightContent.h1;
          document.getElementById('lorish2').innerText = rightContent.h2;
          document.getElementById('lorisp1').innerText = rightContent.p[0];
          document.getElementById('lorisp2').innerText = rightContent.p[1];
          document.getElementById('lorisp3').innerText = rightContent.p[2];
        }
      });
    });
  }
  
  // Call the updateHTML function to initiate fetching and updating HTML
  updateHTML();