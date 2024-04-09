// Function to fetch data from JSON file
async function fetchData() {
    try {
      const response = await fetch('yala.json'); // Replace 'data.json' with the actual path to your JSON file
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
            if (row.left.iframe) {
              const iframeElement = document.createElement('iframe');
              Object.entries(row.left.iframe).forEach(([key, value]) => {
                iframeElement.setAttribute(key, value);
              });
              leftColumn.appendChild(iframeElement);
            }
          }
  
          // Update right column
          if (row.right) {
            const rightColumn = sectionElement.querySelector('.right');
            const content = row.right.content;
  
            // Update heading and paragraphs
            rightColumn.querySelector('h2').innerText = content.h2;
            if (content.p) {
              const paragraph = rightColumn.querySelectorAll('p');
              if (paragraph.length === 1) {
                paragraph[0].innerText = content.p.join('\n');
              } else {
                paragraph.forEach((p, index) => {
                  p.innerText = content.p[index];
                });
              }
            }
  
            // Update unordered list
            if (content.ul) {
              const ul = rightColumn.querySelector('ul');
              ul.innerHTML = '';
              content.ul.forEach(item => {
                const li = document.createElement('li');
                li.innerText = item.li;
                const p = document.createElement('p');
                p.innerText = item.p;
                li.appendChild(p);
                ul.appendChild(li);
              });
            }
  
            // Update anchor tag
            if (content.a) {
              const anchor = rightColumn.querySelector('a');
              anchor.href = content.a.href;
              anchor.target = content.a.target;
              anchor.innerText = content.a.content;
            }
          }
        } else {
          // Update content directly if there's no row element
          const content = sectionContent.content;
          sectionElement.querySelector('h2').innerText = content.h2;
          const paragraph = sectionElement.querySelectorAll('p');
          if (paragraph.length === 1) {
            paragraph[0].innerText = content.p.join('\n');
          } else {
            paragraph.forEach((p, index) => {
              p.innerText = content.p[index];
            });
          }
        }
      });
    });
  }
  
  // Call the updateHTML function to initiate fetching and updating HTML
  updateHTML();