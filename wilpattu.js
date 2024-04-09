fetch('wilpattu.json')
  .then(response => response.json())
  .then(data => {
    // Update HTML elements based on JSON data

    // Update main sections
    const mainSections = data.body.main.sections;
    mainSections.forEach(section => {
      const sectionClass = section.class;
      const sectionContent = section.content;

      // Update content of each section
      const sectionElement = document.querySelector(`.${sectionClass}`);
      if (sectionElement) {
        if (sectionContent.row) {
          const row = sectionContent.row;

          // Update left content
          if (row.left && row.left.img) {
            const leftImg = row.left.img;
            const leftImgElement = sectionElement.querySelector('.left img');
            if (leftImgElement) {
              leftImgElement.src = leftImg;
            }
          }

          // Update right content
          if (row.right && row.right.content) {
            const rightContent = row.right.content;

            // Update headings and paragraphs
            Object.keys(rightContent).forEach(key => {
              const element = sectionElement.querySelector(`.right ${key}`);
              if (element) {
                const content = rightContent[key];
                if (Array.isArray(content)) {
                  element.innerHTML = ''; // Clear existing content
                  content.forEach(item => {
                    const elementType = Object.keys(item)[0];
                    const itemContent = item[elementType];
                    const newItem = document.createElement(elementType);
                    newItem.innerHTML = itemContent;
                    element.appendChild(newItem);
                  });
                } else {
                  element.innerHTML = content;
                }
              }
            });
          }
        }
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));