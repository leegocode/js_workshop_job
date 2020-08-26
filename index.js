document.addEventListener('DOMContentLoaded', () => {

  const form = document.forms['search-job']
  const description = document.querySelector('[name="description"]').value;
  const location = document.querySelector('[name="location"]').value;
  const fulltime = document.querySelector('[name="full_time"]').checked;
  const apiURL = new URL('https://still-spire-37210.herokuapp.com/positions.json');
  const tbody = document.querySelector('#job-pannel');

  all_info = getAPI(apiURL);

  all_info.then((value) => {
    value.forEach((entry) => {
      showEntry(entry.url, entry.title, entry.company, entry.company_url, entry.type, entry.location)
    });
  });


  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const description = document.querySelector('[name="description"]').value;
    const location = document.querySelector('[name="location"]').value;
    const fulltime = document.querySelector('[name="full_time"]').checked;
    let url = new URL('https://still-spire-37210.herokuapp.com/positions.json');
    const params = new URLSearchParams;

    if (description){
      params.append('description', description)
    }else {
      params.append('description', '')
    };

    if (location){
      params.append('location', location)
    }else{
      params.append('location', '')
    };

    if (fulltime) {
      params.append('full_time','true')
    };
    url.search = params;
    const job_url = url.href;

    console.log(job_url);

    job_search = getAPI(job_url);

    job_search.then((value) => {
      value.forEach((entry) => {
        showEntry(entry.url, entry.title, entry.company, entry.company_url, entry.type, entry.location)
      });
    });
    tbody.innerHTML='';
  });


  async function getAPI(a) { // const url = 'job_url';
    const response = await fetch(a);
    const data = await response.json();
    return data;
  }



  function showEntry(job_url, title, company, company_url, type, location) {

    const searchRow = document.createElement('tr');
    const innerSearch = `<td>
          <h4><a href="${job_url}">${title}</a></h4>
          <p class="source">
          <a class="company" href="${company_url}">${company}</a>
          –
          <strong class="fulltime">${type}</strong>
          </p>
        </td>
        <td class="meta">
          <span class="location">${location}</span>
        </td>`;

    searchRow.innerHTML = innerSearch;
    tbody.appendChild(searchRow);
  }

  document.querySelector('#navbar-burger').addEventListener('click', () => {

    const menu = document.querySelector('#navbar-menu');
    if (menu.classList.contains('is-active')) {
      menu.classList.remove('is-active')
    } else {
      menu.classList.add('is-active')
    }
  });


});
