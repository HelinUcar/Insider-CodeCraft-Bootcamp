
function collatzSequenceLength(n, cache) {
    let count = 1; // for chain length
    let original = n; // for caching

    // Check if sequence has already been calculated
    while (n !== 1) {
        // Check if sequence has been calculated before
        if (cache[n]) {
            // Return the cached value
            cache[original] = count + cache[n] - 1;
            return cache[original];
        }

        // Collatz rules 
        // If n is even, divide by 2
        // If n is odd, multiply by 3 and add 1
        n = n % 2 === 0 ? n / 2 : 3 * n + 1;
        count++;
    }

    // Cache the calculated value
    cache[original] = count; 
    return count;
}

function longestCollatzSequence(limit) {
    let maxCount = 0;  // longest chain length 
    let maxStartingNumber = 0; // starting number of longest chain 
    let cache = {};
    
    for (let i = 1; i < limit; i++) {
        // Update cache and calculate chain length 
        let count = collatzSequenceLength(i, cache);
        
        // Update longest chain if necessary
        if (count > maxCount) {
            maxCount = count;
            maxStartingNumber = i;
        }
    }

    return maxStartingNumber;
}

// Function to find and display the longest Collatz sequence up to a given number
function findLongestCollatzSequence() {
    const inputNumber = parseInt(document.getElementById("inputNumber").value);
    const resultElement = document.getElementById("result");
    resultElement.textContent = longestCollatzSequence(inputNumber);
}



