window.addEventListener('DOMContentLoaded', (event) => {
    let headerSections = document.getElementById('header_sections');

    for (let i = 1; i <= 4; ++i) {
      // Dynamically add sections to header bar
      let heading = document.createElement('li');
      heading.setAttribute('id', `header_section_${i}`);
      heading.innerHTML = `<a id="feature_link_${i}" class="feature_link" href="#feature_${i}"><b>Section${i}</b></a>`;
      heading.addEventListener('click', event => {
        highlightActiveSection(i);
      });
      headerSections.appendChild(heading);

      // Set sections up to have collpase/expand behavior
      let collapseButton = document.getElementById(`feature_${i}_min_max`);
      collapseButton.addEventListener('click', event => {
        let featureSection = document.getElementById(`feature_${i}_content`);

        if (featureSection.classList.contains("active")) {
          featureSection.style.display = 'none';
          featureSection.classList.remove("active");
          collapseButton.setAttribute("src", "images/expand_icon.jpg");
        }
        else {
          featureSection.style.display = 'block';
          featureSection.classList.add("active");
          collapseButton.setAttribute("src", "images/collapse_icon.jpg");
        }
      });
    }
});

function highlightActiveSection(index) {
  for (let i = 1; i <= 4; ++i) {
    var section = document.getElementById(`feature_link_${i}`);
    if (i === index) {
      section.style.color = 'red';
    } else {
      section.style.color = 'black';
    }
  }
}
