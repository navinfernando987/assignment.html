function fetchData(callback) {
    fetch('sllep.json')
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(error => console.log(error));
}

// Function to update HTML content
function updateHTML(data) {
    // Loop through sections in JSON data
    data.main.sections.forEach(section => {
        // Get the section element by class name
        const sectionElement = document.querySelector(`.${section.class}`);

        // Check if section element exists
        if (sectionElement) {
            // Check if content exists for the section
            if (section.content) {
                // Loop through content elements
                Object.keys(section.content).forEach(key => {
                    // Get the content element by tag name
                    const contentElement = sectionElement.querySelector(key);
                    
                    // Check if content element exists
                    if (contentElement) {
                        // Update content based on tag name
                        if (typeof section.content[key] === 'string') {
                            contentElement.textContent = section.content[key];
                        } else if (typeof section.content[key] === 'object') {
                            // Handle nested content elements
                            Object.keys(section.content[key]).forEach(subkey => {
                                const subContentElement = contentElement.querySelector(subkey);
                                if (subContentElement) {
                                    subContentElement.textContent = section.content[key][subkey];
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}

// Fetch data and update HTML when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchData(updateHTML);
});