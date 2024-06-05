const fs = require('fs');
const { Transform } = require('stream');

class ProcessDataStream extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    // Process the data
    const processedChunk = chunk.toString().toUpperCase();

    // Push the processed data to the output stream
    this.push(processedChunk);

    // Call the callback to indicate that this chunk has been processed
    callback();
  }
}

function processData(inputFilePath, outputFilePath) {
  // Create a readable stream from the input file
  const inputStream = fs.createReadStream(inputFilePath, { highWaterMark: 64 });

  // Create a writable stream to the output file
  const outputStream = fs.createWriteStream(outputFilePath);

  // Create an instance of the ProcessDataStream
  const processDataStream = new ProcessDataStream();

  // Pipe the input stream through the transform stream and into the output stream
  inputStream
    .pipe(processDataStream)
    .pipe(outputStream)
    .on('finish', () => {
      console.log('Data processing completed successfully.');
    })
    .on('error', (err) => {
      console.error('Error occurred during data processing:', err);
    });
}

processData('input.txt', 'output.txt');