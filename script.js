// Function to toggle visibility of login and sign-up sections
document.getElementById('login-toggle').addEventListener('click', function() {
    const authSections = document.getElementById('auth-sections');
    if (authSections.style.display === 'none' || authSections.style.display === '') {
        authSections.style.display = 'block';
    } else {
        authSections.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const itemsPerPage = 9;
    let currentPage = 1;
    let totalItems = 0;

    // Function to handle file uploads
    function handleFileUpload(event) {
        const files = event.target.files;
        totalItems += files.length;
        
        for (const file of files) {
            let elementWrapper = document.createElement('div');
            elementWrapper.classList.add('gallery-item');

            let element;
            if (file.type.startsWith('image/')) {
                element = document.createElement('img');
                element.src = URL.createObjectURL(file);
                element.alt = 'Uploaded Photo';
                element.addEventListener('click', function() {
                    openFullscreen(element.src, 'image');
                });
            } else if (file.type.startsWith('video/')) {
                element = document.createElement('video');
                element.controls = true;
                const source = document.createElement('source');
                source.src = URL.createObjectURL(file);
                source.type = file.type;
                element.appendChild(source);
                element.addEventListener('click', function() {
                    openFullscreen(element.src, 'video');
                });
            }

            // Create action buttons
            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download';
            downloadButton.classList.add('action-btn');
            downloadButton.addEventListener('click', function() {
                const a = document.createElement('a');
                a.href = element.src;
                a.download = file.name;
                a.click();
            });

            const shareButton = document.createElement('button');
            shareButton.textContent = 'Share';
            shareButton.classList.add('action-btn');
            shareButton.addEventListener('click', function() {
                if (navigator.share) {
                    navigator.share({
                        title: 'Shared Media',
                        text: 'Check out this photo/video!',
                        url: element.src,
                    });
                } else {
                    alert('Sharing is not supported in this browser.');
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('action-btn');
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', function() {
                gallery.removeChild(elementWrapper);
                totalItems--;
                updatePagination();
            });

            // Add elements and buttons to the wrapper
            elementWrapper.appendChild(element);
            elementWrapper.appendChild(downloadButton);
            elementWrapper.appendChild(shareButton);
            elementWrapper.appendChild(deleteButton);

            // Add the wrapper to the gallery
            gallery.appendChild(elementWrapper);
        }

        updatePagination();
    }

    // Function to open the media in fullscreen mode
    function openFullscreen(src, type) {
        const fullscreenModal = document.querySelector('#fullscreen-modal');
        const fullscreenContent = fullscreenModal.querySelector('.fullscreen-content');
        
        if (type === 'image') {
            fullscreenContent.innerHTML = `<img src="${src}" alt="Fullscreen Photo" class="fullscreen-img">`;
        } else if (type === 'video') {
            fullscreenContent.innerHTML = `<video controls autoplay class="fullscreen-video"><source src="${src}" type="video/mp4"></video>`;
        }

        fullscreenModal.style.display = 'block';
    }

    // Function to close the fullscreen modal
    function closeFullscreen() {
        document.querySelector('#fullscreen-modal').style.display = 'none';
    }

    // Function to update pagination and visibility of items
    function updatePagination() {
        const items = gallery.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            item.style.display = (index < currentPage * itemsPerPage) ? 'block' : 'none';
        });

        // Show or hide the "See More" button
        if (totalItems > currentPage * itemsPerPage) {
            if (!document.querySelector('#see-more')) {
                const seeMoreButton = document.createElement('button');
                seeMoreButton.id = 'see-more';
                seeMoreButton.textContent = 'See More';
                seeMoreButton.style.padding = '10px 20px';
                seeMoreButton.style.backgroundColor = '#ff4081';
                seeMoreButton.style.color = 'white';
                seeMoreButton.style.border = 'none';
                seeMoreButton.style.borderRadius = '5px';
                seeMoreButton.style.cursor = 'pointer';
                seeMoreButton.addEventListener('click', function() {
                    currentPage++;
                    updatePagination();
                });

                gallery.parentElement.appendChild(seeMoreButton);
            }
        } else {
            const seeMoreButton = document.querySelector('#see-more');
            if (seeMoreButton) {
                seeMoreButton.remove();
            }
        }
    }

    // Add an event listener to the file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*, video/*';
    fileInput.multiple = true; // Allow multiple files
    fileInput.addEventListener('change', handleFileUpload);

    // Create and style the upload button
    const uploadButton = document.createElement('button');
    uploadButton.textContent = 'Upload Photos & Videos';
    uploadButton.style.padding = '10px 20px';
    uploadButton.style.backgroundColor = '#ff4081';
    uploadButton.style.color = 'white';
    uploadButton.style.border = 'none';
    uploadButton.style.borderRadius = '5px';
    uploadButton.style.cursor = 'pointer';

    // Trigger the file input when the button is clicked
    uploadButton.addEventListener('click', function() {
        fileInput.click();
    });

    // Add the upload button to the header (or wherever you want it)
    document.querySelector('#our-photos').appendChild(uploadButton);

    // Event listener for closing the fullscreen modal
    document.querySelector('#close-fullscreen').addEventListener('click', closeFullscreen);
});


