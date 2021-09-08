window.addEventListener('DOMContentLoaded', (event) => {
    /*console.log('DOM fully loaded and parsed');*/
    let headerSections = document.getElementById('header_sections');


    for (let i = 1; i <= 4; ++i) {
      let heading = document.createElement('li');
      heading.setAttribute('id', `header_section_${i}`);
      heading.innerHTML = `<b>Section${i}</b>`;
      headerSections.appendChild(heading);
    }
});
