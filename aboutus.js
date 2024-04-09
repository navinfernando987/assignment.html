function fetchData() {
    // URL of the JSON file
    const jsonUrl = 'aboutus.json'; // Update this with the correct path to your JSON file

    // Fetch data from the URL
    fetch(jsonUrl)
        .then(response => {
            // Check if response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse JSON response
            return response.json();
        })
        .then(data => {
            // Access the JSON data and update the HTML
            const aboutSection = data.body['about-section'];
            const innerContainer = aboutSection['inner-container'];

            // Update the HTML elements
            document.getElementById('abouth1').textContent = innerContainer.h1;
            document.getElementById('aboutp').textContent = innerContainer.text;
            document.getElementById('aboutp2').textContent = innerContainer.mission.contact;

            // Update mission spans
            const missionSpans = document.querySelectorAll('.mission span');
            innerContainer.mission.spans.forEach((spanText, index) => {
                missionSpans[index].textContent = spanText;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Call fetchData when the DOM content is loaded
document.addEventListener('DOMContentLoaded', fetchData);