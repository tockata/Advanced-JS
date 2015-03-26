scope.pop('success', 'Success!', 'You have successfully logged in.');
scope.pop('info', 'Did you know...?', 'Nakov is only 22 years old!');
scope.pop('error', 'Error', 'Invalid username/password.');
scope.pop('warning', 'Warning', 'Please validate your email.', redirect);

function redirect() {
    window.location = 'https://softuni.bg/';
}