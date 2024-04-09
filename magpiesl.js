// Fetching JSON data
fetch('magpiesl.json')
  .then(response => response.json())
  .then(data => {
    // Update HTML elements based on JSON data

    const mainSections = data.body.main.sections;

    // Loop through each section
    mainSections.forEach(section => {
      const sectionClass = section.class;
      const sectionContent = section.content;

      // Update section content
      const leftImgSrc = sectionContent.row.left.img;
      const leftImgClass = sectionContent.row.left.class;
      const rightContent = sectionContent.row.right.content;

      // Update left image
      const leftImgElement = document.querySelector(`.${sectionClass} .left img`);
      if (leftImgElement) {
        leftImgElement.src = leftImgSrc;
        leftImgElement.className = leftImgClass;
      }

      // Update right content
      const rightContentKeys = Object.keys(rightContent);
      rightContentKeys.forEach(key => {
        const element = document.getElementById(key);
        if (element) {
          element.textContent = rightContent[key];
        }
      });
    });
  })
  .catch(error => console.error('Error fetching data:', error));