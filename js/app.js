const BRAND_FONT_COLOR = "#81371c";

let features = ['Style', 'Flair', 'Swag', 'Reviews'];
let fullFeatures = ['Man Cave Style', 'Flair For Days', 'BOGO Swag', 'Our Customers LOVE Us'];

var root = document.documentElement;

window.addEventListener('DOMContentLoaded', (event) => {
    let headerSections = document.getElementById('header_sections');

    // Dynamically add sections to header bar, per project guidelines
    for (let i = 1; i <= 4; ++i) {
      let heading = document.createElement('li');
      heading.setAttribute('id', `header_section_${i}`);
      heading.innerHTML = `<a id="feature_link_${i}" class="feature_link" href="#feature_${i}"><b>${features[i - 1]}</b></a>`;
      heading.addEventListener('click', event => {
        highlightActiveFeature(i);
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

    document.querySelector('#feature_link_1').style.color = '#48b444';  // Initialize first link to be active feature since page starts from the top
    setFeatureTitles();

    // Set up scroll to top
    var scrollToTopButton = document.querySelector("#go_to_top");

    function updateGoToTopButton(entries, observer) {
      //console.log("updateGoToTopButton");
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scrollToTopButton.classList.remove("show_button");
          scrollToTopButton.classList.add("hide_button");
        } else {
          scrollToTopButton.classList.add("show_button");
          scrollToTopButton.classList.remove("hide_button");
        }
      });
    }

    // Add functionality for scroll to top button that appears over the lower right corner of the screen
    scrollToTopButton.addEventListener("click", scrollToTop);
    let scrollObserver = new IntersectionObserver(updateGoToTopButton);
    var header = document.querySelector("header");
    scrollObserver.observe(header);

    // Set up observers for each of the feature sections, for highlighting purposes
    for (let i = 1; i <= 4; ++i) {
      let options = { threshold: 0.7 };  // This value determined experimentally, other values produced erratic behavior.
      let feature = document.querySelector(`#feature_${i}_content`);
      let featureObserver = new IntersectionObserver(function(entries, observer) {
        console.log("In intersection observer");
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            return highlightActiveFeature(i);
          }
        });
      }, options);
      featureObserver.observe(feature);
    }
});

function scrollToTop() {
  console.log("scrollToTop()");
  root.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function highlightActiveFeature(index) {
  console.log(`highlightActiveFeature(${index})`);
  for (let i = 1; i <= 4; ++i) {
    let section = document.getElementById(`feature_link_${i}`);
    let feature = document.querySelector(`#feature_${i}_title_container`)

    if (i === index) {
      section.style.color = '#48b444';  // Green
      section.style.textDecoration = 'underline';
      feature.style.backgroundColor = '#48b444';
    } else {
      section.style.color = '#81371c';  // Brown
      section.style.textDecoration = 'none';
      feature.style.backgroundColor = '#81371c';
    }
  }
}

function highlightActiveSectionLink(index) {
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
    let title = document.getElementById(id);
    title.innerText = `${fullFeatures[i - 1]}`;
  }
}
