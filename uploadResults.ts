import fs from 'fs';
import sql from 'mssql';

// SQL Server configuration
const config = {
  user: process.env.SQLUSER!,        // SQL username
  password: process.env.SQLPASSWORD!, // SQL password
  server: process.env.SQLSERVER!,    // SQL Server address
  database: process.env.SQLDATABASE!, // Database name
  options: {
    encrypt: true,  // Required for Azure SQL
    enableArithAbort: true,  // Enable error handling
  }
};

// Function to upload results to Azure SQL
async function uploadResults() {
  const rawData = fs.readFileSync('test-results.json', 'utf-8'); // Read the Playwright JSON file
  const results = JSON.parse(rawData);

  let pool: sql.ConnectionPool | null = null;  // Declare pool variable

  try {
    // Connect to SQL Server using connection pool
    pool = await sql.connect(config);
    const request = pool.request(); // Create a request object to execute queries

    // Iterate through test results and insert into SQL table
    for (const suite of results.suites || []) {
      for (const test of suite.specs || []) {
        const testName = test.title || 'Unnamed';
        const status = test.ok ? 'passed' : 'failed';
        const duration = test.duration || 0;

        // Execute query to insert results into SQL Server
        await request.query(`
          INSERT INTO TestResults (testName, status, durationMs)
          VALUES ('${testName}', '${status}', ${duration})
        `);
      }
    }

    console.log('Results uploaded to SQL');
  } catch (err) {
    console.error('Error uploading results:', err);
  } finally {
    if (pool) {
      // Close the pool after all operations are done
      await pool.close();
    }
  }
}

// Call the function
uploadResults().catch(err => {
  console.error('Error executing uploadResults:', err);
});
