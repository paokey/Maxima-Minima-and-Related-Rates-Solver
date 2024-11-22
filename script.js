// Solve Maxima and Minima
function solveMaximaMinima() {
    const input = document.getElementById("function").value;
    const resultDiv = document.getElementById("maximaMinimaResult");

    try {
        // Step 1: Parse the function
        const f = math.compile(input);

        // Step 2: Compute the derivative
        const df = math.derivative(input, 'x').toString();

        // Step 3: Compute the second derivative
        const secondDerivative = math.derivative(df, 'x').toString();

        // Step 4: Find critical points using numerical approximation
        const criticalPoints = findRootsNumerically(df, -10, 10, 0.1);

        // Step 5: Determine maxima, minima, or inflection points
        const maxima = [];
        const minima = [];
        const solutionSteps = [`Step 1: Function: ${input}`, `Step 2: Derivative: ${df}`, `Step 3: Second Derivative: ${secondDerivative}`];

        criticalPoints.forEach(point => {
            const secondValue = math.compile(secondDerivative).evaluate({ x: point });

            if (secondValue < 0) {
                maxima.push(`x = ${point.toFixed(2)}`);
                solutionSteps.push(`Step 4: At x = ${point.toFixed(2)}, second derivative = ${secondValue} (Maxima)`);
            } else if (secondValue > 0) {
                minima.push(`x = ${point.toFixed(2)}`);
                solutionSteps.push(`Step 4: At x = ${point.toFixed(2)}, second derivative = ${secondValue} (Minima)`);
            } else {
                solutionSteps.push(`Step 4: At x = ${point.toFixed(2)}, second derivative = ${secondValue} (Inflection Point)`);
            }
        });

        solutionSteps.push(
            `Step 5: Critical Points: ${criticalPoints.length > 0 ? criticalPoints.map(cp => `x = ${cp.toFixed(2)}`).join(", ") : "None"}`
        );

        // Display solution steps step-by-step
        resultDiv.innerHTML = `
            <strong>Solution Steps:</strong><br>
            ${solutionSteps.map(step => `<p>${step}</p>`).join("")}<br>
            <strong>Maxima:</strong> ${maxima.length > 0 ? maxima.join(", ") : "None"}<br>
            <strong>Minima:</strong> ${minima.length > 0 ? minima.join(", ") : "None"}
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

// Numerical approximation for finding roots
function findRootsNumerically(equation, start, end, step) {
    const f = math.compile(equation);
    const roots = [];

    for (let x = start; x <= end; x += step) {
        const y1 = f.evaluate({ x });
        const y2 = f.evaluate({ x: x + step });

        // If there's a sign change, there's a root between x and x + step
        if (y1 * y2 <= 0) {
            const root = x - (y1 / (y2 - y1)) * step; // Linear interpolation
            roots.push(root);
        }
    }

    return roots;
}

// Solve Related Rates
function solveRelatedRates() {
    const input = document.getElementById("relatedRatesInput").value;
    const resultDiv = document.getElementById("relatedRatesResult");

    try {
        // Evaluate the related rates equation using Math.js
        const evaluated = math.evaluate(input);

        // Display the result step-by-step
        resultDiv.innerHTML = `
            <strong>Solution Steps:</strong><br>
            <p>Step 1: Given equation: ${input}</p>
            <p>Step 2: Substitute known values into the equation.</p>
            <p>Step 3: Simplify the equation to solve for the desired rate.</p>
            <strong>Result:</strong> ${evaluated}
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}
