const FEATURE_HIGHLIGHT_COLOR = "#48b444" // Green
const FEATURE_INACTIVE_COLOR = "#81371c"; // Brown

let scrollToTopButton = null; // Blue circle with white up arrow depicted in lower right of screen when you deviate a bit from the top of the page
let numFeatures = null; // Will be set when DOM is loaded and reused so I don't have to continually count the number of features when looping
const root = document.documentElement;

// Wait until the DOM is loaded before trying to access elements
window.addEventListener('DOMContentLoaded', (event) => {
    scrollToTopButton = document.querySelector("#go_to_top");
    let linksList = document.getElementById('header_links_list');
    const titles = document.querySelectorAll('.feature_title');
    numFeatures = titles.length;
    addLinksToHeader(titles, linksList);  // Dynamically add sections to header bar, per project guidelines
    setCollapsibleFeatures(titles);
    document.querySelector('#feature_link_1').style.color = FEATURE_HIGHLIGHT_COLOR;  // Initialize first link to be active feature since page starts from the top
    initScrollToTopButton();  // Set up functionality for scrollToTop button
    initScrollObservers();
});

// Set up observers for each of the feature sections, for highlighting purposes while the user is scrolling vertically through the page
// Note this is distinct from scrolling corresponding to clicking on the header links
function initScrollObservers() {
  for (let i = 1; i <= numFeatures; ++i) {
    let options = { threshold: 0.42 };  // This value determined experimentally, other values produced erratic behavior.
    let feature = document.querySelector(`#feature_${i}_content`); // The trigger for highlighting will be based on a threshold percentage of the feature content becoming visible/invisible
    let featureObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            return highlightActiveFeature(i);
          }
        });
    }, options);
    featureObserver.observe(feature);
  }
}

function addLinksToHeader(titles, list) {
  titles.forEach((title, i) => {
    const index = i + 1;  // Element IDs use 1-based numbering
    let listItem = document.createElement('li');
    listItem.setAttribute('id', `header_section_${index}`);
    listItem.innerHTML = `<a id="feature_link_${index}" class="feature_link" href="#feature_${index}"><b>${title.innerText}</b></a>`;
    listItem.addEventListener('click', event => {
      event.preventDefault(); // Prevent the link from doing its normal job- navigating directly to the anchor. We want to scroll smoothly instead.
      let feature = document.querySelector(`#feature_${index}`);  // Find the title bar to scroll to

      if (feature) {
        let options = { top: feature.scrollTop, behavior: 'smooth' };
        feature.scrollIntoView(options);
      } else {
        console.log(`FAILED TO FIND FEATURE ${index}`);
      }
    });
    list.appendChild(listItem);  // Add link to header section
  });
}

// Set feature sections (title bars) up to have collpase/expand behavior, as shown by the toggling image on the right side of those title bars
function setCollapsibleFeatures(titles) {
  titles.forEach((title, i) => {
    const index = i + 1;
    let collapseButton = document.getElementById(`feature_${index}_min_max`);
    collapseButton.addEventListener('click', event => {
      let featureSection = document.getElementById(`feature_${index}_content`); // Find the content that needs to be able to be toggled visible or not

      if (featureSection.classList.contains("active")) {  // If already active, then we need to hide content on a button press
        featureSection.style.display = 'none';  // This will remove the content
        featureSection.classList.remove("active");  // Update the class name which acts like a flag to maintain state
        collapseButton.setAttribute("src", "images/expand_icon.jpg"); // Toggle the image too so the user can see how to get content back
      }
      else {  // Content was previously hidden so make visible again
        featureSection.style.display = 'grid';  // This will restore the original display type (i.e. make visible)
        featureSection.classList.add("active"); // Add the active flag back in
        collapseButton.setAttribute("src", "images/collapse_icon.jpg"); // Toggle the image to indicate a collapse next time
      }
    });
  });
}

// Allow the go to top button to be visible and hidden as appropriate
// Using show/hide class names to toggle visibility
// Button should be visible when sufficiently distant from the top of the page, otherwise invisible
function updateGoToTopButton(entries, observer) {
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

// Add click functionality for scroll to top button that appears over the lower right corner of the screen
function initScrollToTopButton() {
  scrollToTopButton.addEventListener("click", scrollToTop);
  let scrollObserver = new IntersectionObserver(updateGoToTopButton);
  let feature1 = document.querySelector('#feature_1_title_container');
  scrollObserver.observe(feature1);
}

function scrollToTop() {
  root.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Used to highlight the active feature and deactivate whatever feature was previously active, if any
function highlightActiveFeature(index) {
  for (let i = 1; i <= numFeatures; ++i) {
    let link = document.getElementById(`feature_link_${i}`);
    let feature = document.querySelector(`#feature_${i}_title_container`)

    if (i === index) {  // Display as active
      link.style.color = FEATURE_HIGHLIGHT_COLOR;  // Set the text color to green for the active feature
      link.style.textDecoration = 'underline'; // Additionally underline the active feature to highlight it
      feature.style.backgroundColor = FEATURE_HIGHLIGHT_COLOR;
    } else {  // Display as inactive
      link.style.color = FEATURE_INACTIVE_COLOR;  // Inactive links are shown in brown text
      link.style.textDecoration = 'none';  // Remove any potential underlining that was present with a previously active feature
      feature.style.backgroundColor = FEATURE_INACTIVE_COLOR;
    }
  }
}
