const BRAND_FONT_COLOR = "#81371c";

let features = ['Style', 'Flair', 'Swag', 'Reviews'];
let fullFeatures = ['Man Cave Style', 'Flair For Days', 'BOGO Swag', 'Our Customers LOVE Us'];

window.addEventListener('DOMContentLoaded', (event) => {
    let headerSections = document.getElementById('header_sections');

    for (let i = 1; i <= 4; ++i) {
      // Dynamically add sections to header bar
      let heading = document.createElement('li');
      heading.setAttribute('id', `header_section_${i}`);
      heading.innerHTML = `<a id="feature_link_${i}" class="feature_link" href="#feature_${i}"><b>${features[i - 1]}</b></a>`;
      heading.style.color = BRAND_FONT_COLOR;
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

    setFeatureTitles();
});

function highlightActiveSection(index) {
  for (let i = 1; i <= 4; ++i) {
    var section = document.getElementById(`feature_link_${i}`);

    if (i === index) {
      section.style.color = '#48b444';  // Green
      section.style.textDecoration = 'underline';
    } else {
      section.style.color = '#81371c';  // Brown
      section.style.textDecoration = 'none';
    }
  }
}

function setFeatureTitles() {
  for (let i = 1; i <= 4; ++i) {
    let id = `feature_${i}_title`;
    console.log(`id is ${id}`);
    let title = document.getElementById(id);

    if (title === null)
      console.log("TITLE IS NULL");
    else
      title.innerText = `${fullFeatures[i - 1]}`;
  }
}
