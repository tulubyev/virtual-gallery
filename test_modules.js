// Test script to check if required modules are available
try {
    require('dotenv');
    console.log('dotenv module is available');
} catch (e) {
    console.log('dotenv module is NOT available');
}

try {
    require('pg');
    console.log('pg module is available');
} catch (e) {
    console.log('pg module is NOT available');
}

try {
    require('fs');
    console.log('fs module is available');
} catch (e) {
    console.log('fs module is NOT available');
}

try {
    require('path');
    console.log('path module is available');
} catch (e) {
    console.log('path module is NOT available');
}