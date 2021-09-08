window.addEventListener('DOMContentLoaded', (event) => {
    let headerSections = document.getElementById('header_sections');

    for (let i = 1; i <= 4; ++i) {
      // Dynamically add sections to header bar
      let heading = document.createElement('li');
      heading.setAttribute('id', `header_section_${i}`);
      heading.innerHTML = `<b>Section${i}</b>`;
      headerSections.appendChild(heading);

      // Set sections up to have collpase/expand behavior
      let collapseButton = document.getElementById(`feature_${i}_min_max`);
      collapseButton.addEventListener('click', event => {
        let featureSection = document.getElementById(`feature_${i}_content`);
        console.log(`display is currently ${featureSection.getAttribute('display')}`);

        if (featureSection.classList.contains("active")) {
          featureSection.style.display = 'none';
          featureSection.classList.remove("active");
        }
        else {
          featureSection.style.display = 'block';
          featureSection.classList.add("active");
        }
      });
    }
});