// Function to open the media in fullscreen
function showInFullScreen(src, isVideo = false) {
    const modal = document.getElementById('fullscreen-modal');
    const modalContent = document.getElementById('fullscreen-content');

    if (isVideo) {
        modalContent.innerHTML = `<video src="${src}" class="fullscreen-video" controls autoplay></video>`;
    } else {
        modalContent.innerHTML = `<img src="${src}" class="fullscreen-img">`;
    }

    modal.style.display = "flex"; // Change display from 'block' to 'flex' for centering
}

// Function to close the fullscreen modal
function closeFullscreen() {
    const modal = document.getElementById('fullscreen-modal');
    modal.style.display = "none";
}




// Function to show sign-up form
function showSignUpForm() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'block';
}

// Function to show login form
function showLoginForm() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('signup-section').style.display = 'none';
}

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Perform authentication (placeholder logic)
    if (email === 'user@example.com' && password === 'password') {
        alert('Login successful');
    } else {
        alert('Invalid credentials');
    }
});

// Handle sign-up form submission
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const name = document.getElementById('signup-name').value;

    // Perform sign-up (placeholder logic)
    console.log('Sign Up:', { email, password, name });
    alert('Sign-up successful');
    showLoginForm(); // Show login form after sign-up
});


// Function to generate a unique ID
function generateUniqueID() {
    return 'ID-' + Math.random().toString(36).substr(2, 9);
}

// Function to generate a QR code
function generateQRCode(id) {
    const qrcodeElement = document.getElementById('qrcode');
    new QRCode(qrcodeElement, {
        text: id,
        width: 150,
        height: 150
    });
}

// Function to display profile with generated ID and QR code
function displayProfile() {
    const myID = generateUniqueID();
    
    // Display the unique ID in the HTML
    document.getElementById('your-id').textContent = myID;
    
    // Generate and display the QR code based on the unique ID
    generateQRCode(myID);
}

// Initialize profile display on page load
document.addEventListener('DOMContentLoaded', function() {
    displayProfile();
});


// Function to edit profile information
function editProfile() {
    // Prompt the user to enter new information
    const newName = prompt("Enter your new name:", document.getElementById('your-name').textContent.split(': ')[1]);
    const newEmail = prompt("Enter your new email:", document.getElementById('your-email').textContent.split(': ')[1]);
    const newDob = prompt("Enter your new date of birth:", document.getElementById('your-dob').textContent.split(': ')[1]);

    // Update the DOM with the new information
    if (newName) document.getElementById('your-name').textContent = `Your Name: ${newName}`;
    if (newEmail) document.getElementById('your-email').textContent = `Email: ${newEmail}`;
    if (newDob) document.getElementById('your-dob').textContent = `Date of Birth: ${newDob}`;
}



