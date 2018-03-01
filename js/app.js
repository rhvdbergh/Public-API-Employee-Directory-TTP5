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
    const $modalScreen = $('#modal_screen'); // this fills the whole viewing port 
    const $modalContainer = $('#modal_container')
    let employeeList = {}; // list contains the returned object from the API
    let modalWindowIndex = 0; // the current index of the employee selected in the modal window

    // function to capitalize first letter and letters after spaces of a given string
    function capitalizeString(str) {

        // change the first letter to a capital
        let capStr = str.charAt(0).toUpperCase() + str.substring(1);

        // for each space, the next letter should be capitalized, 
        // so split into separate snippets wherever ' ' is found, 
        // capitalize each first letter of each snippet, 
        // and join the string together again with ' '
        capStr = capStr.split(' ')
            .map(snippet => {
                snippet = snippet.charAt(0).toUpperCase() + snippet.substring(1);
                return snippet;
            })
            .join(' ');

        return capStr;
    } // end capitalizeString()

    function updateNames() {

        // retrieve 12 names using the randomuser.me api
        // send a query to retrieve 12 results
        $.get('https://randomuser.me/api/', { results: 12 }, (results) => {

            employeeList = results.results;

            $cardContainer.html(''); // make sure the screen is cleared 

            let htmlString = '<ul>';
            // cycle through each employee, building the html to show the employee cards
            for (let i = 0; i < 12; i++) {

                htmlString += '<li class="card"><div class="card_img_container">';
                htmlString += `<img class="card_icon" src=${employeeList[i].picture.large} alt="${employeeList[i].picture.large}"></div>`;

                // prepare the capitalized first and last name of the employee
                let employeeName = employeeList[i].name.first + ' ' + employeeList[i].name.last;
                employeeName = capitalizeString(employeeName);

                htmlString += `<div class="card_details"><h2 class="card_name">${employeeName}</h2>`;
                htmlString += `<p class="card_email">${employeeList[i].email}</p>`;

                // capitalize the city's name
                let cityCapitalized = capitalizeString(employeeList[i].location.city);
                htmlString += `<p class="card_city">${cityCapitalized}</p></div></li>`;
            } // end for
            htmlString += '</ul>';

            $cardContainer.html(htmlString); // update the html page

        }); // end $.get()
    }

    // this function expects a date of birth in the format provided by the API
    // example: 1983-07-14 07:29:45
    // it returns a numerical date of birth in the format mm-dd-yy
    function formatBirthday(dob) {
        let formattedDOB = dob.substring(5, 7) + '/' + dob.substring(8, 10) + '/' + dob.substring(2, 4);
        return formattedDOB;
    }

    // shows the modal screen according with info according to a given index in the 
    // employeeList
    function showModalScreen(index) {

        $modalContainer.html('');

        let employee = employeeList[index];
        let htmlString = '<span class="modal_exit_button">X</span>';
        htmlString += '<span class="modal_prev_button">\<</span>';
        htmlString += '<span class="modal_next_button">\></span>';

        htmlString += `<img class="modal_icon" src=${employee.picture.large} alt=${employee.picture.large}>`;

        // prepare the capitalized first and last name of the employee
        let employeeName = employee.name.first + ' ' + employee.name.last;
        employeeName = capitalizeString(employeeName);

        htmlString += `<h2 class="modal_name">${employeeName}</h2>`;
        htmlString += `<p class="modal_email">${employee.email}</p>`;

        // capitalize the city's name
        let cityCapitalized = capitalizeString(employee.location.city);
        htmlString += `<p class="modal_city">${cityCapitalized}</p>`;
        htmlString += `<p class="modal_line">______________________________________________________________________________________________________</p>`;
        htmlString += `<p class="modal_telephone">${employee.cell}</p>`;

        let address = `${employee.location.street}, ${employee.location.state}, ${employee.location.postcode}`;
        address = capitalizeString(address);
        htmlString += `<p class="modal_address">${address}</p>`;

        let birthday = formatBirthday(employee.dob);
        htmlString += `<p class="modal_birthday">Birthday: ${birthday}</p>`;

        $modalContainer.html(htmlString); // update the html page

        $modalScreen.show();
    }

    // INITIAL SETUP

    updateNames();

    // EVENT HANDLERS

    $cardContainer.on('click', (event) => {
        const $clicked = $(event.target);
        // if any of the elements in a specific li is clicked:
        if ($clicked.is('li') || $clicked.parents().is('li')) {

            // find the index of the card clicked
            if ($clicked.is('li')) { // the card itself was clicked, not an element on it
                modalWindowIndex = $clicked.index();
            } else { // one of the child elements was clicked - find the parent <li>
                modalWindowIndex = $clicked.parents('li').index();
            }
            // show the modal screen with info from the clicked index
            showModalScreen(modalWindowIndex);
        }
    })

    $modalScreen.on('click', (event) => {
        const $clicked = $(event.target);
        if ($clicked.is('#modal_container') || $clicked.parents().is('#modal_container')) {
            if ($clicked.is('.modal_exit_button')) {
                $modalScreen.hide();
            }
            if ($clicked.is('.modal_prev_button')) {
                modalWindowIndex -= 1;
                if (modalWindowIndex < 0) {
                    // assign the modalWindowIndex to the last object number in the list
                    // the number of employees is the number of keys in the object
                    // Object.keys(object) returns an array, so we can call length on it
                    modalWindowIndex = Object.keys(employeeList).length - 1;
                }
                showModalScreen(modalWindowIndex);
            } // as above, check when past beginning of list, so too check if past end of list
            if ($clicked.is('.modal_next_button')) {
                modalWindowIndex += 1;
                if (modalWindowIndex > Object.keys(employeeList).length - 1) {
                    modalWindowIndex = 0;
                }
                showModalScreen(modalWindowIndex);
            }
            // do nothing
            // later, the code for moving left or right through the index will be displayed here
        } else {
            // the grayed out area around the modal container box has been clicked
            $modalScreen.hide();
        }
    });




}();