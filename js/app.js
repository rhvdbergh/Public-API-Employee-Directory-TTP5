// Techdegree Project 5

// Ronald van der Bergh

// I am aiming for extra credit.

// This project uses an API (https://randomuser.me) to create a (mock) employee
// directory of 12 employees for a (mock) company, Awesome Startup. The API returns
// a JSON object, which is parsed. A modal window opens when the employee's name or image is
// clicked. This modal window displays extra information.

// No helper files were provided - the HTML, CSS and JavaScript in this project were all 
// created from scratch, according to mockup .png files that were supplied.

// For extra credit, a filter is added to filter search through employee names. Also, 
// when the modal window is open, the user can move forwards or backwards to view other
// employees.

! function() { // mvc

    const $cardContainer = $('#card_container');

    function updateNames() {

        // retrieve 12 names using the randomuser.me api
        // send a query to retrieve 12 results
        $.get('https://randomuser.me/api/', { results: 12 }, (results) => {

            const employeeList = results.results;

            $cardContainer.html(''); // make sure the screen is cleared 

            let htmlString = '<ul>';
            // cycle through each employee, building the html to show the employee cards
            for (let i = 0; i < 12; i++) {
                htmlString += '<li class="card"><div class="card_img_container">';
                htmlString += `<img src=${employeeList[i].picture.large}></div>`;
                htmlString += `<div class="card_details"><h2 class="card_name">${employeeList[i].name.first}</h2>`;
                htmlString += `<p class="card_email">${employeeList[i].email}</p>`;
                htmlString += `<p class="card_city">${employeeList[i].location.city}</p></div></li>`;
            }
            htmlString += '</ul>';

            $cardContainer.html(htmlString); // udate the html page


        });
    }

    updateNames();
}();